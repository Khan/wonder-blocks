import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {AllVariants} from "../components/all-variants";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

/**
 * The following stories are used to generate the pseudo states for the
 * IconButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / IconButton / IconButton - All Variants",
    tags: ["!autodocs"],
    args: {
        "aria-label": "Send",
        icon: paperPlaneIcon,
        onClick: action("clicked"),
        actionType: "progressive",
        size: "medium",
    },
} as Meta;

type StoryComponentType = StoryObj<typeof IconButton>;

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: (args) => {
        const rows = [
            {name: "Primary", props: {kind: "primary"}},
            {name: "Secondary", props: {kind: "secondary"}},
            {name: "Tertiary", props: {kind: "tertiary"}},
        ];

        const columns = [
            {name: "Progressive", props: {actionType: "progressive"}},
            {name: "Destructive", props: {actionType: "destructive"}},
            {name: "Neutral", props: {actionType: "neutral"}},
            {name: "Disabled", props: {disabled: true}},
        ];

        return (
            <StateSheet
                rows={rows}
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

export const Sizes: StoryComponentType = {
    render: (args) => {
        const rows = [
            {name: "xsmall", props: {size: "xsmall"}},
            {name: "small", props: {size: "small"}},
            {name: "medium", props: {size: "medium"}},
            {name: "large", props: {size: "large"}},
        ];

        const columns = [
            {name: "Progressive", props: {actionType: "progressive"}},
            {name: "Destructive", props: {actionType: "destructive"}},
            {name: "Neutral", props: {actionType: "neutral"}},
            {name: "Disabled", props: {disabled: true}},
        ];

        return (
            <AllVariants rows={rows} columns={columns}>
                {({props}) => <IconButton {...args} {...props} />}
            </AllVariants>
        );
    },
};
