import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {PopoverContent} from "@khanacademy/wonder-blocks-popover";

import {allThemeModes} from "../../.storybook/modes";
import {StateSheet} from "../components/state-sheet";

type Story = StoryObj<typeof PopoverContent>;

const meta = {
    title: "Packages / Popover / Testing / Snapshots / PopoverContent",
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof PopoverContent>;

export default meta;

const rows = [
    {
        name: "Default (text only)",
        props: {
            title: "A simple popover",
            content: "The default version only includes text.",
        },
    },
    {
        name: "Text only and actions with close button",
        props: {
            title: "A simple popover",
            content: "Include text and actions",
            closeButtonVisible: true,
            actions: <Button>Take action</Button>,
        },
    },
    {
        name: "With icon",
        props: {
            title: "Popover with Icon",
            content: "Popovers can include images on the left.",
            icon: (
                <img src="./logo.svg" width="100%" alt="Wonder Blocks logo" />
            ),
        },
    },
    {
        name: "With illustration",
        props: {
            title: "Popover with Illustration",
            content: "Popover with a full-bleed illustration.",
            image: (
                <img
                    src="./illustration.svg"
                    alt="An illustration of a person skating on a pencil"
                    width={288}
                    height={200}
                />
            ),
            closeButtonVisible: true,
        },
    },
];

const columns = [{name: "Default", props: {}}];

const states = [{name: "Default", className: "default"}];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: () => (
        <StateSheet
            rows={rows}
            columns={columns}
            states={states}
            title="Content variant"
        >
            {({props, name}) => (
                <View style={styles.cell} key={name}>
                    <PopoverContent {...props} />
                </View>
            )}
        </StateSheet>
    ),
};

const styles = StyleSheet.create({
    cell: {
        padding: sizing.size_120,
    },
});
