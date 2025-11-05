import {API, FileInfo, Options} from "jscodeshift";

// From
const SOURCE_IMPORT_DECLARATION = "@khanacademy/wonder-blocks-tokens";
const SOURCE_SPECIFIER = "color";
// To
const TARGET_SPECIFIER = "semanticColor";

type ColorContext = "foreground" | "background" | "border";

/**
 * Mapping from primitive color properties to semantic color paths,
 * organized by context (foreground, background, border).
 * Based on the most common usages in semantic-color.ts.
 */
const COLOR_TO_SEMANTIC_MAPPING: Record<
    string,
    Record<ColorContext, string>
> = {
    // Instructive colors (blue)
    blue: {
        foreground: "core.foreground.instructive.subtle",
        background: "core.background.instructive.default",
        border: "core.border.instructive.default",
    },
    fadedBlue: {
        foreground: "core.foreground.instructive.subtle",
        background: "core.background.instructive.subtle",
        border: "core.border.instructive.subtle",
    },
    activeBlue: {
        foreground: "core.foreground.instructive.default",
        background: "core.background.instructive.strong",
        border: "core.border.instructive.strong",
    },
    fadedBlue8: {
        foreground: "core.foreground.instructive.subtle",
        background: "core.background.instructive.subtle",
        border: "core.border.instructive.subtle",
    },
    fadedBlue16: {
        foreground: "core.foreground.instructive.subtle",
        background: "core.background.base.strong",
        border: "core.border.instructive.subtle",
    },

    // Neutral colors (black/gray)
    offBlack: {
        foreground: "core.foreground.neutral.strong",
        background: "core.background.neutral.strong",
        border: "core.border.neutral.strong",
    },
    fadedOffBlack8: {
        foreground: "core.foreground.neutral.subtle",
        background: "core.background.neutral.subtle",
        border: "core.border.neutral.subtle",
    },
    offBlack8: {
        foreground: "core.foreground.neutral.subtle",
        background: "core.background.neutral.subtle",
        border: "core.border.neutral.subtle",
    },
    fadedOffBlack16: {
        foreground: "core.foreground.disabled.subtle",
        background: "core.background.disabled.strong",
        border: "core.border.neutral.subtle",
    },
    offBlack16: {
        foreground: "core.foreground.disabled.subtle",
        background: "core.background.disabled.strong",
        border: "core.border.neutral.subtle",
    },
    fadedOffBlack32: {
        foreground: "core.foreground.disabled.default",
        background: "core.background.disabled.strong",
        border: "core.border.disabled.strong",
    },
    offBlack32: {
        foreground: "core.foreground.disabled.default",
        background: "core.background.disabled.strong",
        border: "core.border.disabled.strong",
    },
    fadedOffBlack50: {
        foreground: "core.foreground.disabled.strong",
        background: "core.background.neutral.default",
        border: "core.border.neutral.default",
    },
    offBlack50: {
        foreground: "core.foreground.neutral.default",
        background: "core.background.neutral.default",
        border: "core.border.neutral.default",
    },
    fadedOffBlack64: {
        foreground: "core.foreground.neutral.subtle",
        background: "core.background.neutral.default",
        border: "core.border.neutral.default",
    },
    offBlack64: {
        foreground: "core.foreground.neutral.subtle",
        background: "core.background.neutral.default",
        border: "core.border.neutral.default",
    },
    fadedOffBlack72: {
        foreground: "core.foreground.neutral.default",
        background: "core.background.neutral.default",
        border: "core.border.neutral.default",
    },
    offBlack72: {
        foreground: "core.foreground.neutral.default",
        background: "core.background.neutral.default",
        border: "core.border.neutral.default",
    },

    // Critical colors (red)
    red: {
        foreground: "core.foreground.critical.subtle",
        background: "core.background.critical.default",
        border: "core.border.critical.default",
    },
    activeRed: {
        foreground: "core.foreground.critical.default",
        background: "core.background.critical.strong",
        border: "core.border.critical.strong",
    },
    fadedRed8: {
        foreground: "core.foreground.critical.subtle",
        background: "core.background.critical.subtle",
        border: "core.border.critical.subtle",
    },
    fadedRed16: {
        foreground: "core.foreground.critical.subtle",
        background: "core.background.critical.subtle",
        border: "core.border.critical.subtle",
    },
    fadedRed24: {
        foreground: "core.foreground.critical.subtle",
        background: "core.background.critical.subtle",
        border: "core.border.critical.subtle",
    },

    // Success colors (green)
    green: {
        foreground: "core.foreground.success.subtle",
        background: "core.background.success.default",
        border: "core.border.success.default",
    },
    activeGreen: {
        foreground: "core.foreground.success.default",
        background: "core.background.success.strong",
        border: "core.border.success.strong",
    },
    fadedGreen8: {
        foreground: "core.foreground.success.subtle",
        background: "core.background.success.subtle",
        border: "core.border.success.subtle",
    },
    // same as fadedGreen8
    fadedGreen16: {
        foreground: "core.foreground.success.subtle",
        background: "core.background.success.subtle",
        border: "core.border.success.subtle",
    },
    fadedGreen24: {
        foreground: "core.foreground.success.subtle",
        background: "core.background.success.subtle",
        border: "core.border.success.subtle",
    },

    // Warning colors (gold)
    gold: {
        foreground: "core.foreground.warning.subtle",
        background: "core.background.warning.default",
        border: "core.border.warning.default",
    },
    activeGold: {
        foreground: "core.foreground.warning.default",
        background: "core.background.warning.strong",
        border: "core.border.warning.strong",
    },
    fadedGold8: {
        foreground: "core.foreground.warning.subtle",
        background: "core.background.warning.subtle",
        border: "core.border.warning.subtle",
    },
    fadedGold16: {
        foreground: "core.foreground.warning.subtle",
        background: "core.background.warning.subtle",
        border: "core.border.warning.subtle",
    },
    fadedGold24: {
        foreground: "core.foreground.warning.subtle",
        background: "core.background.warning.subtle",
        border: "core.border.warning.subtle",
    },

    // Base colors
    white: {
        foreground: "core.foreground.knockout.default",
        background: "core.background.base.default",
        border: "core.border.knockout.default",
    },
    offWhite: {
        foreground: "core.foreground.knockout.default",
        background: "core.background.base.subtle",
        border: "core.border.knockout.default",
    },

    // Special colors
    eggplant: {
        foreground: "khanmigo.primary",
        background: "khanmigo.primary",
        border: "khanmigo.primary",
    },
    fadedEggplant8: {
        foreground: "khanmigo.secondary",
        background: "khanmigo.secondary",
        border: "khanmigo.secondary",
    },
    purple: {
        foreground: "mastery.primary",
        background: "mastery.primary",
        border: "mastery.primary",
    },
};

