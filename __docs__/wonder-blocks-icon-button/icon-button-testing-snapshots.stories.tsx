import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {AllVariants} from "../components/all-variants";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import {themeModes} from "../../.storybook/modes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {Icon} from "@khanacademy/wonder-blocks-icon";

/**
 * The following stories are used to generate the pseudo states for the
 * IconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / Testing / Snapshots / IconButton",
    tags: ["!autodocs"],
    args: {
        "aria-label": "Send",
        icon: paperPlaneIcon,
        onClick: action("clicked"),
        actionType: "progressive",
        size: "medium",
    },
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
} as Meta;

type StoryComponentType = StoryObj<typeof IconButton>;

const kinds = [
    {name: "Primary", props: {kind: "primary"}},
    {name: "Secondary", props: {kind: "secondary"}},
    {name: "Tertiary", props: {kind: "tertiary"}},
];

const actionTypes = [
    {name: "Progressive", props: {actionType: "progressive"}},
    {name: "Destructive", props: {actionType: "destructive"}},
    {name: "Neutral", props: {actionType: "neutral"}},
];

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: (args) => {
        const columns = [
            ...actionTypes,
            {name: "Disabled", props: {disabled: true}},
        ];

        return (
            <StateSheet
                rows={kinds}
                columns={columns}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <IconButton
                        {...args}
                        {...props}
                        className={className}
                        key={name}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

const sizes = [
    {name: "xsmall", props: {size: "xsmall"}},
    {name: "small", props: {size: "small"}},
    {name: "medium", props: {size: "medium"}},
    {name: "large", props: {size: "large"}},
];

export const Sizes: StoryComponentType = {
    render: (args) => {
        return (
            <AllVariants rows={sizes} columns={kinds} title="Size / Kind">
                {({props}) => (
                    <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                        {actionTypes.map(({props: {actionType}}, index) => (
                            <IconButton
                                {...args}
                                {...props}
                                actionType={actionType}
                                key={index}
                            />
                        ))}
                    </View>
                )}
            </AllVariants>
        );
    },
};

export const Scenarios: StoryComponentType = {
    render: () => {
        const scenarios = [
            {
                name: "With custom icon",
                props: {
                    icon: (
                        <Icon>
                            <img src="logo.svg" alt="" />
                        </Icon>
                    ),
                    "aria-label": "Wonder Blocks",
                    kind: "secondary",
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <IconButton {...props} />}
            </ScenariosLayout>
        );
    },
};
