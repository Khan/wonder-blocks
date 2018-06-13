// @flow
import React from "react";
import {StyleSheet} from "aphrodite";
import {Link} from "react-router-dom";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import type {ClickableHandlers} from "@khanacademy/wonder-blocks-core";
import type {SharedProps} from "./link.js";

type Props = SharedProps &
    ClickableHandlers & {
        hovered: boolean,
        focused: boolean,
        pressed: boolean,
        href: string,
    };

const StyledAnchor = addStyle("a");
const StyledLink = addStyle(Link);

export default class LinkCore extends React.Component<Props> {
    getProps() {
        const {
            caret, // eslint-disable-line no-unused-vars
            kind,
            light,
            testId,
            style,
            hovered,
            focused,
            pressed,
            href,
            clientNav,
            ...handlers
        } = this.props;

        const linkStyles = _generateStyles(kind, light);

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && linkStyles.default,
            pressed
                ? linkStyles.active
                : (hovered || focused) && linkStyles.focus,
        ];

        const props = {
            style: [defaultStyles, style],
            "data-test-id": testId,
            ...handlers,
        };

        if (clientNav) {
            props.to = href;
        } else {
            props.href = href;
        }

        return props;
    }

    render() {
        const {children, clientNav} = this.props;

        const Tag = clientNav ? StyledLink : StyledAnchor;

        return <Tag {...this.getProps()}>{children}</Tag>;
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

const _generateStyles = (kind, light) => {
    const buttonType = kind + light.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (kind === "secondary" && light) {
        throw new Error("Secondary Light links are not supported");
    }

    const {blue, purple, white, offBlack, offBlack32} = Color;
    const linkPurple = mix(fade(offBlack, 0.08), purple);

    const defaultTextColor =
        kind === "primary" ? (light ? white : blue) : offBlack;
    const newStyles = {
        default: {
            color: defaultTextColor,
            ":visited": {
                color: light ? defaultTextColor : linkPurple,
            },
        },
        focus: {
            textDecoration: "underline currentcolor solid",
            color: light ? white : blue,
            ":visited": {
                color: light ? white : linkPurple,
            },
        },
        active: {
            color: light ? mix(fade(blue, 0.32), white) : mix(offBlack32, blue),
            ":visited": {
                color: light
                    ? mix(fade(blue, 0.32), white)
                    : mix(offBlack32, linkPurple),
            },
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
