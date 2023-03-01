import * as React from "react";
import type {ComponentStory, ComponentMeta} from "@storybook/react";
import {Body, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import {name, version} from "../../packages/wonder-blocks-tooltip/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

type StoryComponentType = ComponentStory<typeof TooltipContent>;

export default {
    title: "Tooltip / TooltipContent",
    component: TooltipContent,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
    },
} as ComponentMeta<typeof TooltipContent>;

const Template = (args: any) => <TooltipContent {...args} />;

/**
 * Default example (interactive).
 */
export const Default: StoryComponentType = Template.bind({});

Default.args = {
    title: "A Tooltip with a title",
    children: "some text",
};

/**
 * Only text content
 */
export const OnlyTextContent: StoryComponentType = Template.bind({});

OnlyTextContent.args = {
    children: "Only the content",
};

OnlyTextContent.parameters = {
    docs: {
        description: {
            story: "This shows the default which is text rendered using `LabelMedium`.",
        },
    },
};

/**
 * Titled content
 */
export const TitledContent: StoryComponentType = Template.bind({});

TitledContent.args = {
    title: "This tooltip has a title",
    children: "Some content in my tooltip",
};

TitledContent.parameters = {
    docs: {
        description: {
            story: "This shows the default with a title; the title is rendered using `HeadingSmall`.",
        },
    },
};

/**
 * Custom title and custom content
 */
export const CustomContent: StoryComponentType = Template.bind({});

CustomContent.args = {
    title: <Body>Body text title!</Body>,
    children: (
        <>
            <Body>Body text content!</Body>
            <LabelSmall>And LabelSmall!</LabelSmall>
        </>
    ),
};

CustomContent.parameters = {
    docs: {
        description: {
            story: "This shows how we can customize both the title and the content.",
        },
    },
};
