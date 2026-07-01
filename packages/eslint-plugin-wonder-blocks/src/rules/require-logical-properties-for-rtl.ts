import {ESLintUtils} from "@typescript-eslint/utils";

import type {TSESLint, TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

// Physical → logical property map.
// Reference: https://adrianroselli.com/2019/11/css-logical-properties.html
const propertyReplacements: Record<string, string> = {
    marginLeft: "marginInlineStart",
    marginRight: "marginInlineEnd",
    marginTop: "marginBlockStart",
    marginBottom: "marginBlockEnd",
    paddingLeft: "paddingInlineStart",
    paddingRight: "paddingInlineEnd",
    paddingTop: "paddingBlockStart",
    paddingBottom: "paddingBlockEnd",

    left: "insetInlineStart",
    right: "insetInlineEnd",
    top: "insetBlockStart",
    bottom: "insetBlockEnd",

    maxWidth: "maxInlineSize",
    maxHeight: "maxBlockSize",
    minWidth: "minInlineSize",
    minHeight: "minBlockSize",

    borderRight: "borderInlineEnd",
    borderLeft: "borderInlineStart",
    borderTop: "borderBlockStart",
    borderBottom: "borderBlockEnd",

    borderTopLeftRadius: "borderStartStartRadius",
    borderTopRightRadius: "borderStartEndRadius",
    borderBottomLeftRadius: "borderEndStartRadius",
    borderBottomRightRadius: "borderEndEndRadius",

    borderRightWidth: "borderInlineEndWidth",
    borderLeftWidth: "borderInlineStartWidth",
    borderTopWidth: "borderBlockStartWidth",
    borderBottomWidth: "borderBlockEndWidth",

    borderRightColor: "borderInlineEndColor",
    borderLeftColor: "borderInlineStartColor",
    borderTopColor: "borderBlockStartColor",
    borderBottomColor: "borderBlockEndColor",

    borderRightStyle: "borderInlineEndStyle",
    borderLeftStyle: "borderInlineStartStyle",
    borderTopStyle: "borderBlockStartStyle",
    borderBottomStyle: "borderBlockEndStyle",

    scrollMarginLeft: "scrollMarginInlineStart",
    scrollMarginRight: "scrollMarginInlineEnd",
    scrollMarginTop: "scrollMarginBlockStart",
    scrollMarginBottom: "scrollMarginBlockEnd",

    scrollPaddingLeft: "scrollPaddingInlineStart",
    scrollPaddingRight: "scrollPaddingInlineEnd",
    scrollPaddingTop: "scrollPaddingBlockStart",
    scrollPaddingBottom: "scrollPaddingBlockEnd",
};

const LOGICAL_KEYS = new Set<string>([
    ...Object.keys(propertyReplacements),
    "textAlign",
]);

const VALUE_WARN_KEYS = new Set<string>([
    "float",
    "clear",
    "backgroundPosition",
    "background",
    "direction",
    "padding",
    "margin",
]);

type Options = [];

type MessageIds =
    | "useLogicalProperty"
    | "useTextAlignValue"
    | "useLogicalFloat"
    | "useLogicalClear"
    | "avoidBackgroundDirectional"
    | "avoidForceDirection"
    | "preferLogicalPaddingShorthand"
    | "preferLogicalMarginShorthand";

function getStringValue(node: TSESTree.Node | null | undefined): string | null {
    if (!node) {
        return null;
    }
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value;
    }
    if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
        return node.quasis.map((q) => q.value.cooked).join("");
    }
    return null;
}

function getKeyName(property: TSESTree.Property): string | null {
    if (property.method || property.kind !== "init" || property.shorthand) {
        return null;
    }
    if (property.computed) {
        return null;
    }
    if (property.key.type === "Identifier") {
        return property.key.name;
    }
    if (
        property.key.type === "Literal" &&
        typeof property.key.value === "string"
    ) {
        return property.key.value;
    }
    return null;
}

function replacePropertyKeyFix(
    fixer: TSESLint.RuleFixer,
    property: TSESTree.Property,
    replacement: string,
): TSESLint.RuleFix | null {
    if (property.key.type === "Identifier") {
        return fixer.replaceText(property.key, replacement);
    }
    if (
        property.key.type === "Literal" &&
        typeof property.key.value === "string"
    ) {
        return fixer.replaceText(property.key, JSON.stringify(replacement));
    }
    return null;
}

