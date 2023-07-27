import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import Color, {
    SemanticColor,
    mix,
    fade,
} from "@khanacademy/wonder-blocks-color";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import Icon from "@khanacademy/wonder-blocks-icon";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {SharedProps} from "./icon-button";

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
>((props: Props, ref) => {
    const {
        skipClientNav,
        color,
        disabled,
        focused,
        hovered,
        href,
        icon,
        kind = "primary",
        light = false,
        pressed,
        style,
        testId,
        waiting: _,
        ...restProps
    } = props;

    const renderInner = (router: any): React.ReactNode => {
        const buttonColor =
            color === "destructive"
                ? SemanticColor.controlDestructive
                : SemanticColor.controlDefault;

        const buttonStyles = _generateStyles(buttonColor, kind, light);

        const defaultStyle = [
            sharedStyles.shared,
            disabled && sharedStyles.disabled,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
            !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
        ];

        const child = <Icon size="medium" color="currentColor" icon={icon} />;

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
        height: 40,
        width: 40,
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
    disabled: {
        cursor: "default",
    },
});

const styles: Record<string, any> = {};

const _generateStyles = (
    color: string,
    kind: "primary" | "secondary" | "tertiary",
    light: boolean,
) => {
    const buttonType = color + kind + light.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (light && kind !== "primary") {
        throw new Error("Light is only supported for primary IconButtons");
    }

    const {white, offBlack32, offBlack64, offBlack} = Color;

    const newStyles = {
        default: {},
        focus: {
            color: light ? white : color,
            borderWidth: 2,
            borderColor: light ? white : color,
            borderStyle: "solid",
            borderRadius: 4,
        },
        active: {
            color: light
                ? mix(fade(color, 0.32), white)
                : mix(offBlack32, color),
            borderWidth: 2,
            borderColor: light
                ? mix(fade(color, 0.32), white)
                : mix(offBlack32, color),
            borderStyle: "solid",
            borderRadius: 4,
        },
        disabled: {
            color: light ? mix(fade(white, 0.32), color) : offBlack32,
            cursor: "default",
        },
    } as const;
    if (kind === "primary") {
        // @ts-expect-error [FEI-5019] - TS2540 - Cannot assign to 'default' because it is a read-only property.
        newStyles["default"] = {
            color: light ? white : color,
        };
    } else if (kind === "secondary") {
        // @ts-expect-error [FEI-5019] - TS2540 - Cannot assign to 'default' because it is a read-only property.
        newStyles["default"] = {
            color: offBlack,
        };
    } else if (kind === "tertiary") {
        // @ts-expect-error [FEI-5019] - TS2540 - Cannot assign to 'default' because it is a read-only property.
        newStyles["default"] = {
            color: offBlack64,
        };
    } else {
        throw new Error("IconButton kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
