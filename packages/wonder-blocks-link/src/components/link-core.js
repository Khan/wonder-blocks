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
            kind,
            light,
            visitable,
            pressed,
            style,
            testId,
            waiting: _,
            ...restProps
        } = this.props;

        const linkStyles = _generateStyles(kind, light, visitable);

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && linkStyles.default,
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

const _generateStyles = (kind, light, visitable) => {
    const buttonType = kind + light.toString() + visitable.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (visitable && kind !== "primary") {
        throw new Error("Only primary link is visitable");
    }

    const {blue, pink, purple, white, white64, offBlack, offBlack32} = Color;

    const linkPurple = mix(fade(offBlack, 0.08), purple);
    const fadedBlue = mix(fade(blue, 0.32), white);

    const defaultPrimaryColor = light ? white : blue;
    const defaultSecondaryColor = light ? white64 : offBlack;
    const defaultTextColor =
        kind === "primary" ? defaultPrimaryColor : defaultSecondaryColor;

    const focusColor: string = light ? fadedBlue : blue;
    const activeColor: string = light ? fadedBlue : mix(offBlack32, blue);

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
                      ? mix(offBlack32, pink)
                      : mix(offBlack32, linkPurple),
              },
          }
        : Object.freeze({});

    const newStyles: StyleDeclaration = {
        default: {
            color: defaultTextColor,
            ...defaultVisited,
        },
        hover: {
            textDecoration: "underline currentcolor dashed",
            textUnderlineOffset: 4,
            color: defaultTextColor,
            ...defaultVisited,
        },
        focus: {
            color: focusColor,
            outline: `1px solid ${light ? white : blue}`,
            borderRadius: 3,
            ...defaultVisited,
        },
        active: {
            color: activeColor,
            textDecoration: "underline currentcolor solid",
            textUnderlineOffset: 4,
            ...activeVisited,
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
