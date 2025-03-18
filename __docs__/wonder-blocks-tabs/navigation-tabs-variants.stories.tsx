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
import {rtlText} from "../components/text-for-testing";
import {ZoomWrapper} from "../components/zoom-wrapper";

const generateRows = (rtl: boolean = false) => [
    {
        name: "Default",
        props: {
            "aria-label": "Default navigation tabs",
            children: [
                <NavigationTabItem current={true}>
                    <Link href="#link1">
                        {rtl ? rtlText : "Navigation Tab Item 1"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link href="#link2">
                        {rtl ? rtlText : "Navigation Tab Item 2"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link href="#link3">
                        {rtl ? rtlText : "Navigation Tab Item 3"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <Link href="#link4">
                        {rtl ? rtlText : "Navigation Tab Item 4"}
                    </Link>
                </NavigationTabItem>,
            ],
        },
    },
    {
        name: "Link Capabilities",
        props: {
            "aria-label": "Navigation tabs with link capabilities",
            children: [
                <NavigationTabItem>
                    <Link href="https://khanacademy.org" target="_blank">
                        {rtl ? rtlText : "External Link"}
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
                        {rtl ? rtlText : "Start Icon"}
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
                        {rtl ? rtlText : "End Icon"}
                    </Link>
                </NavigationTabItem>,
                <NavigationTabItem current={true}>
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
                        {rtl ? rtlText : "Start and End Icons"}
                    </Link>
                </NavigationTabItem>,
            ],
        },
    },
];

const rows = generateRows();
const rtlRows = generateRows(true);

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
        <div>
            <AllVariants rows={rows} columns={columns}>
                {(props) => (
                    <View style={styles.container}>
                        <NavigationTabs {...args} {...props} />
                    </View>
                )}
            </AllVariants>
            <div dir="rtl">
                <AllVariants rows={rtlRows} columns={columns}>
                    {(props) => (
                        <View style={styles.container}>
                            <NavigationTabs {...args} {...props} />
                        </View>
                    )}
                </AllVariants>
            </div>
        </div>
    ),
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

export const Zoom: Story = {
    render: (args) => (
        <ZoomWrapper>
            <AllVariants rows={rows} columns={columns} layout="list">
                {(props) => (
                    <View style={styles.container}>
                        <NavigationTabs {...args} {...props} />
                    </View>
                )}
            </AllVariants>
            <div dir="rtl">
                <AllVariants rows={rtlRows} columns={columns} layout="list">
                    {(props) => (
                        <View style={styles.container}>
                            <NavigationTabs {...args} {...props} />
                        </View>
                    )}
                </AllVariants>
            </div>
        </ZoomWrapper>
    ),
};

const styles = StyleSheet.create({
    container: {
        gap: sizing.size_200,
    },
});
