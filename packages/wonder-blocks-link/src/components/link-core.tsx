import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
    color,
    spacing,
    semanticColor,
    border,
    font,
} from "@khanacademy/wonder-blocks-tokens";
import {focusStyles} from "@khanacademy/wonder-blocks-styles";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import externalLinkIcon from "@phosphor-icons/core/bold/arrow-square-out-bold.svg";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {StyleDeclaration} from "aphrodite";
import type {SharedProps} from "./link";
import theme from "../theme";

type Props = SharedProps &
    ChildrenProps &
    ClickableState & {
        href: string;
    };

const StyledA = addStyle("a");
const StyledLink = addStyle(Link);

const LinkCore = React.forwardRef(function LinkCore(
    props: Props,
    ref: React.ForwardedRef<typeof Link | HTMLAnchorElement>,
) {
    const inRouterContext = useInRouterContext();

    const {
        children,
        skipClientNav,
        focused,
        hovered, // eslint-disable-line @typescript-eslint/no-unused-vars
        href,
        inline = false,
        light = false,
        pressed,
        style,
        testId,
        waiting: _,
        target,
        startIcon,
        endIcon,
        viewTransition,
        ...restProps
    } = props;

    const linkStyles = _generateStyles(inline, light);

    const defaultStyles = [
        sharedStyles.shared,
        linkStyles.rest,
        inline && linkStyles.restInline,
        // focused is preserved to allow for programmatic focus.
        !pressed && focused && linkStyles.focus,
    ];

    const commonProps = {
        "data-testid": testId,
        style: [defaultStyles, style],
        target,
        ...restProps,
    } as const;

    const linkUrl = new URL(href, window.location.origin);

    const isExternalLink = linkUrl.origin !== window.location.origin;

    const externalIcon = (
        <PhosphorIcon
            icon={externalLinkIcon}
            size="small"
            style={[linkContentStyles.endIcon, linkContentStyles.centered]}
            testId="external-icon"
        />
    );

    let startIconElement;
    let endIconElement;

    if (startIcon) {
        startIconElement = React.cloneElement(startIcon, {
            style: [linkContentStyles.startIcon, linkContentStyles.centered],
            testId: "start-icon",
            "aria-hidden": "true",
            ...startIcon.props,
        } as Partial<
            React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        >);
    }

    if (endIcon) {
        endIconElement = React.cloneElement(endIcon, {
            style: [linkContentStyles.endIcon, linkContentStyles.centered],
            testId: "end-icon",
            "aria-hidden": "true",
            ...endIcon.props,
        } as Partial<
            React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        >);
    }

    const linkContent = (
        <>
            {startIcon && startIconElement}
            {children}
            {endIcon
                ? endIconElement
                : isExternalLink && target === "_blank" && externalIcon}
        </>
    );

    return inRouterContext && !skipClientNav && isClientSideUrl(href) ? (
        <StyledLink
            {...commonProps}
            to={href}
            ref={ref as React.ForwardedRef<typeof Link>}
            viewTransition={viewTransition}
        >
            {linkContent}
        </StyledLink>
    ) : (
        <StyledA
            {...commonProps}
            href={href}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        >
            {linkContent}
        </StyledA>
    );
});

const styles: Record<string, any> = {};

const linkContentStyles = StyleSheet.create({
    startIcon: {
        marginInlineEnd: spacing.xxxSmall_4,
    },
    endIcon: {
        marginInlineStart: spacing.xxxSmall_4,
    },
    centered: {
        // Manually align the bottom of start/end icons with the text baseline.
        verticalAlign: "-10%",
    },
});

const sharedStyles = StyleSheet.create({
    shared: {
        fontFamily: theme.root.font.family,
        fontWeight: theme.root.font.weight,
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        alignItems: "center",
    },
});

/**
 * The object that contains the default and inverse colors for the link
 * component.
 */
const states = {
    color: {
        // Primary link color
        default: {
            rest: {
                foreground: semanticColor.link.rest,
            },
            hover: {
                foreground: semanticColor.link.hover,
            },
            focus: {
                border: semanticColor.focus.outer,
            },
            press: {
                foreground: semanticColor.link.press,
            },
        },
        // Over dark backgrounds
        // TODO(WB-1852): Remove light variant.
        inverse: {
            rest: {
                foreground: semanticColor.core.foreground.inverse.strong,
            },
            hover: {
                foreground: semanticColor.core.foreground.inverse.strong,
            },
            focus: {
                border: semanticColor.core.border.inverse.strong,
            },
            press: {
                foreground: color.fadedBlue,
            },
        },
    },
};

const _generateStyles = (inline: boolean, light: boolean) => {
    const buttonType = `${inline.toString()}-${light.toString()}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    const variant = light ? states.color.inverse : states.color.default;

    const focusStyling = {
        ...focusStyles.focus[":focus-visible"],
        borderRadius: border.radius.radius_010,
        outlineOffset: border.width.medium,
    };

    const pressStyling = {
        color: variant.press.foreground,
        textDecoration: "underline currentcolor solid",
        textUnderlineOffset: font.textDecoration.underlineOffset,
    };

    const newStyles: StyleDeclaration = {
        rest: {
            color: variant.rest.foreground,
            ":hover": {
                textDecoration: "underline currentcolor solid",
                color: variant.hover.foreground,
                textUnderlineOffset: font.textDecoration.underlineOffset,
            },
            // Focus styles only show up with keyboard navigation.
            // Mouse users don't see focus styles.
            ":focus-visible": focusStyling,
            ":active": pressStyling,
        },
        restInline: {
            textDecoration: "underline currentcolor solid",
            textDecorationThickness: font.textDecoration.thickness,
            textUnderlineOffset: font.textDecoration.underlineOffset,
        },
        focus: focusStyling,
        press: pressStyling,
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};

export default LinkCore;
