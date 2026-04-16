import {TSESTree} from "@typescript-eslint/utils";

/**
 * Inline/phrasing-content tags. When BodyText uses one of these it renders as
 * an inline element rather than a block-level <p>.
 */
export const INLINE_BODY_TEXT_TAGS = new Set([
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
 * Block-level container tags. When BodyText uses one of these it renders as a
 * block container rather than <p>, so it can legitimately hold block children.
 */
export const BLOCK_CONTAINER_TAGS = new Set([
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
export const WB_FORM_COMPONENTS = new Set(["Choice", "Checkbox", "Radio"]);

/**
 * Wonder Blocks Button component names. Buttons are inline contexts and
 * cannot contain block-level elements like <p>.
 */
export const WB_BUTTON_COMPONENTS = new Set(["Button", "ActivityButton"]);

/**
 * HTML heading element names.
 */
export const HTML_HEADING_ELEMENTS = new Set([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
]);

/**
 * Wonder Blocks Heading component names. These render as block-level heading
 * elements (h1–h5) and cannot be children of a <p>.
 */
export const WB_HEADING_COMPONENTS = new Set([
    "Heading",
    "HeadingLarge",
    "HeadingMedium",
    "HeadingSmall",
    "HeadingXSmall",
]);

/**
 * Returns the string value of a JSX attribute if it is a simple string
 * literal, otherwise null. Returns null for dynamic expressions.
 */
export function getAttributeStringValue(
    openingElement: TSESTree.JSXOpeningElement,
    attributeName: string,
): string | null {
    const attr = openingElement.attributes.find(
        (a): a is TSESTree.JSXAttribute =>
            a.type === "JSXAttribute" &&
            a.name.type === "JSXIdentifier" &&
            (a.name as TSESTree.JSXIdentifier).name === attributeName,
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
        return String((attr.value.expression as TSESTree.Literal).value);
    }

    return null;
}
