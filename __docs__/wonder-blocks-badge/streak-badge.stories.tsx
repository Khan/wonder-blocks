import * as React from "react";
import {StoryObj} from "@storybook/react";
import {StreakBadge} from "@khanacademy/wonder-blocks-badge";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";

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
};

type StoryComponentType = StoryObj<typeof StreakBadge>;

export const Default: StoryComponentType = {
    args: {
        label: "Badge",
        showIcon: true,
        labels: {
            iconAltText: "Streak",
        },
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
 * be set using the `labels` prop.
 */
export const IconOnly: StoryComponentType = {
    args: {
        showIcon: true,
        labels: {
            iconAltText: "Streak",
        },
    },
};
