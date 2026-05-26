import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {View} from "@khanacademy/wonder-blocks-core";
import {ActionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";

import {allThemeModes} from "../../.storybook/modes";
import {StateSheet} from "../components/state-sheet";

const rows = [{name: "Default", props: {}}];

const columns = [
    {
        name: "Standalone",
        props: {context: "standalone"},
    },
    {
        name: "Between items",
        props: {context: "between"},
    },
    {
        name: "At top",
        props: {context: "top"},
    },
    {
        name: "At bottom",
        props: {context: "bottom"},
    },
];

// SeparatorItem has no interactive pseudo states, so render a single
// "Default" state per cell instead of cycling through rest/hover/press/focus.
const states = [{name: "Default", className: "default"}];

type Story = StoryObj<typeof SeparatorItem>;

/**
 * The following stories are used to generate visual snapshots for the
 * `SeparatorItem` component in Chromatic across all supported themes
 * (including syl-dark). Because `SeparatorItem` only renders a horizontal
 * rule with margin, the variants exercise different surrounding contexts
 * (alone vs. between/above/below items) to make sure the rule color and
 * spacing read correctly in each.
 */
const meta = {
    title: "Packages / Dropdown / Testing / Snapshots / SeparatorItem",
    component: SeparatorItem,
    decorators: [
        (Story): React.ReactElement => (
            <View style={{width: 800}}>
                <Story />
            </View>
        ),
    ],
    globals: {
        // SeparatorItem typically sits inside an ActionMenu surface, which uses
        // `core.background.base.default`. Use that as the page background so
        // the snapshot mirrors real usage.
        backgrounds: {value: "baseDefault"},
    },
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} satisfies Meta<typeof SeparatorItem>;

export default meta;

// Give every menu wrapper the same width so the "standalone" cell doesn't
// collapse to 0 (a SeparatorItem is a 1px horizontal rule with no intrinsic
// width — it needs its parent to provide one).
const MENU_WIDTH = 240;

const renderContext = (context: string, key: string): React.ReactElement => {
    switch (context) {
        case "between":
            return (
                <View
                    key={key}
                    role="menu"
                    aria-label={key}
                    style={{width: MENU_WIDTH}}
                >
                    <ActionItem label="Item above" onClick={() => {}} />
                    <SeparatorItem />
                    <ActionItem label="Item below" onClick={() => {}} />
                </View>
            );
        case "top":
            return (
                <View
                    key={key}
                    role="menu"
                    aria-label={key}
                    style={{width: MENU_WIDTH}}
                >
                    <SeparatorItem />
                    <ActionItem label="Item below" onClick={() => {}} />
                </View>
            );
        case "bottom":
            return (
                <View
                    key={key}
                    role="menu"
                    aria-label={key}
                    style={{width: MENU_WIDTH}}
                >
                    <ActionItem label="Item above" onClick={() => {}} />
                    <SeparatorItem />
                </View>
            );
        case "standalone":
        default:
            return (
                <View key={key} style={{width: MENU_WIDTH}}>
                    <SeparatorItem />
                </View>
            );
    }
};

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: () => (
        <StateSheet
            rows={rows}
            columns={columns}
            states={states}
            title="Context"
        >
            {({props, name}) =>
                renderContext((props as {context: string}).context, name!)
            }
        </StateSheet>
    ),
};
