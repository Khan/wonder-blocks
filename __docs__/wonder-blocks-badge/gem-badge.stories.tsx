import * as React from "react";
import {StoryObj} from "@storybook/react";
import {GemBadge} from "@khanacademy/wonder-blocks-badge";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import badgeArgTypes, {showIconArgType} from "./badge.argtypes";

export default {
    title: "Packages / Badge / GemBadge",
    component: GemBadge,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disable snapshots since they're covered by the testing snapshots
            disableSnapshot: true,
        },
    },
    argTypes: {
        ...badgeArgTypes,
        ...showIconArgType,
    },
};

type StoryComponentType = StoryObj<typeof GemBadge>;

export const Default: StoryComponentType = {
    args: {
        label: "Badge",
        showIcon: true,
        labels: {
            iconAriaLabel: "Gems",
        },
    },
};

/**
 * Set `showIcon` to `false` to hide the gem icon.
 */
export const NoIcon: StoryComponentType = {
    args: {
        label: "Badge",
        showIcon: false,
    },
};

/**
 * Set `showIcon` to `true` to show the gem icon. Alt text for the gem icon can
 * be set using the `labels` prop.
 */
export const IconOnly: StoryComponentType = {
    args: {
        showIcon: true,
        labels: {
            iconAriaLabel: "Gems",
        },
    },
};
