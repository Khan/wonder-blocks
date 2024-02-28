import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {mix, fade} from "@khanacademy/wonder-blocks-color";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
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

const StyledAnchor = addStyle("a");
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
            hovered,
            href,
            inline = false,
            kind = "primary",
            light = false,
            visitable = false,
            pressed,
            style,
            testId,
            waiting: _,
            target,
            startIcon,
            endIcon,
            ...restProps
        } = props;

        const linkStyles = _generateStyles(inline, kind, light, visitable);
        const restingStyles = inline
            ? linkStyles.restingInline
            : linkStyles.resting;

        const defaultStyles = [
            sharedStyles.shared,
            restingStyles,
            pressed && linkStyles.active,
            // A11y: The focus ring should always be present when the
            // the link has focus, even the link is being hovered over.
            // TODO(WB-1498): Udpate ClickableBehavior so that focus doesn't
            // stop on mouseleave. We want the focus ring to remain on a
            // focused link even after hovering and un-hovering on it.
            !pressed && hovered && linkStyles.hover,
            !pressed && focused && linkStyles.focus,
        ];

        const commonProps = {
            "data-test-id": testId,
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
            } as Partial<React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>>);
        }

        if (endIcon) {
            endIconElement = React.cloneElement(endIcon, {
                style: [linkContentStyles.endIcon, linkContentStyles.centered],
                testId: "end-icon",
                "aria-hidden": "true",
                ...endIcon.props,
            } as Partial<React.ReactElement<React.ComponentProps<typeof PhosphorIcon>>>);
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
            <StyledAnchor
                {...commonProps}
                href={href}
                ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            >
                {linkContent}
            </StyledAnchor>
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

const _generateStyles = (
    inline: boolean,
    kind: "primary" | "secondary",
    light: boolean,
    visitable: boolean,
) => {
    const buttonType = `${kind}-${inline.toString()}-${light.toString()}-${visitable.toString()}`;
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (kind === "secondary" && light) {
        throw new Error("Secondary Light links are not supported");
    }

    if (visitable && kind !== "primary") {
        throw new Error("Only primary link is visitable");
    }

    const {blue, pink, purple, white, offBlack, offBlack32, offBlack64} = color;

    // Standard purple
    const linkPurple = mix(fade(offBlack, 0.08), purple);
    // Light blue
    const fadedBlue = color.fadedBlue;
    // Light pink
    const activeLightVisited = mix(fade(white, 0.32), pink);
    // Dark blue
    const activeDefaultPrimary = color.activeBlue;

    const primaryDefaultTextColor = light ? white : blue;
    const secondaryDefaultTextColor = inline ? offBlack : offBlack64;
    const defaultTextColor =
        kind === "primary"
            ? primaryDefaultTextColor
            : secondaryDefaultTextColor;

    const primaryActiveColor = light ? fadedBlue : activeDefaultPrimary;
    const secondaryActiveColor = inline ? activeDefaultPrimary : offBlack;
    const activeColor =
        kind === "primary" ? primaryActiveColor : secondaryActiveColor;

    const defaultVisited = visitable
        ? {
              ":visited": {
                  color: light ? pink : linkPurple,
              },
          }
        : Object.freeze({});
    const activeVisited = visitable
        ? {
              ":visited": {
                  color: light
                      ? activeLightVisited
                      : mix(offBlack32, linkPurple),
              },
          }
        : Object.freeze({});

    const newStyles: StyleDeclaration = {
        resting: {
            color: defaultTextColor,
            ...defaultVisited,
        },
        restingInline: {
            color: defaultTextColor,
            // TODO(WB-1521): Update text decoration to the 1px dashed
            // underline after the Link audit.
            // textDecoration: "underline currentcolor solid 1px",
            textDecoration: "underline currentcolor solid",
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            textUnderlineOffset: 2,
            ...defaultVisited,
        },
        hover: {
            // TODO(WB-1521): Update text decoration to the 1px dashed
            // underline after the Link audit.
            // textDecoration: "underline currentcolor dashed 2px",
            textDecoration: "underline currentcolor solid",
            color: defaultTextColor,
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            ...defaultVisited,
        },
        focus: {
            // Focus styles only show up with keyboard navigation.
            // Mouse users don't see focus styles.
            ":focus-visible": {
                color: defaultTextColor,
                outline: `1px solid ${light ? white : blue}`,
                borderRadius: 3,
                ...defaultVisited,
            },
        },
        active: {
            color: activeColor,
            textDecoration: "underline currentcolor solid",
            // TODO(WB-1521): Update the underline offset to be 4px after
            // the Link audit.
            // textUnderlineOffset: 4,
            ...activeVisited,
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};

export default LinkCore;
