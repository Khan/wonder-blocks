import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import type {BaseIconButtonProps} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";

type Tokens = Partial<{
    "--box-foreground": string;
    "--box-background": string;
    "--box-shadow-color": string;
    "--box-padding": string | number;
    "--icon-inline-size": string | number;
    "--icon-block-size": string | number;
    "--box-shadow-y-rest": string | number;
    "--box-shadow-y-hover": string | number;
    "--box-shadow-y-press": string | number;
}>;

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
        tokens?: Tokens;
    };
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
        // labeling
        "aria-label": ariaLabel,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const buttonStyles = [
        styles.button,
        disabled && styles.disabled,
        !disabled && pressed && styles.pressed,
        tokens.size[size] as any,
        tokens.actionType[actionType] as any,
        stylesProp?.root,
        stylesProp?.tokens,
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

const tokens: {
    size: Record<string, Tokens>;
    actionType: Record<string, Tokens>;
} = {
    size: {
        // Default size.
        large: {
            "--icon-inline-size": sizing.size_480,
            "--icon-block-size": sizing.size_480,
            "--box-padding": sizing.size_100,
            // NOTE: We use px units to prevent a bug in Safari where the shadow
            // animation flickers when using rem units.
            "--box-shadow-y-rest": 6,
            "--box-shadow-y-hover": 8,
            "--box-shadow-y-press": sizing.size_0,
        },
        small: {
            "--icon-inline-size": sizing.size_240,
            "--icon-block-size": sizing.size_240,
            "--box-padding": sizing.size_0,
            "--box-shadow-y-rest": 2,
            "--box-shadow-y-hover": 4,
            "--box-shadow-y-press": sizing.size_0,
        },
    },
    actionType: {
        // Default action type.
        notStarted: {
            "--box-foreground":
                semanticColor.learning.foreground.progress.notStarted.strong,
            "--box-background":
                semanticColor.learning.background.progress.notStarted.default,
            "--box-shadow-color":
                semanticColor.learning.shadow.progress.notStarted.default,
        },
        attempted: {
            "--box-foreground":
                semanticColor.learning.foreground.progress.attempted.strong,
            "--box-background":
                semanticColor.learning.background.progress.attempted.default,
            "--box-shadow-color":
                semanticColor.learning.shadow.progress.attempted.default,
        },
        complete: {
            "--box-foreground":
                semanticColor.learning.foreground.progress.complete.strong,
            "--box-background":
                semanticColor.learning.background.progress.complete.default,
            "--box-shadow-color":
                semanticColor.learning.shadow.progress.complete.default,
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
    boxShadow: `0 var(--box-shadow-y-rest) 0 0 ${semanticColor.chonky.disabled.shadow.primary}`,
    transform: "none",
};

const chonkyPressed = {
    boxShadow: `0 var(--box-shadow-y-press) 0 0 var(--box-shadow-color)`,
    transform: `translateY(var(--box-shadow-y-rest))`,
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
            boxShadow: `0 var(--box-shadow-y-hover) 0 0 var(--box-shadow-color)`,
            transform: `translateY(calc((var(--box-shadow-y-hover) - var(--box-shadow-y-rest)) * -1))`,
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
        padding: "var(--box-padding)",
        // theming
        background: "var(--box-background)",
        color: "var(--box-foreground)",
        // Gives the button a "chonky" look and feel.
        marginBlockEnd: "var(--box-shadow-y-rest)",
        boxShadow: `0 var(--box-shadow-y-rest) 0 0 var(--box-shadow-color)`,
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
        inlineSize: "var(--icon-inline-size)",
        blockSize: "var(--icon-block-size)",
    },
});
