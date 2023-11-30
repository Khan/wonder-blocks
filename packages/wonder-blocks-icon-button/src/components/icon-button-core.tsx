import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {useScopedTheme} from "@khanacademy/wonder-blocks-theming";

import type {IconButtonSize, SharedProps} from "./icon-button";
import {
    iconSizeForButtonSize,
    targetPixelsForSize,
} from "../util/icon-button-util";
import {
    IconButtonThemeContext,
    IconButtonThemeContract,
} from "../themes/themed-icon-button";

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

const StyledAnchor = addStyle("a");
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
        color,
        disabled,
        href,
        icon,
        kind = "primary",
        light = false,
        size = "medium",
        skipClientNav,
        style,
        testId,
        ...restProps
    } = props;
    const {theme, themeName} = useScopedTheme(IconButtonThemeContext);

    const renderInner = (router: any): React.ReactNode => {
        const buttonStyles = _generateStyles(
            color,
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
            "data-test-id": testId,
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
                <StyledAnchor
                    {...commonProps}
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                >
                    {child}
                </StyledAnchor>
            );
        } else {
            return (
                <StyledButton
                    type="button"
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
        margin: -8,
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
    },
});

const styles: Record<string, any> = {};

function getStylesByKind(
    kind: "primary" | "secondary" | "tertiary",
    theme: IconButtonThemeContract,
    color: string,
    light: boolean,
    buttonColor: string,
) {
    switch (kind) {
        case "primary":
            const primaryHoveredColor =
                buttonColor === "destructive"
                    ? theme.color.stroke.primary.critical.hovered
                    : theme.color.stroke.primary.action.hovered;

            return {
                ":hover": {
                    backgroundColor: theme.color.bg.hovered,
                    color: light
                        ? theme.color.stroke.primary.inverse.hovered
                        : primaryHoveredColor,
                    outlineColor: light ? theme.color.stroke.inverse : color,
                    outlineOffset: 1,
                    outlineStyle: "solid",
                    outlineWidth: light
                        ? theme.border.width.hoveredInverse
                        : theme.border.width.hovered,
                },
                ":active": {
                    backgroundColor: theme.color.bg.active,
                },
            };
        case "secondary":
        case "tertiary":
            return {
                ":hover": {
                    backgroundColor:
                        buttonColor === "destructive"
                            ? theme.color.bg.filled.critical.hovered
                            : theme.color.bg.filled.action.hovered,
                    color:
                        buttonColor === "destructive"
                            ? theme.color.stroke.filled.critical.hovered
                            : theme.color.stroke.filled.action.hovered,
                    outlineWidth: theme.border.width.active,
                },
                ":active": {
                    backgroundColor:
                        buttonColor === "destructive"
                            ? theme.color.bg.filled.critical.active
                            : theme.color.bg.filled.action.active,
                    color:
                        buttonColor === "destructive"
                            ? theme.color.stroke.filled.critical.active
                            : theme.color.stroke.filled.action.active,
                    outlineWidth: theme.border.width.active,
                },
            };
        default:
            return {
                ":focus-visible": {},
                ":hover": {},
                ":active": {},
            };
    }
}

