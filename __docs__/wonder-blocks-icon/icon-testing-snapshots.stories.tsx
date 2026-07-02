import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {GemIcon, Icon, StreakIcon} from "@khanacademy/wonder-blocks-icon";

import {commonStates, StateSheet} from "../components/state-sheet";
import {
    multiColoredIcon,
    singleColoredIcon,
} from "../components/icons-for-testing";
import {allThemeModes} from "../../.storybook/modes";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

/**
 * The following stories are used to generate visual regression snapshots
 * for the Icon component across themes.
 */
export default {
    title: "Packages / Icon / Testing / Snapshots / Icon",
    component: Icon,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof Icon>;

type Story = StoryObj<typeof Icon>;

const sizes = ["small", "medium", "large", "xlarge"] as const;

const columns = sizes.map((size) => ({
    name: size,
    props: {size},
}));

// The compatible elements that can be rendered inside the `Icon` component.
const rows = [
    {
        name: "Img src (svg)",
        props: {children: <img src="logo.svg" alt="Wonder Blocks" />},
    },
    {
        name: "Img src (png)",
        props: {children: <img src="avatar.png" alt="Example avatar" />},
    },
    {
        name: "Inline single-color svg with default color",
        props: {children: singleColoredIcon},
    },
    {
        name: "Inline single-color svg with semantic color",
        props: {
            children: singleColoredIcon,
            style: {color: semanticColor.core.foreground.instructive.default},
        },
    },
    {name: "Inline multi-color svg", props: {children: multiColoredIcon}},
    {
        name: "Custom (GemIcon)",
        props: {children: <GemIcon aria-label="Gem" />},
    },
    {
        name: "Custom (StreakIcon)",
        props: {children: <StreakIcon aria-label="Streak" />},
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: () => (
        <StateSheet
            rows={rows}
            columns={columns}
            states={[commonStates.rest]}
            title="Content / Size"
        >
            {({props}) => <Icon {...props} />}
        </StateSheet>
    ),
};
