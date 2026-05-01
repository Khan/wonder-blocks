import type {
    API,
    ASTPath,
    BinaryExpression,
    Collection,
    FileInfo,
    ImportDeclaration,
    ImportSpecifier,
    JSCodeshift,
    Options,
    TemplateElement,
} from "jscodeshift";

const TOKENS_PACKAGE = "@khanacademy/wonder-blocks-tokens";

/**
 * Mapping from `spacing.<name>` keys to the equivalent `sizing.<name>` keys.
 */
const SPACING_TO_SIZING: Readonly<Record<string, string>> = {
    xxxxSmall_2: "size_020",
    xxxSmall_4: "size_040",
    xxSmall_6: "size_060",
    xSmall_8: "size_080",
    small_12: "size_120",
    medium_16: "size_160",
    large_24: "size_240",
    xLarge_32: "size_320",
    xxLarge_48: "size_480",
    xxxLarge_64: "size_640",
};

/**
 * Names of the deprecated type exports from `@khanacademy/wonder-blocks-tokens`
 * that have no direct sizing-token equivalent.
 */
const DEPRECATED_TYPE_NAMES = new Set([
    "VALID_PRIMARY_SPACING",
    "VALID_SECONDARY_SPACING",
    "VALID_SPACING",
]);

const TODO_PREFIX = "TODO(spacing-migration):";

/**
 * Migrates the deprecated `spacing` primitive token to the `sizing` token.
 *
 * Best-effort transform:
 *   - `spacing.<name>` → `sizing.<mapped>` in style objects, JSX attrs, etc.
 *   - Arithmetic involving `spacing.*` (and numeric literals) is rewritten as
 *     a `calc(...)` template literal composed from `sizing` tokens.
 *   - Unhandled patterns (computed access, spread, `VALID_*` type imports,
 *     unary `spacing.*`) are left alone with a `// TODO(spacing-migration):`
 *     comment for human review.
 */
function transform(file: FileInfo, api: API, options: Options) {
    const j = api.jscodeshift;
    const root = j(file.source);

    const tokensImport = root.find(j.ImportDeclaration, {
        source: {value: TOKENS_PACKAGE},
    });

    // Return file.source (rather than root.toSource()) when there is nothing
    // to transform. recast reformats the entire file on toSource(), so calling
    // it for files we didn't modify would produce spurious diffs (parens,
    // whitespace, etc.). Returning the original source matches jscodeshift's
    // "no change" semantics.
    if (tokensImport.size() === 0) {
        return file.source;
    }

    const {spacingBinding, sizingBinding, deprecatedTypeImports} =
        collectBindings(tokensImport);

    if (!spacingBinding && deprecatedTypeImports.length === 0) {
        return file.source;
    }

    let sizingUsed = false;
    const effectiveSizingBinding = sizingBinding ?? "sizing";

    const handledSpacingPaths = new WeakSet<object>();

    if (spacingBinding) {
        sizingUsed =
            rewriteArithmetic(j, root, spacingBinding, effectiveSizingBinding, {
                handledSpacingPaths,
            }) || sizingUsed;

        sizingUsed =
            rewriteSimpleMemberAccess(
                j,
                root,
                spacingBinding,
                effectiveSizingBinding,
                {handledSpacingPaths},
            ) || sizingUsed;

        flagUnhandledSpacingUsage(j, root, spacingBinding, {
            handledSpacingPaths,
        });
    }

    flagDeprecatedTypeImports(j, tokensImport, deprecatedTypeImports);

    updateImports(j, tokensImport, {
        spacingBinding,
        sizingBinding,
        sizingUsed,
        addSizing: sizingUsed,
        root,
        spacingStillReferenced: spacingBinding
            ? hasUnhandledSpacingReference(
                  j,
                  root,
                  spacingBinding,
                  handledSpacingPaths,
              )
            : false,
    });

    return root.toSource(options.printOptions);
}

// Tell jscodeshift to use the TypeScript+JSX parser. The CLI runner sets this
// explicitly, but `defineInlineTest` reads `module.parser` off the transform
// function, so we attach it here for unit tests too.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(transform as any).parser = "tsx";

export default transform;

type Bindings = {
    /** Local name for the imported `spacing` binding, or null if not imported. */
    spacingBinding: string | null;
    /** Local name for the imported `sizing` binding, or null if not imported. */
    sizingBinding: string | null;
    /** Specifier nodes on the tokens import that reference deprecated VALID_* types. */
    deprecatedTypeImports: Array<ImportSpecifier>;
};

