import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {useScopedTheme} from "@khanacademy/wonder-blocks-theming";

import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import type {
    IconButtonActionType,
    IconButtonSize,
    SharedProps,
} from "./icon-button";
import {
    iconSizeForButtonSize,
    targetPixelsForSize,
} from "../util/icon-button-util";
import {
    IconButtonThemeContext,
    IconButtonThemeContract,
} from "../themes/themed-icon-button";

type Kind = "primary" | "secondary" | "tertiary";

/**
 * Returns the phosphor icon component based on the size. This is necessary
 * so we can cast the icon to the correct type.
 */
function IconChooser({
    icon,
    size,
}: {
    icon: SharedProps["icon"];
    size: IconButtonSize;
}) {
    const iconSize = iconSizeForButtonSize(size);
    switch (iconSize) {
        case "small":
            return (
                <PhosphorIcon
                    size="small"
                    color="currentColor"
                    icon={icon as PhosphorBold | PhosphorFill}
                />
            );
        case "medium":
        default:
            return (
                <PhosphorIcon
                    size="medium"
                    color="currentColor"
                    icon={icon as PhosphorRegular | PhosphorFill}
                />
            );
    }
}

type Props = SharedProps & {
    /**
     * URL to navigate to.
     *
     * Used to determine whether to render an `<a>` or `<button>` tag. Also
     * passed in as the `<a>` tag's `href` if present.
     */
    href?: string;
    /**
     * Listens for keydown events on the button. This is useful for preventing
     * default behavior when the user presses the spacebar or enter key.
     */
    onKeyDown?: (e: React.KeyboardEvent) => unknown;
    /**
     * Listens for keyup events on the button. This is useful for triggering
     * actions when the user presses the spacebar or enter key.
     */
    onKeyUp?: (e: React.KeyboardEvent) => unknown;
};

const StyledA = addStyle("a");
const StyledButton = addStyle("button");
const StyledLink = addStyle(Link);

const IconButtonCore: React.ForwardRefExoticComponent<
    Props &
        React.RefAttributes<typeof Link | HTMLButtonElement | HTMLAnchorElement>
> = React.forwardRef<
    typeof Link | HTMLButtonElement | HTMLAnchorElement,
    Props
>(function IconButtonCore(props: Props, ref) {
    const {
        actionType,
        disabled,
        href,
        icon,
        kind = "primary",
        size = "medium",
        skipClientNav,
        style,
        testId,
        type = "button",
        ...restProps
    } = props;
    const {theme, themeName} = useScopedTheme(IconButtonThemeContext);

    const renderInner = (router: any): React.ReactNode => {
        const buttonStyles = _generateStyles(
            actionType,
            !!disabled,
            kind,
            size,
            theme,
            themeName,
        );

        const defaultStyle = [
            sharedStyles.shared,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
        ];

        const child = <IconChooser size={size} icon={icon} />;

        const commonProps = {
            "data-testid": testId,
            style: [defaultStyle, style],
            ...restProps,
        } as const;

        if (href && !disabled) {
            return router && !skipClientNav && isClientSideUrl(href) ? (
                <StyledLink
                    {...commonProps}
                    to={href}
                    ref={ref as React.Ref<typeof Link>}
                >
                    {child}
                </StyledLink>
            ) : (
                <StyledA
                    {...commonProps}
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {child}
                </StyledA>
            );
        } else {
            return (
                <StyledButton
                    type={type}
                    {...commonProps}
                    onClick={disabled ? undefined : restProps.onClick}
                    aria-disabled={disabled}
                    ref={ref as React.Ref<HTMLButtonElement>}
                >
                    {child}
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

export default IconButtonCore;

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: 0,
        cursor: "pointer",
        border: "none",
        outline: "none",
        textDecoration: "none",
        background: "none",
        margin: 0,
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
    },
});

const styles: Record<string, any> = {};

const _generateStyles = (
    actionType: IconButtonActionType = "progressive",
    disabled: boolean,
    kind: Kind,
    size: IconButtonSize,
    theme: IconButtonThemeContract,
    themeName: string,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}-${size}-${themeName}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const pixelsForSize = targetPixelsForSize(size);

    const borderWidthKind = theme.border.width[kind];
    const outlineOffsetKind = theme.border.offset[kind];
    const themeVariant = theme.color[kind][actionType];
    const disabledState = theme.color[kind].disabled;

    const disabledStatesStyles = {
        borderColor: disabledState.border,
        background: disabledState.background,
        color: disabledState.foreground,
    };

    const newStyles = {
        default: {
            height: pixelsForSize,
            width: pixelsForSize,
            borderRadius: theme.border.radius.default,
            // theming
            borderStyle: "solid",
            borderWidth: borderWidthKind.default,
            borderColor: themeVariant.default.border,
            background: themeVariant.default.background,
            color: themeVariant.default.foreground,

            /**
             * States
             *
             * Defined in the following order: hover, focus, active.
             */
            ":hover:not([aria-disabled=true])": {
                background: themeVariant.hover.background,
                color: themeVariant.hover.foreground,
                outline:
                    kind === "primary"
                        ? `${borderWidthKind.hover}px solid ${themeVariant.hover.border}`
                        : undefined,
                outlineOffset:
                    kind === "primary" ? outlineOffsetKind : undefined,
                border:
                    kind !== "primary"
                        ? `${borderWidthKind.hover}px solid ${themeVariant.hover.border}`
                        : undefined,
            },
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)"]: {
                ":hover": {
                    // reset hover styles on non-touch devices
                    backgroundColor: "transparent",
                },
            },

            // :focus-visible -> Provide focus styles for keyboard users only.
            ...focusStyles.focus,
            ":active:not([aria-disabled=true])": {
                // primary
                outlineColor:
                    kind === "primary"
                        ? themeVariant.press.border
                        : "undefined",
                // secondary, tertiary
                border:
                    kind !== "primary"
                        ? `${borderWidthKind.hover}px solid ${themeVariant.press.border}`
                        : undefined,
                background: themeVariant.press.background,
                color: themeVariant.press.foreground,
            },
        },
        disabled: {
            cursor: "not-allowed",
            ...disabledStatesStyles,
            // NOTE: Even that browsers recommend to specify pseudo-classes in
            // this order: link, visited, focus, hover, active, we need to
            // specify focus after hover to override hover styles. By doing this
            // we are able to remove the hover border when the button is
            // disabled.
            // For order reference: https://css-tricks.com/snippets/css/link-pseudo-classes-in-order/
            ":hover": {...disabledStatesStyles, outline: "none"},
            ":active": {...disabledStatesStyles, outline: "none"},
            ":focus-visible": disabledStatesStyles,
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
