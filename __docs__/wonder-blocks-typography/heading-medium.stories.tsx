import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {HeadingMedium} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Typography / HeadingMedium",
    component: HeadingMedium,
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
} as Meta<typeof HeadingMedium>;

type StoryComponentType = StoryObj<typeof HeadingMedium>;

export const Default: StoryComponentType = {
    args: {
        children: "HeadingMedium",
    },
};
