// @flow
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import type {StoryComponentType} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "ProgressSpinner/CircularSpinner",
    component: CircularSpinner,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [
        (Story: any): React.Element<typeof View> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
};

export const Default: StoryComponentType = (args) => (
    <CircularSpinner {...args} />
);

export const Sizes: StoryComponentType = () => (
    <table>
        <tr>
            <td>
                <LabelLarge>xsmall</LabelLarge>
            </td>
            <td>
                <LabelLarge>small</LabelLarge>
            </td>
            <td>
                <LabelLarge>medium</LabelLarge>
            </td>
            <td>
                <LabelLarge>large</LabelLarge>
            </td>
        </tr>
        <tr>
            <td>
                <CircularSpinner size={"xsmall"} style={styles.distanced} />
            </td>
            <td>
                <CircularSpinner size={"small"} style={styles.distanced} />
            </td>
            <td>
                <CircularSpinner size={"medium"} style={styles.distanced} />
            </td>
            <td>
                <CircularSpinner size={"large"} style={styles.distanced} />
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
    </table>
);

Sizes.parameters = {
    docs: {
        storyDescription: `The available sizes for progress spinner are
            \`"xsmall"\`, \`"small"\`, \`"medium"\`, and \`"large"\`.
            This is set with the \`size\` prop.`,
    },
};

export const Light: StoryComponentType = () => (
    <View style={styles.darkBackground}>
        <CircularSpinner light={true} />
    </View>
);

Light.parameters = {
    docs: {
        storyDescription: `This is a progress spinner with its \`light\`
            prop set to true. This is for use on dark backgrounds.`,
    },
};

export const Inline: StoryComponentType = () => (
    <Body>
        Inline inside{" "}
        <CircularSpinner size="xsmall" style={{display: "inline"}} /> some text.
    </Body>
);

Inline.parameters = {
    docs: {
        storyDescription: `Circular spinners also work inline.`,
    },
};

export const WithStyle: StoryComponentType = () => {
    const spinnerStyle = {
        border: `solid 5px ${Color.teal}`,
        borderRadius: "50%",
        backgroundColor: Color.offWhite,
    };

    return <CircularSpinner style={spinnerStyle} />;
};

WithStyle.parameters = {
    docs: {
        storyDescription: `\`<CircularSpinner>\` has \`style\` prop
            that can be used to apply styles to the spinner's container.
            Here, it has been given a style that includes \`border\` that
            is \`solid 5px \${Color.teal}\` as well as a \`borderRadius\`
            of \`50%\`.`,
    },
};

const styles = StyleSheet.create({
    darkBackground: {
        background: Color.darkBlue,
        padding: Spacing.xLarge_32,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    distanced: {
        margin: Spacing.large_24,
    },
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        marginBottom: Spacing.xLarge_32,
    },
});
