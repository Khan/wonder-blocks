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

/**
 * The following stories are used to generate visual snapshots for the
 * `Popover` component in Chromatic across all supported themes (including
 * syl-dark). The StateSheet lays out content variants horizontally (one per
 * column) so each popover can open downward below its anchor. Each cell uses
 * `opened={true}` so the popover dialog is forced open and the snapshot
 * captures the full container (background, border, shadow, tail) around the
 * inner `PopoverContent`.
 */
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

const columns = [
    {
        name: "Text only with close button",
        props: {
            content: (
                <PopoverContent
                    title="A simple popover"
                    content="The default version only includes text."
                    closeButtonVisible={true}
                />
            ),
        },
    },
    {
        name: "With icon",
        props: {
            content: (
                <PopoverContent
                    title="Popover with Icon"
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
        },
    },
    {
        name: "With actions",
        props: {
            content: (
                <PopoverContent
                    title="Popover with actions"
                    content="Popovers can include actions for the user to take."
                    actions={<Button>Take action</Button>}
                />
            ),
        },
    },
    {
        name: "With illustration",
        props: {
            content: (
                <PopoverContent
                    title="Popover with Illustration"
                    content="Popover with a full-bleed illustration."
                    image={
                        <img
                            src="./illustration.svg"
                            alt="An illustration of a person skating on a pencil"
                            width={288}
                            height={200}
                        />
                    }
                    closeButtonVisible={true}
                />
            ),
        },
    },
];

const rows = [{name: "Default", props: {}}];

// Popover with `opened` controlled to `true` has no interactive pseudo states
// here, so render a single "Default" state per cell instead of cycling through
// rest/hover/press/focus.
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
                // The popover dialog portals out of the cell and is positioned
                // by Popper below the anchor, so give each cell enough vertical
                // room (~288px wide dialog + padding + tail) to render without
                // overlapping content below the table.
                <View style={styles.anchorCell} key={name}>
                    <Popover
                        placement="bottom"
                        {...props}
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
        padding: sizing.size_120,
        width: 270,
        minHeight: 420,
    },
});
