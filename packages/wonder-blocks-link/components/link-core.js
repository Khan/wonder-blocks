// @flow
import React from "react";
import {StyleSheet} from "aphrodite";

import {addStyle} from "wonder-blocks-core";
import Color, {mix, fade} from "wonder-blocks-color";
import type {SharedProps} from "./link.js";

type Props = SharedProps & {
    hovered: boolean,
    focused: boolean,
    pressed: boolean,
    href: string,
};

const StyledAnchor = addStyle("a");
export default class LinkCore extends React.Component<Props> {
    render() {
        const {
            kind,
            light,
            hovered,
            focused,
            pressed,
            children,
            href,
            style,
        } = this.props;

        const linkStyles = _generateStyles(kind, light);

        const defaultStyles = [
            sharedStyles.shared,
            !(hovered || focused || pressed) && linkStyles.default,
            pressed
                ? linkStyles.active
                : (hovered || focused) && linkStyles.focus,
        ];

        return (
            <StyledAnchor style={[defaultStyles, style]} href={href}>
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

    const {blue, white, offBlack, offBlack32} = Color;

    const defaultTextColor =
        kind === "primary" ? (light ? white : blue) : offBlack;
    const newStyles = {
        default: {
            color: defaultTextColor,
            ":visited": {
                // #TODO(yejia): Revisit once designs finalized
            },
        },
        focus: {
            color: light ? white : blue,
            textDecoration: "underline currentcolor solid",
        },
        active: {
            color: light ? mix(fade(blue, 0.32), white) : mix(offBlack32, blue),
        },
    };

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
