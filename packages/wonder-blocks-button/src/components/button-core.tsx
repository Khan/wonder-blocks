import * as React from "react";
// import {CSSProperties, StyleSheet} from "aphrodite";
import {cva} from "class-variance-authority";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {
    // ThemedStylesFn,
    useScopedTheme,
    // useStyles,
} from "@khanacademy/wonder-blocks-theming";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import sharedStyles from "./button.module.css";
import type {SharedProps} from "./button";
import {ButtonThemeContext} from "../themes/themed-button";
import {ButtonIcon} from "./button-icon";

type Props = SharedProps & ChildrenProps & ClickableState;

// const StyledAnchor = addStyle("a");
// const StyledButton = addStyle("button");
// const StyledLink = addStyle(Link);
const StyledAnchor = "a";
const StyledButton = "button";
// const StyledLink = Link;

const buttonStyles = cva(sharedStyles.default, {
    variants: {
        kind: {
            primary: [sharedStyles.primary, sharedStyles.primaryDefault],
            secondary: [sharedStyles.secondary, sharedStyles.secondaryDefault],
            tertiary: [sharedStyles.tertiary, sharedStyles.tertiaryDefault],
        },
        size: {
            small: sharedStyles.small,
            medium: sharedStyles.medium,
            large: sharedStyles.large,
        },
        color: {
            default: {},
            destructive: {},
        },
        light: {
            true: {},
            false: {},
        },
        state: {
            default: {},
            hover: {},
            focus: {},
            active: {},
        },
        disabled: {
            true: sharedStyles.disabled,
            false: {},
        },
    },
    compoundVariants: [
        // primary
        {
            kind: "primary",
            color: "default",
            light: false,
            className: sharedStyles.primaryDefault,
        },
        {
            kind: "primary",
            color: "destructive",
            light: false,
            className: sharedStyles.primaryDestructive,
        },
        {
            kind: "primary",
            color: "default",
            light: true,
            className: sharedStyles.primaryDefaultLight,
        },
        {
            kind: "primary",
            color: "destructive",
            light: true,
            className: sharedStyles.primaryDestructiveLight,
        },
        {
            kind: "primary",
            size: "large",
            className: sharedStyles.primarySizeLarge,
        },
        // Focus
        {
            kind: "primary",
            color: "default",
            light: false,
            state: "focus",
            className: sharedStyles.primaryDefaultFocus,
        },
        {
            kind: "primary",
            color: "default",
            light: true,
            state: "focus",
            className: sharedStyles.primaryDefaultLightFocus,
        },
        {
            kind: "primary",
            color: "destructive",
            light: false,
            state: "focus",
            className: sharedStyles.primaryDestructiveFocus,
        },
        {
            kind: "primary",
            color: "destructive",
            light: true,
            state: "focus",
            className: sharedStyles.primaryDestructiveLightFocus,
        },
        // primary:active
        {
            kind: "primary",
            color: "default",
            light: false,
            state: "active",
            className: sharedStyles.primaryDefaultActive,
        },
        {
            kind: "primary",
            color: "default",
            light: true,
            state: "active",
            className: sharedStyles.primaryDefaultLightActive,
        },
        {
            kind: "primary",
            color: "destructive",
            light: false,
            state: "active",
            className: sharedStyles.primaryDestructiveActive,
        },
        {
            kind: "primary",
            color: "destructive",
            light: true,
            state: "active",
            className: sharedStyles.primaryDestructiveLightActive,
        },
        // primary:disabled
        {
            kind: "primary",
            color: "default",
            light: false,
            disabled: true,
            className: sharedStyles.primaryDefaultDisabled,
        },
        {
            kind: "primary",
            color: "default",
            light: true,
            disabled: true,
            className: sharedStyles.primaryDefaultLightDisabled,
        },
        {
            kind: "primary",
            color: "destructive",
            light: false,
            disabled: true,
            className: sharedStyles.primaryDestructiveDisabled,
        },
        {
            kind: "primary",
            color: "destructive",
            light: true,
            disabled: true,
            className: sharedStyles.primaryDestructiveLightDisabled,
        },
        // secondary
        {
            kind: "secondary",
            color: "default",
            light: false,
            state: "default",
            className: sharedStyles.secondaryDefault,
        },
        {
            kind: "secondary",
            color: "destructive",
            light: false,
            state: "default",
            className: sharedStyles.secondaryDestructive,
        },
        {
            kind: "secondary",
            color: ["default", "destructive"],
            light: true,
            state: "default",
            className: sharedStyles.secondaryLight,
        },
        // secondary:focus
        {
            kind: "secondary",
            color: ["default", "destructive"],
            light: false,
            state: "focus",
            className: sharedStyles.secondaryFocus,
        },
        {
            kind: "secondary",
            color: "default",
            light: false,
            state: "focus",
            className: [
                sharedStyles.secondaryDefault,
                sharedStyles.secondaryDefaultFocus,
            ],
        },
        {
            kind: "secondary",
            color: "destructive",
            light: false,
            state: "focus",
            className: [
                sharedStyles.secondaryDestructive,
                sharedStyles.secondaryDestructiveFocus,
            ],
        },
        {
            kind: "secondary",
            color: ["default", "destructive"],
            light: true,
            state: "focus",
            className: sharedStyles.secondaryLightFocus,
        },
        // secondary:active
        {
            kind: "secondary",
            color: ["default", "destructive"],
            light: false,
            state: "active",
            className: sharedStyles.secondaryActive,
        },
        {
            kind: "secondary",
            color: "default",
            light: false,
            state: "active",
            className: sharedStyles.secondaryDefaultActive,
        },
        {
            kind: "secondary",
            color: "destructive",
            light: false,
            state: "active",
            className: sharedStyles.secondaryDestructiveActive,
        },
        {
            kind: "secondary",
            color: "default",
            light: true,
            state: "active",
            className: sharedStyles.secondaryDefaultLightActive,
        },
        {
            kind: "secondary",
            color: "destructive",
            light: true,
            state: "active",
            className: sharedStyles.secondaryDestructiveLightActive,
        },
        // secondary:disabled
        {
            kind: "secondary",
            color: ["default", "destructive"],
            light: false,
            disabled: true,
            className: sharedStyles.secondaryDisabled,
        },
        {
            kind: "secondary",
            color: "default",
            light: true,
            disabled: true,
            className: sharedStyles.secondaryDefaultLightDisabled,
        },
        {
            kind: "secondary",
            color: "destructive",
            light: true,
            disabled: true,
            className: sharedStyles.secondaryDestructiveLightDisabled,
        },
        {
            kind: "secondary",
            color: ["default", "destructive"],
            light: true,
            disabled: true,
            className: sharedStyles.secondaryLightDisabled,
        },
        // tertiary
        {
            kind: "tertiary",
            color: "default",
            light: false,
            state: "default",
            className: sharedStyles.tertiaryDefault,
        },
        {
            kind: "tertiary",
            color: "destructive",
            light: false,
            state: "default",
            className: sharedStyles.tertiaryDestructive,
        },
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: true,
            state: "default",
            className: sharedStyles.tertiaryLight,
        },
        // tertiary:hover
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: false,
            state: "hover",
            className: sharedStyles.tertiaryHover,
        },
        {
            kind: "tertiary",
            color: "default",
            light: false,
            state: "hover",
            className: sharedStyles.tertiaryDefaultHover,
        },
        {
            kind: "tertiary",
            color: "destructive",
            light: false,
            state: "hover",
            className: sharedStyles.tertiaryDestructiveHover,
        },
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: true,
            state: "hover",
            className: sharedStyles.tertiaryLightHover,
        },
        // tertiary:focus
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: false,
            state: "focus",
            className: sharedStyles.tertiaryFocus,
        },
        {
            kind: "tertiary",
            color: "default",
            light: false,
            state: "focus",
            className: sharedStyles.tertiaryDefaultFocus,
        },
        {
            kind: "tertiary",
            color: "destructive",
            light: false,
            state: "focus",
            className: sharedStyles.tertiaryDestructiveFocus,
        },
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: true,
            state: "focus",
            className: sharedStyles.tertiaryLightFocus,
        },
        // tertiary:active
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: false,
            state: "active",
            className: sharedStyles.tertiaryActive,
        },
        {
            kind: "tertiary",
            color: "default",
            light: false,
            state: "active",
            className: sharedStyles.tertiaryDefaultActive,
        },
        {
            kind: "tertiary",
            color: "destructive",
            light: false,
            state: "active",
            className: sharedStyles.tertiaryDestructiveActive,
        },
        {
            kind: "tertiary",
            color: "default",
            light: true,
            state: "active",
            className: sharedStyles.tertiaryDefaultLightActive,
        },
        {
            kind: "tertiary",
            color: "destructive",
            light: true,
            state: "active",
            className: sharedStyles.tertiaryDestructiveLightActive,
        },
        // tertiary:disabled
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: false,
            disabled: true,
            className: sharedStyles.tertiaryDisabled,
        },
        {
            kind: "tertiary",
            color: "default",
            light: true,
            disabled: true,
            className: sharedStyles.tertiaryDefaultLightDisabled,
        },
        {
            kind: "tertiary",
            color: "destructive",
            light: true,
            disabled: true,
            className: sharedStyles.tertiaryDestructiveLightDisabled,
        },
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: false,
            disabled: true,
            state: "focus",
            className: sharedStyles.tertiaryDisabledFocus,
        },
        {
            kind: "tertiary",
            color: ["default", "destructive"],
            light: true,
            disabled: true,
            state: "focus",
            className: sharedStyles.tertiaryLightDisabledFocus,
        },
    ],
    defaultVariants: {
        kind: "primary",
        size: "medium",
        color: "default",
        light: false,
        state: "default",
        disabled: false,
    },
});

