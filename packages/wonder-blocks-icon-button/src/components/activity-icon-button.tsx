import * as React from "react";
import {CSSProperties, StyleSheet} from "aphrodite";
import {Link} from "react-router-dom-v5-compat";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import type {
    ActivityIconButtonActionType,
    ActivityIconButtonProps,
    IconButtonKind,
} from "../util/icon-button.types";

import {IconButtonUnstyled} from "./icon-button-unstyled";
import themeTokens from "../theme";

type AriaLabelOnly = {
    /**
     * The alternative text for the icon button. Use `aria-label` for when
     * there's no visible label for the button, such as when the button only
     * contains an icon.
     */
    "aria-label": string;
    label?: never;
};

type LabelOnly = {
    "aria-label"?: never;
    /**
     * A label for the button that describes its action.
     *
     * NOTE: If `label` is set, then `aria-label` will be ignored.
     */
    label: string;
};

type Props = ActivityIconButtonProps &
    (AriaLabelOnly | LabelOnly) & {
        /**
         * The action type of the button. This determines the visual style of the
         * button.
         *
         * - `progressive` is used for actions that move the user forward in a flow.
         * - `neutral` is used for buttons that indicate a neutral action.
         */
        actionType?: ActivityIconButtonActionType;
    };

/**
 * `ActivityIconButton` is an icon button that is used for actions in the
 * context of learner activities. It uses a "chonky" design, which is a more
 * playful and engaging design that is suitable for learner activities
 *
 * ```tsx
 * import magnifyingGlassIcon from
 * "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {ActivityIconButton} from "@khanacademy/wonder-blocks-icon-button";
 *
 * <ActivityIconButton
 *     icon={magnifyingGlassIcon}
 *     aria-label="An Icon"
 *     onClick={(e) => console.log("Hello, world!")}
 * />
 * ```
 */
export const ActivityIconButton: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ActivityIconButton(props: Props, ref) {
    const {
        actionType = "progressive",
        disabled = false,
        icon,
        kind = "primary",
        styles: stylesProp,
        type = "button",
        // labeling
        "aria-label": ariaLabel,
        label,
        ...restProps
    } = props;

    const [pressed, setPressed] = React.useState(false);

    const buttonStyles = _generateStyles(actionType, !!disabled, kind);

    const styles = [
        buttonStyles.button,
        disabled && buttonStyles.disabled,
        !disabled && pressed && buttonStyles.pressed,
        stylesProp?.root,
    ];

    const chonkyStyles = [
        buttonStyles.chonky,
        disabled && buttonStyles.chonkyDisabled,
        !disabled && pressed && buttonStyles.chonkyPressed,
        stylesProp?.box,
    ];

    const handlePress = React.useCallback((isPressing: boolean) => {
        setPressed(isPressing);
    }, []);

    const hasVisibleLabel = label !== undefined && label !== "";

    const iconElement = React.useMemo(() => {
        if (typeof icon === "string") {
            return (
                <PhosphorIcon size="medium" color="currentColor" icon={icon} />
            );
        }

        return icon;
    }, [icon]);

    return (
        <IconButtonUnstyled
            {...restProps}
            disabled={disabled}
            onPress={handlePress}
            ref={ref}
            style={styles}
            type={type}
            {...(!hasVisibleLabel ? {"aria-label": ariaLabel} : {})}
        >
            <>
                {/* NOTE: Using a regular className to be able to use descendant selectors to account for the hover and press states */}
                <View style={chonkyStyles} className="chonky">
                    {iconElement}
                </View>
                {hasVisibleLabel && (
                    <BodyText
                        tag="span"
                        size="medium"
                        weight="semi"
                        style={[buttonStyles.label, stylesProp?.label]}
                    >
                        {label}
                    </BodyText>
                )}
            </>
        </IconButtonUnstyled>
    );
});

