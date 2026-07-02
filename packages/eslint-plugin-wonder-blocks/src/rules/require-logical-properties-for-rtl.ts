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
    "backgroundPositionX",
    "backgroundPositionY",
    "background",
    "backgroundImage",
    "transform",
    "transformOrigin",
    "boxShadow",
    "textShadow",
    "cursor",
    "direction",
    "padding",
    "margin",
]);

type RuleOptions = {
    warnDirectionalTransforms?: boolean;
    warnBackgroundPosition?: boolean;
    warnShadows?: boolean;
    warnGradients?: boolean;
    warnCursorDirections?: boolean;
    warnBackgroundPositionXY?: boolean;
};

type Options = [RuleOptions];

type MessageIds =
    | "useLogicalProperty"
    | "useTextAlignValue"
    | "useLogicalFloat"
    | "useLogicalClear"
    | "avoidBackgroundDirectional"
    | "avoidBackgroundPositionXYDirectional"
    | "avoidGradientDirection"
    | "avoidTranslateXDirectional"
    | "avoidTransformOriginDirectional"
    | "avoidShadowDirectional"
    | "avoidDirectionalCursor"
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
            avoidBackgroundPositionXYDirectional:
                "No logical 'background-position-inline/block' exists; prefer percentages or conditional logic.",
            avoidGradientDirection:
                "Gradient directions are physical (no logical inline-start/end). If mirroring is needed, swap color stops, change direction conditionally, or flip the element (e.g., scaleX(-1)).",
            avoidTranslateXDirectional:
                "translateX is directional; verify in RTL or gate by `dir`. Consider translateY() or conditional logic: isRTL ? 'translateX(10px)' : 'translateX(-10px)'.",
            avoidTransformOriginDirectional:
                "Use percentages for transformOrigin instead of left/right (e.g. '0% 50%' instead of 'left center').",
            avoidShadowDirectional:
                "Shadow X-offset is directional; verify in RTL or use conditional logic to flip the X-offset sign.",
            avoidDirectionalCursor:
                "Cursor is directional; consider 'ew-resize' or conditional swap based on `dir`.",
            avoidForceDirection:
                "Avoid forcing 'direction' in component styles; rely on container `dir` instead.",
            preferLogicalPaddingShorthand:
                "Prefer logical shorthands: 'paddingBlock'/'paddingInline' instead of two-value 'padding'.",
            preferLogicalMarginShorthand:
                "Prefer logical shorthands: 'marginBlock'/'marginInline' instead of two-value 'margin'.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    warnDirectionalTransforms: {type: "boolean"},
                    warnBackgroundPosition: {type: "boolean"},
                    warnShadows: {type: "boolean"},
                    warnGradients: {type: "boolean"},
                    warnCursorDirections: {type: "boolean"},
                    warnBackgroundPositionXY: {type: "boolean"},
                },
                additionalProperties: false,
            },
        ],
    },
    defaultOptions: [
        {
            warnDirectionalTransforms: false,
            warnBackgroundPosition: true,
            warnShadows: false,
            warnGradients: false,
            warnCursorDirections: false,
            warnBackgroundPositionXY: false,
        },
    ],
    create(context) {
        const options: RuleOptions = context.options[0] ?? {};

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
                        context.report({
                            node: property.value,
                            messageId: "useLogicalFloat",
                            data: {
                                logical:
                                    strVal === "left"
                                        ? "inline-start"
                                        : "inline-end",
                                physical: strVal,
                            },
                        });
                    }
                    break;
                }
                case "clear": {
                    if (strVal === "left" || strVal === "right") {
                        context.report({
                            node: property.value,
                            messageId: "useLogicalClear",
                            data: {
                                logical:
                                    strVal === "left"
                                        ? "inline-start"
                                        : "inline-end",
                                physical: strVal,
                            },
                        });
                    }
                    break;
                }
                case "backgroundPosition":
                case "background":
                case "backgroundImage": {
                    if (
                        (keyName === "backgroundPosition" ||
                            keyName === "background") &&
                        /\b(left|right)\b/.test(
                            strVal.replace(/url\([^)]*\)/g, ""),
                        ) &&
                        (options.warnBackgroundPosition ?? true)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidBackgroundDirectional",
                        });
                    }
                    if (
                        (keyName === "background" ||
                            keyName === "backgroundImage") &&
                        /linear-gradient\(\s*to\s+(left|right|top|bottom)/.test(
                            strVal,
                        ) &&
                        (options.warnGradients ?? false)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidGradientDirection",
                        });
                    }
                    break;
                }
                case "backgroundPositionX": {
                    if (
                        (options.warnBackgroundPositionXY ?? false) &&
                        /\b(left|right)\b/.test(strVal)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidBackgroundPositionXYDirectional",
                        });
                    }
                    break;
                }
                case "backgroundPositionY": {
                    if (
                        (options.warnBackgroundPositionXY ?? false) &&
                        /\b(top|bottom)\b/.test(strVal)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidBackgroundPositionXYDirectional",
                        });
                    }
                    break;
                }
                case "transform": {
                    if (
                        /translateX\(/.test(strVal) &&
                        (options.warnDirectionalTransforms ?? false)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidTranslateXDirectional",
                        });
                    }
                    break;
                }
                case "transformOrigin": {
                    if (
                        /\b(left|right)\b/.test(strVal) &&
                        (options.warnDirectionalTransforms ?? false)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidTransformOriginDirectional",
                        });
                    }
                    break;
                }
                case "boxShadow":
                case "textShadow": {
                    if (
                        /^(?:inset\s+)?(?!0(?:\s|$|[a-zA-Z%]))(?:-?(?:\d*\.\d+|\d+)|calc\(|var\()/.test(
                            strVal,
                        ) &&
                        (options.warnShadows ?? false)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidShadowDirectional",
                        });
                    }
                    break;
                }
                case "cursor": {
                    if (
                        /\b(?:e|w)-resize\b/.test(strVal) &&
                        (options.warnCursorDirections ?? false)
                    ) {
                        context.report({
                            node: property.value,
                            messageId: "avoidDirectionalCursor",
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
                    if (/^\S+\s+\S+$/.test(strVal)) {
                        context.report({
                            node: property.value,
                            messageId: "preferLogicalPaddingShorthand",
                            fix(fixer) {
                                const values = strVal.trim().split(/\s+/);
                                if (values.length !== 2) {
                                    return null;
                                }
                                const [block, inline] = values;
                                return [
                                    fixer.remove(property),
                                    fixer.insertTextAfter(
                                        property,
                                        `paddingBlock: "${block}", paddingInline: "${inline}"`,
                                    ),
                                ];
                            },
                        });
                    }
                    break;
                }
                case "margin": {
                    if (/^\S+\s+\S+$/.test(strVal)) {
                        context.report({
                            node: property.value,
                            messageId: "preferLogicalMarginShorthand",
                            fix(fixer) {
                                const values = strVal.trim().split(/\s+/);
                                if (values.length !== 2) {
                                    return null;
                                }
                                const [block, inline] = values;
                                return [
                                    fixer.remove(property),
                                    fixer.insertTextAfter(
                                        property,
                                        `marginBlock: "${block}", marginInline: "${inline}"`,
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
