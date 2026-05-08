import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {CircularSpinner} from "@khanacademy/wonder-blocks-progress-spinner";

import {commonStates, StateSheet} from "../components/state-sheet";
import {allThemeModes} from "../../.storybook/modes";

/**
 * The following stories are used to generate visual regression snapshots
 * for the CircularSpinner component across themes.
 */
export default {
    title: "Packages / ProgressSpinner / Testing / Snapshots / CircularSpinner",
    component: CircularSpinner,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof CircularSpinner>;

type Story = StoryObj<typeof CircularSpinner>;

const sizes = ["xsmall", "small", "medium", "large"] as const;

const columns = sizes.map((size) => ({
    name: size,
    props: {size},
}));

const rows = [
    {name: "Default", props: {light: false}},
    {name: "Light", props: {light: true}},
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: () => (
        <StateSheet
            rows={rows}
            columns={columns}
            states={[commonStates.rest]}
            title="Variant / Size"
        >
            {({props}) =>
                props.light ? (
                    <View style={styles.darkBackground}>
                        <CircularSpinner {...props} />
                    </View>
                ) : (
                    <CircularSpinner {...props} />
                )
            }
        </StateSheet>
    ),
};

const styles = StyleSheet.create({
    darkBackground: {
        backgroundColor: semanticColor.core.background.neutral.strong,
        padding: sizing.size_160,
    },
});
