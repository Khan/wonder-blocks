import * as React from "react";
import {Meta, StoryObj} from "@storybook/react-vite";
import {Temporal} from "temporal-polyfill";
import {es} from "date-fns/locale";

import {View} from "@khanacademy/wonder-blocks-core";
import {DatePicker} from "@khanacademy/wonder-blocks-date-picker";

import {allThemeModes} from "../../.storybook/modes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-date-picker/package.json";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";

export default {
    title: "Packages / DatePicker / Testing / Snapshots / DatePicker",
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
} as Meta<typeof DatePicker>;

type StoryComponentType = StoryObj<typeof DatePicker>;

const selectedDate = Temporal.PlainDate.from("2026-01-16");

const columns = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "Disabled",
        props: {disabled: true},
    },
];

const rows = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "With Selected Date",
        props: {selectedDate, dateFormat: "MMMM D, YYYY"},
    },
    {
        name: "With Placeholder",
        props: {placeholder: "Placeholder"},
    },
];

/**
 * This StateSheet shows the DatePicker input field across its different states
 * (rest, hover, press, focus) and prop combinations. It is used for visual
 * regression testing in Chromatic, including across themes.
 */
export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: function StateSheetStory() {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, name}) => (
                    <DatePicker
                        inputAriaLabel="Choose or enter a date"
                        updateDate={() => {}}
                        aria-label={name}
                        {...props}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {pseudo: defaultPseudoStates},
};

type PropsForDatePicker = Omit<
    React.ComponentProps<typeof DatePicker>,
    "updateDate" | "inputAriaLabel"
>;

/**
 * Approximate height of the open calendar popup. Used as bottom margin on the
 * opened scenarios so the following scenarios render below the popup instead of
 * underneath it.
 */
const openedCalendarMargin = 360;

/**
 * Renders a DatePicker for a scenario. When `opened` is true, the calendar
 * overlay is opened automatically so the popup can be captured in snapshots
 * (the StateSheet only covers the input field).
 */
const DatePickerScenario = ({
    opened,
    name,
    ...props
}: PropsForDatePicker & {opened?: boolean; name: string}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!opened) {
            return;
        }
        // Wait for the component to render, then click the input to open the
        // calendar.
        const timer = setTimeout(() => {
            containerRef.current?.querySelector("input")?.click();
        }, 100);

        return () => clearTimeout(timer);
    }, [opened]);

    return (
        <View ref={containerRef}>
            <DatePicker
                inputAriaLabel={name}
                updateDate={() => {}}
                {...props}
            />
        </View>
    );
};

/**
 * These scenarios cover cases that are not captured by the StateSheet, such as
 * the open calendar popup (including localized), custom widths, long localized
 * date formats (truncation/overflow), RTL layouts, and alternate locales.
 */
export const Scenarios: StoryComponentType = {
    render: function Scenarios() {
        const scenarios = [
            {
                name: "Custom width (narrow)",
                props: {selectedDate, style: {width: 160}},
            },
            {
                name: "Long date format",
                props: {selectedDate, dateFormat: "dateStyle:full"},
            },
            {
                name: "RTL",
                props: {selectedDate, dateFormat: "MMMM D, YYYY"},
                decorator: <div dir="rtl" />,
            },
            {
                name: "Spanish localization",
                props: {selectedDate, locale: es, dateFormat: "LL"},
            },
            {
                name: "Spanish numeric localization",
                props: {
                    selectedDate: Temporal.PlainDate.from("2026-01-16"),
                    updateDate: () => {},
                    locale: es,
                },
            },
        ];

        return (
            <View style={{maxInlineSize: 400}}>
                <ScenariosLayout scenarios={scenarios}>
                    {(props, name) => (
                        <DatePickerScenario {...props} name={name} />
                    )}
                </ScenariosLayout>
            </View>
        );
    },
};

export const OpenedScenarios: StoryComponentType = {
    render: function OpenedScenarios() {
        const scenarios = [
            {
                name: "Opened",
                props: {
                    opened: true,
                    selectedDate,
                },
                decorator: (
                    <View style={{marginBlockEnd: openedCalendarMargin}} />
                ),
            },
            {
                name: "Opened + Spanish localization",
                props: {
                    opened: true,
                    selectedDate,
                    locale: es,
                    dateFormat: "LL",
                    minDate: Temporal.PlainDate.from("2026-01-05"),
                    maxDate: Temporal.PlainDate.from("2026-01-26"),
                },
                decorator: (
                    <View style={{marginBlockEnd: openedCalendarMargin}} />
                ),
            },
            {
                name: "Opened + RTL",
                props: {
                    opened: true,
                    selectedDate,
                    dateFormat: "LL",
                    minDate: Temporal.PlainDate.from("2026-01-05"),
                    maxDate: Temporal.PlainDate.from("2026-01-26"),
                },
                decorator: <div dir="rtl" />,
            },
        ];
        return (
            <View style={{inlineSize: "100%"}}>
                <ScenariosLayout
                    scenarios={scenarios}
                    styles={{
                        root: {
                            flexDirection: "row",
                            flexWrap: "wrap",
                        },
                    }}
                >
                    {(props, name) => (
                        <View
                            style={{inlineSize: 400, alignItems: "flex-start"}}
                        >
                            <DatePickerScenario
                                {...props}
                                name={name}
                                aria-label={name}
                            />
                        </View>
                    )}
                </ScenariosLayout>
            </View>
        );
    },
    parameters: {
        a11y: {
            config: {
                rules: [
                    {
                        // TODO(WB-2369): Fix missing aria-label on pagination nav area
                        id: "landmark-unique",
                        enabled: false,
                    },
                ],
            },
        },
    },
};
