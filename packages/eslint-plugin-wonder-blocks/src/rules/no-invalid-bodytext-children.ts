import {ESLintUtils, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";
import {
    BLOCK_CONTAINER_TAGS,
    HTML_BLOCK_ELEMENTS,
    INLINE_BODY_TEXT_TAGS,
    WB_HEADING_COMPONENTS,
    getAttributeStringValue,
} from "./jsx-utils";

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

export default createRule<Options, MessageIds>({
    name: "no-invalid-bodytext-children",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow block-level elements and excessive children inside BodyText",
            recommended: false,
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
                'View renders as <{{tag}}>, which is block-level and cannot be a child of <{{outerTag}}>. Add tag="span" to View to use it inline, or add tag="div" to the outer BodyText to allow block children.',
            divChild:
                'BodyText renders as <{{outerTag}}>, which cannot contain a <div>. Add tag="div" to the outer BodyText to allow block children, or remove the <div>.',
            paragraphChild:
                'BodyText renders as <{{outerTag}}>. {{childName}} cannot be a child of <{{outerTag}}>{{childNote}}. Add tag="span" to the inner element to make it inline, or tag="div" to the outer BodyText.',
            blockChild:
                'BodyText renders as <{{outerTag}}>, which cannot contain {{childName}} (a block-level element). Add tag="div" to BodyText to allow block children, or remove the block element.',
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

                // Determine the tag BodyText renders as. Absence of a tag prop
                // means BodyText defaults to <p>.
                const outerTag =
                    getAttributeStringValue(openingElement, "tag") ?? "p";
                // Block-container tags can hold flow content (including block
                // children). Phrasing-content tags (<p>, <span>, <em>, …)
                // cannot contain block-level elements.
                const outerIsBlockContainer =
                    BLOCK_CONTAINER_TAGS.has(outerTag);

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

                    // Block-level children are only invalid when the outer
                    // BodyText is a phrasing-content element. Block containers
                    // (div, section, …) can hold anything.
                    if (outerIsBlockContainer) {
                        continue;
                    }

                    // View has a tag prop that controls its rendered element.
                    // If the tag is an inline element it's valid phrasing
                    // content inside <p>; otherwise it defaults to <div>.
                    if (childName === "View") {
                        const viewTag = getAttributeStringValue(
                            childOpening,
                            "tag",
                        );
                        if (
                            viewTag !== null &&
                            INLINE_BODY_TEXT_TAGS.has(viewTag)
                        ) {
                            continue;
                        }
                        context.report({
                            node: childOpening,
                            messageId: "viewChild",
                            data: {tag: viewTag ?? "div", outerTag},
                        });
                        continue;
                    }

                    // <div> gets its own message for documentation clarity.
                    if (childName === "div") {
                        context.report({
                            node: childOpening,
                            messageId: "divChild",
                            data: {outerTag},
                        });
                        continue;
                    }

                    // <p> gets its own message because the source of the
                    // nested-paragraph warning can otherwise be unclear.
                    if (childName === "p") {
                        context.report({
                            node: childOpening,
                            messageId: "paragraphChild",
                            data: {childName: "p", childNote: "", outerTag},
                        });
                        continue;
                    }

                    if (childName === "BodyText") {
                        // no-invalid-bodytext-parent already handles BodyText
                        // nested in BodyText (with an autofix). Skip here to
                        // avoid duplicate errors on the same node.
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
                            data: {childName, outerTag},
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
