import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Typography / HeadingSmall",
    component: HeadingSmall,
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
} as Meta<typeof HeadingSmall>;

type StoryComponentType = StoryObj<typeof HeadingSmall>;

export const Default: StoryComponentType = {
    args: {
        children: "HeadingSmall",
    },
};
