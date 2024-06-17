import * as React from "react";
// import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {css} from "@/styled-system/css";
// ISSUE(juan): Panda CSS does not support external files.
// This is due to the fact that static analysis is not possible with external
// references.
// https://panda-css.com/docs/guides/dynamic-styling#what-you-cant-do
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    HeadingMedium,
    LabelMedium,
} from "@khanacademy/wonder-blocks-typography";

import {View} from "@khanacademy/wonder-blocks-core";
import packageConfig from "../../packages/wonder-blocks-core/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import viewArgTypes from "./view.argtypes";

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
    <View style={styles.container}>
        <HeadingMedium>Hello, world!</HeadingMedium>
        <View
            style={[
                styles.container,
                css.raw({
                    background: "{colors.lightBlue}",
                    // ISSUE(juan): shorthand property defined in view.tsx
                    // will take precedence over the longhand property.
                    // This means that the border will be 0px (instead of 1px).
                    // https://panda-css.com/docs/concepts/writing-styles#property-conflicts
                    border: "1px solid {colors.gold}",
                    padding: 4,
                }),
            ]}
        >
            The style prop can accept a (nested) array of Aphrodite styles and
            inline styles.
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
        <View style={styles.container}>
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

const styles = {
    // HACK(juan): css.raw needs to be used so that the compiler can identify
    // that the tokens are being used and extract them via static analysis.
    // https://panda-css.com/docs/guides/dynamic-styling#alternative
    container: css.raw({
        background: "offBlack8",
        gap: "medium_16",
        padding: "xLarge_32",
    }),

    view: css.raw({
        // ISSUE(juan): shorthand property defined in view.tsx will take
        // precedence over the longhand property. This means that the border
        // will be 0px (instead of 1px).
        // https://panda-css.com/docs/concepts/writing-styles#property-conflicts
        border: `1px dashed {colors.lightBlue}`,
        gap: "medium_16",
        padding: "medium_16",
    }),

    item: css.raw({
        background: "offBlack32",
        padding: "medium_16",
    }),
};
