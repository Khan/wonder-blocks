import {ESLintUtils, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [{maxChildren?: number}?];
type MessageIds = "tooManyChildren";

const DEFAULT_MAX_CHILDREN = 5;

export default createRule<Options, MessageIds>({
    name: "no-excessive-bodytext-children",
    meta: {
        type: "suggestion",
        docs: {
            description:
                "Disallow BodyText with more direct JSX element children than a configurable threshold",
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

                if (
                    openingElement.name.type !== "JSXIdentifier" ||
                    openingElement.name.name !== "BodyText"
                ) {
                    return;
                }

                const elementChildren = node.children.filter(
                    (child): child is TSESTree.JSXElement =>
                        child.type === "JSXElement",
                );

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
