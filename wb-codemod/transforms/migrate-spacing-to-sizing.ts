/* eslint-disable max-lines */
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
    // Spacing MemberExpressions inside a BinaryExpression we couldn't safely
    // flatten. They stay in the source untouched: simple-member rewrite skips
    // them so we don't silently turn numeric arithmetic into string concat,
    // and the unhandled-pass still flags the surviving identifier with a TODO.
    const bailedSpacingPaths = new WeakSet<object>();

    if (spacingBinding) {
        // Try to lift `<Strut size={spacing.X}/>` siblings into a CSS `gap`
        // on the parent `<View>`. When the layout is simple enough, this
        // removes the deprecated Strut entirely; otherwise the Struts stay
        // in place and the existing per-attribute bail-and-flag path runs.
        sizingUsed =
            convertStrutsToGap(
                j,
                root,
                spacingBinding,
                effectiveSizingBinding,
            ) || sizingUsed;

        sizingUsed =
            rewriteArithmetic(j, root, spacingBinding, effectiveSizingBinding, {
                handledSpacingPaths,
                bailedSpacingPaths,
            }) || sizingUsed;

        sizingUsed =
            rewriteSimpleMemberAccess(
                j,
                root,
                spacingBinding,
                effectiveSizingBinding,
                {handledSpacingPaths, bailedSpacingPaths},
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
 * Convert `<View>...<Strut size={spacing.X}/>...<View>` patterns into a
 * `<View style={{gap: sizing.X}}>...</View>` and drop the Struts.
 *
 * Only fires when the layout is simple enough that `gap` is faithful to the
 * original spacing:
 *   - parent JSX local name is `View`
 *   - every direct `<Strut>` child has `size={spacing.<key>}` for a mappable key
 *   - all Strut sizes share the same key
 *   - Struts sit strictly between non-Strut siblings (no leading, trailing, or
 *     adjacent Struts)
 *   - at least 2 non-Strut meaningful children
 *   - parent's `style` is absent, or a plain `{{...}}` object literal without
 *     an existing `gap` property
 *
 * Anything that doesn't qualify is left for the existing
 * `isInsideStrutOpeningElement` bail in `rewriteArithmetic` /
 * `rewriteSimpleMemberAccess`, which adds a TODO comment for manual review.
 */
function convertStrutsToGap(
    j: JSCodeshift,
    root: Collection<any>,
    spacingBinding: string,
    sizingBinding: string,
): boolean {
    let touched = false;

    root.find(j.JSXElement).forEach((path) => {
        const view = path.value;
        const opening = view.openingElement;
        if (
            opening.name?.type !== "JSXIdentifier" ||
            opening.name.name !== "View"
        ) {
            return;
        }

        const analysis = analyzeStrutChildren(view, spacingBinding);
        if (!analysis) {
            return;
        }

        const {strutNodes, spacingKey, styleObj} = analysis;
        const sizingKey = SPACING_TO_SIZING[spacingKey];
        if (!sizingKey) {
            return;
        }

        const gapProp = j.objectProperty(
            j.identifier("gap"),
            j.memberExpression(
                j.identifier(sizingBinding),
                j.identifier(sizingKey),
            ),
        );
        gapProp.shorthand = false;

        if (styleObj) {
            styleObj.properties = [...(styleObj.properties ?? []), gapProp];
        } else {
            const newStyleAttr = j.jsxAttribute(
                j.jsxIdentifier("style"),
                j.jsxExpressionContainer(j.objectExpression([gapProp])),
            );
            opening.attributes = [...(opening.attributes ?? []), newStyleAttr];
        }

        const strutSet = new Set(strutNodes);
        const childrenArr: Array<any> = view.children ?? [];
        // Drop each Strut and its trailing whitespace JSXText so we don't
        // leave the blank line that the original `<Strut>` formatting
        // produced. Leading whitespace stays so the prior sibling keeps its
        // line break.
        const skip = new Set<number>();
        for (let i = 0; i < childrenArr.length; i++) {
            if (!strutSet.has(childrenArr[i])) {
                continue;
            }
            skip.add(i);
            const next = childrenArr[i + 1];
            if (next && next.type === "JSXText" && next.value.trim() === "") {
                skip.add(i + 1);
            }
        }
        view.children = childrenArr.filter((_, i) => !skip.has(i));

        touched = true;
    });

    return touched;
}

type StrutAnalysis = {
    strutNodes: Array<any>;
    spacingKey: string;
    styleObj: any | null;
};

function analyzeStrutChildren(
    viewNode: any,
    spacingBinding: string,
): StrutAnalysis | null {
    const children = viewNode.children ?? [];
    const isStrutNode = (c: any): boolean =>
        c?.type === "JSXElement" &&
        c.openingElement?.name?.type === "JSXIdentifier" &&
        c.openingElement.name.name === "Strut";

    const meaningful = children.filter((c: any) => {
        if (c.type === "JSXText") {
            return c.value.trim() !== "";
        }
        // JSXExpressionContainer with whitespace-only comment is rare; treat
        // every non-text child as meaningful.
        return true;
    });

    const strutNodes = meaningful.filter(isStrutNode);
    if (strutNodes.length === 0) {
        return null;
    }

    if (
        isStrutNode(meaningful[0]) ||
        isStrutNode(meaningful[meaningful.length - 1])
    ) {
        return null;
    }
    let prevWasStrut = false;
    for (const c of meaningful) {
        const cur = isStrutNode(c);
        if (cur && prevWasStrut) {
            return null;
        }
        prevWasStrut = cur;
    }
    if (meaningful.length - strutNodes.length < 2) {
        return null;
    }

    let spacingKey: string | null = null;
    for (const strut of strutNodes) {
        const sizeExpr = getStrutSizeExpression(strut);
        if (!sizeExpr || !isSpacingMember(sizeExpr, spacingBinding)) {
            return null;
        }
        const key = sizeExpr.property.name as string;
        if (spacingKey !== null && spacingKey !== key) {
            return null;
        }
        spacingKey = key;
    }
    if (!spacingKey) {
        return null;
    }

    const styleAttr = (viewNode.openingElement.attributes ?? []).find(
        (a: any) =>
            a.type === "JSXAttribute" &&
            a.name?.type === "JSXIdentifier" &&
            a.name.name === "style",
    );
    let styleObj: any | null = null;
    if (styleAttr) {
        if (
            styleAttr.value?.type !== "JSXExpressionContainer" ||
            styleAttr.value.expression?.type !== "ObjectExpression"
        ) {
            return null;
        }
        styleObj = styleAttr.value.expression;
        const hasGap = (styleObj.properties ?? []).some((p: any) => {
            if (p.type !== "Property" && p.type !== "ObjectProperty") {
                return false;
            }
            if (p.computed) {
                return false;
            }
            return (
                (p.key?.type === "Identifier" && p.key.name === "gap") ||
                (p.key?.type === "Literal" && p.key.value === "gap") ||
                (p.key?.type === "StringLiteral" && p.key.value === "gap")
            );
        });
        if (hasGap) {
            return null;
        }
    }

    return {strutNodes, spacingKey, styleObj};
}

function getStrutSizeExpression(strutNode: any): any | null {
    const sizeAttr = (strutNode.openingElement.attributes ?? []).find(
        (a: any) =>
            a.type === "JSXAttribute" &&
            a.name?.type === "JSXIdentifier" &&
            a.name.name === "size",
    );
    if (!sizeAttr || sizeAttr.value?.type !== "JSXExpressionContainer") {
        return null;
    }
    return sizeAttr.value.expression;
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
    ctx: {
        handledSpacingPaths: WeakSet<object>;
        bailedSpacingPaths: WeakSet<object>;
    },
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

        // If the outermost BinaryExpression sits inside a `UnaryExpression -`
        // (e.g. `marginLeft: -(spacing.medium_16 + 2)`), the unary is the real
        // outer node we need to replace. A plain rewrite of the inner binary
        // alone would leave the unary minus in front of a template literal
        // string at runtime — `-"calc(...)"` evaluates to NaN.
        const parent = path.parent;
        const isNegated =
            parent?.value?.type === "UnaryExpression" &&
            parent.value.operator === "-" &&
            parent.value.argument === path.value;
        const outerPath = isNegated ? parent : path;

        // Bail if this arithmetic sits inside a TemplateLiteral expression
        // slot. Producing a nested template literal there would yield invalid
        // CSS (e.g. `calc(100% + ${`calc(${sizing.X} * 2)`}px)`). Leave the
        // inner spacing references alone — `rewriteSimpleMemberAccess` checks
        // for the same pattern and skips them, and the unhandled-pass adds a
        // TODO comment.
        if (isInsideTemplateLiteralExpression(outerPath)) {
            return;
        }

        // `Strut` takes a numeric `size` prop. Rewriting to `calc(...)`
        // would yield a string and break the component. Leave the spacing
        // references alone and let the unhandled-pass flag them with a TODO.
        if (isInsideStrutOpeningElement(outerPath)) {
            recordSpacingPaths(j, path, spacingBinding, ctx.bailedSpacingPaths);
            return;
        }

        const parts = flattenBinary(j, path.value, spacingBinding, null);
        if (!parts) {
            // Couldn't safely flatten — an operand is something we can't lift
            // into calc() (Identifier, CallExpression, string literal, etc.).
            // Mark every spacing reference inside this BinaryExpression as
            // bailed so `rewriteSimpleMemberAccess` doesn't blindly rewrite
            // them: `sizing.X` is a rem-string at runtime (e.g. "1.6rem"),
            // and replacing `spacing.X` would silently turn numeric addition
            // into string concatenation. Leaving the source unchanged means
            // the surviving `spacing` identifier is still in the AST, so
            // `flagUnhandledSpacingUsage` will add a TODO comment and the
            // `spacing` import stays.
            recordSpacingPaths(j, path, spacingBinding, ctx.bailedSpacingPaths);
            return;
        }

        let template = buildCalcTemplate(j, parts, sizingBinding);
        if (isNegated) {
            // Wrap `calc(...)` as `calc(-1 * (...))` so the negative-length
            // CSS value comes out valid for `var()`-backed sizing tokens too.
            template = wrapTemplateInNegatedCalc(j, template);
        }
        recordSpacingPaths(j, path, spacingBinding, ctx.handledSpacingPaths);
        j(outerPath).replaceWith(template);
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
    ctx: {
        handledSpacingPaths: WeakSet<object>;
        bailedSpacingPaths: WeakSet<object>;
    },
): boolean {
    let touched = false;

    root.find(j.MemberExpression).forEach((path) => {
        if (
            ctx.handledSpacingPaths.has(path.value) ||
            ctx.bailedSpacingPaths.has(path.value)
        ) {
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

        // `Strut` requires a numeric `size` prop. `sizing.X` is a rem-string
        // (or `var(...)`) at runtime, so rewriting `<Strut size={spacing.X}/>`
        // would break the component. Leave the spacing reference alone and
        // let the unhandled-pass flag it with a TODO.
        if (isInsideStrutOpeningElement(path)) {
            ctx.bailedSpacingPaths.add(path.value);
            return;
        }

        // `-spacing.X` (unary minus) on a numeric token used to produce a
        // negative pixel number. The runtime `sizing.X` value is a CSS
        // variable string like `var(--wb-sizing-size_240)`, so a literal `-`
        // prefix (`-var(...)`) is invalid CSS. Wrap the whole UnaryExpression
        // in `` `calc(-1 * ${sizing.X})` `` — a CSS-valid negative-length
        // expression that works regardless of whether the sizing token is a
        // rem string or a CSS variable.
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
                    j.templateElement(
                        {raw: "calc(-1 * ", cooked: "calc(-1 * "},
                        false,
                    ),
                    j.templateElement({raw: ")", cooked: ")"}, true),
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

/**
 * True when `path` sits inside the opening element of a `<Strut>` JSX
 * element (i.e. as part of one of its attribute expressions). `Strut` is a
 * deprecated layout component whose `size` prop must be a number, so any
 * rewrite to `sizing.*` (a CSS string) or to a `calc(...)` template would
 * break it.
 *
 * This intentionally matches by JSX local name only — aliasing the import
 * (`import {Strut as Spacer}`) is rare enough to ignore; the unhandled-pass
 * will still be conservative for such cases via the existing TODO emission.
 */
function isInsideStrutOpeningElement(path: ASTPath<any>): boolean {
    let current: ASTPath<any> | null = path.parent ?? null;
    while (current) {
        const value = current.value;
        if (
            value?.type === "JSXOpeningElement" &&
            value.name?.type === "JSXIdentifier" &&
            value.name.name === "Strut"
        ) {
            return true;
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
 *
 * `parent` carries the operator and side of the immediate parent operation so
 * that (a) numeric leaves know whether to add `px` and (b) child binaries can
 * be re-parenthesized when CSS's left-to-right evaluation would otherwise
 * differ from the original JS grouping.
 */
function flattenBinary(
    j: JSCodeshift,
    node: any,
    spacingBinding: string,
    parent: {op: string; side: "left" | "right"} | null,
): Array<CalcPart> | null {
    if (node.type === "BinaryExpression") {
        const op = node.operator;
        if (!["+", "-", "*", "/"].includes(op)) {
            return null;
        }
        const left = flattenBinary(j, node.left, spacingBinding, {
            op,
            side: "left",
        });
        const right = flattenBinary(j, node.right, spacingBinding, {
            op,
            side: "right",
        });
        if (!left || !right) {
            return null;
        }
        const parts: Array<CalcPart> = [
            ...left,
            {kind: "literal", value: ` ${op} `},
            ...right,
        ];
        // The AST drops source-level parens, so we need to re-add them when
        // CSS's left-to-right same-precedence evaluation would change the
        // result. Without this, `(spacing.X + 4) * 2` flattens to
        // `${sizing.X} + 4px * 2` and CSS computes `X + (4px*2)` instead of
        // `(X + 4px) * 2`.
        if (parent && needsParens(op, parent.op, parent.side)) {
            return [
                {kind: "literal", value: "("},
                ...parts,
                {kind: "literal", value: ")"},
            ];
        }
        return parts;
    }

    const parentOp = parent?.op ?? null;

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

/**
 * Decide whether a child BinaryExpression's flattened segment must be wrapped
 * in parentheses when inlined into its parent's calc() expression.
 *
 * Returns true when the child operator's precedence is lower than the parent's
 * (e.g. `+` inside `*`), or when child and parent share precedence but the
 * parent is a non-associative operator (`-` or `/`) and the child sits on the
 * right — i.e. `a - (b + c)` ≠ `a - b + c`, and `a / (b * c)` ≠ `a / b * c`.
 */
function needsParens(
    childOp: string,
    parentOp: string,
    side: "left" | "right",
): boolean {
    const precedence = (op: string) =>
        op === "*" || op === "/" ? 2 : op === "+" || op === "-" ? 1 : 0;
    const childPrec = precedence(childOp);
    const parentPrec = precedence(parentOp);
    if (childPrec < parentPrec) {
        return true;
    }
    if (
        childPrec === parentPrec &&
        side === "right" &&
        (parentOp === "-" || parentOp === "/")
    ) {
        return true;
    }
    return false;
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

/**
 * Re-wraps a `\`calc(...)\`` template literal as `\`calc(-1 * (...))\``. Used
 * when a `UnaryExpression -` sits in front of an arithmetic expression that
 * `buildCalcTemplate` produced as `\`calc(... + ...)\``.
 *
 * Strips the inner `calc(`/`)` from the first/last quasi before wrapping so
 * the result is a single `calc(-1 * (... + ...))` rather than an unnecessary
 * `calc(-1 * (calc(... + ...)))`.
 */
function wrapTemplateInNegatedCalc(
    j: JSCodeshift,
    template: ReturnType<typeof j.templateLiteral>,
) {
    const quasis = template.quasis.slice();
    const first = quasis[0];
    const last = quasis[quasis.length - 1];

    const firstRaw = first.value.raw.replace(/^calc\(/, "");
    const firstCooked = (first.value.cooked ?? "").replace(/^calc\(/, "");
    const lastRaw = last.value.raw.replace(/\)$/, "");
    const lastCooked = (last.value.cooked ?? "").replace(/\)$/, "");

    if (quasis.length === 1) {
        // Shouldn't happen for any real arithmetic (we always have ≥1 spacing
        // expression → ≥2 quasis), but guard anyway: build the prefix and
        // suffix on a single quasi.
        quasis[0] = j.templateElement(
            {
                raw: "calc(-1 * (" + firstRaw + "))",
                cooked: "calc(-1 * (" + firstCooked + "))",
            },
            first.tail,
        );
    } else {
        quasis[0] = j.templateElement(
            {
                raw: "calc(-1 * (" + firstRaw,
                cooked: "calc(-1 * (" + firstCooked,
            },
            first.tail,
        );
        quasis[quasis.length - 1] = j.templateElement(
            {raw: lastRaw + "))", cooked: lastCooked + "))"},
            last.tail,
        );
    }

    return j.templateLiteral(quasis, template.expressions.slice());
}

/**
 * Add every `<spacingBinding>.<key>` MemberExpression found within `path` to
 * `target`. Used by both the "handled" set (paths transformed and removed
 * from the AST) and the "bailed" set (paths intentionally left alone so a
 * later pass can flag them with a TODO).
 */
function recordSpacingPaths(
    j: JSCodeshift,
    path: ASTPath<any>,
    spacingBinding: string,
    target: WeakSet<object>,
) {
    j(path)
        .find(j.MemberExpression)
        .forEach((m) => {
            if (isSpacingMember(m.value, spacingBinding)) {
                target.add(m.value);
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