/**
 * Determines the color context based on the CSS property name.
 */
function getColorContext(propertyName: string): ColorContext | null {
    const prop = propertyName.toLowerCase();

    // Foreground properties (text color, fill, etc.)
    if (
        prop === "color" ||
        prop === "fill" ||
        prop === "stroke" ||
        prop.includes("textcolor")
    ) {
        return "foreground";
    }

    // Background properties
    if (
        prop === "background" ||
        prop === "backgroundcolor" ||
        prop.includes("background")
    ) {
        return "background";
    }

    // Border properties
    if (
        prop === "border" ||
        prop === "bordercolor" ||
        prop === "bordertopcolor" ||
        prop === "borderbottomcolor" ||
        prop === "borderleftcolor" ||
        prop === "borderrightcolor" ||
        prop === "borderblockstartcolor" ||
        prop === "borderblockendcolor" ||
        prop === "borderinlinestartcolor" ||
        prop === "borderinlineendcolor" ||
        prop.includes("border") ||
        prop === "outline" ||
        prop === "outlinecolor"
    ) {
        return "border";
    }

    return null;
}

/**
 * Transforms:
 * import {color} from "@khanacademy/wonder-blocks-tokens"
 * const bgColor = color.blue;
 *
 * to:
 * import {semanticColor} from "@khanacademy/wonder-blocks-tokens"
 * const bgColor = semanticColor.core.border.instructive.default;
 */
