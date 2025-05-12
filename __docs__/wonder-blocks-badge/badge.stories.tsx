import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-form/package.json";
import {Badge} from "@khanacademy/wonder-blocks-badge";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

/**
 * Badges are visual indicators used to display concise information, such as
 * a status, label, or count.
 */
export default {
    title: "Packages / Badge",
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
    args: {
        label: "Badge",
        icon: <PhosphorIcon icon={IconMappings.cookie} />,
    },
};