const _generateStyles = (
    buttonColor = "default",
    kind: "primary" | "secondary" | "tertiary",
    light: boolean,
    size: IconButtonSize,
    theme: IconButtonThemeContract,
    themeName: string,
) => {
    const color: string =
        buttonColor === "destructive"
            ? theme.color.stroke.critical.default
            : theme.color.stroke.action.default;

    const buttonType = `${color}-${kind}-${light}-${size}-${themeName}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (light && kind !== "primary") {
        throw new Error("Light is only supported for primary IconButtons");
    }

    const defaultColor = ((): string => {
        switch (kind) {
            case "primary":
                return light
                    ? theme.color.stroke.primary.inverse.default
                    : color;
            case "secondary":
                return theme.color.stroke.secondary.default;
            case "tertiary":
                return theme.color.stroke.tertiary.default;
            default:
                throw new Error("IconButton kind not recognized");
        }
    })();
    const pixelsForSize = targetPixelsForSize(size);

    // Override styles for each kind of button. This is useful for merging
    // pseudo-classes properly.
    const kindOverrides = getStylesByKind(
        kind,
        theme,
        color,
        light,
        buttonColor,
    );

    const activeInverseColor =
        buttonColor === "destructive"
            ? theme.color.stroke.critical.inverse
            : theme.color.stroke.action.inverse;
    const activeColor =
        buttonColor === "destructive"
            ? theme.color.stroke.critical.active
            : theme.color.stroke.action.active;

    // Shared by hover and focus states.
    const defaultStrokeColor = light ? theme.color.stroke.inverse : color;

    const disabledStrokeColor = light
        ? theme.color.stroke.disabled.inverse
        : theme.color.stroke.disabled.default;

    const disabledStatesStyles = {
        backgroundColor: theme.color.bg.disabled,
        color: disabledStrokeColor,
        outlineColor: disabledStrokeColor,
    };

    const newStyles = {
        default: {
            height: pixelsForSize,
            width: pixelsForSize,
            color: defaultColor,
            borderRadius: theme.border.radius.default,

            /**
             * States
             *
             * Defined in the following order: hover, focus, active.
             */
            // Allow hover styles on non-touch devices only. This prevents an
            // issue with hover being sticky on touch devices (e.g. mobile).
            ["@media (hover: hover)"]: {
                ":hover": {
                    boxShadow: "none",
                    color: defaultStrokeColor,
                    borderRadius: theme.border.radius.default,
                    outlineWidth: theme.border.width.default,
                    ...kindOverrides[":hover"],
                },
            },
            // Provide basic, default focus styles on older browsers (e.g.
            // Safari 14)
            ":focus": {
                boxShadow: `0 0 0 ${theme.border.width.default}px ${defaultStrokeColor}`,
                borderRadius: theme.border.radius.default,
            },
            // Remove default focus styles for mouse users ONLY if
            // :focus-visible is supported on this platform.
            ":focus:not(:focus-visible)": {
                boxShadow: "none",
            },
            // Provide focus styles for keyboard users on modern browsers.
            ":focus-visible": {
                // Reset default focus styles
                boxShadow: "none",
                // Apply modern focus styles
                outlineWidth: theme.border.width.default,
                outlineColor: defaultStrokeColor,
                outlineOffset: 1,
                outlineStyle: "solid",
                borderRadius: theme.border.radius.default,
                ...kindOverrides[":focus-visible"],
            },
            ":active": {
                color: light ? activeInverseColor : activeColor,
                outlineWidth: theme.border.width.default,
                outlineColor: light ? activeInverseColor : activeColor,
                outlineOffset: 1,
                outlineStyle: "solid",
                borderRadius: theme.border.radius.default,
                ...kindOverrides[":active"],
            },
        },
        disabled: {
            color: disabledStrokeColor,
            cursor: "not-allowed",
            // NOTE: Even that browsers recommend to specify pseudo-classes in
            // this order: link, visited, focus, hover, active, we need to
            // specify focus after hover to override hover styles. By doing this
            // we are able to remove the hover outline when the button is
            // disabled.
            // For order reference: https://css-tricks.com/snippets/css/link-pseudo-classes-in-order/
            ":hover": {...disabledStatesStyles, outline: "none"},
            ":active": {...disabledStatesStyles, outline: "none"},
            // Provide basic, default focus styles on older browsers (e.g.
            // Safari 14)
            ":focus": {
                boxShadow: `0 0 0 ${theme.border.width.default}px ${disabledStrokeColor}`,
                borderRadius: theme.border.radius.default,
            },
            // Remove default focus styles for mouse users ONLY if
            // :focus-visible is supported on this platform.
            ":focus:not(:focus-visible)": {
                boxShadow: "none",
            },
            ":focus-visible": disabledStatesStyles,
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
