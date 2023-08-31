import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

import AccordionArgtypes from "./accordion.argtypes";

export default {
    title: "Accordion / Accordion",
    component: Accordion,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: AccordionArgtypes,
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

/**
 * An Accordion with custom styles. The custom styles in this example
 * include a pink border, larger border radius, and extra padding.
 */
export const WithStyle: StoryComponentType = {
    render: () => {
        const customStyles = {
            border: `2px solid ${Color.pink}`,
            borderRadius: Spacing.large_24,
            padding: Spacing.xLarge_32,
        };

        return (
            <Accordion style={customStyles}>
                <AccordionSection title="First section">
                    This is the information present in the first section
                </AccordionSection>
                <AccordionSection title="Second section">
                    This is the information present in the second section
                </AccordionSection>
                <AccordionSection title="Third section">
                    This is the information present in the third section
                </AccordionSection>
            </Accordion>
        );
    },
};
