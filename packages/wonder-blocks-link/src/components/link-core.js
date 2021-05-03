// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

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

type ContextTypes = {|
    router: $FlowFixMe,
|};

const StyledAnchor = addStyle<"a">("a");
const StyledLink = addStyle<typeof Link>(Link);

export default class LinkCore extends React.Component<Props> {
    static contextTypes: ContextTypes = {router: PropTypes.any};

    render(): React.Node {
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
        const {router} = this.context;

        const linkStyles = _generateStyles(kind, light, visitable);

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && linkStyles.default,
            pressed
                ? linkStyles.active
                : (hovered || focused) && linkStyles.focus,
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
}

const styles = {};

const sharedStyles = StyleSheet.create({
    shared: {
        cursor: "pointer",
        textDecoration: "none",
        outline: "none",
    },
});

const _generateStyles = (kind, light, visitable) => {
    const buttonType = kind + light.toString() + visitable.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (kind === "secondary" && light) {
        throw new Error("Secondary Light links are not supported");
    }

    if (visitable && (kind !== "primary" || (kind === "primary" && light))) {
        throw new Error("Only primary (not light) link is visitable");
    }

    const {blue, purple, white, offBlack, offBlack32} = Color;
    const linkPurple = mix(fade(offBlack, 0.08), purple);

    const defaultTextColor =
        kind === "primary" ? (light ? white : blue) : offBlack;

    const focusColor: string = light ? white : blue;
    const activeColor: string = light
        ? mix(fade(blue, 0.32), white)
        : mix(offBlack32, blue);

    const defaultVisited = visitable
        ? {
              ":visited": {
                  color: linkPurple,
              },
          }
        : Object.freeze({});
    const activeVisited = visitable
        ? {
              ":visited": {
                  color: mix(offBlack32, linkPurple),
              },
          }
        : Object.freeze({});

    const newStyles: StyleDeclaration = {
        default: {
            color: defaultTextColor,
            ...defaultVisited,
        },
        focus: {
            textDecoration: "underline currentcolor solid",
            color: focusColor,
            ...defaultVisited,
        },
        active: {
            color: activeColor,
            textDecoration: "underline currentcolor solid",
            ...activeVisited,
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
