import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link, useInRouterContext} from "react-router-dom-v5-compat";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
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
        pressed,
        style,
        testId,
        waiting: _,
        target,
        startIcon,
        endIcon,
        labels = {externalIconAriaLabel: "(opens in a new tab)"},
        viewTransition,
        ...restProps
    } = props;

    const {externalIconAriaLabel} = labels;

    const defaultStyles = [
        styles.shared,
        styles.rest,
        inline && styles.restInline,
        // focused is preserved to allow for programmatic focus.
        !pressed && focused && styles.focus,
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
            style={[styles.endIcon, styles.centered]}
            testId="external-icon"
            aria-label={externalIconAriaLabel}
        />
    );

    let startIconElement;
    let endIconElement;

    if (startIcon) {
        startIconElement = React.cloneElement(startIcon, {
            style: [styles.startIcon, styles.centered],
            testId: "start-icon",
            "aria-hidden": "true",
            ...startIcon.props,
        } as Partial<
            React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>
        >);
    }

    if (endIcon) {
        endIconElement = React.cloneElement(endIcon, {
            style: [styles.endIcon, styles.centered],
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

const focusStyling = {
    ...focusStyles.focus[":focus-visible"],
    borderRadius: border.radius.radius_010,
    outlineOffset: border.width.medium,
};

const pressStyling = {
    color: semanticColor.link.press,
    textDecoration: "underline currentcolor solid",
    textUnderlineOffset: font.textDecoration.underlineOffset,
};

const styles = StyleSheet.create({
    shared: {
        fontFamily: theme.root.font.family,
        fontWeight: theme.root.font.weight,
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        alignItems: "center",
    },
    rest: {
        color: semanticColor.link.rest,
        ":hover": {
            textDecoration: "underline currentcolor solid",
            color: semanticColor.link.hover,
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
    /**
     * Content styles
     */
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

export default LinkCore;
