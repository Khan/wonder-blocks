import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
    color,
    spacing,
    semanticColor,
    border,
} from "@khanacademy/wonder-blocks-tokens";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import externalLinkIcon from "@phosphor-icons/core/bold/arrow-square-out-bold.svg";

import type {
    ChildrenProps,
    ClickableState,
} from "@khanacademy/wonder-blocks-clickable";
import type {StyleDeclaration} from "aphrodite";
import type {SharedProps} from "./link";

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
    const renderInner = (router: any): React.ReactNode => {
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
                style: [
                    linkContentStyles.startIcon,
                    linkContentStyles.centered,
                ],
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

        return router && !skipClientNav && isClientSideUrl(href) ? (
            <StyledLink
                {...commonProps}
                to={href}
                ref={ref as React.ForwardedRef<typeof Link>}
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
    };

    return (
        <__RouterContext.Consumer>
            {(router) => renderInner(router)}
        </__RouterContext.Consumer>
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
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        alignItems: "center",
    },
});

const action = semanticColor.action.outlined.progressive;

/**
 * TODO(WB-1862): Move this to a shared theme file.
 */
const theme = {
    color: {
        // Primary link color
        default: {
            rest: {
                foreground: action.default.foreground,
            },
            hover: {
                foreground: action.hover.foreground,
            },
            focus: {
                border: semanticColor.border.focus,
                foreground: action.hover.foreground,
            },
            press: {
                foreground: action.press.foreground,
            },
        },
        // Over dark backgrounds
        inverse: {
            rest: {
                foreground: semanticColor.text.inverse,
            },
            hover: {
                foreground: semanticColor.text.inverse,
            },
            focus: {
                border: semanticColor.border.inverse,
                foreground: semanticColor.text.inverse,
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

    const variant = light ? theme.color.inverse : theme.color.default;

    const focusStyling = {
        color: variant.focus.foreground,
        outline: `${border.width.hairline}px solid ${variant.focus.border}`,
        borderRadius: border.radius.small_3,
    };

    const pressStyling = {
        color: variant.press.foreground,
        textDecoration: "underline currentcolor solid",
        // TODO(WB-1521): Update the underline offset to be 4px after
        // the Link audit.
        // textUnderlineOffset: 4,
    };

    const newStyles: StyleDeclaration = {
        rest: {
            color: variant.rest.foreground,
            ":hover": {
                // TODO(WB-1521): Update text decoration to the 1px dashed
                // underline after the Link audit.
                // textDecoration: "underline currentcolor dashed 2px",
                textDecoration: "underline currentcolor solid",
                color: variant.hover.foreground,
                // TODO(WB-1521): Update the underline offset to be 4px after
                // the Link audit.
                // textUnderlineOffset: 4,
            },
            // Focus styles only show up with keyboard navigation.
            // Mouse users don't see focus styles.
            ":focus-visible": focusStyling,
            ":active": pressStyling,
        },
        restInline: {
            // TODO(WB-1521): Update text decoration to the 1px dashed
            // underline after the Link audit.
            // textDecoration: "underline currentcolor solid 1px",
            textDecoration: "underline currentcolor solid",
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            textUnderlineOffset: 2,
        },
        focus: focusStyling,
        press: pressStyling,
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};

export default LinkCore;