// Expand a physical `padding`/`margin` shorthand value into its logical
// equivalents. Returns null for values we can't safely split (a single value
// has no directionality, and values containing functions like calc()/var()
// can't be split on whitespace). The 4-value form is the one that genuinely
// breaks in RTL: its left/right (4th/2nd) differ and don't auto-mirror.
//   2 values "A B"     -> Block: A,      Inline: B
//   3 values "A B C"   -> BlockStart: A, Inline: B,      BlockEnd: C
//   4 values "A B C D" -> BlockStart: A, InlineEnd: B,   BlockEnd: C, InlineStart: D
function expandLogicalShorthand(
    prefix: "padding" | "margin",
    strVal: string,
): string | null {
    if (strVal.includes("(")) {
        return null;
    }
    const values = strVal.trim().split(/\s+/);
    switch (values.length) {
        case 2:
            return `${prefix}Block: "${values[0]}", ${prefix}Inline: "${values[1]}"`;
        case 3:
            return `${prefix}BlockStart: "${values[0]}", ${prefix}Inline: "${values[1]}", ${prefix}BlockEnd: "${values[2]}"`;
        case 4:
            return `${prefix}BlockStart: "${values[0]}", ${prefix}InlineEnd: "${values[1]}", ${prefix}BlockEnd: "${values[2]}", ${prefix}InlineStart: "${values[3]}"`;
        default:
            return null;
    }
}

