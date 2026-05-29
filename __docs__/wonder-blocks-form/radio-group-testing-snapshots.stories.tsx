import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
import {sizing} from "@khanacademy/wonder-blocks-tokens";

import {allThemeModes} from "../../.storybook/modes";
import {ScenariosLayout} from "../components/scenarios-layout";
import {
    longText,
    longTextWithNoWordBreak,
} from "../components/text-for-testing";

/**
 * The following stories are used to generate snapshots for the RadioGroup
 * component. This is only used for visual testing in Chromatic.
 *
 * Interactive states (hover, focus, disabled, error, etc.) for the individual
 * radio buttons are covered by the Radio StateSheet, so this file only exercises
 * group-level layout scenarios.
 */
export default {
    title: "Packages / Form / Testing / Snapshots / RadioGroup",
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta;

type Story = StoryObj<typeof RadioGroup>;

const defaultChildren = [
    <Choice label="Bulbasaur" value="bulbasaur" />,
    <Choice
        label="Charmander"
        value="charmander"
        description="Oops, we ran out of Charmanders"
    />,
    <Choice label="Squirtle" value="squirtle" />,
];
/**
 * The following story shows how the component handles specific scenarios.
 */
export const Scenarios: Story = {
    render() {
        const scenarios = [
            {
                name: "Default",
                props: {
                    label: "Label",
                    description: "Description",
                    children: defaultChildren,
                },
            },
            {
                name: "No label or description",
                props: {
                    children: defaultChildren,
                },
            },
            {
                name: "With error message",
                props: {
                    label: "Label",
                    errorMessage: "This is an error message",
                    description: "Description",
                    children: defaultChildren,
                },
            },
            {
                name: "Long content",
                props: {
                    label: longText,
                    description: longText,
                    errorMessage: longText,
                    children: [
                        <Choice label={longText} value="1" />,
                        <Choice label={longText} value="2" />,
                        <Choice label={longText} value="3" />,
                    ],
                },
            },
            {
                name: "Long content (no word break)",
                props: {
                    label: longTextWithNoWordBreak,
                    description: longTextWithNoWordBreak,
                    errorMessage: longTextWithNoWordBreak,
                    children: [
                        <Choice label={longTextWithNoWordBreak} value="1" />,
                        <Choice label={longTextWithNoWordBreak} value="2" />,
                        <Choice label={longTextWithNoWordBreak} value="3" />,
                    ],
                },
            },
        ];
        return (
            <ScenariosLayout
                scenarios={scenarios}
                styles={{root: {gap: sizing.size_320}}}
            >
                {(props, name) => (
                    <RadioGroup
                        groupName={name}
                        selectedValue="bulbasaur"
                        onChange={() => {}}
                        {...props}
                    />
                )}
            </ScenariosLayout>
        );
    },
    globals: {
        viewport: {
            value: "small",
        },
    },
};
