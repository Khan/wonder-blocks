import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";

import BirthdayPicker from "@khanacademy/wonder-blocks-birthday-picker";

import {allThemeModes} from "../../.storybook/modes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-birthday-picker/package.json";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";

export default {
    title: "Packages / BirthdayPicker / Testing / Snapshots / BirthdayPicker",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            modes: allThemeModes,
        },
    },
} as Meta<typeof BirthdayPicker>;

type StoryComponentType = StoryObj<typeof BirthdayPicker>;

const columns = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "Disabled",
        props: {disabled: true},
    },
    {
        // A future date triggers the invalid date error message.
        name: "Error",
        props: {defaultValue: "2030-07-19"},
    },
];

const rows = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "With Value",
        props: {defaultValue: "2021-07-19"},
    },
    {
        name: "Month and Year Only",
        props: {monthYearOnly: true},
    },
];

/**
 * This StateSheet shows the BirthdayPicker dropdowns across their different
 * states (rest, hover, press, focus) and prop combinations, including the
 * error state shown when an invalid (future) date is provided. It is used for
 * visual regression testing in Chromatic, including across themes.
 */
export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: function StateSheetStory() {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props}) => <BirthdayPicker onChange={() => {}} {...props} />}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: {
            ...defaultPseudoStates,
            // BirthdayPicker uses SingleSelect, which uses ":focus" for focus
            focus: [...defaultPseudoStates.focusVisible],
        },
    },
};

/**
 * These scenarios cover cases that are not captured by the StateSheet, such as
 * the vertical layout, vertical layout with an error, custom (localized)
 * labels, alternate locales, and RTL layouts.
 */
export const Scenarios: StoryComponentType = {
    render: function Scenarios() {
        const scenarios = [
            {
                name: "Vertical",
                props: {
                    style: {flexDirection: "column"},
                    dropdownStyle: {width: "100%"},
                },
            },
            {
                name: "Vertical with error",
                props: {
                    style: {flexDirection: "column"},
                    dropdownStyle: {width: "100%"},
                    defaultValue: "2030-07-19",
                },
            },
            {
                name: "Custom (localized) labels",
                props: {
                    labels: {
                        day: "Día",
                        month: "Mes",
                        year: "Año",
                    },
                },
            },
            {
                name: "Alternate locale (es)",
                props: {locale: "es", defaultValue: "2021-01-19"},
            },
            {
                name: "RTL",
                props: {defaultValue: "2021-07-19"},
                decorator: <div dir="rtl" />,
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => <BirthdayPicker onChange={() => {}} {...props} />}
            </ScenariosLayout>
        );
    },
};

/**
 * On small screens the BirthdayPicker reflows to stack the dropdowns vertically
 * rather than positioning them side-by-side.
 */
export const Mobile: StoryComponentType = {
    render: () => <BirthdayPicker onChange={() => {}} />,
    globals: {
        viewport: {
            value: "small",
        },
    },
};
