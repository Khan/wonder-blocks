// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {StoryComponentType} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

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
                <LabelMedium>xsmall</LabelMedium>
            </td>
            <td>
                <Strut size={Spacing.large_24} />
            </td>
            <td>
                <CircularSpinner size="xsmall" />
            </td>
        </tr>
        <tr>
            <td>
                <LabelMedium>small</LabelMedium>
            </td>
            <td>
                <Strut size={Spacing.large_24} />
            </td>
            <td>
                <CircularSpinner size="small" />
            </td>
        </tr>
        <tr>
            <td>
                <LabelMedium>medium</LabelMedium>
            </td>
            <td>
                <Strut size={Spacing.large_24} />
            </td>
            <td>
                <CircularSpinner size="medium" />
            </td>
        </tr>
        <tr>
            <td>
                <LabelMedium>large</LabelMedium>
            </td>
            <td>
                <Strut size={Spacing.large_24} />
            </td>
            <td>
                <CircularSpinner size="large" />
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
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        marginBottom: Spacing.xLarge_32,
    },
});
