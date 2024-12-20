import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {Body, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";
import packageConfig from "../../packages/wonder-blocks-tooltip/package.json";

import ComponentInfo from "../components/component-info";

type StoryComponentType = StoryObj<typeof TooltipContent>;

export default {
    title: "Packages / Tooltip / TooltipContent",
    component: TooltipContent,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof TooltipContent>;

/**
 * Default example (interactive).
 */
export const Default: StoryComponentType = {
    args: {
        title: "A Tooltip with a title",
        children: "some text",
    },
};

/**
 * Only text content
 */
export const OnlyTextContent: StoryComponentType = {
    args: {
        children: "Only the content",
    },
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
export const TitledContent: StoryComponentType = {
    args: {
        title: "This tooltip has a title",
        children: "Some content in my tooltip",
    },
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
export const CustomContent: StoryComponentType = {
    args: {
        title: <Body>Body text title!</Body>,
        children: (
            <>
                <Body>Body text content!</Body>
                <LabelSmall>And LabelSmall!</LabelSmall>
            </>
        ),
    },
};

CustomContent.parameters = {
    docs: {
        description: {
            story: "This shows how we can customize both the title and the content.",
        },
    },
};
