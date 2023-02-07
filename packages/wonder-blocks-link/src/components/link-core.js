// @flow
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
import type {SharedProps} from "./link.js";

type Props = {|
    ...SharedProps,
    ...ChildrenProps,
    ...ClickableState,
    href: string,
|};

const StyledAnchor = addStyle<"a">("a");
const StyledLink = addStyle<typeof Link>(Link);

export default class LinkCore extends React.Component<Props> {
    renderInner(router: any): React.Node {
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
            pressed
                ? linkStyles.active
                : hovered
                ? linkStyles.hover
                : focused && linkStyles.focus,
        ];

        const commonProps = {
            "data-test-id": testId,
            style: [defaultStyles, style],
            ...restProps,
        };

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

    render(): React.Node {
        return (
            <__RouterContext.Consumer>
                {(router) => this.renderInner(router)}
            </__RouterContext.Consumer>
        );
    }
}

const styles = {};

const sharedStyles = StyleSheet.create({
    shared: {
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
        display: "inline-flex",
    },
});

const _generateStyles = (inline, kind, light, visitable) => {
    // Even though `inline` is defined and set the same as all the other
    // boolean props, it is coming up as `undefined` in tests, which means
    // the toString() function can't be used. Setting it explicitly to avoid
    // a TypeError.
    const inlineStr = inline ? "true" : "false";
    const buttonType =
        inlineStr + kind + light.toString() + visitable.toString();
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
            textDecoration: "underline currentcolor solid 1px",
            textUnderlineOffset: 4,
            ...defaultVisited,
        },
        hover: {
            textDecoration: "underline currentcolor dashed 2px",
            color: defaultTextColor,
            textUnderlineOffset: 4,
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
            textDecoration: "underline currentcolor solid 1px",
            textUnderlineOffset: 4,
            ...activeVisited,
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
