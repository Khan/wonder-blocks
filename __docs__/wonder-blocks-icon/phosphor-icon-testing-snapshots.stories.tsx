import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

import {commonStates, StateSheet} from "../components/state-sheet";
import {allThemeModes} from "../../.storybook/modes";
import crownIcon from "./icons/crown.svg";

/**
 * The following stories are used to generate visual regression snapshots
 * for the PhosphorIcon component across themes.
 */
export default {
    title: "Packages / Icon / Testing / Snapshots / PhosphorIcon",
    component: PhosphorIcon,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof PhosphorIcon>;

type Story = StoryObj<typeof PhosphorIcon>;

const sizes = ["small", "medium", "large", "xlarge"] as const;

const columns = sizes.map((size) => ({
    name: size,
    props: {size},
}));

const rows = [
    {name: "Default color", props: {icon: magnifyingGlassIcon}},
    {
        name: "Semantic color",
        props: {
            icon: magnifyingGlassIcon,
            color: semanticColor.core.foreground.instructive.default,
        },
    },
    {
        name: "Custom icon",
        props: {
            icon: crownIcon,
        },
    },
    {
        name: "Custom icon with semantic color",
        props: {
            icon: crownIcon,
            color: semanticColor.core.foreground.instructive.default,
        },
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: () => (
        <StateSheet
            rows={rows}
            columns={columns}
            states={[commonStates.rest]}
            title="Color / Size"
        >
            {({props}) => <PhosphorIcon {...props} />}
        </StateSheet>
    ),
};
