import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {AccordionSection} from "@khanacademy/wonder-blocks-accordion";
import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon/package.json";

import AccordionSectionArgtypes from "./accordion-section.argtypes";

export default {
    title: "Accordion / AccordionSection",
    component: AccordionSection,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: AccordionSectionArgtypes,
} as Meta<typeof AccordionSection>;

type StoryComponentType = StoryObj<typeof AccordionSection>;

export const Default: StoryComponentType = {
    args: {
        children: "This is the information present in this standalone section",
        title: "Standalone section",
    },
};

/**
 *
 */
export const ReactElementInTitle: StoryComponentType = {
    render: () => {
        return (
            <AccordionSection
                title={
                    <DetailCell
                        title="Title for article item"
                        leftAccessory={
                            <Icon icon={icons.contentVideo} size="medium" />
                        }
                        horizontalRule="none"
                    />
                }
            >
                This is the information present in the first section
            </AccordionSection>
        );
    },
};

// React Element in Children

// Caret Positions

// Corner Kinds

// With Initial Is Open

// With Style

// With Title Style
