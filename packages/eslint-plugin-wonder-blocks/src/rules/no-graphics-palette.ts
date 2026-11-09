import {ESLintUtils} from "@typescript-eslint/utils";

import type {TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";
import {
    findImportedBinding,
    getStaticKeyName,
    getStaticPropertyName,
} from "./import-utils";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds = "noGraphicsPalette" | "noGraphicsPaletteGeneric";

const TOKENS_PACKAGE = "@khanacademy/wonder-blocks-tokens";

// The name of the palette export in the tokens package. Keep this the only
// place the name is spelled out so that a rename is a one-line change.
const PALETTE_EXPORT = "graphicsPalette";

// The prefix of the CSS variables that the palette tokens resolve to, e.g.
// `var(--wb-graphicsPalette-blue_30)`. Writing the variable by hand gets
// around the import check, so string literals are checked for it too.
// eslint-disable-next-line @khanacademy/wonder-blocks/no-graphics-palette -- This is the prefix the rule looks for
const PALETTE_CSS_VAR_PREFIX = "--wb-graphicsPalette-";

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Matches a palette CSS variable and captures the token name.
const PALETTE_CSS_VAR_RE = new RegExp(
    `${escapeRegExp(PALETTE_CSS_VAR_PREFIX)}([A-Za-z0-9_]*)`,
    "g",
);

const ADVICE =
    "Prefer a `semanticColor` token, which adapts to the current theme. If this color must stay the same in every theme (e.g. illustrations), disable this rule with a comment explaining why.";

export default createRule<Options, MessageIds>({
    name: "no-graphics-palette",
    meta: {
        docs: {
            description: `Disallow \`${PALETTE_EXPORT}\` color tokens, which stay the same in every theme. Prefer themable \`semanticColor\` tokens.`,
            recommended: false,
        },
        messages: {
            noGraphicsPalette: `\`${PALETTE_EXPORT}.{{name}}\` is a color that stays the same in every theme. ${ADVICE}`,
            noGraphicsPaletteGeneric: `\`${PALETTE_EXPORT}\` colors stay the same in every theme. ${ADVICE}`,
        },
        schema: [],
        type: "suggestion",
    },
    create(context) {
        const sourceCode = context.sourceCode;

        function reportGeneric(node: TSESTree.Node) {
            context.report({node, messageId: "noGraphicsPaletteGeneric"});
        }

        function reportToken(node: TSESTree.Node, name: string | null) {
            if (name === null) {
                reportGeneric(node);
                return;
            }
            context.report({
                node,
                messageId: "noGraphicsPalette",
                data: {name},
            });
        }

        /**
         * Report one use of the palette object. `node` is an expression that
         * evaluates to the palette: either the imported identifier or a
         * namespace member like `tokens.graphicsPalette`.
         */
        function reportPaletteUse(node: TSESTree.Node) {
            const parent = node.parent;

            // graphicsPalette.red_30 / graphicsPalette["red_30"]
            if (parent?.type === "MemberExpression" && parent.object === node) {
                reportToken(parent, getStaticPropertyName(parent));
                return;
            }

            // const {red_30} = graphicsPalette;
            // Report the destructuring once; the new variables aren't
            // followed.
            if (
                parent?.type === "VariableDeclarator" &&
                parent.init === node &&
                parent.id.type === "ObjectPattern"
            ) {
                const {properties} = parent.id;
                reportToken(
                    parent.id,
                    properties.length === 1
                        ? getStaticKeyName(properties[0])
                        : null,
                );
                return;
            }

            // Any other use of the whole object: passing it as an argument,
            // spreading it, assigning it, re-exporting it, etc.
            reportGeneric(node);
        }

        /**
         * Report palette uses reached through a namespace import:
         * `tokens.graphicsPalette.red_30` or
         * `const {graphicsPalette} = tokens`.
         */
        function checkNamespaceReference(identifier: TSESTree.Node) {
            const parent = identifier.parent;

            if (
                parent?.type === "MemberExpression" &&
                parent.object === identifier &&
                getStaticPropertyName(parent) === PALETTE_EXPORT
            ) {
                reportPaletteUse(parent);
                return;
            }

            if (
                parent?.type === "VariableDeclarator" &&
                parent.init === identifier &&
                parent.id.type === "ObjectPattern"
            ) {
                for (const property of parent.id.properties) {
                    if (getStaticKeyName(property) === PALETTE_EXPORT) {
                        reportGeneric(property);
                    }
                }
            }
        }

        /**
         * Report each palette CSS variable written out in a string, e.g.
         * `"var(--wb-graphicsPalette-blue_30)"`.
         */
        function checkString(node: TSESTree.Node, value: string) {
            for (const match of value.matchAll(PALETTE_CSS_VAR_RE)) {
                reportToken(node, match[1] || null);
            }
        }

        return {
            Program() {
                const binding = findImportedBinding(
                    sourceCode,
                    TOKENS_PACKAGE,
                    PALETTE_EXPORT,
                );

                for (const variable of binding.named) {
                    for (const reference of variable.references) {
                        reportPaletteUse(reference.identifier);
                    }
                }

                for (const variable of binding.namespace) {
                    for (const reference of variable.references) {
                        checkNamespaceReference(reference.identifier);
                    }
                }
            },

            // "var(--wb-graphicsPalette-blue_30)", including JSX attributes
            // like fill="var(--wb-graphicsPalette-blue_30)".
            Literal(node) {
                if (typeof node.value === "string") {
                    checkString(node, node.value);
                }
            },

            // `2px solid var(--wb-graphicsPalette-red_20)`
            TemplateElement(node) {
                checkString(node, node.value.cooked ?? node.value.raw);
            },

            // export {graphicsPalette} from "@khanacademy/wonder-blocks-tokens";
            // This doesn't create a local variable, so it isn't found above.
            ExportNamedDeclaration(node) {
                if (node.source?.value !== TOKENS_PACKAGE) {
                    return;
                }
                for (const specifier of node.specifiers) {
                    const local = specifier.local;
                    const localName =
                        local.type === "Identifier" ? local.name : local.value;
                    if (localName === PALETTE_EXPORT) {
                        reportGeneric(specifier);
                    }
                }
            },
        };
    },
    defaultOptions: [],
});