export default createRule<Options, MessageIds>({
    name: "require-logical-properties-for-rtl",
    meta: {
        type: "problem",
        fixable: "code",
        docs: {
            description:
                "Require CSS logical properties (e.g. marginInlineStart) instead of physical ones (marginLeft) for RTL support.",
            recommended: true,
        },
        messages: {
            useLogicalProperty:
                "Use '{{logical}}' instead of '{{physical}}' for better RTL support.",
            useTextAlignValue:
                "Use 'textAlign: \"{{logical}}\"' instead of 'textAlign: \"{{physical}}\"' for better RTL support.",
            useLogicalFloat:
                "Use float: '{{logical}}' instead of '{{physical}}' for RTL compatibility.",
            useLogicalClear:
                "Use clear: '{{logical}}' instead of '{{physical}}' for RTL compatibility.",
            avoidBackgroundDirectional:
                "Avoid 'left/right' in background-position; prefer 0%/100% or conditional assets (no logical axis exists).",
            avoidForceDirection:
                "Avoid forcing 'direction' in component styles; rely on container `dir` instead.",
            preferLogicalPaddingShorthand:
                "Prefer logical padding shorthands (e.g. paddingBlock/paddingInline/paddingInlineStart) instead of the physical 'padding' shorthand.",
            preferLogicalMarginShorthand:
                "Prefer logical margin shorthands (e.g. marginBlock/marginInline/marginInlineStart) instead of the physical 'margin' shorthand.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        function reportInvalidProperty(
            property: TSESTree.Property,
            keyName: string,
        ) {
            const strVal = getStringValue(property.value);

            if (
                keyName === "textAlign" &&
                (strVal === "left" || strVal === "right")
            ) {
                const replacementValue = strVal === "left" ? "start" : "end";
                context.report({
                    node: property.value,
                    messageId: "useTextAlignValue",
                    data: {logical: replacementValue, physical: strVal},
                    fix(fixer) {
                        return fixer.replaceText(
                            property.value,
                            JSON.stringify(replacementValue),
                        );
                    },
                });
                return;
            }

            const replacement = propertyReplacements[keyName];
            if (replacement) {
                context.report({
                    node: property.key,
                    messageId: "useLogicalProperty",
                    data: {logical: replacement, physical: keyName},
                    fix(fixer) {
                        return replacePropertyKeyFix(
                            fixer,
                            property,
                            replacement,
                        );
                    },
                });
            }
        }

        function reportValueWarnings(
            property: TSESTree.Property,
            keyName: string,
            strVal: string | null,
        ) {
            if (!strVal) {
                return;
            }

            switch (keyName) {
                case "float": {
                    if (strVal === "left" || strVal === "right") {
                        const logical =
                            strVal === "left" ? "inline-start" : "inline-end";
                        context.report({
                            node: property.value,
                            messageId: "useLogicalFloat",
                            data: {logical, physical: strVal},
                            fix(fixer) {
                                return fixer.replaceText(
                                    property.value,
                                    JSON.stringify(logical),
                                );
                            },
                        });
                    }
                    break;
                }
                case "clear": {
                    if (strVal === "left" || strVal === "right") {
                        const logical =
                            strVal === "left" ? "inline-start" : "inline-end";
                        context.report({
                            node: property.value,
                            messageId: "useLogicalClear",
                            data: {logical, physical: strVal},
                            fix(fixer) {
                                return fixer.replaceText(
                                    property.value,
                                    JSON.stringify(logical),
                                );
                            },
                        });
                    }
                    break;
                }
                case "backgroundPosition":
                case "background": {
                    if (
                        /\b(left|right)\b/.test(
                            strVal.replace(/url\([^)]*\)/g, ""),
                        )
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidBackgroundDirectional",
                        });
                    }
                    break;
                }
                case "direction": {
                    if (strVal === "ltr" || strVal === "rtl") {
                        context.report({
                            node: property.value,
                            messageId: "avoidForceDirection",
                        });
                    }
                    break;
                }
                case "padding": {
                    const replacement = expandLogicalShorthand(
                        "padding",
                        strVal,
                    );
                    if (replacement) {
                        context.report({
                            node: property.value,
                            messageId: "preferLogicalPaddingShorthand",
                            fix(fixer) {
                                return [
                                    fixer.remove(property),
                                    fixer.insertTextAfter(
                                        property,
                                        replacement,
                                    ),
                                ];
                            },
                        });
                    }
                    break;
                }
                case "margin": {
                    const replacement = expandLogicalShorthand(
                        "margin",
                        strVal,
                    );
                    if (replacement) {
                        context.report({
                            node: property.value,
                            messageId: "preferLogicalMarginShorthand",
                            fix(fixer) {
                                return [
                                    fixer.remove(property),
                                    fixer.insertTextAfter(
                                        property,
                                        replacement,
                                    ),
                                ];
                            },
                        });
                    }
                    break;
                }
            }
        }

        function checkProperties(
            properties: Array<TSESTree.ObjectLiteralElement>,
        ) {
            for (const property of properties) {
                if (property.type !== "Property") {
                    continue;
                }
                if (property.method) {
                    continue;
                }

                const keyName = getKeyName(property);

                if (keyName) {
                    if (LOGICAL_KEYS.has(keyName)) {
                        reportInvalidProperty(property, keyName);
                    }
                    if (VALUE_WARN_KEYS.has(keyName)) {
                        reportValueWarnings(
                            property,
                            keyName,
                            getStringValue(property.value),
                        );
                    }
                }

                // Recurse into nested objects (e.g., media-query keys).
                if (property.value.type === "ObjectExpression") {
                    checkProperties(property.value.properties);
                }
            }
        }

        function handleStyleExpression(expr: TSESTree.Expression) {
            if (expr.type === "ObjectExpression") {
                checkProperties(expr.properties);
                return;
            }
            if (expr.type === "ConditionalExpression") {
                if (expr.consequent.type === "ObjectExpression") {
                    checkProperties(expr.consequent.properties);
                }
                if (expr.alternate.type === "ObjectExpression") {
                    checkProperties(expr.alternate.properties);
                }
                return;
            }
            if (expr.type === "LogicalExpression" && expr.operator === "&&") {
                if (expr.right.type === "ObjectExpression") {
                    checkProperties(expr.right.properties);
                }
                return;
            }
            if (expr.type === "ArrayExpression") {
                for (const el of expr.elements) {
                    if (!el) {
                        continue;
                    }
                    if (el.type === "ObjectExpression") {
                        checkProperties(el.properties);
                    } else if (el.type === "ConditionalExpression") {
                        if (el.consequent.type === "ObjectExpression") {
                            checkProperties(el.consequent.properties);
                        }
                        if (el.alternate.type === "ObjectExpression") {
                            checkProperties(el.alternate.properties);
                        }
                    } else if (
                        el.type === "LogicalExpression" &&
                        el.operator === "&&"
                    ) {
                        if (el.right.type === "ObjectExpression") {
                            checkProperties(el.right.properties);
                        }
                    }
                }
            }
        }

        return {
            JSXAttribute(node) {
                if (
                    node.name.type !== "JSXIdentifier" ||
                    node.name.name !== "style"
                ) {
                    return;
                }
                const styleValue = node.value;
                if (
                    !styleValue ||
                    styleValue.type !== "JSXExpressionContainer"
                ) {
                    return;
                }
                if (styleValue.expression.type === "JSXEmptyExpression") {
                    return;
                }
                handleStyleExpression(styleValue.expression);
            },
            CallExpression(node) {
                if (
                    node.callee.type === "MemberExpression" &&
                    node.callee.object.type === "Identifier" &&
                    node.callee.object.name === "StyleSheet" &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "create"
                ) {
                    const stylesObject = node.arguments[0];
                    if (stylesObject?.type === "ObjectExpression") {
                        for (const styleProperty of stylesObject.properties) {
                            if (
                                styleProperty.type === "Property" &&
                                styleProperty.value.type === "ObjectExpression"
                            ) {
                                checkProperties(styleProperty.value.properties);
                            }
                        }
                    }
                }
            },
        };
    },
});
