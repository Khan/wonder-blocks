import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {css} from "@/styled-system/css";

import {View} from "@khanacademy/wonder-blocks-core";
import {color} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-progress-spinner/package.json";

export default {
    title: "Packages / ProgressSpinner / CircularSpinner",
    component: CircularSpinner,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ) as any,
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
        (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
            </View>
        ),
    ],
} as Meta<typeof CircularSpinner>;

type StoryComponentType = StoryObj<typeof CircularSpinner>;

export const Default: StoryComponentType = {};

export const Sizes: StoryComponentType = () => (
    <table>
        <tbody>
            <tr>
                <th>
                    <LabelLarge>xsmall</LabelLarge>
                </th>
                <th>
                    <LabelLarge>small</LabelLarge>
                </th>
                <th>
                    <LabelLarge>medium</LabelLarge>
                </th>
                <th>
                    <LabelLarge>large</LabelLarge>
                </th>
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
        </tbody>
    </table>
);

Sizes.parameters = {
    docs: {
        description: {
            story: `The available sizes for progress spinner are
            \`"xsmall"\`, \`"small"\`, \`"medium"\`, and \`"large"\`.
            This is set with the \`size\` prop.`,
        },
    },
};

export const Light: StoryComponentType = () => <CircularSpinner light={true} />;

Light.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        description: {
            story: `This is a progress spinner with its \`light\`
            prop set to true. This is for use on dark backgrounds.`,
        },
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
        description: {story: `Circular spinners also work inline.`},
    },
};

export const WithStyle: StoryComponentType = () => {
    const spinnerStyle = css.raw({
        border: "teal solid 5px",
        borderRadius: "50%",
        backgroundColor: "offWhite",
    });

    return <CircularSpinner style={spinnerStyle} />;
};

WithStyle.parameters = {
    docs: {
        description: {
            story: `\`<CircularSpinner>\` has \`style\` prop
            that can be used to apply styles to the spinner's container.
            Here, it has been given a style that includes \`border\` that
            is \`solid 5px \${Color.teal}\` as well as a \`borderRadius\`
            of \`50%\`.`,
        },
    },
};

const styles = {
    darkBackground: css.raw({
        background: "darkBlue",
        padding: "xLarge_32",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    }),
    distanced: css.raw({
        margin: "large_24",
    }),
    example: css.raw({
        alignItems: "center",
        justifyContent: "center",
    }),
    row: css.raw({
        flexDirection: "row",
        marginBottom: "xLarge_32",
    }),
};
