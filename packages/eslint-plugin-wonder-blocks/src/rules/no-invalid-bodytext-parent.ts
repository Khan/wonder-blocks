// --- Self-contained rule types (avoids @types/eslint version conflicts) ---

/** Minimal shape of an ESLint rule fix. */
interface RuleFix {
    range: [number, number];
    text: string;
}

/** Minimal shape of an ESLint rule fixer. */
interface RuleFixer {
    replaceText(node: {range?: [number, number]}, text: string): RuleFix;
    insertTextAfter(node: {range?: [number, number]}, text: string): RuleFix;
}

/** Minimal shape of an ESLint rule report descriptor. */
interface ReportDescriptor {
    node: unknown;
    messageId: string;
    data?: Record<string, string>;
    fix?: (fixer: RuleFixer) => RuleFix;
}

/** Minimal shape of an ESLint rule context. */
interface RuleContext {
    report(descriptor: ReportDescriptor): void;
}

/** The shape of an exported ESLint rule module. */
export interface RuleModule {
    meta?: {
        type?: string;
        docs?: Record<string, unknown>;
        fixable?: string;
        schema?: unknown[];
        messages?: Record<string, string>;
    };
    create(context: RuleContext): Record<string, (node: unknown) => void>;
}

// --- Minimal JSX AST types (not in ESTree spec) ---

/** Base shape shared by all AST nodes as seen by ESLint rule visitors. */
type ASTNode = {
    type: string;
    parent?: ASTNode;
    range?: [number, number];
};

type JSXIdentifier = ASTNode & {
    type: "JSXIdentifier";
    name: string;
};

type JSXNamespacedName = ASTNode & {
    type: "JSXNamespacedName";
};

type JSXMemberExpression = ASTNode & {
    type: "JSXMemberExpression";
};

type Literal = ASTNode & {
    type: "Literal";
    value: string | number | boolean | null | bigint | RegExp;
};

type JSXEmptyExpression = ASTNode & {
    type: "JSXEmptyExpression";
};

type JSXExpressionContainer = ASTNode & {
    type: "JSXExpressionContainer";
    expression: ASTNode | JSXEmptyExpression;
};

type JSXAttribute = ASTNode & {
    type: "JSXAttribute";
    name: JSXIdentifier | JSXNamespacedName;
    value: Literal | JSXExpressionContainer | null;
};

type JSXSpreadAttribute = ASTNode & {
    type: "JSXSpreadAttribute";
};

type JSXOpeningElement = ASTNode & {
    type: "JSXOpeningElement";
    name: JSXIdentifier | JSXMemberExpression | JSXNamespacedName;
    attributes: Array<JSXAttribute | JSXSpreadAttribute>;
    parent: JSXElement;
};

type JSXElement = ASTNode & {
    type: "JSXElement";
    openingElement: JSXOpeningElement;
    parent?: ASTNode;
};

// ---------------------------------------------------------------------------

/**
 * Inline tags that make BodyText safe to nest inside inline/interactive
 * contexts (e.g., inside a button, label, or paragraph element).
 */
const INLINE_BODY_TEXT_TAGS = new Set([
    "span",
    "sup",
    "sub",
    "em",
    "strong",
    "a",
    "abbr",
    "code",
    "kbd",
    "mark",
    "cite",
    "q",
    "s",
    "u",
    "b",
    "i",
    "small",
    "del",
    "ins",
    "time",
    "var",
    "samp",
    "dfn",
]);

/**
 * Block-level container tags. When an outer BodyText uses one of these, it
 * can contain an inner BodyText that renders as <p> without creating invalid
 * HTML nesting.
 */
const BLOCK_CONTAINER_TAGS = new Set([
    "div",
    "section",
    "article",
    "aside",
    "main",
    "header",
    "footer",
    "nav",
    "blockquote",
    "figure",
    "figcaption",
    "details",
    "summary",
]);

/**
 * Wonder Blocks form components that internally render a <label> or similar
 * inline-context element around their content.
 */
const WB_FORM_COMPONENTS = new Set(["Choice", "Checkbox", "Radio"]);

/**
 * Wonder Blocks Button component names. Buttons are inline contexts and
 * cannot contain block-level elements like <p>.
 */
const WB_BUTTON_COMPONENTS = new Set(["Button", "ActivityButton"]);

/**
 * Wonder Blocks Heading component names. Headings are block-level but
 * cannot contain other block-level elements like <p>.
 */
const WB_HEADING_COMPONENTS = new Set([
    "Heading",
    "HeadingLarge",
    "HeadingMedium",
    "HeadingSmall",
    "HeadingXSmall",
]);

/**
 * HTML heading element names.
 */
const HTML_HEADING_ELEMENTS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

/**
 * Returns the string value of a JSX attribute if it's a simple string
 * literal, otherwise null.
 */
function getAttributeStringValue(
    openingElement: JSXOpeningElement,
    attributeName: string,
): string | null {
    const attr = openingElement.attributes.find(
        (a): a is JSXAttribute =>
            a.type === "JSXAttribute" &&
            a.name.type === "JSXIdentifier" &&
            a.name.name === attributeName,
    );

    if (!attr?.value) {
        return null;
    }

    if (attr.value.type === "Literal") {
        return String(attr.value.value);
    }

    if (
        attr.value.type === "JSXExpressionContainer" &&
        attr.value.expression.type === "Literal"
    ) {
        return String((attr.value.expression as Literal).value);
    }

    return null;
}

/**
 * Returns true if this BodyText uses an inline `tag` prop, making it safe
 * to place inside any of the restricted parent elements.
 */
function hasInlineTag(openingElement: JSXOpeningElement): boolean {
    const tag = getAttributeStringValue(openingElement, "tag");
    return tag !== null && INLINE_BODY_TEXT_TAGS.has(tag);
}

