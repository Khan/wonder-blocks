import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {StyleSheet} from "aphrodite";

import {
    Accordion,
    AccordionSection,
} from "@khanacademy/wonder-blocks-accordion";
import {allThemeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    reallyLongText,
    reallyLongTextWithNoWordBreak,
} from "../components/text-for-testing";

/**
 * The following stories are used to generate the pseudo states for the
 * Accordion component. This is only used for visual testing in Chromatic.
 */
export default {
    title: "Packages / Accordion / Testing / Snapshots / Accordion",
    component: Accordion,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

const styles = StyleSheet.create({
    // Give the accordion a predictable width so the header text and caret
    // have room across all the variants/states.
    accordion: {
        minInlineSize: 280,
    },
});

// The interactive states (hover/press/focus) live on the AccordionSection
// header. Rendering three sections shows how the corner kinds affect the
// first, middle, and last sections.
const exampleSections = [
    <AccordionSection header="First section" key="first">
        This is the information present in the first section
    </AccordionSection>,
    <AccordionSection header="Second section" key="second">
        This is the information present in the second section
    </AccordionSection>,
    <AccordionSection header="Third section" key="third">
        This is the information present in the third section
    </AccordionSection>,
];

// Rows: the section's expanded state. The header's border radius differs
// between collapsed and expanded for rounded corner kinds.
const rows = [
    {name: "Collapsed", props: {}},
    {name: "Expanded", props: {initialExpandedIndex: 0}},
];

// Columns: the corner kind, which controls the header's outline radius.
const columns = [
    {name: "Square", props: {cornerKind: "square"}},
    {name: "Rounded", props: {cornerKind: "rounded"}},
    {name: "Rounded per section", props: {cornerKind: "rounded-per-section"}},
];

/**
 * This StateSheet shows the Accordion header in its different pseudo states
 * (rest, hover, press, focus) across each corner kind and expanded state.
 */
export const StateSheetStory: Story = {
    name: "StateSheet",
    render: (args) => (
        <StateSheet
            rows={rows}
            columns={columns}
            title="Expanded / Corner kind"
        >
            {({props, name}) => (
                <Accordion
                    {...args}
                    {...props}
                    style={styles.accordion}
                    key={name}
                    aria-label={name}
                >
                    {exampleSections}
                </Accordion>
            )}
        </StateSheet>
    ),
    parameters: {
        pseudo: defaultPseudoStates,
        a11y: {
            config: {
                rules: [
                    {
                        // The statesheet is intentionally showing the accordion
                        // in similar ways using the same content
                        id: "landmark-unique",
                        enabled: false,
                    },
                ],
            },
        },
    },
};

/**
 * The following story shows how the Accordion handles specific scenarios.
 */
export const Scenarios: Story = {
    render: () => {
        const sections = [
            <AccordionSection key="first" header="First section">
                This is the information present in the first section
            </AccordionSection>,
            <AccordionSection key="second" header="Second section">
                This is the information present in the second section
            </AccordionSection>,
            <AccordionSection key="third" header="Third section">
                This is the information present in the third section
            </AccordionSection>,
        ];

        const scenarios = [
            {
                name: "Square",
                props: {cornerKind: "square", children: sections},
            },
            {
                name: "Rounded",
                props: {cornerKind: "rounded", children: sections},
            },
            {
                name: "Rounded per section",
                props: {
                    cornerKind: "rounded-per-section",
                    children: sections,
                },
            },
            {
                name: "Caret start",
                props: {caretPosition: "start", children: sections},
            },
            {
                name: "Initial expanded index",
                props: {initialExpandedIndex: 1, children: sections},
            },
            {
                name: "Non-collapsible section",
                props: {
                    children: [
                        <AccordionSection
                            key="non-collapsible"
                            header="This section is always expanded"
                            collapsible={false}
                        >
                            This section cannot be collapsed.
                        </AccordionSection>,
                    ],
                },
            },
            {
                name: "Long header text",
                props: {
                    children: [
                        <AccordionSection key="long" header={reallyLongText}>
                            {reallyLongText}
                        </AccordionSection>,
                    ],
                    initialExpandedIndex: 0,
                },
            },
            {
                name: "Long header text with no word break",
                props: {
                    children: [
                        <AccordionSection
                            key="long"
                            header={reallyLongTextWithNoWordBreak}
                        >
                            {reallyLongTextWithNoWordBreak}
                        </AccordionSection>,
                    ],
                    initialExpandedIndex: 0,
                },
            },
        ];

        return (
            <ScenariosLayout scenarios={scenarios}>
                {(props) => (
                    <Accordion {...props} style={styles.accordion}>
                        {props.children}
                    </Accordion>
                )}
            </ScenariosLayout>
        );
    },
};
