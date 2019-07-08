// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {StyleSheet} from "aphrodite";
import type {
    ClickableHandlers,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import type {SharedProps} from "./link.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,
    ...ClickableState,
    href: string,
|};
export default class LinkCore extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    render() {
        const {
            caret, // eslint-disable-line no-unused-vars
            href,
            kind,
            light,
            style,
            testId,
            pressed,
            focused,
            hovered,
            children,
            visitable,
            skipClientNav,
        } = this.props;

        const linkStyles = _generateStyles(kind, light, visitable);

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && linkStyles.default,
            pressed
                ? linkStyles.active
                : (hovered || focused) && linkStyles.focus,
        ];

        return (
            <Clickable
                href={href}
                isLink={true}
                testId={testId}
                skipClientNav={skipClientNav}
                style={[defaultStyles, style]}
            >
                {(eventState) => <>{children}</>}
            </Clickable>
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
