import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import Pill from "@khanacademy/wonder-blocks-pill";
import {allModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import {AllVariants} from "../components/all-variants";

const columns = [
    {name: "Transparent", props: {kind: "transparent"}},
    {name: "Neutral", props: {kind: "neutral"}},
    {name: "Accent", props: {kind: "accent"}},
    {name: "Info", props: {kind: "info"}},
    {name: "Success", props: {kind: "success"}},
    {name: "Warning", props: {kind: "warning"}},
    {name: "Critical", props: {kind: "critical"}},
];

const rows = [
    {
        name: "Default",
        props: {onClick: () => {}},
    },
];

type Story = StoryObj<typeof Pill>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Pill / Testing / Pill - Snapshots",
    component: Pill,
    parameters: {
        chromatic: {
            modes: {default: allModes.themeDefault},
        },
    },

    args: {
        children: "This is some text!",
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Pill>;

export default meta;

const kinds: Array<string> = [
    "transparent",
    "neutral",
    "accent",
    "info",
    "success",
    "warning",
    "critical",
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet rows={rows} columns={columns} title="Category / Kind">
                {({props, className, name}) => (
                    <Pill {...args} {...props} className={className} key={name}>
                        {props.kind}
                    </Pill>
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

const sizes = [
    {
        name: "Small",
        props: {size: "small"},
    },
    {
        name: "Medium",
        props: {size: "medium"},
    },
    {
        name: "Large",
        props: {size: "large"},
    },
];

export const Sizes: Story = {
    render: (args) => {
        return (
            <AllVariants
                rows={[
                    {name: "Static", props: {}},
                    {name: "Clickable", props: {onClick: () => {}}},
                ]}
                columns={sizes}
                title="Type / Size"
            >
                {({props}) => (
                    <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                        <View style={{gap: sizing.size_160}}>
                            {kinds.map((kind, index) => (
                                <Pill
                                    {...args}
                                    {...props}
                                    kind={kind}
                                    key={index}
                                >
                                    {kind}, {props.size}
                                </Pill>
                            ))}
                        </View>
                    </View>
                )}
            </AllVariants>
        );
    },
};
