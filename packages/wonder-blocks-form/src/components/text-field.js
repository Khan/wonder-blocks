// @flow

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

export default class TextField extends React.Component<{||}> {
    render(): React.Node {
        return (
            <input
                className={css([
                    styles.input,
                    typographyStyles.LabelMedium,
                    styles.default,
                ])}
                placeholder="Placeholder"
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        borderRadius: 4,
        boxSizing: "border-box",
        paddingLeft: Spacing.medium_16,
        margin: 0,
        outline: "none",
        boxShadow: "none",
        "::placeholder": {
            color: Color.offBlack64,
        },
    },
    default: {
        background: Color.white,
        border: `1px solid ${Color.offBlack16}`,
        color: Color.offBlack,
    },
    error: {
        background: "rgba(217, 41, 22, 0.06)",
        border: `1px solid ${Color.red}`,
        color: Color.offBlack,
    },
    disabled: {
        background: Color.offWhite,
        border: `1px solid ${Color.offBlack16}`,
        color: Color.offBlack64,
    },
});
