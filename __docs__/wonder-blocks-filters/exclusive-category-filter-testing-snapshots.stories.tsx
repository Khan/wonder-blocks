import type {Meta, StoryObj} from "@storybook/react-vite";
import * as React from "react";

import {ExclusiveCategoryFilter} from "@khanacademy/wonder-blocks-filters";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {rtlText} from "../components/text-for-testing";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {allThemeModes} from "../../.storybook/modes";

const generateRows = (rtl: boolean = false) => [
    {
        name: "Default",
        props: {
            options: [
                {value: "all", label: rtl ? rtlText : "All"},
                {value: "math", label: rtl ? rtlText : "Math"},
            ],
        },
    },
    {
        name: "With icons",
        props: {
            options: [
                {
                    value: "all",
                    label: rtl ? rtlText : "All",
                    startIcon: IconMappings.cookie,
                },
                {
                    value: "math",
                    label: rtl ? rtlText : "Math",
                    startIcon: (
                        <PhosphorIcon
                            icon={IconMappings.iceCream}
                            aria-label="Ice cream"
                        />
                    ),
                },
            ],
        },
    },
    {
        name: "Long labels",
        props: {
            options: [
                {
                    value: "all",
                    label: rtl ? rtlText : "All categories and subjects",
                },
                {
                    value: "math",
                    label: rtl ? rtlText : "Mathematics and statistics",
                },
            ],
        },
    },
];

const rows = generateRows();
const rtlRows = generateRows(true);

// Each cell shows one selected option ("All") and one unselected option.
const columns = [
    {
        name: "Selected + unselected",
        props: {selectedValue: "all"},
    },
];

type Story = StoryObj<typeof ExclusiveCategoryFilter>;

/**
 * The following stories are used to generate the pseudo states for the
 * ExclusiveCategoryFilter component. This is only used for visual testing in
 * Chromatic.
 */
const meta = {
    title: "Packages / Filters / Testing / ExclusiveCategoryFilter - Snapshots",
    component: ExclusiveCategoryFilter,
    args: {
        label: "Filter by subject",
        options: [],
        selectedValue: "all",
        onChange: () => {},
    },
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof ExclusiveCategoryFilter>;

export default meta;

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => (
        <>
            <StateSheet rows={rows} columns={columns}>
                {({props, className}) => (
                    <div className={className}>
                        <ExclusiveCategoryFilter {...args} {...props} />
                    </div>
                )}
            </StateSheet>
            <div dir="rtl">
                <StateSheet rows={rtlRows} columns={columns}>
                    {({props, className}) => (
                        <div className={className}>
                            <ExclusiveCategoryFilter {...args} {...props} />
                        </div>
                    )}
                </StateSheet>
            </div>
        </>
    ),
    parameters: {pseudo: defaultPseudoStates},
};
