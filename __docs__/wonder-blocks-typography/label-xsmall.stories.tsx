import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {LabelXSmall} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Typography / LabelXSmall",
    component: LabelXSmall,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling because all typography components are covered together
            // in the Typography stories
            disableSnapshot: true,
        },
    },
    argTypes: TypographyArgTypes,
} as Meta<typeof LabelXSmall>;

type StoryComponentType = StoryObj<typeof LabelXSmall>;

export const Default: StoryComponentType = {
    args: {
        children: "LabelXSmall",
    },
};
