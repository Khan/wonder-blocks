import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
export default {
    title: "Packages / Badge / Badge",
    component: Badge,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof Badge>;

type StoryComponentType = StoryObj<typeof Badge>;

export const Default: StoryComponentType = {
    args: {},
};
