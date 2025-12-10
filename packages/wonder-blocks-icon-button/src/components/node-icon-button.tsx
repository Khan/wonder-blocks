import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {StyleType, View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import type {BaseIconButtonProps} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";

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
        // tokens?: Tokens;
    };

    /**
     * Style props
     */
    background?: string;
    color?: string;
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
        color,
        boxShadowColor,
        boxShadowY,
        boxPadding,
        iconSize,
        // labeling
        "aria-label": ariaLabel,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const chonkyPressed = {
        boxShadow: getBoxShadow(
            boxShadowY?.press ?? styleMap.boxShadowY.large.press,
            boxShadowColor ?? styleMap.boxShadowColor[actionType],
        ),
        transform: `translateY(${boxShadowY?.rest ?? styleMap.boxShadowY.large.rest})`,
    };

    const dynamicButtonStyles = {
        [":is(:hover) .chonky" as any]: {
            boxShadow: getBoxShadow(
                boxShadowY?.hover ?? styleMap.boxShadowY.large.hover,
                boxShadowColor ?? styleMap.boxShadowColor[actionType],
            ),
            transform: `translateY(calc((${boxShadowY?.hover ?? styleMap.boxShadowY.large.hover} - ${boxShadowY?.rest ?? styleMap.boxShadowY.large.rest}) * -1))`,
        },
        [":is(:active) .chonky" as any]: chonkyPressed,
    };

    const buttonStyles = [
        styles.button,
        dynamicButtonStyles,
        disabled && styles.disabled,
        stylesProp?.root,
    ];

    const dynamicChonkyStyles = {
        background: background ?? styleMap.backgroundColor[actionType],
        color: color ?? styleMap.color[actionType],
        boxShadow: getBoxShadow(
            boxShadowY?.rest ?? styleMap.boxShadowY.large.rest,
            boxShadowColor ?? styleMap.boxShadowColor[actionType],
        ),
        padding: boxPadding ?? styleMap.boxPadding[size],
    };

    const chonkyStyles = [
        styles.chonky,
        !disabled && pressed && chonkyPressed,
        dynamicChonkyStyles,
        stylesProp?.box,
        disabled && chonkyDisabled,
    ];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    const iconElement = React.useMemo(() => {
        if (typeof icon === "string") {
            return (
                <PhosphorIcon
                    style={[
                        iconSize
                            ? {inlineSize: iconSize, blockSize: iconSize}
                            : styles.icon,
                        stylesProp?.icon,
                    ]}
                    color="currentColor"
                    icon={icon}
                />
            );
        }

        return React.cloneElement(icon, {
            style: [
                iconSize
                    ? {inlineSize: iconSize, blockSize: iconSize}
                    : styles.icon,
                stylesProp?.icon,
            ],
        });
    }, [icon, iconSize, stylesProp?.icon]);

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

function getBoxShadow(y: string | number, color: string) {
    return `0 ${y} 0 0 ${color}`;
}

const styleMap = {
    backgroundColor: {
        notStarted:
            semanticColor.learning.background.progress.notStarted.default,
        attempted: semanticColor.learning.background.progress.attempted.default,
        complete: semanticColor.learning.background.progress.complete.default,
    },
    color: {
        notStarted:
            semanticColor.learning.foreground.progress.notStarted.strong,
        attempted: semanticColor.learning.foreground.progress.attempted.strong,
        complete: semanticColor.learning.foreground.progress.complete.strong,
    },
    boxShadowColor: {
        notStarted: semanticColor.learning.shadow.progress.notStarted.default,
        attempted: semanticColor.learning.shadow.progress.attempted.default,
        complete: semanticColor.learning.shadow.progress.complete.default,
    },
    boxShadowY: {
        large: {
            rest: "6px",
            hover: "8px",
            press: sizing.size_0,
        },
        small: {
            rest: "2px",
            hover: "4px",
            press: sizing.size_0,
        },
    },
    iconSize: {
        large: sizing.size_480,
        small: sizing.size_240,
    },
    boxPadding: {
        large: sizing.size_100,
        small: sizing.size_0,
    },
} as const;

const disabledStatesStyles = {
    outline: "none",
    transform: "none",
};
const chonkyDisabled = {
    background: semanticColor.chonky.disabled.background.primary,
    color: semanticColor.chonky.disabled.foreground.primary,
    boxShadow: `0 ${styleMap.boxShadowY.large.rest} 0 0 ${semanticColor.chonky.disabled.shadow.primary}`,
    transform: "none",
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
        [":is(:active) .chonky" as any]: chonkyDisabled,
    },

    /**
     * Chonky Styles (box)
     */
    chonky: {
        // layout
        borderRadius: border.radius.radius_full,
        justifyContent: "center",
        alignItems: "center",
        padding: styleMap.boxPadding.large,
        // Gives the button a "chonky" look and feel.
        marginBlockEnd: styleMap.boxShadowY.large.rest,

        // motion
        transition: "all 0.12s ease-out",

        ["@media not (hover: hover)" as any]: {
            transition: "none",
        },
    },

    /**
     * Icon Styles (icon)
     */
    icon: {
        inlineSize: styleMap.iconSize.large,
        blockSize: styleMap.iconSize.large,
    },
});
