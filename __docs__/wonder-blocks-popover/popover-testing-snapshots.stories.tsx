import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Popover, PopoverContent} from "@khanacademy/wonder-blocks-popover";

import {allThemeModes} from "../../.storybook/modes";
import {StateSheet} from "../components/state-sheet";

type Story = StoryObj<typeof Popover>;

const meta = {
    title: "Packages / Popover / Testing / Snapshots / Popover",
    parameters: {
        chromatic: {
            modes: allThemeModes,
            // Give PopperJS time to position the popover before snapshotting.
            delay: 500,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof Popover>;

export default meta;

// Note: Favour coverage in PopperContent StateSheet since the Popover StateSheet
// snapshot will only show the opened Popovers that are in the initial viewport.
const columns = [
    {
        name: "Text only and actions with close button",
        props: {
            content: (
                <PopoverContent
                    title="A simple popover"
                    content="Include text and actions"
                    closeButtonVisible={true}
                    actions={<Button>Take action</Button>}
                />
            ),
        },
    },
    {
        name: "With icon and no tail",
        props: {
            content: (
                <PopoverContent
                    title="Popover with Icon and no tail"
                    content="Popovers can include images on the left."
                    icon={
                        <img
                            src="./logo.svg"
                            width="100%"
                            alt="Wonder Blocks logo"
                        />
                    }
                />
            ),
            showTail: false,
        },
    },
];

const rows = [{name: "Default", props: {}}];

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
                <View style={styles.anchorCell} key={name}>
                    <Popover
                        {...props}
                        // Use top placement for coverage with the close button and illustration.
                        placement="top"
                        opened={true}
                        onClose={() => {}}
                    >
                        <Button>Anchor</Button>
                    </Popover>
                </View>
            )}
        </StateSheet>
    ),
};

const styles = StyleSheet.create({
    anchorCell: {
        alignItems: "center",
        justifyContent: "flex-end",
        padding: sizing.size_120,
        width: 270,
        minBlockSize: 420,
    },
});
