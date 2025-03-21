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
const rows = [
    {
        name: "Default",
        props: {
            children: (label: string) => <Link href="#link">{label}</Link>,
        },
    },
    {
        name: "External Link",
        props: {
            children: (label: string) => (
                <Link href="https://khanacademy.org" target="_blank">
                    {label}
                </Link>
            ),
        },
    },
    {
        name: "Start Icon",
        props: {
            children: (label: string) => (
                <Link
                    href="#link"
                    startIcon={
                        <PhosphorIcon icon={IconMappings.cookie} size="small" />
                    }
                >
                    {label}
                </Link>
            ),
        },
    },
    {
        name: "End Icon",
        props: {
            children: (label: string) => (
                <Link
                    href="#link"
                    endIcon={
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            size="small"
                        />
                    }
                >
                    {label}
                </Link>
            ),
        },
    },
    {
        name: "Start and End Icons",
        props: {
            children: (label: string) => (
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
                    {label}
                </Link>
            ),
        },
    },
    {
        name: "Icon only",
        props: {
            children: () => (
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
            children: (label: string) => (
                <StyledA href="#link">{label}</StyledA>
            ),
        },
    },
];

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
            {(props, name, isRtl) => {
                const {children, ...tabItemProps} = props;
                return (
                    <NavigationTabItem {...args} {...tabItemProps}>
                        {children(isRtl ? rtlText : "Navigation Tab Item")}
                    </NavigationTabItem>
                );
            }}
        </AllVariantsStates>
    ),
    parameters: {pseudo: defaultPseudoStates},
};

export const ZoomStickerSheet: Story = {
    render: (args) => (
        <AllVariantsStates rows={rows} columns={columns} layout="list">
            {(props, name, isRtl) => {
                const {children, ...tabItemProps} = props;
                return (
                    <NavigationTabItem {...args} {...tabItemProps}>
                        {children(isRtl ? rtlText : "Navigation Tab Item")}
                    </NavigationTabItem>
                );
            }}
        </AllVariantsStates>
    ),
    globals: {zoom: "400%"},
};
