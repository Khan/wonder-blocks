// @flow

import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {styles as typographyStyles} from "@khanacademy/wonder-blocks-typography";

export default class TextField extends React.Component<{||}> {
    render(): React.Node {
        return (
            <View style={[styles.container, styles.default]}>
                <input
                    className={css([
                        styles.input,
                        typographyStyles.LabelMedium,
                    ])}
                    placeholder="Placeholder"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 288,
        height: 40,
        borderRadius: 4,
        boxSizing: "border-box",
        padding: "10px 10px 10px 16px",
    },
    default: {
        background: Color.white,
        border: `1px solid ${Color.offBlack16}`,
        color: Color.offBlack,
    },
    error: {
        background: `linear-gradient(0deg, rgba(217, 41, 22, 0.06), rgba(217, 41, 22, 0.06)), ${Color.white}`,
        border: `1px solid ${Color.red}`,
        color: Color.offBlack,
    },
    disabled: {
        background: Color.offWhite,
        border: `1px solid ${Color.offBlack16}`,
        color: Color.offBlack64,
    },
    input: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "none",
        color: "inherit",
        border: "none",
        outline: "none",
        boxShadow: "none",
        padding: 0,
        margin: 0,
        "::placeholder": {
            color: Color.offBlack64,
        },
    },
});
