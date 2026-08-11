import {ESLintUtils} from "@typescript-eslint/utils";

import type {TSESTree} from "@typescript-eslint/utils";

import {isMirroredIconIdentifier} from "../data/mirrored-icon-names";
import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds = "noRtlIconSwap";

/**
 * Whether the expression looks like an RTL (or LTR-vs-RTL) condition used to
 * pick between icons — e.g. `RequestInfo.isRTL`, `isRTL`, `dir === "rtl"`.
 */
function refersToRtl(node: TSESTree.Node): boolean {
    switch (node.type) {
        case "Identifier":
            return (
                node.name === "isRTL" ||
                node.name === "isRtl" ||
                node.name === "rtl" ||
                node.name === "RTL"
            );
        case "MemberExpression": {
            if (
                !node.computed &&
                node.property.type === "Identifier" &&
                (node.property.name === "isRTL" ||
                    node.property.name === "isRtl" ||
                    node.property.name === "rtl" ||
                    node.property.name === "RTL")
            ) {
                return true;
            }
            if (
                node.computed &&
                node.property.type === "Literal" &&
                (node.property.value === "isRTL" ||
                    node.property.value === "isRtl" ||
                    node.property.value === "rtl" ||
                    node.property.value === "RTL")
            ) {
                return true;
            }
            return refersToRtl(node.object);
        }
        case "UnaryExpression":
            return refersToRtl(node.argument);
        case "BinaryExpression":
        case "LogicalExpression":
            return refersToRtl(node.left) || refersToRtl(node.right);
        case "Literal":
            return node.value === "rtl" || node.value === "RTL";
        case "CallExpression":
            return refersToRtl(node.callee);
        case "ChainExpression":
            return refersToRtl(node.expression);
        default:
            return false;
    }
}

/**
 * Collects identifier names from a ternary branch that look like icon bindings.
 * Supports bare identifiers and simple member access (`icons.caretLeft`).
 */
function collectIconIdentifiers(node: TSESTree.Node, out: string[]): void {
    switch (node.type) {
        case "Identifier":
            if (isMirroredIconIdentifier(node.name)) {
                out.push(node.name);
            }
            return;
        case "MemberExpression":
            if (
                !node.computed &&
                node.property.type === "Identifier" &&
                isMirroredIconIdentifier(node.property.name)
            ) {
                out.push(node.property.name);
            }
            return;
        case "TSAsExpression":
        case "TSTypeAssertion":
        case "TSNonNullExpression":
            collectIconIdentifiers(node.expression, out);
            return;
        case "ChainExpression":
            collectIconIdentifiers(node.expression, out);
            return;
        default:
            return;
    }
}

export default createRule<Options, MessageIds>({
    name: "no-rtl-icon-swap",
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow RTL ternaries that swap Phosphor icons on the PhosphorIcon mirroring whitelist — those swaps double-flip once auto-mirroring is enabled.",
            recommended: true,
        },
        messages: {
            noRtlIconSwap:
                "Do not choose '{{icon}}' based on RTL. Pass the LTR Phosphor glyph; PhosphorIcon mirrors whitelist icons automatically. To change which icons mirror, update mirrored-icon-names.ts in wonder-blocks-icon (and the eslint-plugin copy).",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            ConditionalExpression(node: TSESTree.ConditionalExpression) {
                if (!refersToRtl(node.test)) {
                    return;
                }

                const icons: string[] = [];
                collectIconIdentifiers(node.consequent, icons);
                collectIconIdentifiers(node.alternate, icons);

                if (icons.length === 0) {
                    return;
                }

                // Report once per distinct identifier so a left/right pair
                // surfaces clearly without duplicate noise on the same name.
                const seen = new Set<string>();
                for (const icon of icons) {
                    if (seen.has(icon)) {
                        continue;
                    }
                    seen.add(icon);
                    context.report({
                        node,
                        messageId: "noRtlIconSwap",
                        data: {icon},
                    });
                }
            },
        };
    },
});
