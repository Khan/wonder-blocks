import * as React from "react";
import type {StoryObj} from "@storybook/react";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-badge/package.json";
import {DueBadge} from "@khanacademy/wonder-blocks-badge";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import badgeArgtypes, {showIconArgType} from "./badge.argtypes";
import {allModes} from "../../.storybook/modes";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    title: "Packages / Badge / DueBadge",
    component: DueBadge,
    argTypes: {
        ...badgeArgtypes,
        ...showIconArgType,
    },
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
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    render: (args: PropsFor<typeof DueBadge>) => {
        return (
            <View style={{flexDirection: "row", gap: sizing.size_160}}>
                <DueBadge {...args} label={args.label || ""} kind="due" />
                <DueBadge {...args} label={args.label || ""} kind="overdue" />
            </View>
        );
    },
};

type StoryComponentType = StoryObj<typeof DueBadge>;

export const Default = {
    args: {
        label: "Badge",
        showIcon: true,
    },
    render: (args: PropsFor<typeof DueBadge>) => {
        return <DueBadge {...args} label={args.label || ""} />;
    },
};

/**
 * The `DueBadge` supports two kinds: `due` and `overdue`. By default, the
 * `due` kind is used.
 */
export const Kinds: StoryComponentType = {
    args: {
        showIcon: true,
    },
    render: (args: PropsFor<typeof DueBadge>) => {
        return (
            <View style={{flexDirection: "row", gap: sizing.size_160}}>
                <DueBadge {...args} label={"Due"} kind="due" />
                <DueBadge {...args} label={"Overdue"} kind="overdue" />
            </View>
        );
    },
};

/**
 * A badge can be used with only a label.
 */
export const LabelOnly: StoryComponentType = {
    args: {
        label: "Badge",
    },
};

/**
 * Set `showIcon` to `true` to show the icon only. Alt text for the icon can be
 * set using the `iconAriaLabel` prop.
 */
export const IconOnly: StoryComponentType = {
    render: (args: PropsFor<typeof DueBadge>) => {
        return (
            <View style={{flexDirection: "row", gap: sizing.size_160}}>
                <DueBadge showIcon={true} iconAriaLabel="Due" kind="due" />
                <DueBadge
                    showIcon={true}
                    iconAriaLabel="Overdue"
                    kind="overdue"
                />
            </View>
        );
    },
};
