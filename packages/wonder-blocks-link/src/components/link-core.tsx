import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import {__RouterContext} from "react-router";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import {isClientSideUrl} from "@khanacademy/wonder-blocks-clickable";

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

const StyledAnchor = addStyle<"a">("a");
const StyledLink = addStyle<typeof Link>(Link);

export default class LinkCore extends React.Component<Props> {
    renderInner(router: any): React.ReactNode {
        const {
            children,
            skipClientNav,
            focused,
            hovered,
            href,
            inline,
            kind,
            light,
            visitable,
            pressed,
            style,
            testId,
            waiting: _,
            ...restProps
        } = this.props;

        const linkStyles = _generateStyles(inline, kind, light, visitable);
        const restingStyles = inline
            ? linkStyles.restingInline
            : linkStyles.resting;

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && restingStyles,
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
            ...restProps,
        } as const;

        return router && !skipClientNav && isClientSideUrl(href) ? (
            <StyledLink {...commonProps} to={href}>
                {children}
            </StyledLink>
        ) : (
            <StyledAnchor {...commonProps} href={href}>
                {children}
            </StyledAnchor>
        );
    }

    render(): React.ReactNode {
        return (
            <__RouterContext.Consumer>
                {(router) => this.renderInner(router)}
            </__RouterContext.Consumer>
        );
    }
}

const styles: Record<string, any> = {};

const sharedStyles = StyleSheet.create({
    shared: {
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        display: "inline-flex",
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

    const {blue, pink, purple, white, offBlack, offBlack32, offBlack64} = Color;

    // Standard purple
    const linkPurple = mix(fade(offBlack, 0.08), purple);
    // Light blue
    const fadedBlue = mix(fade(blue, 0.32), white);
    // Light pink
    const activeLightVisited = mix(fade(white, 0.32), pink);
    // Dark blue
    const activeDefaultPrimary = mix(offBlack32, blue);

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
            color: defaultTextColor,
            outline: `1px solid ${light ? white : blue}`,
            borderRadius: 3,
            ...defaultVisited,
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
