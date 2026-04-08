import {ESLintUtils} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds = "noCustomTabRole";

export default createRule<Options, MessageIds>({
    name: "no-custom-tab-role",
    meta: {
        docs: {
            description:
                'Disallow role="tab" in favor of the Wonder Blocks ResponsiveTabs component',
            recommended: true,
        },
        messages: {
            noCustomTabRole:
                'Avoid using role="tab". Use the Wonder Blocks ResponsiveTabs component instead of a custom tabs implementation.',
        },
        schema: [],
        type: "suggestion",
    },
    create(context) {
        return {
            JSXAttribute(node) {
                if (
                    node.name.type === "JSXIdentifier" &&
                    node.name.name === "role" &&
                    node.value?.type === "Literal" &&
                    node.value.value === "tab"
                ) {
                    context.report({
                        node,
                        messageId: "noCustomTabRole",
                    });
                }
            },
        };
    },
    defaultOptions: [],
});
