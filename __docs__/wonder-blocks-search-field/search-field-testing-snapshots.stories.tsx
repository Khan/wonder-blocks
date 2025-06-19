import * as React from "react";
import {Meta, StoryObj} from "@storybook/react";
import {allModes} from "../../.storybook/modes";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-search-field/package.json";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

export default {
    title: "Packages / SearchField / Testing / Snapshots / SearchField",
    tags: ["!autodocs"],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        chromatic: {
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
} as Meta<typeof SearchField>;

type StoryComponentType = StoryObj<typeof SearchField>;

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
        name: "Error",
        props: {error: true},
    },
];

const rows = [
    {
        name: "Default",
        props: {},
    },
    {
        name: "With Value",
        props: {value: "Text"},
    },
    {
        name: "With Value (long)",
        props: {value: longText},
    },
    {
        name: "With Value (long, no word breaks)",
        props: {value: longTextWithNoWordBreak},
    },
    {
        name: "With Placeholder",
        props: {placeholder: "Placeholder text"},
    },
    {
        name: "With Placeholder (long)",
        props: {placeholder: longText},
    },
    {
        name: "With Placeholder (long, no word breaks)",
        props: {placeholder: longTextWithNoWordBreak},
    },
];

export const StateSheetStory: StoryComponentType = {
    name: "StateSheet",
    render: function StateSheetStory() {
        return (
            <StateSheet rows={rows} columns={columns}>
                {({props, name}) => (
                    <LabeledField
                        label={name}
                        field={
                            <SearchField
                                value=""
                                onChange={() => {}}
                                {...props}
                            />
                        }
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {pseudo: defaultPseudoStates},
};
