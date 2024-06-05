import * as React from "react";
// import {CSSProperties, StyleSheet} from "aphrodite";
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
import {SystemStyleObject} from "@/styled-system/types";
import {css} from "@/styled-system/css";
import type {SharedProps} from "./button";
import {ButtonThemeContext, ButtonThemeContract} from "../themes/themed-button";
import {ButtonIcon} from "./button-icon";

type Props = SharedProps & ChildrenProps & ClickableState;

const StyledAnchor = "a"; //addStyle("a");
const StyledButton = "button"; //addStyle("button");
const StyledLink = Link; //addStyle(Link);

const ButtonCore: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function ButtonCore(props: Props, ref) {
    const {theme, themeName} = useScopedTheme(ButtonThemeContext);
    // const sharedStyles = useStyles(themedSharedStyles, theme);
    const sharedStyles = themedSharedStyles;

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

        const buttonStyles = _generateStyles(
            color,
            kind,
            light,
            size,
            theme,
            themeName,
        );

        const disabled = spinner || disabledProp;

        const defaultStyle = css(
            sharedStyles.shared,
            disabled && sharedStyles.disabled,
            startIcon && sharedStyles.withStartIcon,
            endIcon && sharedStyles.withEndIcon,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
            // apply focus effect only to default and secondary buttons
            kind !== "tertiary" &&
                !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
            kind === "tertiary" &&
                !pressed &&
                focused && [
                    buttonStyles.focus,
                    disabled && buttonStyles.disabledFocus,
                ],
            size === "small" && sharedStyles.small,
            size === "large" && sharedStyles.large,
            style ? (style as SystemStyleObject) : undefined,
        );

        const commonProps = {
            "data-testid": testId,
            id: id,
            role: "button",
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
                    kind === "tertiary" &&
                        !disabled &&
                        (pressed
                            ? [buttonStyles.hover, buttonStyles.active]
                            : hovered && buttonStyles.hover),
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
                            styles.endIcon,
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
                <StyledLink
                    {...commonProps}
                    to={href}
                    // TODO(juan): fix this
                    // ref={ref as React.Ref<typeof Link>}
                >
                    {contents}
                </StyledLink>
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
                    data-panda-theme={theme.theme}
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

const themedSharedStyles: Record<string, SystemStyleObject> = {
    shared: css.raw({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "height.medium",
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: "padding.large",
        paddingRight: "padding.large",
        border: "none",
        borderRadius: "default",
        cursor: "pointer",
        outline: "none",
        outlineOffset: 0,
        textDecoration: "none",
        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        userSelect: "none",
        "&:focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    }),
    disabled: css.raw({
        cursor: "auto",
    }),
    small: css.raw({
        borderRadius: "small",
        height: "height.small",
    }),
    large: css.raw({
        borderRadius: "large",
        height: "height.large",
    }),
    text: css.raw({
        alignItems: "center",
        fontWeight: "default",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "inline-block", // allows the button text to truncate
        pointerEvents: "none", // fix Safari bug where the browser was eating mouse events
    }),
    largeText: css.raw({
        fontSize: "large",
        lineHeight: "large",
    }),
    textWithFocus: css.raw({
        position: "relative", // allows the tertiary button border to use the label width
    }),
    hiddenText: css.raw({
        visibility: "hidden",
    }),
    spinner: css.raw({
        position: "absolute",
    }),
    startIcon: css.raw({
        marginRight: "padding.small",
        marginLeft: "margin.icon.offset",
    }),
    tertiaryStartIcon: css.raw({
        // Undo the negative padding from startIcon since tertiary
        // buttons don't have extra padding.
        marginLeft: 0,
    }),
    endIcon: css.raw({
        marginLeft: "padding.small",
    }),
    iconWrapper: css.raw({
        borderRadius: "icon",
        padding: "padding.xsmall",
        // View has a default minWidth of 0, which causes the label text
        // to encroach on the icon when it needs to truncate. We can fix
        // this by setting the minWidth to auto.
        minWidth: "auto",
    }),
    iconWrapperSecondaryHovered: css.raw({
        backgroundColor: "bg.icon.secondaryHover",
        color: "text.icon.secondaryHover",
    }),
    endIconWrapper: css.raw({
        marginLeft: "padding.small",
        marginRight: "margin.icon.offset",
    }),
    endIconWrapperTertiary: css.raw({
        marginRight: 0,
    }),
};

const styles: {[key: string]: Record<string, SystemStyleObject>} = {};

// export for testing only
export const _generateStyles = (
    buttonColor = "default",
    kind: "primary" | "secondary" | "tertiary",
    light: boolean,
    size: "large" | "medium" | "small",
    theme: ButtonThemeContract,
    themeName: string,
) => {
    const color: string =
        buttonColor === "destructive"
            ? "bg.critical.default"
            : "bg.action.default";

    const buttonType = `${color}-${kind}-${light}-${size}-${themeName}`;

    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const fadedColor =
        buttonColor === "destructive"
            ? "bg.critical.inverse"
            : "bg.action.inverse";
    const activeColor =
        buttonColor === "destructive"
            ? "bg.critical.active"
            : "bg.action.active";
    const padding = size === "large" ? "padding.xLarge" : "padding.large";

    let newStyles: Record<string, SystemStyleObject> = {};
    if (kind === "primary") {
        newStyles = {
            default: css.raw({
                background: light ? "bg.primary.default" : color,
                color: light ? color : "text.inverse",
                paddingLeft: padding,
                paddingRight: padding,
                outlineStyle: "solid",
                outlineWidth: "focused",
                outlineOffset: 1,
            }),
            focus: css.raw({
                outlineColor: light ? "bg.primary.default" : color,
            }),
            active: css.raw({
                outlineColor: light ? fadedColor : activeColor,
                background: light ? fadedColor : activeColor,
                color: light ? activeColor : fadedColor,
            }),
            disabled: css.raw({
                background: light ? fadedColor : "bg.primary.disabled",
                color: light ? color : "text.primary.disabled",
                cursor: "default",
                "&:focus": {
                    outlineColor: light ? fadedColor : "bg.primary.disabled",
                },
            }),
        };
    } else if (kind === "secondary") {
        const secondaryBorderColor =
            buttonColor === "destructive"
                ? "border.secondary.critical"
                : "border.secondary.action";
        const secondaryActiveColor =
            buttonColor === "destructive"
                ? "bg.secondary.active.critical"
                : "bg.secondary.active.action";

        newStyles = {
            default: css.raw({
                background: light
                    ? "bg.secondary.inverse"
                    : "bg.secondary.default",
                color: light ? "text.inverse" : color,
                borderColor: light
                    ? "border.secondary.inverse"
                    : secondaryBorderColor,
                borderStyle: "solid",
                borderWidth: "secondary",
                paddingLeft: padding,
                paddingRight: padding,
            }),
            focus: css.raw({
                background: light
                    ? "bg.secondary.inverse"
                    : "bg.secondary.focus",
                borderColor: "transparent",
                outlineColor: light ? "border.primary.inverse" : color,
                outlineStyle: "solid",
                outlineWidth: "focused",
            }),

            active: css.raw({
                background: light ? activeColor : secondaryActiveColor,
                color: light ? fadedColor : activeColor,
                borderColor: "transparent",
                outlineColor: light ? fadedColor : activeColor,
                outlineStyle: "solid",
                outlineWidth: "focused",
            }),
            disabled: css.raw({
                color: light ? "text.secondary.inverse" : "text.disabled",
                outlineColor: light ? fadedColor : "disabled",
                outlineWidth: 0,
                cursor: "default",
                "&:focus": {
                    outlineColor: light
                        ? "border.secondary.inverse"
                        : "border.disabled",
                    outlineWidth: "disabled",
                },
            }),
        };
    } else if (kind === "tertiary") {
        newStyles = {
            default: css.raw({
                background: "none",
                color: light ? "text.inverse" : color,
                paddingLeft: 0,
                paddingRight: 0,
            }),
            hover: css.raw({
                "&:after": {
                    content: "''",
                    position: "absolute",
                    height: "height.tertiaryHover",
                    width: "100%",
                    right: 0,
                    bottom: 0,
                    background: light ? "bg.tertiary.hover" : color,
                    borderRadius: "tertiary",
                },
            }),
            focus: css.raw({
                outlineStyle: "solid",
                outlineColor: light ? "border.tertiary.inverse" : color,
                outlineWidth: "focused",
                borderRadius: "default",
            }),
            active: css.raw({
                color: light ? fadedColor : activeColor,
                "&:after": {
                    height: 1,
                    background: light ? fadedColor : activeColor,
                },
            }),
            disabled: css.raw({
                color: light ? fadedColor : "text.disabled",
                cursor: "default",
            }),
            disabledFocus: css.raw({
                outlineColor: light
                    ? "border.tertiary.inverse"
                    : "border.disabled",
            }),
        };
    } else {
        throw new Error("Button kind not recognized");
    }

    styles[buttonType] = newStyles;
    return styles[buttonType];
};
