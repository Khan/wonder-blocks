import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";

import paperPlaneIcon from "@phosphor-icons/core/fill/paper-plane-tilt-fill.svg";
import {ActivityButton} from "@khanacademy/wonder-blocks-button";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {allModes} from "../../.storybook/modes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {longTextWithNoWordBreak} from "../components/text-for-testing";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

/**
 * The following stories are used to generate the pseudo states for the
 * ActivityButton component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Button / Testing / Snapshots / ActivityButton",
    tags: ["!autodocs"],
    args: {
        children: "Button",
        icon: paperPlaneIcon,
        onClick: action("clicked"),
        actionType: "progressive",
        size: "medium",
    },
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof ActivityButton>;

const kinds = [
    {name: "Primary", props: {kind: "primary"}},
    {name: "Secondary", props: {kind: "secondary"}},
    {name: "Tertiary", props: {kind: "tertiary"}},
];

const actionTypes = [
    {name: "Progressive", props: {actionType: "progressive"}},
    {name: "Neutral", props: {actionType: "neutral"}},
    {name: "Disabled", props: {disabled: true}},
];

export const StateSheetStory: Story = {
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
                        <ActivityButton
                            {...args}
                            {...props}
                            className={className}
                            onClick={action("clicked")}
                        />

                        {/* startIcon */}
                        <ActivityButton
                            {...args}
                            {...props}
                            className={className}
                            onClick={action("clicked")}
                            startIcon={paperPlaneIcon}
                        />

                        {/* endIcon */}
                        <ActivityButton
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

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Long label with multiple words",
                props: {
                    children: (
                        <ActivityButton startIcon={paperPlaneIcon}>
                            Send with a very long text
                        </ActivityButton>
                    ),
                },
            },
            {
                name: "Long label with songle word in more than two lines",
                props: {
                    children: (
                        <ActivityButton startIcon={paperPlaneIcon}>
                            {longTextWithNoWordBreak}
                        </ActivityButton>
                    ),
                },
            },
        ];
        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => props.children}
            </ScenariosLayout>
        );
    },
};
