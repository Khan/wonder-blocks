import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import type {BaseIconButtonProps} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";
import {
    mapTokensToVariables,
    TokensAsCssVariable,
    TokensAsJsVariable,
} from "../util/map-tokens-to-variables";

/**
 * The prefix for the CSS variables used in the NodeIconButton component.
 *
 * This allows us to avoid collisions with other CSS variables in the
 * application.
 */
const VAR_PREFIX = "--wb-node-icon-button--";

/**
 * The valid component-level tokens for the NodeIconButton component.
 */
type TokenKeys =
    // Box tokens
    | "box-foreground"
    | "box-background"
    | "box-shadow-color"
    | "box-padding"
    | "box-shadow-y-rest"
    | "box-shadow-y-hover"
    | "box-shadow-y-press"
    // Icon tokens
    | "icon-size";

/**
 * A subset of tokens that can be included in different variants.
 */
type PartialTokens = Partial<TokensAsCssVariable<typeof VAR_PREFIX, TokenKeys>>;

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
     */
    styles?: {
        root?: StyleType;
        box?: StyleType;
        icon?: StyleType;
    };

    /**
     * The token object that contains the CSS variables that can be overridden
     * to customize the appearance of the NodeIconButton component.
     *
     * Valid keys are:
     * - `boxForeground`
     * - `boxBackground`
     * - `boxShadowColor`
     * - `boxPadding`
     * - `boxShadowYRest`
     * - `boxShadowYHover`
     * - `boxShadowYPress`
     * - `iconSize`
     */
    tokens?: Partial<TokensAsJsVariable<TokenKeys>>;
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
        tokens,
        type = "button",
        // labeling
        "aria-label": ariaLabel,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const buttonStyles = React.useMemo(
        () => [
            styles.button,
            disabled && styles.disabled,
            !disabled && pressed && styles.pressed,
            variants.size[size] as any,
            variants.actionType[actionType] as any,
            stylesProp?.root,
            // Token overrides.
            tokens && mapTokensToVariables(tokens, VAR_PREFIX),
        ],
        [actionType, disabled, pressed, size, stylesProp?.root, tokens],
    );

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
    size: Record<string, PartialTokens>;
    actionType: Record<string, PartialTokens>;
} = {
    size: {
        // Default size.
        large: {
            "--wb-node-icon-button--icon-size": sizing.size_480,
            "--wb-node-icon-button--box-padding": sizing.size_100,
            // NOTE: We use px units to prevent a bug in Safari where the shadow
            // animation flickers when using rem units.
            "--wb-node-icon-button--box-shadow-y-rest": "6px",
            "--wb-node-icon-button--box-shadow-y-hover": "8px",
            "--wb-node-icon-button--box-shadow-y-press": sizing.size_0,
        },
        small: {
            "--wb-node-icon-button--icon-size": sizing.size_240,
            "--wb-node-icon-button--box-padding": sizing.size_0,
            "--wb-node-icon-button--box-shadow-y-rest": "2px",
            "--wb-node-icon-button--box-shadow-y-hover": "4px",
            "--wb-node-icon-button--box-shadow-y-press": sizing.size_0,
        },
    },
    actionType: {
        // Default action type.
        notStarted: {
            "--wb-node-icon-button--box-foreground":
                semanticColor.learning.foreground.progress.notStarted.strong,
            "--wb-node-icon-button--box-background":
                semanticColor.learning.background.progress.notStarted.default,
            "--wb-node-icon-button--box-shadow-color":
                semanticColor.learning.shadow.progress.notStarted.default,
        },
        attempted: {
            "--wb-node-icon-button--box-foreground":
                semanticColor.learning.foreground.progress.attempted.strong,
            "--wb-node-icon-button--box-background":
                semanticColor.learning.background.progress.attempted.default,
            "--wb-node-icon-button--box-shadow-color":
                semanticColor.learning.shadow.progress.attempted.default,
        },
        complete: {
            "--wb-node-icon-button--box-foreground":
                semanticColor.learning.foreground.progress.complete.strong,
            "--wb-node-icon-button--box-background":
                semanticColor.learning.background.progress.complete.default,
            "--wb-node-icon-button--box-shadow-color":
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
    boxShadow: `0 var(--wb-node-icon-button--box-shadow-y-rest) 0 0 ${semanticColor.chonky.disabled.shadow.primary}`,
    transform: "none",
};

const chonkyPressed = {
    boxShadow: `0 var(--wb-node-icon-button--box-shadow-y-press) 0 0 var(--wb-node-icon-button--box-shadow-color)`,
    transform: `translateY(var(--wb-node-icon-button--box-shadow-y-rest))`,
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
            boxShadow: `0 var(--wb-node-icon-button--box-shadow-y-hover) 0 0 var(--wb-node-icon-button--box-shadow-color)`,
            transform: `translateY(calc((var(--wb-node-icon-button--box-shadow-y-hover) - var(--wb-node-icon-button--box-shadow-y-rest)) * -1))`,
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
        padding: "var(--wb-node-icon-button--box-padding)",
        width: "100%",
        height: "100%",
        // theming
        background: "var(--wb-node-icon-button--box-background)",
        color: "var(--wb-node-icon-button--box-foreground)",
        // Gives the button a "chonky" look and feel.
        marginBlockEnd: "var(--wb-node-icon-button--box-shadow-y-rest)",
        boxShadow: `0 var(--wb-node-icon-button--box-shadow-y-rest) 0 0 var(--wb-node-icon-button--box-shadow-color)`,
        // motion
        transition: "0.12s ease-out",
        // NOTE: We only want to transition the properties that are being
        // animated.
        transitionProperty: "box-shadow, transform, margin-block-end",

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
        inlineSize: "var(--wb-node-icon-button--icon-size)",
        blockSize: "var(--wb-node-icon-button--icon-size)",
    },
});