/**
 * Walks up the AST from a JSXOpeningElement to find the nearest *ancestor*
 * JSXElement (i.e., skips the element's own JSXElement wrapper).
 */
function getNearestAncestorJSXElement(
    openingElement: JSXOpeningElement,
): JSXElement | null {
    // openingElement.parent is the JSXElement for openingElement's own element.
    // We need to go one level higher to start searching for an ancestor.
    let current: ASTNode | undefined = openingElement.parent.parent;
    while (current != null) {
        if (current.type === "JSXElement") {
            return current as JSXElement;
        }
        current = current.parent;
    }
    return null;
}

/**
 * Builds the auto-fix that sets tag="span" on the BodyText element.
 * If a `tag` prop already exists (with a non-inline value), its value is
 * replaced. Otherwise, tag="span" is appended after the last attribute.
 */
function buildSpanTagFix(
    fixer: RuleFixer,
    openingElement: JSXOpeningElement,
): RuleFix {
    const existingTagAttr = openingElement.attributes.find(
        (a): a is JSXAttribute =>
            a.type === "JSXAttribute" &&
            a.name.type === "JSXIdentifier" &&
            (a.name as JSXIdentifier).name === "tag",
    );

    if (existingTagAttr?.value) {
        return fixer.replaceText(existingTagAttr.value, '"span"');
    }

    const lastAttr =
        openingElement.attributes[openingElement.attributes.length - 1];
    return lastAttr
        ? fixer.insertTextAfter(lastAttr, ' tag="span"')
        : fixer.insertTextAfter(openingElement.name, ' tag="span"');
}

export const noInvalidBodyTextParent: RuleModule = {
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow BodyText with a block-level tag (default <p>) inside elements that cannot contain block-level content",
            category: "Possible Errors",
            recommended: true,
            url: "https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/no-invalid-bodytext-parent.md",
        },
        fixable: "code",
        schema: [],
        messages: {
            nestedInFormComponent:
                'BodyText renders as <p> by default. Add tag="span" to use BodyText inside {{componentName}}.',
            nestedInButton:
                'BodyText renders as <p> by default. Add tag="span" to use BodyText inside a button element.',
            nestedInParagraph:
                'BodyText renders as <p> by default, which cannot be nested inside another <p>. Add tag="span" to use BodyText here.',
            nestedInLabel:
                'BodyText renders as <p> by default. Add tag="span" to use BodyText inside a label element.',
            nestedInBodyText:
                'BodyText renders as <p> by default, which cannot be nested inside another BodyText that also renders as <p>. Add tag="div" to the outer BodyText to allow block children, or add tag="span" to this BodyText to make it inline.',
            nestedInHeading:
                'BodyText renders as <p> by default, which cannot be nested inside a heading element. Add an inline tag (e.g., tag="sup" or tag="span") to use BodyText inside a heading.',
        },
    },

    create(context: RuleContext) {
        return {
            JSXOpeningElement(rawNode: unknown) {
                const node = rawNode as JSXOpeningElement;

                // Only check BodyText components.
                if (
                    node.name.type !== "JSXIdentifier" ||
                    node.name.name !== "BodyText"
                ) {
                    return;
                }

                // If BodyText explicitly uses an inline tag, it's safe
                // in any of the restricted parent contexts.
                if (hasInlineTag(node)) {
                    return;
                }

                const ancestorJSXElement = getNearestAncestorJSXElement(node);
                if (!ancestorJSXElement) {
                    return;
                }

                const parentOpening = ancestorJSXElement.openingElement;
                const parentName =
                    parentOpening.name.type === "JSXIdentifier"
                        ? parentOpening.name.name
                        : null;

                if (!parentName) {
                    return;
                }

                const fix = (fixer: RuleFixer) => buildSpanTagFix(fixer, node);

                // --- WB Form components (Choice, Checkbox, Radio) ---
                if (WB_FORM_COMPONENTS.has(parentName)) {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInFormComponent",
                        data: {componentName: parentName},
                        fix,
                    });
                    return;
                }

                // --- WB Button components ---
                if (WB_BUTTON_COMPONENTS.has(parentName)) {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInButton",
                        fix,
                    });
                    return;
                }

                // --- HTML <button> or StyledButton ---
                if (parentName === "button" || parentName === "StyledButton") {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInButton",
                        fix,
                    });
                    return;
                }

                // --- HTML <p> or StyledP ---
                if (parentName === "p" || parentName === "StyledP") {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInParagraph",
                        fix,
                    });
                    return;
                }

                // --- HTML <label> or StyledLabel ---
                if (parentName === "label" || parentName === "StyledLabel") {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInLabel",
                        fix,
                    });
                    return;
                }

                // --- BodyText nested inside another BodyText ---
                if (parentName === "BodyText") {
                    // It's OK if the outer BodyText uses a block-container tag
                    // like tag="div", which can contain <p> elements.
                    const outerTag = getAttributeStringValue(
                        parentOpening,
                        "tag",
                    );
                    const outerIsBlockContainer =
                        outerTag !== null && BLOCK_CONTAINER_TAGS.has(outerTag);

                    if (!outerIsBlockContainer) {
                        context.report({
                            node: rawNode,
                            messageId: "nestedInBodyText",
                            fix,
                        });
                    }
                    return;
                }

                // --- WB Heading components ---
                if (WB_HEADING_COMPONENTS.has(parentName)) {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInHeading",
                        fix,
                    });
                    return;
                }

                // --- HTML heading elements (h1–h6) ---
                if (HTML_HEADING_ELEMENTS.has(parentName)) {
                    context.report({
                        node: rawNode,
                        messageId: "nestedInHeading",
                        fix,
                    });
                    return;
                }
            },
        };
    },
};
