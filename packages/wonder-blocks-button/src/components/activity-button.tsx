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
    ActivityButtonProps,
    ButtonRef,
} from "../util/button.types";

import {ButtonUnstyled} from "./button-unstyled";

type ButtonCoreProps = ActivityButtonProps & ChildrenProps & ClickableState;

const ActivityButtonCore: React.ForwardRefExoticComponent<
    ButtonCoreProps & React.RefAttributes<ButtonRef>
> = React.forwardRef<ButtonRef, ButtonCoreProps>(function ActivityButtonCore(
    props: ButtonCoreProps,
    ref,
) {
    const {
        actionType = "progressive",
        children,
        disabled = false,
        kind = "primary",
        focused,
        pressed,
        styles: stylesProp,
        type = undefined,
        startIcon,
        endIcon,
        hovered: _,
        waiting: __,
        ...restProps
    } = props;

    const buttonStyles = _generateStyles(actionType, disabled, kind);

    const sharedStyles = [
        buttonStyles.button,
        disabled && buttonStyles.disabled,
        !disabled && pressed && buttonStyles.pressed,
        // Enables programmatic focus.
        !disabled && !pressed && focused && buttonStyles.focused,
        stylesProp?.root,
    ];

    const chonkyStyles = [
        buttonStyles.chonky,
        disabled && buttonStyles.chonkyDisabled,
        !disabled && pressed && buttonStyles.chonkyPressed,
        stylesProp?.box,
    ];

    return (
        <ButtonUnstyled
            {...restProps}
            disabled={disabled}
            ref={ref}
            style={sharedStyles}
            type={type}
        >
            <>
                {/* NOTE: Using a regular className to be able to use descendant selectors to account for the hover and press states */}
                <View style={chonkyStyles} className="chonky">
                    {/* If startIcon is a string, we use the `PhosphorIcon` component to render it. Otherwise, we render the element directly */}
                    {startIcon &&
                        (typeof startIcon === "string" ? (
                            // We use the `PhosphorIcon` component to render the icon.
                            // It is a wrapper around the Phosphor icons library.
                            <PhosphorIcon
                                size="medium"
                                color="currentColor"
                                icon={startIcon}
                                style={[styles.icon, stylesProp?.startIcon]}
                                aria-hidden="true"
                            />
                        ) : (
                            React.cloneElement(startIcon, {
                                "aria-hidden": true,
                                style: [styles.icon, stylesProp?.startIcon],
                            })
                        ))}

                    <BodyText
                        tag="span"
                        size="medium"
                        weight="semi"
                        style={[styles.label, stylesProp?.label]}
                    >
                        {children}
                    </BodyText>
                    {/* If endIcon is a string, we use the `PhosphorIcon` component to render it. Otherwise, we render the element directly */}
                    {endIcon &&
                        (typeof endIcon === "string" ? (
                            // We use the `PhosphorIcon` component to render the icon.
                            // It is a wrapper around the Phosphor icons library.
                            <PhosphorIcon
                                size="medium"
                                color="currentColor"
                                icon={endIcon}
                                style={[styles.icon, stylesProp?.endIcon]}
                                aria-hidden="true"
                            />
                        ) : (
                            React.cloneElement(endIcon, {
                                "aria-hidden": true,
                                style: [styles.icon, stylesProp?.endIcon],
                            })
                        ))}
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
    props: ActivityButtonProps,
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
        kind = "primary",
        disabled = false,
        role,
        onMouseDown,
        onMouseUp,
        onMouseEnter,
        onMouseLeave,
        ...sharedButtonCoreProps
    } = props;

    const inRouterContext = useInRouterContext();

    const ClickableBehavior = getClickableBehavior(
        href,
        skipClientNav,
        inRouterContext,
    );

    const extraClickableProps = beforeNav ? {beforeNav} : {target};
    // Invoke link or button clickable behavior
    const roleForEvents = href ? "link" : "button";
    // prevent redundant roles for links and buttons, while allowing other roles
    // like `tab` or `menuitem`
    const renderedRole =
        role === "link" || role === "button" ? undefined : role;

    return (
        <ClickableBehavior
            disabled={disabled}
            href={href}
            role={roleForEvents}
            type={type}
            onClick={onClick}
            safeWithNav={safeWithNav}
            rel={rel}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...extraClickableProps}
        >
            {(state: ClickableState, restChildProps: ChildrenProps) => {
                return (
                    <ActivityButtonCore
                        {...sharedButtonCoreProps}
                        {...state}
                        {...restChildProps}
                        disabled={disabled}
                        kind={kind}
                        skipClientNav={skipClientNav}
                        href={href}
                        role={renderedRole}
                        target={target}
                        type={type}
                        tabIndex={tabIndex}
                        ref={ref}
                    >
                        {children}
                    </ActivityButtonCore>
                );
            }}
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
                inline: sizing.size_480,
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
        font: {
            // NOTE: This is intended by design to correctly align the text
            // with the icon in the button.
            lineHeight: sizing.size_140,
        },
        layout: {
            padding: {
                blockStart: sizing.size_040,
                blockEnd: sizing.size_060,
            },
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

// Static styles for the button.
const styles = {
    icon: {
        alignSelf: "center",
        width: theme.icon.sizing.width,
        height: theme.icon.sizing.height,
    },
    label: {
        // Inherit color from parent, so the BodyText default color isn't used in buttons
        color: "inherit",
        lineHeight: theme.label.font.lineHeight,
        paddingBlockStart: theme.label.layout.padding.blockStart,
        paddingBlockEnd: theme.label.layout.padding.blockEnd,
    },
};

const stateStyles: Record<string, any> = {};

// Dynamically generate styles for the button based on the different variants.
const _generateStyles = (
    actionType: ActivityButtonActionType = "progressive",
    disabled: boolean,
    kind: ButtonKind,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}`;
    if (stateStyles[buttonType]) {
        return stateStyles[buttonType];
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
        // To receive programmatic focus.
        focused: focusStyles.focus[":focus-visible"],
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
    } as const;

    stateStyles[buttonType] = StyleSheet.create(newStyles);
    return stateStyles[buttonType];
};
