import {ESLintUtils, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [{maxChildren?: number}?];
type MessageIds =
    | "viewChild"
    | "divChild"
    | "paragraphChild"
    | "blockChild"
    | "tooManyChildren";

const DEFAULT_MAX_CHILDREN = 5;

/**
 * HTML elements that are block-level and therefore cannot appear inside a <p>.
 * Excludes <div> and <p> which have their own dedicated message IDs.
 * https://html.spec.whatwg.org/#phrasing-content
 */
const HTML_BLOCK_ELEMENTS = new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "dd",
    "details",
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
    "pre",
    "section",
    "summary",
    "table",
    "ul",
]);

/**
 * Wonder Blocks components that render as block-level heading elements and
 * therefore cannot be children of a <p>.
 */
const WB_HEADING_COMPONENTS = new Set([
    "Heading",
    "HeadingLarge",
    "HeadingMedium",
    "HeadingSmall",
    "HeadingXSmall",
]);

/**
 * Returns the string value of a JSX attribute if it is a simple string
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

/**
 * Returns true when the BodyText opening element has no tag prop or a tag prop
 * that is not an inline/phrasing-content value, meaning it will render as <p>.
 *
 * Block-container tags (div, section, …) also return false here because a
 * block-level BodyText can legitimately contain block children.
 */
function rendersAsParagraph(
    openingElement: TSESTree.JSXOpeningElement,
): boolean {
    const tag = getAttributeStringValue(openingElement, "tag");
    // No tag → defaults to <p>.
    // tag="p" → explicitly <p>.
    // Any inline or block-container tag → not a paragraph.
    return tag === null || tag === "p";
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
                "BodyText should not wrap View. View renders as <div>, which is block-level and cannot be a child of <p>. Remove BodyText and use View directly for layout.",
            divChild:
                'BodyText renders as <p> by default, which cannot contain a <div>. Add tag="div" to the outer BodyText to allow block children, or remove the <div>.',
            paragraphChild:
                'BodyText renders as <p> by default. {{childName}} cannot be a child of <p>{{childNote}}. Add tag="span" to the inner element to make it inline, or tag="div" to the outer BodyText.',
            blockChild:
                'BodyText renders as <p> by default, which cannot contain {{childName}} (a block-level element). Add tag="div" to BodyText to allow block children, or remove the block element.',
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

                const outerRendersAsParagraph =
                    rendersAsParagraph(openingElement);

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

                    // View always renders as <div> — always warn regardless of
                    // the outer BodyText's tag.
                    if (childName === "View") {
                        context.report({
                            node: childOpening,
                            messageId: "viewChild",
                        });
                        continue;
                    }

                    // The remaining checks only apply when the outer BodyText
                    // renders as <p> (no tag prop, or tag="p").
                    if (!outerRendersAsParagraph) {
                        continue;
                    }

                    // <div> gets its own message for documentation clarity.
                    if (childName === "div") {
                        context.report({
                            node: childOpening,
                            messageId: "divChild",
                        });
                        continue;
                    }

                    // <p> and BodyText that renders as <p> get their own
                    // message because the source of the nested-<p> warning
                    // can otherwise be unclear.
                    if (childName === "p") {
                        context.report({
                            node: childOpening,
                            messageId: "paragraphChild",
                            data: {childName: "p", childNote: ""},
                        });
                        continue;
                    }

                    if (childName === "BodyText") {
                        // Only warn if the inner BodyText also renders as <p>
                        // (i.e. it doesn't have an inline tag set).
                        if (rendersAsParagraph(childOpening)) {
                            context.report({
                                node: childOpening,
                                messageId: "paragraphChild",
                                data: {
                                    childName: "BodyText",
                                    childNote:
                                        " (BodyText also renders as <p> by default)",
                                },
                            });
                        }
                        continue;
                    }

                    // All other block-level HTML elements and WB heading
                    // components.
                    if (
                        HTML_BLOCK_ELEMENTS.has(childName) ||
                        WB_HEADING_COMPONENTS.has(childName)
                    ) {
                        context.report({
                            node: childOpening,
                            messageId: "blockChild",
                            data: {childName},
                        });
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
