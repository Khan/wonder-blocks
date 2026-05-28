import {ESLintUtils} from "@typescript-eslint/utils";

import type {TSESTree} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        `https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/${name}.md`,
);

type Options = [];
type MessageIds = "noHardcodedColor";

// SVG presentation attributes (and WB color props like PhosphorIcon's `color`)
// used directly as JSX attributes — not inside a style object.
const JSX_COLOR_ATTR_NAMES = new Set([
    "fill",
    "stroke",
    "stopColor",
    "floodColor",
    "lightingColor",
    "color",
]);

// SVG structural elements where `fill` controls masking/clipping semantics
// (white = include, black = exclude) rather than a visible color.
// Flagging these would produce false positives — the values must not change.
const SVG_MASK_ELEMENTS = new Set(["mask", "clipPath", "pattern"]);

// CSS properties that accept color values (camelCase).
const COLOR_PROPERTIES = new Set([
    // Text & foreground
    "color",
    "caretColor",
    "accentColor",
    // Backgrounds
    "background",
    "backgroundColor",
    "backgroundImage",
    // Borders
    "border",
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "borderInlineColor",
    "borderInlineStartColor",
    "borderInlineEndColor",
    "borderBlockColor",
    "borderBlockStartColor",
    "borderBlockEndColor",
    "borderTop",
    "borderRight",
    "borderBottom",
    "borderLeft",
    "borderInline",
    "borderInlineStart",
    "borderInlineEnd",
    "borderBlock",
    "borderBlockStart",
    "borderBlockEnd",
    // Outline
    "outline",
    "outlineColor",
    // Text decorations
    "textDecorationColor",
    "textEmphasisColor",
    // Multi-column
    "columnRuleColor",
    "columnRule",
    // Shadows (color embedded in shorthand value)
    "boxShadow",
    "textShadow",
    // SVG presentation attributes
    "fill",
    "stroke",
    "stopColor",
    "floodColor",
    "lightingColor",
]);

// Full CSS named color list (including `transparent`).
// The following CSS keywords are intentionally NOT flagged:
//   currentColor — inherits the nearest ancestor's color; valid when that
//                  ancestor already uses a semanticColor token
//   inherit / initial / unset / revert — CSS-wide keywords
// `transparent` IS flagged: use semanticColor.core.transparent instead so
// the value participates in theming.
const CSS_NAMED_COLORS = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategray",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "slategrey",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "transparent",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
];

// Single regex built once from the full named-color list.
const NAMED_COLOR_RE = new RegExp(
    `(?:^|[\\s,(])(?:${CSS_NAMED_COLORS.join("|")})(?=$|[\\s,);])`,
    "i",
);

