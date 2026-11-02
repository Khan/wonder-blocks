import type {Meta, StoryObj} from "@storybook/react-vite";
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View} from "@khanacademy/wonder-blocks-core";
import {ExclusiveCategoryFilter} from "@khanacademy/wonder-blocks-filters";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import {
    longText,
    longTextWithNoWordBreak,
    rtlText,
} from "../components/text-for-testing";
import {ScenariosLayout} from "../components/scenarios-layout";
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

/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render: (args) => {
        const scenarios = [
            {
                name: "Wrapping",
                props: {
                    options: [
                        {value: "all", label: "All"},
                        {value: "general", label: "General"},
                        {value: "grammar", label: "Grammar & writing"},
                        {value: "reading", label: "Reading & vocab"},
                        {value: "math", label: "Math"},
                        {value: "science", label: "Science"},
                        {value: "social", label: "Social studies"},
                        {value: "career", label: "College & career"},
                    ],
                },
                decorator: <View style={styles.narrow} />,
            },
            {
                name: "Long text",
                props: {
                    label: longText,
                    options: [
                        {value: "all", label: longText},
                        {value: "math", label: longText},
                    ],
                },
                decorator: <View style={styles.narrow} />,
            },
            {
                name: "Long text (no word break)",
                props: {
                    label: longTextWithNoWordBreak,
                    options: [
                        {value: "all", label: longTextWithNoWordBreak},
                        {value: "math", label: longTextWithNoWordBreak},
                    ],
                },
                decorator: <View style={styles.narrow} />,
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <ExclusiveCategoryFilter {...args} {...props} />}
            </ScenariosLayout>
        );
    },
};

const styles = StyleSheet.create({
    narrow: {
        maxInlineSize: 360,
    },
});