export default function transform(file: FileInfo, api: API, options: Options) {
    const j = api.jscodeshift;
    const root = j(file.source);

    // Step 1: Verify if the import exists
    const sourceImport = root.find(j.ImportDeclaration, {
        source: {value: SOURCE_IMPORT_DECLARATION},
    });

    // If the import doesn't exist, we don't need to do anything.
    if (sourceImport.size() === 0) {
        return;
    }

    let hasSourceSpecifier = false;

    // Step 2: Replace the import specifier
    sourceImport.forEach((path) => {
        const specifiers = path.value.specifiers;
        if (!specifiers) {
            return;
        }

        // Find the source specifier (color)
        const sourceSpecifierNode = specifiers.find(
            (specifier) =>
                specifier.type === "ImportSpecifier" &&
                specifier.imported.name === SOURCE_SPECIFIER,
        );

        if (!sourceSpecifierNode) {
            return;
        }

        hasSourceSpecifier = true;

        // Check if semanticColor already exists
        const targetSpecifierExists = specifiers.some(
            (specifier) =>
                specifier.type === "ImportSpecifier" &&
                specifier.imported.name === TARGET_SPECIFIER,
        );

        if (targetSpecifierExists) {
            // If semanticColor already exists, just remove color
            path.value.specifiers = specifiers.filter(
                (specifier) =>
                    !(
                        specifier.type === "ImportSpecifier" &&
                        specifier.imported.name === SOURCE_SPECIFIER
                    ),
            );
        } else {
            // Replace color with semanticColor
            const targetSpecifier = j.importSpecifier(
                j.identifier(TARGET_SPECIFIER),
            );

            path.value.specifiers = specifiers.map((specifier) => {
                if (
                    specifier.type === "ImportSpecifier" &&
                    specifier.imported.name === SOURCE_SPECIFIER
                ) {
                    return targetSpecifier;
                }
                return specifier;
            });
        }
    });

    // Step 3: Replace the usage (only if we found the source specifier)
    if (hasSourceSpecifier) {
        root.find(j.MemberExpression, {
            object: {name: SOURCE_SPECIFIER},
        }).forEach((path) => {
            const memberExpression = path.value;

            // Get the property name (e.g., "blue" from color.blue)
            if (
                memberExpression.property.type === "Identifier" &&
                !memberExpression.computed
            ) {
                const colorProperty = memberExpression.property.name;
                const colorMapping = COLOR_TO_SEMANTIC_MAPPING[colorProperty];

                if (colorMapping) {
                    // Determine the context by looking at the parent
                    let context: ColorContext | null = null;

                    // Walk up the tree to find if we're in an object property
                    let currentPath = path.parent;
                    while (currentPath) {
                        const node = currentPath.value;

                        // Check if we're the value in an object property
                        if (
                            node.type === "Property" &&
                            node.key.type === "Identifier"
                        ) {
                            context = getColorContext(node.key.name);
                            break;
                        }

                        // Check if we're in a template literal (for cases like
                        // `border: 1px solid ${color.blue}`)
                        if (
                            node.type === "TemplateLiteral" &&
                            currentPath.parent?.value.type === "Property" &&
                            currentPath.parent.value.key.type === "Identifier"
                        ) {
                            context = getColorContext(
                                currentPath.parent.value.key.name,
                            );
                            break;
                        }

                        currentPath = currentPath.parent;
                    }

                    // If we couldn't determine the context, we don't need to
                    // transform the expression.
                    if (context === null) {
                        return;
                    }

                    const semanticPath = colorMapping[context];

                    // Build the new member expression chain
                    // e.g., "core.border.instructive.default" becomes
                    // semanticColor.core.border.instructive.default
                    const pathParts = semanticPath.split(".");
                    let newExpression: any = j.identifier(TARGET_SPECIFIER);

                    for (const part of pathParts) {
                        newExpression = j.memberExpression(
                            newExpression,
                            j.identifier(part),
                        );
                    }

                    j(path).replaceWith(newExpression);
                    // }
                } else if (memberExpression.object.type === "Identifier") {
                    // If no mapping found, just replace color with
                    // semanticColor and keep the same property
                    memberExpression.object.name = TARGET_SPECIFIER;
                }
            }
        });
    }

    return root.toSource(options.printOptions);
}
