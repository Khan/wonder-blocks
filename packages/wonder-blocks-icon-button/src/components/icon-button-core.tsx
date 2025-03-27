import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {useScopedTheme} from "@khanacademy/wonder-blocks-theming";

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
        light = false,
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
            light,
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

type ActionType =
    | "progressive"
    | "destructive"
    | "disabled"
    // TODO(WB-1852): Remove light variants.
    | "progressiveLight"
    | "destructiveLight"
    | "disabledLight";

function getStylesByKind(
    actionType: IconButtonActionType = "progressive",
    disabled: boolean,
    kind: Kind,
    light: boolean,
    theme: IconButtonThemeContract,
) {
    let actionTypeOrDisabled: ActionType = disabled ? "disabled" : actionType;

    const themeVariant = theme.color[kind][actionTypeOrDisabled];

    if (kind === "primary") {
        // NOTE: Primary is the only kind that supports light variants.
        if (light) {
            actionTypeOrDisabled = `${actionTypeOrDisabled}Light`;
        }

        const themeVariant = theme.color[kind][actionTypeOrDisabled];

        return {
            default: {
                borderColor: themeVariant.default.border,
                background: themeVariant.default.background,
                color: themeVariant.default.foreground,
            },
            ":hover": {
                background: themeVariant.hover.background,
                color: themeVariant.hover.foreground,
                borderColor: themeVariant.hover.border,
                borderStyle: "solid",
                borderWidth: theme.border.width.hovered,
            },
            ":focus-visible": {
                boxShadow: light ? theme.focus.inverse : theme.focus.default,
            },
            ":active": {
                borderColor: themeVariant.press.border,
                borderStyle: "solid",
                borderWidth: theme.border.width.hovered,
                background: themeVariant.press.background,
                color: themeVariant.press.foreground,
            },
            disabled: {
                background: themeVariant.default.background,
                color: themeVariant.default.foreground,
                borderColor: themeVariant.default.border,
            },
        };
    }

    // NOTE: These styles will diverge before we create the new polaris theme.
    if (kind === "secondary" || kind === "tertiary") {
        return {
            default: {
                borderColor: themeVariant.default.border,
                background: themeVariant.default.background,
                color: themeVariant.default.foreground,
            },
            ":hover": {
                borderColor: themeVariant.hover.border,
                background: themeVariant.hover.background,
                color: themeVariant.hover.foreground,
            },
            ":focus-visible": {
                boxShadow: light ? theme.focus.inverse : theme.focus.default,
            },
            ":active": {
                borderColor: themeVariant.press.border,
                background: themeVariant.press.background,
                color: themeVariant.press.foreground,
            },
            disabled: {
                background: themeVariant.default.background,
                color: themeVariant.default.foreground,
                borderColor: themeVariant.focus.border,
            },
        };
    }

    return {
        default: {},
        ":hover": {},
        ":focus-visible": {},
        ":active": {},
        disabled: {},
    };
}

const _generateStyles = (
    actionType: IconButtonActionType = "progressive",
    disabled: boolean,
    kind: Kind,
    light: boolean,
    size: IconButtonSize,
    theme: IconButtonThemeContract,
    themeName: string,
) => {
    const buttonType = `${actionType}-d_${disabled}-${kind}-l_${light}-${size}-${themeName}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (light && kind !== "primary") {
        throw new Error("Light is only supported for primary IconButtons");
    }

    const pixelsForSize = targetPixelsForSize(size);

    // Override styles for each kind of button. This is useful for merging
    // pseudo-classes properly.
    const kindOverrides = getStylesByKind(
        actionType,
        disabled,
        kind,
        light,
        theme,
    );

    const disabledStatesStyles = kindOverrides.disabled;

    const newStyles = {
        default: {
            height: pixelsForSize,
            width: pixelsForSize,
            borderRadius: theme.border.radius.default,
            ...kindOverrides.default,

            /**
             * States
             *
             * Defined in the following order: hover, focus, active.
             */
            ":hover": {
                borderRadius: theme.border.radius.default,
                ...kindOverrides[":hover"],
            },
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media not (hover: hover)"]: {
                ":hover": {
                    // reset hover styles on non-touch devices
                    borderRadius: theme.border.radius.default,
                    backgroundColor: "transparent",
                },
            },

            // :focus-visible -> Provide focus styles for keyboard users only.
            ":focus-visible": {
                borderRadius: theme.border.radius.default,
                ...kindOverrides[":focus-visible"],
            },
            ":active": {
                borderRadius: theme.border.radius.default,
                ...kindOverrides[":active"],
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
            ":hover": {...disabledStatesStyles, border: "none"},
            ":active": {...disabledStatesStyles, border: "none"},
            ":focus-visible": disabledStatesStyles,
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