function collectBindings(
    tokensImport: Collection<ImportDeclaration>,
): Bindings {
    let spacingBinding: string | null = null;
    let sizingBinding: string | null = null;
    const deprecatedTypeImports: Array<ImportSpecifier> = [];

    tokensImport.forEach((path) => {
        const specifiers = path.value.specifiers ?? [];
        for (const spec of specifiers) {
            if (spec.type !== "ImportSpecifier") {
                continue;
            }
            const importedName = spec.imported.name;
            const localName = spec.local?.name ?? importedName;
            if (importedName === "spacing") {
                spacingBinding = localName;
            } else if (importedName === "sizing") {
                sizingBinding = localName;
            } else if (DEPRECATED_TYPE_NAMES.has(importedName)) {
                deprecatedTypeImports.push(spec);
            }
        }
    });

    return {spacingBinding, sizingBinding, deprecatedTypeImports};
}

/**
 * Find each top-level arithmetic `BinaryExpression` that contains a
 * `<spacingBinding>.<key>` reference and rewrite it to a `calc(...)` template
 * literal composed of `sizing` tokens. Supports `+`, `-`, `*`, `/`. Numeric
 * literals get `px` for `+`/`-` and stay unitless for `*`/`/`.
 *
 * Returns true if any rewrite happened (so callers know to add the `sizing`
 * import).
 */
function rewriteArithmetic(
    j: JSCodeshift,
    root: Collection<any>,
    spacingBinding: string,
    sizingBinding: string,
    ctx: {handledSpacingPaths: WeakSet<object>},
): boolean {
    let touched = false;

    root.find(j.BinaryExpression).forEach((path) => {
        // Process only the outermost BinaryExpression — skip inner ones whose
        // parent is also a BinaryExpression; they'll be handled when we reach
        // the outer node.
        if (path.parent?.value?.type === "BinaryExpression") {
            return;
        }

        if (!containsSpacingReference(j, path, spacingBinding)) {
            return;
        }

        // Bail if this arithmetic sits inside a TemplateLiteral expression
        // slot. Producing a nested template literal there would yield invalid
        // CSS (e.g. `calc(100% + ${`calc(${sizing.X} * 2)`}px)`). Leave the
        // inner spacing references alone — `rewriteSimpleMemberAccess` checks
        // for the same pattern and skips them, and the unhandled-pass adds a
        // TODO comment.
        if (isInsideTemplateLiteralExpression(path)) {
            return;
        }

        const parts = flattenBinary(j, path.value, spacingBinding, null);
        if (!parts) {
            return;
        }

        const template = buildCalcTemplate(j, parts, sizingBinding);
        recordHandledSpacingPaths(
            j,
            path,
            spacingBinding,
            ctx.handledSpacingPaths,
        );
        j(path).replaceWith(template);
        touched = true;
    });

    return touched;
}

/**
 * Rewrite remaining (non-arithmetic) `<spacingBinding>.<key>` member
 * expressions to `<sizingBinding>.<mapped>` references.
 */
function rewriteSimpleMemberAccess(
    j: JSCodeshift,
    root: Collection<any>,
    spacingBinding: string,
    sizingBinding: string,
    ctx: {handledSpacingPaths: WeakSet<object>},
): boolean {
    let touched = false;

    root.find(j.MemberExpression).forEach((path) => {
        if (ctx.handledSpacingPaths.has(path.value)) {
            return;
        }
        if (!isSpacingMember(path.value, spacingBinding)) {
            return;
        }

        const key = (path.value.property as any).name as string;
        const sizingKey = SPACING_TO_SIZING[key];
        if (!sizingKey) {
            return;
        }

        // `-spacing.X` (unary minus) on a numeric token used to produce a
        // negative pixel number. Plain rewrite would yield `-sizing.X` which
        // negates a rem string and silently produces `NaN` at runtime. Replace
        // the entire UnaryExpression with `` `-${sizing.X}` `` so the value
        // stays a valid negative-rem CSS string.
        const parent = path.parent?.value;
        if (
            parent &&
            parent.type === "UnaryExpression" &&
            parent.operator === "-" &&
            parent.argument === path.value
        ) {
            const sizingExpr = j.memberExpression(
                j.identifier(sizingBinding),
                j.identifier(sizingKey),
            );
            const negTemplate = j.templateLiteral(
                [
                    j.templateElement({raw: "-", cooked: "-"}, false),
                    j.templateElement({raw: "", cooked: ""}, true),
                ],
                [sizingExpr],
            );
            j(path.parent).replaceWith(negTemplate);
            ctx.handledSpacingPaths.add(path.value);
            touched = true;
            return;
        }

        // Inside a TemplateLiteral expression slot, only rewrite if the
        // following quasi doesn't start with a letter (which usually means a
        // unit like `px`, `em`, `rem`). Rewriting `\`${spacing.X}px\`` would
        // produce `1.6rempx` — invalid CSS. Bail in that case so the unhandled
        // pass adds a TODO comment.
        if (isUnsafeTemplateLiteralContext(path)) {
            return;
        }

        j(path).replaceWith(
            j.memberExpression(
                j.identifier(sizingBinding),
                j.identifier(sizingKey),
            ),
        );
        ctx.handledSpacingPaths.add(path.value);
        touched = true;
    });

    return touched;
}