const ButtonCore: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ButtonCore(props: Props, ref) {
    const {theme} = useScopedTheme(ButtonThemeContext);

    const renderInner = (router: any): React.ReactNode => {
        const {
            children,
            skipClientNav,
            color,
            disabled: disabledProp,
            focused,
            hovered,
            href = undefined,
            kind = "primary",
            labelStyle,
            light = false,
            pressed,
            size = "medium",
            style,
            testId,
            type = undefined,
            spinner,
            startIcon,
            endIcon,
            id,
            waiting: _,
            ...restProps
        } = props;

        const disabled = spinner || disabledProp;

        const buttonState = pressed
            ? "active"
            : hovered || focused
            ? "focus"
            : "default";

        const defaultStyle = buttonStyles({
            kind,
            size,
            color,
            light,
            state: buttonState,
            disabled,
            // extra styles
            className: [
                theme,
                sharedStyles.shared,
                startIcon && sharedStyles.withStartIcon,
                endIcon && sharedStyles.withEndIcon,
                style,
            ],
        });

        const commonProps = {
            "data-testid": testId,
            id: id,
            role: "button",
            // style: [defaultStyle, style],
            className: defaultStyle,
            ...restProps,
        } as const;

        const Label = size === "small" ? LabelSmall : LabelLarge;

        const label = (
            <Label
                style={[
                    sharedStyles.text,
                    size === "large" && sharedStyles.largeText,
                    labelStyle,
                    spinner && sharedStyles.hiddenText,
                    kind === "tertiary" && sharedStyles.textWithFocus,
                    // apply press/hover effects on the label
                    // TODO(juan): figure out this part
                    kind === "tertiary" &&
                        !disabled &&
                        (pressed
                            ? [
                                  sharedStyles.tertiaryHover,
                                  sharedStyles.tertiaryActive,
                              ]
                            : hovered && sharedStyles.tertiaryHover),
                ]}
                testId={testId ? `${testId}-inner-label` : undefined}
            >
                {children}
            </Label>
        );

        const sizeMapping = {
            medium: "small",
            small: "xsmall",
            large: "medium",
        } as const;

        // We have to use `medium` for both md and lg buttons so we can fit the
        // icons in large buttons.
        const iconSize = size === "small" ? "small" : "medium";

        const contents = (
            <React.Fragment>
                {startIcon && (
                    <View
                        // The start icon doesn't have the circle around it
                        // in the Khanmigo theme, but we wrap it with
                        // iconWrapper anyway to give it the same spacing
                        // as the end icon so the button is symmetrical.
                        style={sharedStyles.iconWrapper}
                    >
                        <ButtonIcon
                            size={iconSize}
                            icon={startIcon}
                            style={[
                                sharedStyles.startIcon,
                                kind === "tertiary" &&
                                    sharedStyles.tertiaryStartIcon,
                            ]}
                            testId={testId ? `${testId}-start-icon` : undefined}
                        />
                    </View>
                )}
                {label}
                {spinner && (
                    <CircularSpinner
                        style={sharedStyles.spinner}
                        size={sizeMapping[size]}
                        light={kind === "primary"}
                        testId={`${testId || "button"}-spinner`}
                    />
                )}
                {endIcon && (
                    <View
                        testId={
                            testId ? `${testId}-end-icon-wrapper` : undefined
                        }
                        style={[
                            // styles.endIcon,
                            sharedStyles.endIcon,
                            sharedStyles.iconWrapper,
                            sharedStyles.endIconWrapper,
                            kind === "tertiary" &&
                                sharedStyles.endIconWrapperTertiary,
                            (focused || hovered) &&
                                kind !== "primary" &&
                                sharedStyles.iconWrapperSecondaryHovered,
                        ]}
                    >
                        <ButtonIcon
                            size={iconSize}
                            icon={endIcon}
                            testId={testId ? `${testId}-end-icon` : undefined}
                        />
                    </View>
                )}
            </React.Fragment>
        );

        if (href && !disabled) {
            return router && !skipClientNav && isClientSideUrl(href) ? (
                <Link
                    {...commonProps}
                    to={href}
                    // TODO(juan): fix this
                    ref={ref as React.Ref<typeof Link>}
                >
                    {contents}
                </Link>
            ) : (
                <StyledAnchor
                    {...commonProps}
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {contents}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton
                    type={type || "button"}
                    {...commonProps}
                    aria-disabled={disabled}
                    ref={ref as React.Ref<HTMLButtonElement>}
                >
                    {contents}
                </StyledButton>
            );
        }
    };

    return (
        <__RouterContext.Consumer>
            {(router) => renderInner(router)}
        </__RouterContext.Consumer>
    );
});

export default ButtonCore;
