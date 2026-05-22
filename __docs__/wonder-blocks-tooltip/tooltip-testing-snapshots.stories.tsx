import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import Tooltip, {TooltipContent} from "@khanacademy/wonder-blocks-tooltip";

import {allThemeModes} from "../../.storybook/modes";
import {StateSheet} from "../components/state-sheet";

type Story = StoryObj<typeof Tooltip>;

/**
 * The following stories are used to generate visual snapshots for the
 * `Tooltip` component in Chromatic across all supported themes (including
 * syl-dark). Each cell uses `opened={true}` so the tooltip bubble is forced
 * open and the snapshot captures the full bubble (background, tail, shadow)
 * around the inner `TooltipContent`.
 */
const meta = {
    title: "Packages / Tooltip / Testing / Snapshots / Tooltip",
    parameters: {
        chromatic: {
            modes: allThemeModes,
            // Give PopperJS time to position the tooltip before snapshotting.
            delay: 500,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof Tooltip>;

export default meta;

const rows = [
    {
        name: "Only text content",
        props: {
            content: <TooltipContent>Only the content</TooltipContent>,
        },
    },
    {
        name: "Titled content",
        props: {
            content: (
                <TooltipContent title="This tooltip has a title">
                    Some content in my tooltip
                </TooltipContent>
            ),
        },
    },
    {
        name: "Custom title and custom content",
        props: {
            content: (
                <TooltipContent title={<BodyText>Body text title!</BodyText>}>
                    <BodyText>Body text content!</BodyText>
                    <BodyText>And BodyText!</BodyText>
                </TooltipContent>
            ),
        },
    },
    {
        name: "Rich text content",
        props: {
            content: (
                <TooltipContent>
                    <BodyText>
                        Use <strong>bold</strong>, <em>italic</em>, or{" "}
                        <u>underlined</u> text.
                    </BodyText>
                </TooltipContent>
            ),
        },
    },
    {
        name: "Custom primitive background color",
        props: {
            content: "Custom background color",
            backgroundColor: "darkBlue",
            contentStyle: {
                color: semanticColor.core.foreground.knockout.default,
            },
        },
    },
];

const columns = [{name: "Default", props: {}}];

// Tooltip with `opened` controlled to `true` has no interactive pseudo states
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
                // The bubble portals out of the cell and is positioned by
                // Popper above the anchor, so give each cell enough room
                // around the anchor for the bubble to render without
                // overlapping neighboring cells.
                <View style={styles.anchorCell} key={name}>
                    <Tooltip
                        {...props}
                        opened={true}
                        forceAnchorFocusivity={false}
                        placement="right"
                    >
                        Anchor
                    </Tooltip>
                </View>
            )}
        </StateSheet>
    ),
};

const styles = StyleSheet.create({
    anchorCell: {
        alignItems: "flex-start",
        justifyContent: "center",
        padding: sizing.size_180,
        width: 400,
    },
});