// NOTE: Theme is defined in the file directly to avoid generating CSS variables
// as we are reusing the following tokens in all themes.
const theme = {
    root: {
        border: {
            width: {
                primary: {
                    rest: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
                secondary: {
                    rest: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
                tertiary: {
                    rest: border.width.thin,
                    hover: border.width.thin,
                    press: border.width.thin,
                },
            },
            radius: border.radius.radius_120,
        },
        layout: {
            padding: {
                block: sizing.size_140,
                inline: sizing.size_200,
            },
        },
        shadow: {
            y: {
                // NOTE: We use px units to prevent a bug in Safari where the
                // shadow animation flickers when using rem units.
                rest: "6px",
                hover: "8px",
                press: sizing.size_0,
            },
        },
    },
    label: {
        color: {
            progressive: themeTokens.activityIconButton.label.color.progressive,
            neutral: semanticColor.core.foreground.neutral.default,
            disabled: semanticColor.core.foreground.disabled.default,
        },
        layout: {
            inlineSize: sizing.size_640,
        },
    },
};

const styles: Record<string, any> = {};

const _generateStyles = (
    actionType: ActivityIconButtonActionType = "progressive",
    disabled: boolean,
    kind: IconButtonKind,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const borderWidthKind = theme.root.border.width[kind];
    const themeVariant = semanticColor.chonky[actionType];
    const disabledState = semanticColor.chonky.disabled;

    const disabledStatesStyles = {
        outline: "none",
        transform: "none",
    };
    const chonkyDisabled = {
        background: disabledState.background[kind],
        borderWidth: borderWidthKind.rest,
        borderColor: disabledState.border[kind],
        color: disabledState.foreground[kind],
        boxShadow: `0 ${theme.root.shadow.y.rest} 0 0 ${disabledState.shadow[kind]}`,
        transform: "none",
    };

    const chonkyPressed = {
        // theming
        background: themeVariant.background[kind].press,
        border: `${borderWidthKind.press} solid ${themeVariant.border[kind].press}`,
        boxShadow: `0 ${theme.root.shadow.y.press} 0 0 ${themeVariant.shadow[kind].press}`,
        color: themeVariant.foreground[kind].press,
        // motion
        transform: `translateY(${theme.root.shadow.y.rest})`,
    };

    const newStyles: Record<string, CSSProperties> = {
        button: {
            // theming
            // Used for the focus ring.
            borderRadius: theme.root.border.radius,
            color: theme.label.color[actionType],
            // layout
            flexDirection: "column",
            gap: sizing.size_020,
            // Putting an arbitrary max inline size to prevent the button from
            // stretching to fill the parent.
            maxInlineSize: 200,
            alignSelf: "flex-start",
            justifySelf: "center",
            /**
             * States
             *
             * Defined in the following order: hover, active, focus.
             *
             * This is important as we want to give more priority to the
             * :focus-visible styles.
             */
            [":is(:hover) .chonky" as any]: {
                background: themeVariant.background[kind].hover,
                border: `${borderWidthKind.hover} solid ${themeVariant.border[kind].hover}`,
                boxShadow: `0 ${theme.root.shadow.y.hover} 0 0 ${themeVariant.shadow[kind].hover}`,
                color: themeVariant.foreground[kind].hover,
                // motion
                transform: `translateY(calc((${theme.root.shadow.y.hover} - ${theme.root.shadow.y.rest}) * -1))`,
            },

            [":is(:active) .chonky" as any]: chonkyPressed,

            // :focus-visible -> Provide focus styles for keyboard users only.
            ...focusStyles.focus,
        },
        disabled: {
            cursor: "not-allowed",
            color: theme.label.color.disabled,
            ...disabledStatesStyles,
            // Reset hover and active styles on disabled buttons.
            ":hover": disabledStatesStyles,
            ":active": disabledStatesStyles,
            ":focus-visible": {
                transform: "none",
            },
            // Reset hover and active styles on the chonky element.
            [":is(:hover) .chonky" as any]: disabledStatesStyles,
            [":is(:hover) .chonky" as any]: chonkyDisabled,
            [":is(:active) .chonky" as any]: chonkyDisabled,
        },
        // Enable keyboard support for press styles.
        pressed: {
            [".chonky" as any]: chonkyPressed,
        },

        chonky: {
            // layout
            // Used for the chonky box.
            borderRadius: theme.root.border.radius,
            marginBlockEnd: theme.root.shadow.y.rest,
            paddingBlock: theme.root.layout.padding.block,
            paddingInline: theme.root.layout.padding.inline,
            inlineSize: theme.label.layout.inlineSize,
            justifyContent: "center",
            alignItems: "center",
            // theming
            background: themeVariant.background[kind].rest,
            border: `${borderWidthKind.rest} solid ${themeVariant.border[kind].rest}`,
            color: themeVariant.foreground[kind].rest,
            // Gives the button a "chonky" look and feel.
            boxShadow: `0 ${theme.root.shadow.y.rest} 0 0 ${themeVariant.shadow[kind].rest}`,
            // motion
            transition: "all 0.12s ease-out",

            ["@media not (hover: hover)" as any]: {
                transition: "none",
            },
        },
        chonkyPressed,
        chonkyDisabled,
        /**
         * Label
         */
        label: {
            margin: 0,
            textAlign: "center",
            // text clipping
            // @see https://css-tricks.com/line-clampin/#aa-the-standardized-way
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            // We restrict the label to a maximum of 2 lines.
            WebkitLineClamp: "2",
            overflow: "hidden",
            wordBreak: "break-word",
            color: "inherit",
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
