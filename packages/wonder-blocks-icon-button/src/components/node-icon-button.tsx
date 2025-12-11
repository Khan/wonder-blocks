import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {
    border,
    mapValuesToCssVars,
    semanticColor,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

import type {BaseIconButtonProps} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";

/**
 * The object containing the CSS variables that can be overridden to customize
 * the appearance of the NodeIconButton component.
 */
const themeContract = {
    box: {
        padding: "",
        shadow: {
            y: {
                rest: "",
                hover: "",
                press: "",
            },
            color: "",
        },
        foreground: "",
        background: "",
    },
    icon: {
        size: "",
    },
};

const theme = mapValuesToCssVars(themeContract, "--");

type Tokens = typeof theme;

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string | number | boolean;
};

function flattenThemeContract<T>(
    obj: RecursivePartial<T>,
    prefix = "--",
    sep = "-",
) {
    const result: Record<string, string | number | boolean> = {};
    for (const key of Object.keys(obj)) {
        if (typeof obj[key as keyof T] === "object") {
            const nested = flattenThemeContract(
                obj[key as keyof T] as RecursivePartial<T>,
                "",
                sep,
            );
            for (const nestedKey of Object.keys(nested)) {
                result[`${prefix}${key}${sep}${nestedKey}`] = nested[nestedKey];
            }
        } else {
            result[`${prefix}${key}`] = obj[key as keyof T] as
                | string
                | number
                | boolean;
        }
    }
    return result;
}

function cleanObject(obj: any) {
    const t = obj;
    for (const v in t) {
        if (typeof t[v] === "object") {
            cleanObject(t[v]);
        } else if (t[v] === undefined) {
            delete t[v];
        }
    }
    return t;
}

function mapTokensToCssVars(tokens: RecursivePartial<Tokens>) {
    return flattenThemeContract(tokens, "--", "-");
}

type Props = Omit<BaseIconButtonProps, "kind" | "style"> & {
    /**
     * The action type of the button. This determines the visual style of
     * the button. Defaults to `notStarted`.
     *
     * - `notStarted` is used for buttons that indicate a not started action.
     * - `attempted` is used for buttons that indicate an attempted (in progress)
     *   action.
     * - `complete` is used for buttons that indicate a complete action.
     */
    actionType?: "notStarted" | "attempted" | "complete";
    /**
     * The alternative text for the icon button. Required for accessibility.
     */
    "aria-label": string;

    /**
     * The size of the icon button.
     * One of `small` (24) or `large` (68).
     * Defaults to `large`.
     */
    size?: "small" | "large";

    /**
     * Custom styles for the elements in the ActivityIconButton component.
     * - `root`: Styles the root element (button)
     * - `box`: Styles the "chonky" box element
     * - `icon`: Styles the icon element
     * - `tokens`: The CSS variables that control the visual appearance of the
     *   button.
     */
    styles?: {
        root?: StyleType;
        box?: StyleType;
        icon?: StyleType;
    };

    /**
     * Style props
     */
    background?: string;
    foreground?: string;
    boxShadowColor?: string;
    boxShadowY?: {
        rest: string;
        hover: string;
        press: string;
    };
    boxPadding?: string;
    iconSize?: string;
};

/**
 * Node buttons are visual representations of activities along in a Learning
 * Path. When a represented Node is a button that launches the activity. Nodes
 * use the Chonky shadow style.
 *
 * ```tsx
 * import magnifyingGlassIcon from
 * "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {NodeIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <NodeIconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const NodeIconButton: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function NodeIconButton(props: Props, ref) {
    const {
        actionType = "notStarted",
        disabled = false,
        icon,
        size = "large",
        styles: stylesProp,
        type = "button",
        // style props
        background,
        foreground,
        boxShadowColor,
        boxShadowY,
        boxPadding,
        iconSize,
        // labeling
        "aria-label": ariaLabel,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const currentSize = mapTokensToCssVars(variants.size[size]);
    const currentActionType = mapTokensToCssVars(
        variants.actionType[actionType],
    );
    const stylePropsOverrides = React.useMemo(() => {
        // map style props to our tokens contract
        const styleTokens = {
            box: {
                padding: boxPadding,
                background,
                foreground,
                shadow: {
                    y: {
                        rest: boxShadowY?.rest,
                        hover: boxShadowY?.hover,
                        press: boxShadowY?.press,
                    },
                    color: boxShadowColor,
                },
            },
            icon: {
                size: iconSize,
            },
        } as Tokens;

        // Only include the keys with values that are not undefined
        const partialStyleTokens = cleanObject(styleTokens);

        return mapTokensToCssVars(partialStyleTokens);
    }, [
        background,
        foreground,
        boxShadowColor,
        boxShadowY,
        boxPadding,
        iconSize,
    ]);

    const buttonStyles = [
        styles.button,
        disabled && styles.disabled,
        !disabled && pressed && styles.pressed,
        currentSize as any,
        currentActionType as any,
        stylesProp?.root,
        // Include style props overrides as CSS variables
        stylePropsOverrides,
    ];

    const chonkyStyles = [
        styles.chonky,
        !disabled && pressed && styles.chonkyPressed,
        stylesProp?.box,
        disabled && styles.chonkyDisabled,
    ];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    const iconElement = React.useMemo(() => {
        if (typeof icon === "string") {
            return (
                <PhosphorIcon
                    style={[styles.icon, stylesProp?.icon]}
                    color="currentColor"
                    icon={icon}
                />
            );
        }

        return React.cloneElement(icon, {
            style: [styles.icon, stylesProp?.icon],
        });
    }, [icon, stylesProp?.icon]);

    return (
        <IconButtonUnstyled
            {...restProps}
            disabled={disabled}
            onPress={handlePress}
            ref={ref}
            style={buttonStyles}
            type={type}
            aria-label={ariaLabel}
        >
            <>
                {/* NOTE: Using a regular className to be able to use descendant selectors to account for the hover and press states */}
                <View style={chonkyStyles} className="chonky">
                    {iconElement}
                </View>
            </>
        </IconButtonUnstyled>
    );
});

