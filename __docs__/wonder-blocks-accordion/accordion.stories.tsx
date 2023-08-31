import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

export default {
    title: "Accordion",
    component: Accordion,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof Accordion>;

type StoryComponentType = StoryObj<typeof Accordion>;

export const Default: StoryComponentType = {
    args: {
        children: [
            <AccordionSection title="First section">
                This is the information present in the first section
            </AccordionSection>,
            <AccordionSection title="Second section">
                This is the information present in the second section
            </AccordionSection>,
            <AccordionSection title="Third section">
                This is the information present in the third section
            </AccordionSection>,
        ],
    },
};
