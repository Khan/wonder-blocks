import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import Toolbar from "@khanacademy/wonder-blocks-toolbar";
import {name, version} from "@khanacademy/wonder-blocks-toolbar/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import ToolbarArgtypes, {
    leftContentMappings,
    rightContentMappings,
} from "./toolbar.argtypes";

export default {
    title: "Toolbar / Toolbar",
    component: Toolbar,
    argTypes: ToolbarArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo name={name} version={version} />
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
            <View style={styles.example}>{Story()}</View>
        ),
    ],
};

const styles = StyleSheet.create({
    example: {
        padding: Spacing.large_24,
        alignItems: "center",
        justifyContent: "center",
    },
});

const Template = (args: any) => <Toolbar {...args} />;

/**
 * Default example (interactive).
 *
 * A toolbar with left and right content.
 */
export const Default: StoryComponentType = Template.bind({});

Default.args = {
    title: "Counting with small numbers",
    leftContent: leftContentMappings.dismissButton,
    rightContent: rightContentMappings.nextVideoButton,
};

/**
 * Small toolbar with multiple left side buttons.
 */
export const Small: StoryComponentType = Template.bind({});

Small.args = {
    size: "small",
    leftContent: leftContentMappings.multipleContent,
    rightContent: rightContentMappings.tertiaryButton,
};

Small.parameters = {
    docs: {
        description: {
            story:
                "A small toolbar with content on both sides.\n\n" +
                "**Note:** The `IconButton`s are nudged to the left by 1px to match designs.",
        },
    },
};

/**
 * Toolbar with left icon button and right primary button.
 */
export const Medium: StoryComponentType = Template.bind({});

Medium.args = {
    leftContent: leftContentMappings.hintButton,
    rightContent: rightContentMappings.primaryButton,
};

Medium.parameters = {
    docs: {
        description: {
            story:
                "A toolbar with content on both sides. Note that for this example, we are using the default size (`medium`).\n\n" +
                "**Note:** The `IconButton` is nudged to the left by 6px to match designs.",
        },
    },
};

/**
 * Toolbar with title.
 */
export const WithTitle: StoryComponentType = Template.bind({});

WithTitle.args = {
    leftContent: leftContentMappings.dismissButton,
    title: "Counting with small numbers",
};

WithTitle.parameters = {
    docs: {
        description: {
            story:
                "A toolbar that shows how we can combine a title and a dismiss button on the left side.\n\n" +
                "**Note:** The `IconButton` is nudged to the left by 6px to match designs.",
        },
    },
};

/**
 * Toolbar with multiple elements on the right.
 */
export const WithMultipleElements: StoryComponentType = Template.bind({});

WithMultipleElements.args = {
    rightContent: rightContentMappings.multipleContent,
};

WithMultipleElements.parameters = {
    docs: {
        description: {
            story: "This toolbar includes multiple elements on the right.",
        },
    },
};

/**
 * Header overflow text.
 */
export const HeaderOverflowText: StoryComponentType = Template.bind({});

HeaderOverflowText.args = {
    leftContent: leftContentMappings.dismissButton,
    subtitle: "1 of 14 questions answered",
    title: "Patterns of migration and communal bird-feeding given the serious situation of things that will make this string long and obnoxious",
    rightContent: rightContentMappings.link,
};

HeaderOverflowText.parameters = {
    docs: {
        description: {
            story:
                "This example illustrates how the toolbar can work in situations where we include multiple lines of text.\n\n" +
                "**Note:** The `IconButton` is nudged to the left by 6px to match designs.",
        },
    },
};

/**
 * Flexible toolbars.
 */
export const Responsive: StoryComponentType = Template.bind({});

Responsive.args = {
    leftContent: leftContentMappings.hintButton,
    rightContent: rightContentMappings.responsive,
};

Responsive.parameters = {
    docs: {
        description: {
            story: "Sometimes there will be cases where we want to fill the content of one of the sides of the toolbar. This example demonstrates how toolbars can be used flexibly without breaking your layouts.",
        },
    },
    chromatic: {
        // Test responsiveness of the toolbar.
        viewports: [320, 768, 1024],
    },
};

/**
 * Inverted dark-color scheme
 */
export const Dark: StoryComponentType = Template.bind({});

Dark.args = {
    color: "dark",
    title: "Title",
    leftContent: leftContentMappings.lightButton,
    rightContent: rightContentMappings.lightButton,
};

Dark.parameters = {
    backgrounds: {
        default: "darkBlue",
    },
    docs: {
        description: {
            story:
                "A toolbar can be also used in a dark color scheme.\n\n" +
                "**Note:** Notice that there's a white hairline in this case, and that the background is transparent (to allow the Dark Blue or illustrated background to come through).",
        },
    },
};
