// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import type {
    ClickableHandlers,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";

import type {StyleDeclaration} from "aphrodite";
import type {SharedProps} from "./link.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,
    ...ClickableState,
    href: string,
|};

const StyledAnchor = addStyle<"a">("a");
const StyledLink = addStyle<typeof Link>(Link);
const StyledSvg = addStyle<"svg">("svg");

export default class LinkCore extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    render() {
        const {
            caret,
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

        const caretIcon = (
            <StyledSvg
                height="1em" // set the height to match the current font size
                viewBox="1 0 14 16" // tweak the icon to be 1px closer to the link text
                style={sharedStyles.caret}
            >
                <path fill="currentColor" d={icons.caretRight.small} />
            </StyledSvg>
        );

        return router && !skipClientNav ? (
            <StyledLink {...commonProps} to={href}>
                {children}
                {caret && caretIcon}
            </StyledLink>
        ) : (
            <StyledAnchor {...commonProps} href={href}>
                {children}
                {caret && caretIcon}
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
    caret: {
        display: "inline-block",
        verticalAlign: "text-bottom",
        flexShrink: 0,
        flexGrow: 0,
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
