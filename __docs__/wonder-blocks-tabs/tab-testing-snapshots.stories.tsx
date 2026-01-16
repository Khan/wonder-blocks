import type {Meta, StoryObj} from "@storybook/react-vite";
import * as React from "react";

import {Tab} from "@khanacademy/wonder-blocks-tabs";
import {Icon, PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {addStyle} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {rtlText} from "../components/text-for-testing";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {themeModes} from "../../.storybook/modes";

const StyledDiv = addStyle("div");

const generateRows = (rtl: boolean = false) => [
    {
        name: "Default",
        props: {
            children: rtl ? rtlText : "Tab",
        },
    },
    {
        name: "Custom label element with icons",
        props: {
            children: (
                <StyledDiv
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: sizing.size_040,
                    }}
                >
                    <PhosphorIcon icon={IconMappings.cookie} />
                    {rtl ? rtlText : "Tab"}
                    <PhosphorIcon icon={IconMappings.iceCream} />
                </StyledDiv>
            ),
            "aria-label": "Tab with icons",
        },
    },
    {
        name: "Custom label element with icon only",
        props: {
            children: (
                <PhosphorIcon icon={IconMappings.iceCream} size="medium" />
            ),
            "aria-label": "Tab with icon",
        },
    },
    {
        name: "Icon prop (PhosphorIcon)",
        props: {
            children: "Tab",
            icon: (
                <PhosphorIcon
                    icon={IconMappings.iceCream}
                    aria-label="Ice cream"
                />
            ),
        },
    },
    {
        name: "Icon prop (Icon)",
        props: {
            children: "Tab",
            icon: (
                <Icon>
                    <img src="logo.svg" alt="Wonder Blocks" />
                </Icon>
            ),
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
    {
        name: "Selected",
        props: {
            selected: true,
        },
    },
];

type Story = StoryObj<typeof Tab>;

/**
 * The following stories are used to generate the pseudo states for the Switch
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Tabs / Tabs / Subcomponents / Tab / Testing / Tab - Snapshots",
    component: Tab,
    args: {},
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Tab>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => (
        <>
            <StateSheet rows={rows} columns={columns}>
                {({props, className}) => (
                    <div role="tablist" className={className}>
                        <Tab {...args} {...props} />
                    </div>
                )}
            </StateSheet>
            <div dir="rtl">
                <StateSheet rows={rtlRows} columns={columns}>
                    {({props, className}) => (
                        <div role="tablist" className={className}>
                            <Tab {...args} {...props} />
                        </div>
                    )}
                </StateSheet>
            </div>
        </>
    ),
    parameters: {pseudo: defaultPseudoStates},
};