/**
 * Anything still referencing `<spacingBinding>` after the two passes above is
 * an unhandled usage (computed access, spread, function arg, etc.). Leave the
 * source unchanged but mark the enclosing statement with a TODO comment.
 */
function flagUnhandledSpacingUsage(
    j: JSCodeshift,
    root: Collection<any>,
    spacingBinding: string,
    ctx: {handledSpacingPaths: WeakSet<object>},
): void {
    const flaggedStatements = new WeakSet<object>();

    root.find(j.Identifier, {name: spacingBinding}).forEach((path) => {
        // Skip the import specifier itself.
        if (
            path.parent?.value?.type === "ImportSpecifier" ||
            path.parent?.value?.type === "ImportDefaultSpecifier"
        ) {
            return;
        }

        // Skip identifiers that are part of an already-handled MemberExpression.
        const parent = path.parent?.value;
        if (parent && ctx.handledSpacingPaths.has(parent)) {
            return;
        }

        // Skip member-expression usages where we already rewrote the parent.
        if (
            parent?.type === "MemberExpression" &&
            !parent.computed &&
            parent.property?.type === "Identifier" &&
            SPACING_TO_SIZING[parent.property.name]
        ) {
            // This means our simple rewrite missed it (e.g. inside arithmetic
            // we couldn't flatten). It's still a candidate for manual review.
        }

        const stmt = enclosingStatement(path);
        if (!stmt || flaggedStatements.has(stmt.value)) {
            return;
        }

        addLeadingComment(
            j,
            stmt,
            ` ${TODO_PREFIX} manual review needed — \`${spacingBinding}\` reference could not be auto-migrated.`,
        );
        flaggedStatements.add(stmt.value);
    });
}

/**
 * Add a leading TODO comment to each VALID_* type import so reviewers know to
 * widen or remove the type. The import itself is left intact so typecheck still
 * passes during the migration window.
 */
function flagDeprecatedTypeImports(
    j: JSCodeshift,
    tokensImport: Collection<ImportDeclaration>,
    deprecatedTypeImports: Array<ImportSpecifier>,
): void {
    if (deprecatedTypeImports.length === 0) {
        return;
    }

    const names = deprecatedTypeImports
        .map((s) => s.imported.name)
        .sort()
        .join(", ");

    tokensImport.forEach((path) => {
        const specs = path.value.specifiers ?? [];
        const hasDeprecated = specs.some(
            (s) =>
                s.type === "ImportSpecifier" &&
                DEPRECATED_TYPE_NAMES.has(s.imported.name),
        );
        if (!hasDeprecated) {
            return;
        }

        addLeadingComment(
            j,
            path,
            ` ${TODO_PREFIX} ${names} ${
                deprecatedTypeImports.length > 1 ? "are" : "is"
            } deprecated — widen this type to 'number' (or 'number | string') and remove the import.`,
        );
    });
}

function updateImports(
    j: JSCodeshift,
    tokensImport: Collection<ImportDeclaration>,
    args: {
        spacingBinding: string | null;
        sizingBinding: string | null;
        sizingUsed: boolean;
        addSizing: boolean;
        root: Collection<any>;
        spacingStillReferenced: boolean;
    },
): void {
    const {spacingBinding, sizingBinding, addSizing, spacingStillReferenced} =
        args;

    tokensImport.forEach((path) => {
        const specifiers = path.value.specifiers ?? [];

        // Drop the spacing specifier if it's no longer referenced.
        let nextSpecs = specifiers.filter((s) => {
            if (s.type !== "ImportSpecifier") {
                return true;
            }
            if (s.imported.name !== "spacing") {
                return true;
            }
            return spacingStillReferenced;
        });

        // Add sizing if needed and not already present.
        if (addSizing && !sizingBinding) {
            nextSpecs = [
                ...nextSpecs,
                j.importSpecifier(j.identifier("sizing")),
            ];
        }

        // Sort named import specifiers alphabetically for stable output. Leave
        // any default/namespace specifiers in place at the front.
        const namedSpecs = nextSpecs
            .filter((s) => s.type === "ImportSpecifier")
            .sort((a, b) =>
                (a as ImportSpecifier).imported.name.localeCompare(
                    (b as ImportSpecifier).imported.name,
                ),
            );
        const otherSpecs = nextSpecs.filter(
            (s) => s.type !== "ImportSpecifier",
        );

        path.value.specifiers = [...otherSpecs, ...namedSpecs];

        // If only the unused spacing import was left and we removed it, drop
        // the import declaration entirely.
        if ((path.value.specifiers ?? []).length === 0) {
            j(path).remove();
        }
    });

    // Suppress lint variable in caller's typing.
    void spacingBinding;
}

