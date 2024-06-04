import * as React from "react";
// import {css} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {cx} from "class-variance-authority";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    HeadingMedium,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";

import {View} from "@khanacademy/wonder-blocks-core";
import packageConfig from "../../packages/wonder-blocks-core/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import viewArgTypes from "./view.argtypes";

import styles from "./view.stories.module.css";

export default {
    title: "Packages / Core / View",
    component: View,
    argTypes: viewArgTypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
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
} as Meta<typeof View>;

type StoryComponentType = StoryObj<typeof View>;

export const Default: StoryComponentType = {
    args: {
        children: "This is a View!",
    },
};

export const InlineStyles: StoryComponentType = () => (
    <View>
        <View style={styles.container}>
            <HeadingMedium>Hello, world!</HeadingMedium>
            <View style={cx([styles.container, styles.inlineStyles])}>
                The style prop can accept a (nested) array of Aphrodite styles
                and inline styles.
            </View>
        </View>
    </View>
);

InlineStyles.parameters = {
    docs: {
        description: {
            story: "Styles can be applied inline to the component, or by passing an Aphrodite style object.",
        },
    },
};

export const OtherProps: StoryComponentType = {
    name: "Using other props",
    render: () => (
        <View className={styles.container}>
            <View
                onClick={() => {
                    // eslint-disable-next-line no-console
                    console.log("View has been clicked!");
                }}
                style={styles.item}
            >
                Click me!
            </View>

            <View aria-hidden="true">
                This text is hidden from screen readers.
            </View>
        </View>
    ),
};

OtherProps.parameters = {
    docs: {
        description: {
            story: "Other props can be passed through `View`s as if they were normal tags.",
        },
    },
};

export const DefiningLayout: StoryComponentType = () => (
    <View style={styles.container}>
        <HeadingMedium>View as a column</HeadingMedium>
        <View style={styles.view}>
            <View style={styles.item}>
                <LabelMedium>First item</LabelMedium>
            </View>
            <View style={styles.item}>
                <LabelMedium>Second item</LabelMedium>
            </View>
        </View>

        <HeadingMedium>View as a row</HeadingMedium>
        <View style={[styles.view, {flexDirection: "row"}]}>
            <View style={styles.item}>
                <LabelMedium>First item</LabelMedium>
            </View>
            <View style={styles.item}>
                <LabelMedium>Second item</LabelMedium>
            </View>
        </View>
    </View>
);

DefiningLayout.parameters = {
    docs: {
        description: {
            story: '`View` can also be used to wrap elements and apply different flexbox layouts. By default, `View` uses `flexDirection: "column"`.',
        },
    },
};
