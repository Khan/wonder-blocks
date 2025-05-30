import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {allModes} from "../../.storybook/modes";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {AllVariants} from "../components/all-variants";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

/**
 * The following stories are used to generate the pseudo states for the
 * Button component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Button / Testing / Snapshots / Button",
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
    args: {
        children: "Button",
        icon: paperPlaneIcon,
        onClick: action("clicked"),
        actionType: "progressive",
        size: "medium",
    },
} as Meta<typeof Button>;

type StoryComponentType = StoryObj<typeof Button>;

const kinds = [
    {name: "Primary", props: {kind: "primary"}},
    {name: "Secondary", props: {kind: "secondary"}},
    {name: "Tertiary", props: {kind: "tertiary"}},
];

const actionTypes = [
    {name: "Progressive", props: {actionType: "progressive"}},
    {name: "Destructive", props: {actionType: "destructive"}},
    {name: "Neutral", props: {actionType: "neutral"}},
    {name: "Disabled", props: {disabled: true}},
];

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: (args) => {
        return (
            <StateSheet
                rows={kinds}
                columns={actionTypes}
                title="Kind / Action Type"
            >
                {({props, className, name}) => (
                    <View
                        key={name}
                        style={{flexDirection: "row", gap: sizing.size_120}}
                    >
                        <Button
                            {...args}
                            {...props}
                            className={className}
                            onClick={action("clicked")}
                        />

                        {/* startIcon */}
                        <Button
                            {...args}
                            {...props}
                            className={className}
                            onClick={action("clicked")}
                            startIcon={paperPlaneIcon}
                        />

                        {/* endIcon */}
                        <Button
                            {...args}
                            {...props}
                            className={className}
                            onClick={action("clicked")}
                            endIcon={paperPlaneIcon}
                        />
                    </View>
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

const sizes = [
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
                        {actionTypes.map(
                            ({props: {actionType, disabled}}, index) => (
                                <Button
                                    {...args}
                                    {...props}
                                    actionType={actionType}
                                    disabled={disabled}
                                    key={index}
                                    startIcon={paperPlaneIcon}
                                    endIcon={paperPlaneIcon}
                                />
                            ),
                        )}
                    </View>
                )}
            </AllVariants>
        );
    },
};