// --- helpers ------------------------------------------------------------

/**
 * True when `path` is inside the `expressions` array of a TemplateLiteral
 * (directly or via parenthesizing wrappers). Used to bail on rewrites that
 * would otherwise produce nested template literals or invalid CSS unit
 * concatenation.
 */
function isInsideTemplateLiteralExpression(path: ASTPath<any>): boolean {
    let current: ASTPath<any> | null = path.parent ?? null;
    while (current) {
        if (current.value?.type === "TemplateLiteral") {
            return true;
        }
        // Stop at obvious statement/declaration boundaries — we only care
        // about expression-level containment.
        const t = current.value?.type;
        if (
            t === "BlockStatement" ||
            t === "Program" ||
            t === "ExpressionStatement" ||
            t === "VariableDeclarator" ||
            t === "Property" ||
            t === "ObjectProperty" ||
            t === "JSXAttribute"
        ) {
            return false;
        }
        current = current.parent ?? null;
    }
    return false;
}

/**
 * True when rewriting the spacing member alone would produce invalid CSS or
 * an unwanted shape:
 *   - direct child of a TemplateLiteral whose next quasi starts with a letter
 *     (`\`${spacing.X}px\`` would yield `"1.6rempx"`), OR
 *   - nested inside a BinaryExpression that itself sits in a TemplateLiteral
 *     expression slot (the arithmetic-rewrite pass already bails on those, and
 *     leaving the inner member alone keeps the source intact for the
 *     unhandled-pass to flag).
 */
function isUnsafeTemplateLiteralContext(path: ASTPath<any>): boolean {
    const parent = path.parent;
    if (parent?.value?.type === "TemplateLiteral") {
        const tmpl = parent.value;
        const idx = (tmpl.expressions ?? []).indexOf(path.value);
        if (idx >= 0) {
            const nextRaw = tmpl.quasis?.[idx + 1]?.value?.raw ?? "";
            return /^[A-Za-z]/.test(nextRaw);
        }
    }

    // Walk up looking for a BinaryExpression ancestor that lives inside a
    // TemplateLiteral expression slot.
    let current: ASTPath<any> | null = path.parent ?? null;
    while (current) {
        if (current.value?.type === "BinaryExpression") {
            if (isInsideTemplateLiteralExpression(current)) {
                return true;
            }
        }
        const t = current.value?.type;
        if (
            t === "BlockStatement" ||
            t === "Program" ||
            t === "ExpressionStatement" ||
            t === "VariableDeclarator" ||
            t === "Property" ||
            t === "ObjectProperty" ||
            t === "JSXAttribute"
        ) {
            return false;
        }
        current = current.parent ?? null;
    }
    return false;
}

function isSpacingMember(node: any, spacingBinding: string): boolean {
    return (
        node?.type === "MemberExpression" &&
        node.computed === false &&
        node.object?.type === "Identifier" &&
        node.object.name === spacingBinding &&
        node.property?.type === "Identifier" &&
        SPACING_TO_SIZING[node.property.name] !== undefined
    );
}

function containsSpacingReference(
    j: JSCodeshift,
    path: ASTPath<BinaryExpression>,
    spacingBinding: string,
): boolean {
    let found = false;
    j(path)
        .find(j.MemberExpression)
        .forEach((m) => {
            if (isSpacingMember(m.value, spacingBinding)) {
                found = true;
            }
        });
    return found;
}

type CalcPart =
    | {kind: "literal"; value: string}
    | {kind: "spacing"; sizingKey: string};

/**
 * Walks a BinaryExpression tree and returns a flat list of parts that can be
 * used to build a `calc(...)` template literal. Returns null if the expression
 * contains anything that isn't safe to mechanically lift into `calc()` — in
 * which case the caller should leave the source alone.
 */
