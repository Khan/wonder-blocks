import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    Body,
    HeadingSmall,
    HeadingLarge,
} from "@khanacademy/wonder-blocks-typography";

import type {
    MediaSpec,
    MediaLayoutContextValue,
} from "@khanacademy/wonder-blocks-layout";
import {
    MediaLayout,
    MediaLayoutContext,
} from "@khanacademy/wonder-blocks-layout";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-layout/package.json";

export default {
    title: "Layout / MediaLayout (Deprecated)",
    component: MediaLayout,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof MediaLayout>;

type StoryComponentType = StoryObj<typeof MediaLayout>;

export const Default: StoryComponentType = {
    render: (args) => (
        <MediaLayout {...args}>
            {({mediaSize, mediaSpec, styles}) => {
                return <View style={styles.test}>Hello, world!</View>;
            }}
        </MediaLayout>
    ),
    args: {
        styleSheets: {
            large: StyleSheet.create({
                test: {
                    backgroundColor: Color.darkBlue,
                    color: Color.white,
                },
            }),
            medium: StyleSheet.create({
                test: {
                    backgroundColor: Color.blue,
                    color: Color.white,
                },
            }),
            small: StyleSheet.create({
                test: {
                    backgroundColor: Color.lightBlue,
                    color: Color.white,
                },
            }),
        },
    },
};

Default.parameters = {
    chromatic: {
        // We don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
};

export const ScreenSizeStyles: StoryComponentType = () => {
    const styleSheets = {
        large: StyleSheet.create({
            test: {
                backgroundColor: Color.darkBlue,
                color: Color.white,
            },
        }),
        medium: StyleSheet.create({
            test: {
                backgroundColor: Color.blue,
                color: Color.white,
            },
        }),
        small: StyleSheet.create({
            test: {
                backgroundColor: Color.lightBlue,
                color: Color.white,
            },
        }),
    } as const;

    return (
        <MediaLayout styleSheets={styleSheets}>
            {({mediaSize, mediaSpec, styles}) => {
                return <View style={styles.test}>Hello, world!</View>;
            }}
        </MediaLayout>
    );
};

ScreenSizeStyles.parameters = {
    chromatic: {
        // We don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: `You can switch styles for different screen sizes.
        By default, MediaLayout uses \`MEDIA_DEFAULT_SPEC\`. Here you can
        see an example that changes styles depending on the current spec.
        It's dark blue for a large window size, blue for a medium window
        size, and light blue for a small window size.`,
        },
    },
};

export const AllStyles: StoryComponentType = () => {
    const styleSheets = {
        all: StyleSheet.create({
            // use shared styles for all sizes
            test: {
                color: Color.white,
                padding: spacing.medium_16,
            },
        }),

        large: StyleSheet.create({
            // override the `padding` prop` here
            test: {
                backgroundColor: Color.darkBlue,
                padding: spacing.xxLarge_48,
            },
        }),

        medium: StyleSheet.create({
            test: {
                backgroundColor: Color.blue,
            },
        }),

        small: StyleSheet.create({
            test: {
                backgroundColor: Color.lightBlue,
            },
        }),
    } as const;

    return (
        <MediaLayout styleSheets={styleSheets}>
            {({styles}) => {
                return <View style={styles.test}>Hello, world!</View>;
            }}
        </MediaLayout>
    );
};

AllStyles.parameters = {
    chromatic: {
        // We don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: `You can define a shared style for all sizes.
            You can use the \`all\` key to define styles for all the
            different sizes. This means that by using this key, all
            the sizes (small, medium, large) will use the styles defined
            in \`all\`, and in case there are duplicate properties,
            more specific sizes will take more importance.`,
        },
    },
};

export const CustomSpec: StoryComponentType = () => {
    const styleSheets = {
        large: StyleSheet.create({
            example: {
                alignItems: "center",
                backgroundColor: Color.darkBlue,
                color: Color.white,
                padding: spacing.xxxLarge_64,
            },
        }),

        small: StyleSheet.create({
            example: {
                backgroundColor: Color.lightBlue,
                padding: spacing.small_12,
            },
        }),
    } as const;

    // Custom media spec definition
    const MEDIA_CUSTOM_SPEC: MediaSpec = {
        small: {
            query: "(max-width: 767px)",
            totalColumns: 4,
            gutterWidth: spacing.medium_16,
            marginWidth: spacing.medium_16,
        },
        large: {
            query: "(min-width: 768px)",
            totalColumns: 12,
            gutterWidth: spacing.xLarge_32,
            marginWidth: spacing.xxLarge_48,
        },
    };

    const contextValue: MediaLayoutContextValue = {
        ssrSize: "large",
        mediaSpec: MEDIA_CUSTOM_SPEC,
    };

    return (
        <MediaLayoutContext.Provider value={contextValue}>
            <MediaLayout styleSheets={styleSheets}>
                {({mediaSize, styles}) => {
                    const HeadingComponent =
                        mediaSize === "small" ? HeadingSmall : HeadingLarge;

                    return (
                        <View style={styles.example}>
                            <HeadingComponent>
                                Current mediaSpec: {mediaSize}
                            </HeadingComponent>
                            <Body tag="p">
                                {`Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat.`}
                            </Body>
                        </View>
                    );
                }}
            </MediaLayout>
        </MediaLayoutContext.Provider>
    );
};

CustomSpec.parameters = {
    chromatic: {
        // We don't need screenshots because this story only tests behavior.
        disableSnapshot: true,
    },
    docs: {
        description: {
            story: `You can use a custom spec.
        There are cases when you might need to use a custom media query spec.
        For that situation you can define your own custom \`MEDIA_SPEC\`.
        You need to use the \`MediaLayoutContext.Provider\` to specify this
        spec value.
        **NOTE**: Make sure to import the \`MediaSpec\` and
        \`MediaLayoutContextValue\` type definitions.`,
        },
    },
};
