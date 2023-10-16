import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {useScopedTheme} from "@khanacademy/wonder-blocks-theming";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
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

type Props = SharedProps &
    ChildrenProps &
    ClickableState & {
        /**
         * URL to navigate to.
         *
         * Used to determine whether to render an `<a>` or `<button>` tag. Also
         * passed in as the `<a>` tag's `href` if present.
         */
        href?: string;
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
        focused,
        hovered,
        href,
        icon,
        kind = "primary",
        light = false,
        pressed,
        size = "medium",
        skipClientNav,
        style,
        testId,
        waiting: _,
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
            !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
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
                    disabled={disabled}
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
        ":focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    },
});

const styles: Record<string, any> = {};

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
            ? theme.color.text.critical.default
            : theme.color.text.action.default;

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
                return light ? theme.color.text.primary.inverse : color;
            case "secondary":
                return theme.color.text.secondary.default;
            case "tertiary":
                return theme.color.text.tertiary.default;
            default:
                throw new Error("IconButton kind not recognized");
        }
    })();
    const pixelsForSize = targetPixelsForSize(size);

    const inverseColor =
        buttonColor === "destructive"
            ? theme.color.text.critical.inverse
            : theme.color.text.action.inverse;
    const activeColor =
        buttonColor === "destructive"
            ? theme.color.text.critical.active
            : theme.color.text.action.active;

    const newStyles = {
        default: {
            height: pixelsForSize,
            width: pixelsForSize,
            color: defaultColor,
        },
        focus: {
            color: light ? theme.color.text.focusInverse : color,
            borderWidth: theme.border.width.focused,
            borderColor: light ? theme.color.border.focusInverse : color,
            borderStyle: "solid",
            borderRadius: theme.border.radius.focused,
        },
        active: {
            color: light ? inverseColor : activeColor,
            borderWidth: theme.border.width.active,
            borderColor: light ? inverseColor : activeColor,
            borderStyle: "solid",
            borderRadius: theme.border.radius.active,
        },
        disabled: {
            color: light ? inverseColor : theme.color.text.disabled,
            cursor: "default",
        },
    } as const;

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
