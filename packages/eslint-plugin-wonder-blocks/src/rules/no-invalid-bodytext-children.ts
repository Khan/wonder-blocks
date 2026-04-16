import {ESLintUtils, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [{maxChildren?: number}?];
type MessageIds = "viewChild" | "blockChild" | "tooManyChildren";

const DEFAULT_MAX_CHILDREN = 5;

/**
 * Inline tags that make BodyText safe to use in inline/restricted contexts.
 * When BodyText uses one of these, it renders as an inline element.
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
 * HTML elements that are block-level and cannot appear inside a <p>.
 * https://html.spec.whatwg.org/#phrasing-content
 */
const HTML_BLOCK_ELEMENTS = new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "dd",
    "details",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "summary",
    "table",
    "ul",
]);

/**
 * Wonder Blocks components that render as block-level elements and therefore
 * cannot be children of a <p>.
 */
const WB_BLOCK_COMPONENTS = new Set([
    "Heading",
    "HeadingLarge",
    "HeadingMedium",
    "HeadingSmall",
    "HeadingXSmall",
]);

/**
 * Returns the string value of a JSX attribute if it's a simple string
 * literal, otherwise null.
 */
function getAttributeStringValue(
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

export default createRule<Options, MessageIds>({
    name: "no-invalid-bodytext-children",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow block-level elements and excessive children inside BodyText",
            recommended: true,
        },
        schema: [
            {
                type: "object",
                properties: {
                    maxChildren: {
                        type: "number",
                        minimum: 1,
                        description: `Maximum number of direct JSX element children allowed in BodyText (default: ${DEFAULT_MAX_CHILDREN})`,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            viewChild:
                "BodyText should not wrap View. View renders as <div>, a block-level element that cannot be a child of <p>. Remove BodyText and use View directly for layout.",
            blockChild:
                'BodyText renders as <p> by default, which cannot contain {{childName}} (a block-level element). Add tag="div" to BodyText to allow block children, or restructure to remove the block element.',
            tooManyChildren:
                "BodyText has {{count}} direct child elements (max: {{max}}). BodyText is for text content — consider using View or a block container for complex layouts.",
        },
    },
    create(context) {
        const maxChildren =
            context.options[0]?.maxChildren ?? DEFAULT_MAX_CHILDREN;

        return {
            JSXElement(node) {
                const openingElement = node.openingElement;

                // Only check BodyText components.
                if (
                    openingElement.name.type !== "JSXIdentifier" ||
                    openingElement.name.name !== "BodyText"
                ) {
                    return;
                }

                const tagValue = getAttributeStringValue(openingElement, "tag");

                // BodyText renders as <p> when no tag is set, or when tag="p".
                // In that case, block-level children create invalid HTML.
                const rendersAsParagraph =
                    tagValue === null ||
                    tagValue === "p" ||
                    INLINE_BODY_TEXT_TAGS.has(tagValue);

                // Direct JSXElement children only (excludes text nodes and
                // expression containers).
                const elementChildren = node.children.filter(
                    (child): child is TSESTree.JSXElement =>
                        child.type === "JSXElement",
                );

                for (const child of elementChildren) {
                    const childOpening = child.openingElement;

                    if (childOpening.name.type !== "JSXIdentifier") {
                        continue;
                    }

                    const childName = childOpening.name.name;

                    // View always renders as <div> — always a block-level child.
                    if (childName === "View") {
                        context.report({
                            node: childOpening,
                            messageId: "viewChild",
                        });
                        continue;
                    }

                    // When BodyText renders as <p>, block-level HTML elements
                    // and block WB components are invalid children.
                    if (rendersAsParagraph) {
                        if (
                            HTML_BLOCK_ELEMENTS.has(childName) ||
                            WB_BLOCK_COMPONENTS.has(childName)
                        ) {
                            context.report({
                                node: childOpening,
                                messageId: "blockChild",
                                data: {childName},
                            });
                        }
                    }
                }

                // Warn when there are too many direct child elements — BodyText
                // is for text content, not layout.
                if (elementChildren.length > maxChildren) {
                    context.report({
                        node: openingElement,
                        messageId: "tooManyChildren",
                        data: {
                            count: String(elementChildren.length),
                            max: String(maxChildren),
                        },
                    });
                }
            },
        };
    },
    defaultOptions: [],
});
