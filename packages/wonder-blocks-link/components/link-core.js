// @flow
import React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import type {ClickableHandlers} from "@khanacademy/wonder-blocks-core";
import type {SharedProps} from "./link.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,

    hovered: boolean,
    focused: boolean,
    pressed: boolean,
    href: string,
|};

const StyledAnchor = addStyle("a");
const StyledLink = addStyle(Link);

export default class LinkCore extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    render() {
        const {
            caret, // eslint-disable-line no-unused-vars
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
            ...handlers
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
            ...handlers,
        };

        return router && !skipClientNav ? (
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

    const defaultVisited = visitable
        ? {
              ":visited": {
                  color: linkPurple,
              },
          }
        : {};
    const activeVisited = visitable
        ? {
              ":visited": {
                  color: mix(offBlack32, linkPurple),
              },
          }
        : {};

    const newStyles = {
        default: {
            color: defaultTextColor,
            ...defaultVisited,
        },
        focus: {
            textDecoration: "underline currentcolor solid",
            color: light ? white : blue,
            ...defaultVisited,
        },
        active: {
            color: light ? mix(fade(blue, 0.32), white) : mix(offBlack32, blue),
            textDecoration: "underline currentcolor solid",
            ...activeVisited,
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
