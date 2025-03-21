import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";

import {addStyle} from "@khanacademy/wonder-blocks-core";
import {NavigationTabItem} from "@khanacademy/wonder-blocks-tabs";
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
const generateRows = (rtl: boolean = false) => {
    return [
        {
            name: "Default",
            props: {
                children: (
                    <Link href="#link">
                        {rtl ? rtlText : "Navigation Tab Item"}
                    </Link>
                ),
            },
        },
        {
            name: "External Link",
            props: {
                children: (
                    <Link href="https://khanacademy.org" target="_blank">
                        {rtl ? rtlText : "External link"}
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
                            <PhosphorIcon
                                icon={IconMappings.cookie}
                                size="small"
                            />
                        }
                    >
                        {rtl ? rtlText : "Start Icon"}
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
                        {rtl ? rtlText : "End Icon"}
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
                ),
            },
        },
        {
            name: "Icon only",
            props: {
                children: (
                    <IconButton
                        href="#link"
                        aria-label="Ice cream"
                        icon={IconMappings.iceCream}
                    />
                ),
            },
        },
        {
            name: "Native anchor tag",
            props: {
                children: (
                    <StyledA href="#link">
                        {rtl ? rtlText : "Anchor tag"}
                    </StyledA>
                ),
            },
        },
    ];
};

const rows = generateRows();
const rtlRows = generateRows(true);
const columns = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "Current",
        props: {current: true},
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

export const StickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rows} columns={columns}>
            {(props) => <NavigationTabItem {...args} {...props} />}
        </AllVariantsStates>
    ),
    parameters: {pseudo: defaultPseudoStates},
};

export const RTLStickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rtlRows} columns={columns}>
            {(props) => <NavigationTabItem {...args} {...props} />}
        </AllVariantsStates>
    ),
    parameters: {pseudo: defaultPseudoStates},
    globals: {direction: "rtl"},
};

export const ZoomStickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rows} columns={columns} layout="list">
            {(props) => <NavigationTabItem {...args} {...props} />}
        </AllVariantsStates>
    ),
    globals: {zoom: "400%"},
};
