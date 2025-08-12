import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import Link from "@khanacademy/wonder-blocks-link";

import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {allModes} from "../../.storybook/modes";
import {rtlText} from "../components/text-for-testing";
import {semanticColor} from "@khanacademy/wonder-blocks-tokens";

const rows = [
    {name: "Default", props: {}},
    {
        name: "Inline",
        props: {inline: true},
    },
];

const generateCells = (rtl: boolean = false) => [
    {
        name: "Primary",
        props: {
            children: rtl ? rtlText : "This is my Link",
        },
    },
    {
        name: "startIcon",
        props: {
            children: rtl ? rtlText : "With startIcon",
            startIcon: <PhosphorIcon icon={IconMappings.plusCircleBold} />,
        },
    },
    {
        name: "endIcon",
        props: {
            children: rtl ? rtlText : "With endIcon",
            endIcon: <PhosphorIcon icon={IconMappings.magnifyingGlassBold} />,
            target: "_blank",
        },
    },
    {
        name: "External",
        props: {
            children: rtl ? rtlText : "External link",
            href: "https://www.khanacademy.org",
            target: "_blank",
        },
    },
];

const columns = generateCells();
const rtlColumns = generateCells(true);

type Story = StoryObj<typeof Link>;

/**
 * The following stories are used to generate the pseudo states for the Radio
 * component. This is only used for visual testing in Chromatic.
 */
const meta = {
    title: "Packages / Link / Testing / Snapshots / Link",
    parameters: {
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                "default rtl": allModes["themeDefault rtl"],
                dark: allModes.dark,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
    tags: ["!autodocs"],
} satisfies Meta<typeof Link>;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args, {globals}) => {
        const isRTL = globals.direction === "rtl";
        const isDark =
            globals.backgrounds?.value === semanticColor.surface.inverse;
        const columnsPerMode = isRTL ? rtlColumns : columns;

        return (
            <StateSheet rows={rows} columns={columnsPerMode}>
                {({props, className, name}) => (
                    <Link
                        {...args}
                        {...props}
                        light={isDark}
                        href="https://www.khanacademy.org"
                        className={className}
                        key={name}
                    >
                        {props.children}
                    </Link>
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};

export default meta;
