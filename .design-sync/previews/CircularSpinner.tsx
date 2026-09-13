import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

const styles = StyleSheet.create({
    darkBackground: {
        background: semanticColor.core.background.instructive.strong,
        padding: sizing.size_320,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    distanced: {
        margin: sizing.size_240,
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    // Mirrors the storybook `backgrounds: neutralStrong` global that the Light
    // story relies on so the white spinner is visible on a dark backdrop.
    lightWrapper: {
        background: "#21242c",
        padding: sizing.size_320,
        alignItems: "center",
        justifyContent: "center",
    },
});

export const Default = () => (
    <View style={styles.example}>
        <CircularSpinner />
    </View>
);

export const Sizes = () => (
    <View style={styles.example}>
        <table>
            <tbody>
                <tr>
                    <th>
                        <BodyText tag="span" weight="bold">
                            xsmall
                        </BodyText>
                    </th>
                    <th>
                        <BodyText tag="span" weight="bold">
                            small
                        </BodyText>
                    </th>
                    <th>
                        <BodyText tag="span" weight="bold">
                            medium
                        </BodyText>
                    </th>
                    <th>
                        <BodyText tag="span" weight="bold">
                            large
                        </BodyText>
                    </th>
                </tr>
                <tr>
                    <td>
                        <CircularSpinner
                            size={"xsmall"}
                            style={styles.distanced}
                        />
                    </td>
                    <td>
                        <CircularSpinner
                            size={"small"}
                            style={styles.distanced}
                        />
                    </td>
                    <td>
                        <CircularSpinner
                            size={"medium"}
                            style={styles.distanced}
                        />
                    </td>
                    <td>
                        <CircularSpinner
                            size={"large"}
                            style={styles.distanced}
                        />
                    </td>
                </tr>
                <tr className={css(styles.darkBackground)}>
                    <td>
                        <CircularSpinner
                            light={true}
                            size={"xsmall"}
                            style={styles.distanced}
                        />
                    </td>
                    <td>
                        <CircularSpinner
                            light={true}
                            size={"small"}
                            style={styles.distanced}
                        />
                    </td>
                    <td>
                        <CircularSpinner
                            light={true}
                            size={"medium"}
                            style={styles.distanced}
                        />
                    </td>
                    <td>
                        <CircularSpinner
                            light={true}
                            size={"large"}
                            style={styles.distanced}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </View>
);

export const Light = () => (
    <View style={styles.lightWrapper}>
        <CircularSpinner light={true} />
    </View>
);

export const Inline = () => (
    <View style={styles.example}>
        <BodyText>
            Inline inside{" "}
            <CircularSpinner size="xsmall" style={{display: "inline"}} /> some
            text.
        </BodyText>
    </View>
);

export const WithStyle = () => {
    const spinnerStyle = {
        border: `solid 5px ${semanticColor.core.border.instructive.default}`,
        borderRadius: "50%",
        backgroundColor: semanticColor.core.background.base.subtle,
    } as const;

    return (
        <View style={styles.example}>
            <CircularSpinner style={spinnerStyle} />
        </View>
    );
};
