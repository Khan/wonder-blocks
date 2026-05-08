/**
 * Require use of CSS Logical Properties for Right-to-Left
 * language support.
 *
 * Ported from frontend/libs/eslint-plugin-static-service. Uses plain ESLint
 * AST type checks instead of @babel/types so no extra dep is needed.
 */

// This list of replacements is based on the Logical Properties
// Chart found here:
// https://adrianroselli.com/2019/11/css-logical-properties.html
const propertyReplacements = {
    left: "insetInlineStart",
    right: "insetInlineEnd",
    marginLeft: "marginInlineStart",
    marginRight: "marginInlineEnd",
    marginTop: "marginBlockStart",
    marginBottom: "marginBlockEnd",
    paddingLeft: "paddingInlineStart",
    paddingRight: "paddingInlineEnd",
    paddingTop: "paddingBlockStart",
    paddingBottom: "paddingBlockEnd",
    borderRight: "borderInlineEnd",
    borderLeft: "borderInlineStart",
    borderTop: "borderBlockStart",
    borderBottom: "borderBlockEnd",
    borderTopLeftRadius: "borderStartStartRadius",
    borderTopRightRadius: "borderStartEndRadius",
    borderBottomLeftRadius: "borderEndStartRadius",
    borderBottomRightRadius: "borderEndEndRadius",
    minWidth: "minInlineSize",
    minHeight: "minBlockSize",
};

function reportInvalidProperty(context, property, keyName, value) {
    if (keyName === "textAlign" && (value === "left" || value === "right")) {
        const replacementValue = value === "left" ? "start" : "end";
        context.report({
            node: property,
            message: `Use 'textAlign: "${replacementValue}"' instead of 'textAlign: "${value}"' for better RTL support.`,
            fix(fixer) {
                return fixer.replaceText(
                    property.value,
                    `"${replacementValue}"`,
                );
            },
        });
    } else if (propertyReplacements[keyName]) {
        context.report({
            node: property,
            message: `Use '${propertyReplacements[keyName]}' instead of '${keyName}' for better RTL support.`,
            fix(fixer) {
                return fixer.replaceText(
                    property.key,
                    propertyReplacements[keyName],
                );
            },
        });
    }
}

function checkProperties(context, properties) {
    const logicalProperties =
        Object.keys(propertyReplacements).concat("textAlign");

    properties.forEach((property) => {
        if (
            property.type === "Property" &&
            property.key &&
            property.key.type === "Identifier"
        ) {
            const keyName = property.key.name;
            const value = property.value && property.value.value;
            if (logicalProperties.includes(keyName)) {
                reportInvalidProperty(context, property, keyName, value);
            }
        } else if (
            property.type === "Property" &&
            property.key &&
            property.key.type !== "Identifier"
        ) {
            // Handle computed properties like media queries
            if (property.value && property.value.type === "ObjectExpression") {
                checkProperties(context, property.value.properties);
            }
        }
    });
}

module.exports = {
    meta: {
        type: "problem",
        hasSuggestions: true,
        fixable: true,
    },

    create(context) {
        return {
            JSXAttribute(node) {
                if (
                    node.name &&
                    node.name.type === "JSXIdentifier" &&
                    node.name.name === "style"
                ) {
                    const styleValue = node.value;
                    if (
                        styleValue &&
                        styleValue.type === "JSXExpressionContainer" &&
                        styleValue.expression &&
                        styleValue.expression.type === "ObjectExpression"
                    ) {
                        checkProperties(
                            context,
                            styleValue.expression.properties,
                        );
                    }
                }
            },
            CallExpression(node) {
                if (
                    node.callee &&
                    node.callee.type === "MemberExpression" &&
                    node.callee.object &&
                    node.callee.object.type === "Identifier" &&
                    node.callee.object.name === "StyleSheet" &&
                    node.callee.property &&
                    node.callee.property.type === "Identifier" &&
                    node.callee.property.name === "create"
                ) {
                    const stylesObject = node.arguments[0];
                    if (
                        stylesObject &&
                        stylesObject.type === "ObjectExpression"
                    ) {
                        stylesObject.properties.forEach((styleProperty) => {
                            if (
                                styleProperty.type === "Property" &&
                                styleProperty.value &&
                                styleProperty.value.type === "ObjectExpression"
                            ) {
                                checkProperties(
                                    context,
                                    styleProperty.value.properties,
                                );
                            }
                        });
                    }
                }
            },
        };
    },
};
