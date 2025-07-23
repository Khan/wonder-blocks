import * as React from "react";
import {StoryObj} from "@storybook/react-vite";
import {StreakBadge} from "@khanacademy/wonder-blocks-badge";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import badgeArgTypes, {showIconArgType} from "./badge.argtypes";

export default {
    title: "Packages / Badge / StreakBadge",
    component: StreakBadge,
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

type StoryComponentType = StoryObj<typeof StreakBadge>;

export const Default: StoryComponentType = {
    args: {
        label: "Badge",
        showIcon: true,
        iconAriaLabel: "Streak",
    },
};

/**
 * Set `showIcon` to `false` to hide the streak icon.
 */
export const NoIcon: StoryComponentType = {
    args: {
        label: "Badge",
        showIcon: false,
    },
};

/**
 * Set `showIcon` to `true` to show the streak icon. Alt text for the streak icon can
 * be set using the `iconAriaLabel` prop.
 */
export const IconOnly: StoryComponentType = {
    args: {
        showIcon: true,
        iconAriaLabel: "Streak",
    },
};
