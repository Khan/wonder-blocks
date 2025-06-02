import * as React from "react";
import {CSSProperties, StyleSheet} from "aphrodite";
import {useInRouterContext} from "react-router-dom-v5-compat";

import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {
    ChildrenProps,
    ClickableState,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-clickable";
import type {
    ActivityButtonActionType,
    ButtonKind,
    ButtonProps,
    ButtonRef,
} from "../util/button.types";

import {ButtonUnstyled} from "./button-unstyled";

type Props = Omit<ButtonProps, "actionType" | "size"> & {
    /**
     * The action type of the button. This determines the visual style of the
     * button.
     *
     * - `progressive` is used for actions that move the user forward in a flow.
     * - `neutral` is used for buttons that indicate a neutral action.
     */
    actionType?: ActivityButtonActionType;
};

type ButtonCoreProps = Props & ChildrenProps & ClickableState;

const ActivityButtonCore: React.ForwardRefExoticComponent<
    ButtonCoreProps & React.RefAttributes<ButtonRef>
> = React.forwardRef<ButtonRef, ButtonCoreProps>(function ActivityButtonCore(
    props: ButtonCoreProps,
    ref,
) {
    const {
        children,
        actionType,
        disabled: disabledProp = false,
        kind = "primary",
        pressed,
        style,
        type = undefined,
        spinner,
        startIcon,
        endIcon,
        waiting: _,
        ...restProps
    } = props;

    const buttonStyles = _generateStyles(actionType, disabledProp, kind);

    const disabled = spinner || disabledProp;

    const styles = [
        buttonStyles.button,
        disabled && buttonStyles.disabled,
        !disabled && pressed && buttonStyles.pressed,
        style,
    ];

    const chonkyStyles = [
        buttonStyles.chonky,
        disabled && buttonStyles.chonkyDisabled,
        !disabled && pressed && buttonStyles.chonkyPressed,
    ];

    return (
        <ButtonUnstyled
            {...restProps}
            disabled={disabled}
            ref={ref}
            style={styles}
            type={type}
        >
            <>
                {/* NOTE: Using a regular className to be able to use descendant selectors to account for the hover and press states */}
                <View style={chonkyStyles} className="chonky">
                    {startIcon && (
                        // We use the `PhosphorIcon` component to render the icon.
                        // It is a wrapper around the Phosphor icons library.
                        <PhosphorIcon
                            size="medium"
                            color="currentColor"
                            icon={startIcon}
                            style={buttonStyles.icon}
                            aria-hidden="true"
                        />
                    )}

                    <BodyText tag="span" size="medium" weight="semi">
                        {children}
                    </BodyText>

                    {endIcon && (
                        // We use the `PhosphorIcon` component to render the icon.
                        // It is a wrapper around the Phosphor icons library.
                        <PhosphorIcon
                            size="medium"
                            color="currentColor"
                            icon={endIcon}
                            style={buttonStyles.icon}
                            aria-hidden="true"
                        />
                    )}
                </View>
            </>
        </ButtonUnstyled>
    );
});

/**
 * `ActivityButton` is a button that is used for actions in the context of
 * learner activities. It uses a "chonky" design, which is a more playful and
 * engaging design that is suitable for learner activities.
 *
 * ```tsx
 * import magnifyingGlassIcon from
 * "@phosphor-icons/core/regular/magnifying-glass.svg";
 * import {ActivityButton} from "@khanacademy/wonder-blocks-button";
 *
 * <ActivityButton
 *     startIcon={magnifyingGlassIcon}
 *     onClick={(e) => console.log("Hello, world!")}
 * >
 *  Hello, world!
 * </ActivityButton>
 * ```
 */
export const ActivityButton = React.forwardRef(function ActivityButton(
    props: Props,
    ref: React.ForwardedRef<ButtonRef>,
) {
    const {
        href = undefined,
        type = undefined,
        children,
        skipClientNav,
        onClick,
        beforeNav = undefined,
        safeWithNav = undefined,
        tabIndex,
        target,
        rel,
        actionType = "progressive",
        kind = "primary",
        disabled = false,
        spinner = false,
        ...sharedButtonCoreProps
    } = props;

    const inRouterContext = useInRouterContext();

    const ClickableBehavior = getClickableBehavior(
        href,
        skipClientNav,
        inRouterContext,
    );

    const extraClickableProps = beforeNav ? {beforeNav} : {target};

    return (
        <ClickableBehavior
            disabled={spinner || disabled}
            href={href}
            role={href ? "link" : "button"}
            type={type}
            onClick={onClick}
            safeWithNav={safeWithNav}
            rel={rel}
            {...extraClickableProps}
        >
            {(state: ClickableState, restChildProps: ChildrenProps) => (
                <ActivityButtonCore
                    {...sharedButtonCoreProps}
                    {...state}
                    {...restChildProps}
                    disabled={disabled}
                    spinner={spinner || state.waiting}
                    actionType={actionType}
                    kind={kind}
                    skipClientNav={skipClientNav}
                    href={href}
                    target={target}
                    type={type}
                    tabIndex={tabIndex}
                    ref={ref}
                >
                    {children}
                </ActivityButtonCore>
            )}
        </ClickableBehavior>
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
            progressive: semanticColor.core.foreground.instructive.default,
            neutral: semanticColor.core.foreground.neutral.default,
            disabled: semanticColor.core.foreground.disabled.default,
        },
        layout: {
            width: sizing.size_640,
        },
    },
    icon: {
        sizing: {
            height: sizing.size_200,
            width: sizing.size_200,
        },
    },
};

const styles: Record<string, any> = {};

const _generateStyles = (
    actionType: ActivityButtonActionType = "progressive",
    disabled: boolean,
    kind: ButtonKind,
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
            // Applying a transparent background to allow the chonky box to show
            // through.
            background: "transparent",
            // Used for the focus ring.
            borderRadius: theme.root.border.radius,
            color: theme.label.color[actionType],
            // layout
            height: "auto",
            flexDirection: "column",
            gap: sizing.size_020,
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
            // Spacing between the icon(s) and the label.
            flexDirection: "row",
            gap: sizing.size_080,
            // Used for the chonky box.
            borderRadius: theme.root.border.radius,
            marginBlockEnd: theme.root.shadow.y.rest,
            maxWidth: "100%",
            paddingBlock: theme.root.layout.padding.block,
            paddingInline: theme.root.layout.padding.inline,
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
         * Inner elements
         */
        icon: {
            width: theme.icon.sizing.width,
            height: theme.icon.sizing.height,
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