// Ordered list of patterns to test against a CSS value string.
const COLOR_VALUE_PATTERNS: ReadonlyArray<RegExp> = [
    // Hex: #rgb, #rgba, #rrggbb, #rrggbbaa
    /#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/,
    // Functional notations
    /\brgba?\s*\(/i,
    /\bhsla?\s*\(/i,
    /\bhwb\s*\(/i,
    /\bcolor\s*\(/i,
    // CSS Color Level 4 functions
    /\b(?:ok)?(?:lab|lch)\s*\(/i,
    // Named colors
    NAMED_COLOR_RE,
];

function containsHardcodedColor(value: string): boolean {
    // Strip url(...) substrings first: fragment identifiers in SVG paint
    // references (fill: "url(#gradient)") and image URLs may contain
    // hex-like sequences that would otherwise false-positive.
    const stripped = value.replace(/url\([^)]*\)/gi, "");
    return COLOR_VALUE_PATTERNS.some((re) => re.test(stripped));
}

function getStringValue(node: TSESTree.Node | null | undefined): string | null {
    if (!node) {
        return null;
    }
    if (node.type === "Literal" && typeof node.value === "string") {
        return node.value;
    }
    if (node.type === "TemplateLiteral" && node.expressions.length === 0) {
        return node.quasis.map((q) => q.value.cooked ?? "").join("");
    }
    return null;
}

function getKeyName(property: TSESTree.Property): string | null {
    if (property.method || property.kind !== "init") {
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

export default createRule<Options, MessageIds>({
    name: "no-hardcoded-color",
    meta: {
        docs: {
            description:
                "Disallow hardcoded color values to better support theming. Use semanticColor instead.",
            recommended: true,
        },
        messages: {
            noHardcodedColor:
                "Avoid hardcoded color value '{{value}}'. Use a semantic color token from @khanacademy/wonder-blocks-tokens instead (e.g. semanticColor.core.foreground.primary) to support theming and dark mode. See https://khan.github.io/wonder-blocks/?path=/docs/foundations-using-color--docs for available tokens.",
        },
        schema: [],
        type: "suggestion",
    },
    create(context) {
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

                if (keyName && COLOR_PROPERTIES.has(keyName)) {
                    const strVal = getStringValue(property.value);
                    if (strVal !== null && containsHardcodedColor(strVal)) {
                        context.report({
                            node: property.value,
                            messageId: "noHardcodedColor",
                            data: {value: strVal},
                        });
                    }
                }

                // Recurse into nested objects (e.g. pseudo-selector keys like
                // ":hover" or media query keys).
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
            // Inline style prop: style={{color: "#fff"}}
            // Multi-part styles prop: styles={{root: {color: "#fff"}, tab: {...}}}
            // SVG/WB color attrs: fill="#fff", color="#3C6D4A"
            JSXAttribute(node) {
                if (node.name.type !== "JSXIdentifier") {
                    return;
                }
                const propName = node.name.name;
                const propValue = node.value;
                if (!propValue) {
                    return;
                }

                // Direct JSX color attributes: fill="red", color="#fff", etc.
                // These can be plain string literals OR expression containers.
                if (JSX_COLOR_ATTR_NAMES.has(propName)) {
                    // Skip elements whose fill controls masking semantics
                    // (white=include, black=exclude) rather than visible color:
                    // - The element itself is mask/clipPath/pattern
                    // - OR any JSX ancestor is mask/clipPath/pattern (e.g.
                    //   <mask><use fill="white" /></mask> — the <use> inherits
                    //   the masking context and its fill is also non-color)
                    const openingEl = node.parent;
                    if (
                        openingEl.type === "JSXOpeningElement" &&
                        openingEl.name.type === "JSXIdentifier" &&
                        SVG_MASK_ELEMENTS.has(openingEl.name.name)
                    ) {
                        return;
                    }
                    let ancestor: TSESTree.Node | undefined =
                        node.parent.parent;
                    while (ancestor) {
                        if (
                            ancestor.type === "JSXElement" &&
                            ancestor.openingElement.name.type ===
                                "JSXIdentifier" &&
                            SVG_MASK_ELEMENTS.has(
                                ancestor.openingElement.name.name,
                            )
                        ) {
                            return;
                        }
                        ancestor = ancestor.parent;
                    }

                    let strVal: string | null = null;
                    if (
                        propValue.type === "Literal" &&
                        typeof propValue.value === "string"
                    ) {
                        strVal = propValue.value;
                    } else if (
                        propValue.type === "JSXExpressionContainer" &&
                        propValue.expression.type !== "JSXEmptyExpression"
                    ) {
                        strVal = getStringValue(propValue.expression);
                    }
                    if (strVal !== null && containsHardcodedColor(strVal)) {
                        context.report({
                            node: propValue,
                            messageId: "noHardcodedColor",
                            data: {value: strVal},
                        });
                    }
                    return;
                }

                if (propValue.type !== "JSXExpressionContainer") {
                    return;
                }
                if (propValue.expression.type === "JSXEmptyExpression") {
                    return;
                }

                if (propName === "style") {
                    handleStyleExpression(propValue.expression);
                } else if (propName === "styles") {
                    // The `styles` prop used by WB components maps part names
                    // to style objects: styles={{ root: {...}, tab: {...} }}
                    const expr = propValue.expression;
                    if (expr.type === "ObjectExpression") {
                        for (const property of expr.properties) {
                            if (property.type === "Property") {
                                handleStyleExpression(
                                    property.value as TSESTree.Expression,
                                );
                            }
                        }
                    }
                }
            },
            // Aphrodite StyleSheet.create({...})
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
            // Object property named "styles" with a multi-part value:
            //   args: { styles: { root: { color: "#fff" } } }
            // This covers Storybook args and any other non-JSX usage of the
            // WB multi-part styles pattern.
            "Property[key.name='styles'], Property[key.value='styles']"(
                node: TSESTree.Property,
            ) {
                if (node.value.type !== "ObjectExpression") {
                    return;
                }
                for (const property of node.value.properties) {
                    if (property.type === "Property") {
                        handleStyleExpression(
                            property.value as TSESTree.Expression,
                        );
                    }
                }
            },
        };
    },
    defaultOptions: [],
});
