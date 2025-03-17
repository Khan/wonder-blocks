import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {AllVariants} from "../components/all-variants";
import Link from "@khanacademy/wonder-blocks-link";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const rows = [
    {name: "Default", props: {}},
    {
        name: "External Link",
        props: {
            children: (
                <Link href="https://khanacademy.org" target="_blank">
                    External link
                </Link>
            ),
        },
    },
    {
        name: "Start Icon",
        props: {
            children: (
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                >
                    Start Icon
                </Link>
            ),
        },
    },
    {
        name: "End Icon",
        props: {
            children: (
                <Link
                    href="#link"
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    End Icon
                </Link>
            ),
        },
    },
    {
        name: "Start and End Icons",
        props: {
            children: (
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    Start and End Icons
                </Link>
            ),
        },
    },
];

const columns = [
    {
        name: "Default",
        props: {},
    },
];

type Story = StoryObj<typeof NavigationTabItem>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / NavigationTabs / NavigationTabItem / NavigationTabItem - All Variants",
    component: NavigationTabItem,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => (
                <View style={styles.container}>
                    <NavigationTabItem {...args} {...props} />
                </View>
            )}
        </AllVariants>
    ),
    args: {
        children: <Link href="#link">Navigation Tab Item</Link>,
    },
    tags: ["!autodocs"],
    parameters: {
        a11y: {
            config: {
                rules: [
                    // Disabling warning: "List item does not have a <ul>, <ol> parent element"
                    // This is intentional because NavigationTabs provides the ul element and it
                    // is outside of this component
                    {id: "listitem", enabled: false},
                ],
            },
        },
    },
} satisfies Meta<typeof NavigationTabItem>;

export default meta;

export const Default: Story = {};

export const Hover: Story = {
    parameters: {pseudo: {hover: true}},
};

export const Focus: Story = {
    parameters: {pseudo: {focusVisible: true}},
};

export const HoverFocus: Story = {
    name: "Hover + Focus",
    parameters: {pseudo: {hover: true, focusVisible: true}},
};

export const Press: Story = {
    parameters: {pseudo: {hover: true, active: true}},
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_200,
        alignItems: "flex-start",
    },
});
