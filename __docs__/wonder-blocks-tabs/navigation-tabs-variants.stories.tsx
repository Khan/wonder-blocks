import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {
    NavigationTabItem,
    NavigationTabs,
} from "@khanacademy/wonder-blocks-tabs";
import Link from "@khanacademy/wonder-blocks-link";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {rtlText} from "../components/text-for-testing";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {
    AllVariantsStates,
    defaultPseudoStates,
} from "../components/all-variants-states";

const StyledA = addStyle("a");
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
    {
        name: "Icon Only",
        props: {
            children: [
                <NavigationTabItem current={true}>
                    <IconButton
                        icon={IconMappings.iceCream}
                        aria-label="Ice cream"
                        size="medium"
                        href="#link-1"
                    />
                </NavigationTabItem>,
                <NavigationTabItem>
                    <IconButton
                        icon={IconMappings.cookie}
                        aria-label="Cookie"
                        size="medium"
                        href="#link-2"
                    />
                </NavigationTabItem>,
            ],
        },
    },
    {
        name: "Native anchor links",
        props: {
            children: [
                <NavigationTabItem current={true}>
                    <StyledA href="#link-1">
                        {rtl ? rtlText : "Anchor tag 1"}
                    </StyledA>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <StyledA href="#link-2">
                        {rtl ? rtlText : "Anchor tag 2"}
                    </StyledA>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <StyledA href="#link-3">
                        {rtl ? rtlText : "Anchor tag 3"}
                    </StyledA>
                </NavigationTabItem>,
                <NavigationTabItem>
                    <StyledA href="#link-4">
                        {rtl ? rtlText : "Anchor tag 4"}
                    </StyledA>
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
    tags: ["!autodocs"],
} satisfies Meta<typeof NavigationTabs>;

export default meta;

export const StickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rows} columns={columns}>
            {(props) => <NavigationTabs {...args} {...props} />}
        </AllVariantsStates>
    ),
    parameters: {pseudo: defaultPseudoStates},
};

export const RTLStickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rtlRows} columns={columns}>
            {(props) => <NavigationTabs {...args} {...props} />}
        </AllVariantsStates>
    ),
    parameters: {pseudo: defaultPseudoStates},
    globals: {direction: "rtl"},
};

export const ZoomStickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rows} columns={columns} layout="list">
            {(props) => <NavigationTabs {...args} {...props} />}
        </AllVariantsStates>
    ),
    parameters: {pseudo: defaultPseudoStates},
    globals: {zoom: "400%"},
};
