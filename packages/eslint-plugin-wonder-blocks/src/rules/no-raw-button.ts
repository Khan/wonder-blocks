import {ESLintUtils} from "@typescript-eslint/utils";

import type {TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds = "noRawButton";

export default createRule<Options, MessageIds>({
    name: "no-raw-button",
    meta: {
        docs: {
            description:
                'Disallow raw <button> elements and addStyle("button") components in favor of Wonder Blocks Button or IconButton.',
            recommended: true,
        },
        messages: {
            noRawButton:
                "Avoid '{{element}}'. Use Button or IconButton from Wonder Blocks for consistent focus styles, keyboard navigation, and design system behavior.",
        },
        schema: [],
        type: "suggestion",
    },
    create(context) {
        // Tracks variable names assigned via addStyle("button") in this file.
        const styledButtonNames = new Set<string>();

        return {
            // Detect: const StyledButton = addStyle("button")
            VariableDeclarator(node: TSESTree.VariableDeclarator) {
                if (
                    node.id.type !== "Identifier" ||
                    node.init?.type !== "CallExpression"
                ) {
                    return;
                }
                const call = node.init;
                if (
                    call.callee.type === "Identifier" &&
                    call.callee.name === "addStyle" &&
                    call.arguments.length >= 1 &&
                    call.arguments[0].type === "Literal" &&
                    call.arguments[0].value === "button"
                ) {
                    styledButtonNames.add(node.id.name);
                }
            },

            JSXOpeningElement(node: TSESTree.JSXOpeningElement) {
                if (node.name.type !== "JSXIdentifier") {
                    return;
                }
                const name = node.name.name;

                if (name === "button") {
                    context.report({
                        node,
                        messageId: "noRawButton",
                        data: {element: "<button>"},
                    });
                    return;
                }

                if (styledButtonNames.has(name)) {
                    context.report({
                        node,
                        messageId: "noRawButton",
                        data: {element: `<${name}>`},
                    });
                }
            },
        };
    },
    defaultOptions: [],
});
