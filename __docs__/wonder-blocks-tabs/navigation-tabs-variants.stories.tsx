import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {AllVariants} from "../components/all-variants";
import Link from "@khanacademy/wonder-blocks-link";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const rows = [
    {name: "Default", props: {}},
    {
        name: "Link Capabilities",
        props: {
            children: [
                <NavigationTabItem>
                    <Link href="https://khanacademy.org" target="_blank">
                        External Link
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link
                        href="#link2"
                        startIcon={
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        }
                    >
                        Start Icon
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link
                        href="#link3"
                        endIcon={
                            <PhosphorIcon
                                icon={IconMappings.iceCream}
                                size="small"
                            />
                        }
                    >
                        End Icon
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link
                        href="#link4"
                        startIcon={
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
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
                </NavigationTabItem>,
            ],
        },
    },
];

const columns = [
    {
        name: "Default",
        props: {},
    },
];

type Story = StoryObj<typeof NavigationTabs>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / NavigationTabs / NavigationTabs / NavigationTabs - All Variants",
    component: NavigationTabs,
    render: (args) => (
        <AllVariants rows={rows} columns={columns}>
            {(props) => (
                <View style={styles.container}>
                    <NavigationTabs {...args} {...props} />
                </View>
            )}
        </AllVariants>
    ),
    args: {
        children: [
            <NavigationTabItem>
                <Link href="#link1">Navigation Tab Item 1</Link>
            </NavigationTabItem>,
            <NavigationTabItem>
                <Link href="#link2">Navigation Tab Item 2</Link>
            </NavigationTabItem>,
            <NavigationTabItem>
                <Link href="#link3">Navigation Tab Item 3</Link>
            </NavigationTabItem>,
            <NavigationTabItem>
                <Link href="#link4">Navigation Tab Item 4</Link>
            </NavigationTabItem>,
        ],
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof NavigationTabs>;

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

export const Active: Story = {
    parameters: {pseudo: {hover: true, active: true}},
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_200,
    },
});