function flattenBinary(
    j: JSCodeshift,
    node: any,
    spacingBinding: string,
    parentOp: string | null,
): Array<CalcPart> | null {
    if (node.type === "BinaryExpression") {
        const op = node.operator;
        if (!["+", "-", "*", "/"].includes(op)) {
            return null;
        }
        const left = flattenBinary(j, node.left, spacingBinding, op);
        const right = flattenBinary(j, node.right, spacingBinding, op);
        if (!left || !right) {
            return null;
        }
        return [...left, {kind: "literal", value: ` ${op} `}, ...right];
    }

    if (
        (node.type === "Literal" && typeof node.value === "number") ||
        node.type === "NumericLiteral"
    ) {
        const num = node.value as number;
        const usePx = parentOp === "+" || parentOp === "-";
        return [{kind: "literal", value: usePx ? `${num}px` : `${num}`}];
    }

    if (
        node.type === "UnaryExpression" &&
        node.operator === "-" &&
        (node.argument.type === "Literal" ||
            node.argument.type === "NumericLiteral") &&
        typeof (node.argument as any).value === "number"
    ) {
        const num = (node.argument as any).value as number;
        const usePx = parentOp === "+" || parentOp === "-";
        return [{kind: "literal", value: usePx ? `-${num}px` : `-${num}`}];
    }

    if (isSpacingMember(node, spacingBinding)) {
        return [
            {
                kind: "spacing",
                sizingKey: SPACING_TO_SIZING[node.property.name],
            },
        ];
    }

    return null;
}

function buildCalcTemplate(
    j: JSCodeshift,
    parts: Array<CalcPart>,
    sizingBinding: string,
) {
    const quasiStrings: Array<string> = [];
    const expressions: Array<any> = [];
    let cur = "calc(";

    for (const part of parts) {
        if (part.kind === "literal") {
            cur += part.value;
        } else {
            quasiStrings.push(cur);
            cur = "";
            expressions.push(
                j.memberExpression(
                    j.identifier(sizingBinding),
                    j.identifier(part.sizingKey),
                ),
            );
        }
    }
    cur += ")";
    quasiStrings.push(cur);

    const quasis: Array<TemplateElement> = quasiStrings.map((s, i) =>
        j.templateElement({raw: s, cooked: s}, i === quasiStrings.length - 1),
    );

    return j.templateLiteral(quasis, expressions);
}

function recordHandledSpacingPaths(
    j: JSCodeshift,
    path: ASTPath<any>,
    spacingBinding: string,
    handled: WeakSet<object>,
) {
    j(path)
        .find(j.MemberExpression)
        .forEach((m) => {
            if (isSpacingMember(m.value, spacingBinding)) {
                handled.add(m.value);
            }
        });
}

function hasUnhandledSpacingReference(
    j: JSCodeshift,
    root: Collection<any>,
    spacingBinding: string,
    handled: WeakSet<object>,
): boolean {
    let unhandled = false;
    root.find(j.Identifier, {name: spacingBinding}).forEach((path) => {
        if (
            path.parent?.value?.type === "ImportSpecifier" ||
            path.parent?.value?.type === "ImportDefaultSpecifier"
        ) {
            return;
        }
        const parent = path.parent?.value;
        if (parent && handled.has(parent)) {
            return;
        }
        unhandled = true;
    });
    return unhandled;
}

function enclosingStatement(path: ASTPath<any>): ASTPath<any> | null {
    let current: ASTPath<any> | null = path;
    while (current) {
        const t = current.value?.type;
        if (
            t === "ExpressionStatement" ||
            t === "VariableDeclaration" ||
            t === "ReturnStatement" ||
            t === "ImportDeclaration" ||
            t === "ExportNamedDeclaration" ||
            t === "ExportDefaultDeclaration" ||
            t === "IfStatement" ||
            t === "ForStatement" ||
            t === "WhileStatement" ||
            t === "ThrowStatement"
        ) {
            return current;
        }
        current = current.parent ?? null;
    }
    return null;
}

function addLeadingComment(
    j: JSCodeshift,
    path: ASTPath<any>,
    text: string,
): void {
    void j;
    const node = path.value;
    const existing = node.comments ?? [];
    // Avoid stacking the same TODO comment multiple times if the codemod is
    // re-run.
    const alreadyHas = existing.some(
        (c: any) =>
            c.type === "CommentLine" &&
            typeof c.value === "string" &&
            c.value.includes(TODO_PREFIX),
    );
    if (alreadyHas) {
        return;
    }

    node.comments = [
        ...existing,
        {
            type: "CommentLine",
            value: text,
            leading: true,
            trailing: false,
        } as any,
    ];
}
