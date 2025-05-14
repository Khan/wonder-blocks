import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import packageConfig from "../../packages/wonder-blocks-typography/package.json";

import ComponentInfo from "../components/component-info";
import TypographyArgTypes from "./typography.argtypes";

import {ThemeSwitcher} from "@khanacademy/wonder-blocks-theming";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Typography / BodyText",
    component: BodyText,
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
} as Meta<typeof BodyText>;
export const Default: StoryObj<typeof BodyText> = {
    render: (args) => (
        <ThemeSwitcher theme="thunderblocks">
            <BodyText {...args} />
        </ThemeSwitcher>
    ),
    args: {
        children: "BodyText",
        size: "medium",
        weight: "regular",
    },
};
