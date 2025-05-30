import * as React from "react";

import type {Meta, StoryObj} from "@storybook/react";

import magnifyingGlass from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {action} from "@storybook/addon-actions";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActivityButton} from "@khanacademy/wonder-blocks-button";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-icon-button/package.json";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Button / ActivityButton",
    component: ActivityButton,
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            // Disabling all snapshots because we are testing all the variants
            // in `activity-icon-button-testing-snapshots.stories.tsx`.
            disableSnapshot: true,
        },
        docs: {
            source: {
                type: "code",
            },
        },
    },
    // argTypes: iconButtonSharedArgtypes,
    args: {
        children: "Search",
        kind: "primary",
        actionType: "progressive",
        onClick: (e: React.SyntheticEvent) => {
            action("clicked")(e);
        },
    },
} as Meta<typeof ActivityButton>;

type Story = StoryObj<typeof ActivityButton>;

/**
 * Minimal activity button. The only props specified in this example are `icon`
 * and `onClick`.
 */
export const Default: Story = {
    args: {
        // icon: magnifyingGlass,
        actionType: "progressive",
        disabled: false,
        kind: "primary",
    },
};

export const WithStartIcon: Story = {
    args: {
        children: "Search",
        startIcon: magnifyingGlass,
        actionType: "progressive",
        disabled: false,
        kind: "primary",
    },
};

/**
 * In this example, we have `primary`, `secondary`, `tertiary` and `disabled`
 * `ActivityButton`s from left to right.
 */
export const Kinds: Story = {
    render: (args) => {
        return (
            <View style={{gap: sizing.size_160, flexDirection: "row"}}>
                <ActivityButton {...args} />
                <ActivityButton {...args} kind="secondary" />
                <ActivityButton {...args} kind="tertiary" />
                <ActivityButton {...args} disabled={true} />
            </View>
        );
    },
};

const kinds = ["primary", "secondary", "tertiary"] as const;
const actionTypes = ["progressive", "neutral"] as const;
/**
 * ActivityButton has an `actionType` prop that is either `progressive` (the
 * default, as shown above) or `neutral`:
 */
export const ActionType: Story = {
    name: "ActionType",
    render: (args) => (
        <View style={{gap: sizing.size_160}}>
            {actionTypes.map((actionType, index) => (
                <View
                    key={index}
                    style={{gap: sizing.size_160, flexDirection: "row"}}
                >
                    {kinds.map((kind, index) => (
                        <ActivityButton
                            {...args}
                            actionType={actionType}
                            kind={kind}
                            key={`${kind}-${actionType}-${index}`}
                        />
                    ))}
                    <ActivityButton
                        {...args}
                        disabled={true}
                        actionType={actionType}
                        key={`disabled-${actionType}-${index}`}
                    />
                </View>
            ))}
        </View>
    ),
};
