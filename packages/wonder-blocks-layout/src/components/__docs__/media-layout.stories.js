// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {
    MediaLayout,
    MediaLayoutContext,
} from "@khanacademy/wonder-blocks-layout";
import type {
    MediaSpec,
    MediaLayoutContextValue,
} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    Body,
    HeadingSmall,
    HeadingLarge,
} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "Layout / MediaLayout (Deprecated)",
    component: MediaLayout,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
};

export const Default: StoryComponentType = (args) => (
    <MediaLayout {...args}>
        {({mediaSize, mediaSpec, styles}) => {
            return <View style={styles.test}>Hello, world!</View>;
        }}
    </MediaLayout>
);

Default.args = {
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
    };

    return (
        <MediaLayout styleSheets={styleSheets}>
            {({mediaSize, mediaSpec, styles}) => {
                return <View style={styles.test}>Hello, world!</View>;
            }}
        </MediaLayout>
    );
};

ScreenSizeStyles.parameters = {
    docs: {
        storyDescription: `You can switch styles for different screen sizes.
        By default, MediaLayout uses \`MEDIA_DEFAULT_SPEC\`. Here you can
        see an example that changes styles depending on the current spec.
        It's dark blue for a large window size, blue for a medium window
        size, and light blue for a small window size.`,
    },
};

export const AllStyles: StoryComponentType = () => {
    const styleSheets = {
        all: StyleSheet.create({
            // use shared styles for all sizes
            test: {
                color: Color.white,
                padding: Spacing.medium_16,
            },
        }),

        large: StyleSheet.create({
            // override the `padding` prop` here
            test: {
                backgroundColor: Color.darkBlue,
                padding: Spacing.xxLarge_48,
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
    };

    return (
        <MediaLayout styleSheets={styleSheets}>
            {({styles}) => {
                return <View style={styles.test}>Hello, world!</View>;
            }}
        </MediaLayout>
    );
};

AllStyles.parameters = {
    docs: {
        storyDescription: `You can define a shared style for all sizes.
            You can use the \`all\` key to define styles for all the
            different sizes. This means that by using this key, all
            the sizes (small, medium, large) will use the styles defined
            in \`all\`, and in case there are duplicate properties,
            more specific sizes will take more importance.`,
    },
};

export const CustomSpec: StoryComponentType = () => {
    const styleSheets = {
        large: StyleSheet.create({
            example: {
                alignItems: "center",
                backgroundColor: Color.darkBlue,
                color: Color.white,
                padding: Spacing.xxxLarge_64,
            },
        }),

        small: StyleSheet.create({
            example: {
                backgroundColor: Color.lightBlue,
                padding: Spacing.small_12,
            },
        }),
    };

    // Custom media spec definition
    const MEDIA_CUSTOM_SPEC: MediaSpec = {
        small: {
            query: "(max-width: 767px)",
            totalColumns: 4,
            gutterWidth: Spacing.medium_16,
            marginWidth: Spacing.medium_16,
        },
        large: {
            query: "(min-width: 768px)",
            totalColumns: 12,
            gutterWidth: Spacing.xLarge_32,
            marginWidth: Spacing.xxLarge_48,
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
    docs: {
        storyDescription: `You can use a custom spec.
        There are cases when you might need to use a custom media query spec.
        For that situation you can define your own custom \`MEDIA_SPEC\`.
        You need to use the \`MediaLayoutContext.Provider\` to specify this
        spec value.
        **NOTE**: Make sure to import the \`MediaSpec\` and
        \`MediaLayoutContextValue\` type definitions.`,
    },
};