const variants: {
    size: Record<string, RecursivePartial<Tokens>>;
    actionType: Record<string, RecursivePartial<Tokens>>;
} = {
    size: {
        large: {
            icon: {
                size: sizing.size_480,
            },
            box: {
                padding: sizing.size_100,
                shadow: {
                    y: {
                        rest: 6,
                        hover: 8,
                        press: sizing.size_0,
                    },
                },
            },
        },
        small: {
            icon: {
                size: sizing.size_240,
            },
            box: {
                padding: sizing.size_0,
                shadow: {
                    y: {
                        rest: 2,
                        hover: 4,
                        press: sizing.size_0,
                    },
                    color: semanticColor.learning.shadow.progress.notStarted
                        .default,
                },
            },
        },
    },
    actionType: {
        notStarted: {
            box: {
                foreground:
                    semanticColor.learning.foreground.progress.notStarted
                        .strong,
                background:
                    semanticColor.learning.background.progress.notStarted
                        .default,
                shadow: {
                    color: semanticColor.learning.shadow.progress.notStarted
                        .default,
                },
            },
        },
        attempted: {
            box: {
                foreground:
                    semanticColor.learning.foreground.progress.attempted.strong,
                background:
                    semanticColor.learning.background.progress.attempted
                        .default,
                shadow: {
                    color: semanticColor.learning.shadow.progress.attempted
                        .default,
                },
            },
        },
        complete: {
            box: {
                foreground:
                    semanticColor.learning.foreground.progress.complete.strong,
                background:
                    semanticColor.learning.background.progress.complete.default,
                shadow: {
                    color: semanticColor.learning.shadow.progress.complete
                        .default,
                },
            },
        },
    },
};

const disabledStatesStyles = {
    outline: "none",
    transform: "none",
};
const chonkyDisabled = {
    background: semanticColor.chonky.disabled.background.primary,
    color: semanticColor.chonky.disabled.foreground.primary,
    boxShadow: `0 ${theme.box.shadow.y.rest} 0 0 ${semanticColor.chonky.disabled.shadow.primary}`,
    transform: "none",
};

const chonkyPressed = {
    boxShadow: `0 ${theme.box.shadow.y.press} 0 0 ${theme.box.shadow.color}`,
    transform: `translateY(${theme.box.shadow.y.rest})`,
};

const styles = StyleSheet.create({
    /**
     * Button Styles (root)
     */
    button: {
        // theming
        borderRadius: border.radius.radius_full,
        // layout
        flexDirection: "column",
        alignSelf: "flex-start",
        justifySelf: "center",
        gap: sizing.size_020,

        /**
         * States
         *
         * Defined in the following order: hover, active, focus.
         *
         * This is important as we want to give more priority to the
         * :focus-visible styles.
         */
        [":is(:hover) .chonky" as any]: {
            boxShadow: `0 ${theme.box.shadow.y.hover} 0 0 ${theme.box.shadow.color}`,
            transform: `translateY(calc((${theme.box.shadow.y.hover} - ${theme.box.shadow.y.rest}) * -1))`,
        },

        [":is(:active) .chonky" as any]: chonkyPressed,

        // :focus-visible -> Provide focus styles for keyboard users only.
        ...focusStyles.focus,
    },
    disabled: {
        cursor: "not-allowed",
        ...disabledStatesStyles,
        // Reset hover and active styles on disabled buttons.
        ":hover": disabledStatesStyles,
        ":active": disabledStatesStyles,
        ":focus-visible": {
            transform: "none",
        },
        // Reset hover and active styles on the chonky element.
        [":is(:hover) .chonky" as any]: {
            ...chonkyDisabled,
            ...disabledStatesStyles,
        },
        // [":is(:active) .chonky" as any]: chonkyDisabled,
    },
    // Enable keyboard support for press styles.
    pressed: {
        [".chonky" as any]: chonkyPressed,
    },

    /**
     * Chonky Styles (box)
     */
    chonky: {
        // layout
        borderRadius: border.radius.radius_full,
        justifyContent: "center",
        alignItems: "center",
        padding: `${theme.box.padding}`,
        // theming
        background: `${theme.box.background}`,
        color: `${theme.box.foreground}`,
        // Gives the button a "chonky" look and feel.
        marginBlockEnd: `${theme.box.shadow.y.rest}`,
        boxShadow: `0 ${theme.box.shadow.y.rest} 0 0 ${theme.box.shadow.color}`,
        // motion
        transition: "all 0.12s ease-out",

        ["@media not (hover: hover)" as any]: {
            transition: "none",
        },
    },
    chonkyPressed,
    chonkyDisabled,

    /**
     * Icon Styles (icon)
     */
    icon: {
        inlineSize: `${theme.icon.size}`,
        blockSize: `${theme.icon.size}`,
    },
});
