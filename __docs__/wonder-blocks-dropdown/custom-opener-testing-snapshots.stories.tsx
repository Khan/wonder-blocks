import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import caretDownIcon from "@phosphor-icons/core/regular/caret-down.svg";
import {View} from "@khanacademy/wonder-blocks-core";
import {CustomOpener} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import {themeModes} from "../../.storybook/modes";
import {defaultPseudoStates, StateSheet} from "../components/state-sheet";

export default {
    title: "Packages / Dropdown / Testing / Snapshots / CustomOpener",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {
            modes: themeModes,
        },
    },
} satisfies Meta;

type Story = StoryObj<typeof CustomOpener>;

const styles = StyleSheet.create({
    opener: {
        display: "inline-flex",
        alignItems: "center",
        gap: sizing.size_080,
        padding: `${sizing.size_080}px ${sizing.size_120}px`,
        border: `${border.width.thin} solid ${semanticColor.core.border.neutral.default}`,
        borderRadius: sizing.size_040,
        color: semanticColor.core.foreground.neutral.default,
        backgroundColor: semanticColor.core.background.base.default,
    },
    openerInner: {
        flexDirection: "row",
        alignItems: "center",
        gap: sizing.size_080,
    },
    openerDisabled: {
        color: semanticColor.core.foreground.neutral.subtle,
        borderColor: semanticColor.core.border.neutral.subtle,
        backgroundColor: semanticColor.core.background.base.default,
        cursor: "not-allowed",
    },
});

const columns = [
    {name: "Default", props: {}},
    {name: "Disabled", props: {disabled: true}},
];

const rows = [
    {name: "With text", props: {children: "Choose a fruit"}},
    {
        name: "With icon",
        props: {
            children: (
                <View style={styles.openerInner}>
                    <BodyText tag="span">Choose a fruit</BodyText>
                    <PhosphorIcon icon={caretDownIcon} size="small" />
                </View>
            ),
        },
    },
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: function Render() {
        return (
            <StateSheet rows={rows} columns={columns} title="Content / State">
                {({props, name}) => (
                    <CustomOpener
                        key={name}
                        styles={{
                            root: [
                                styles.opener,
                                name?.includes("Disabled") &&
                                    styles.openerDisabled,
                            ],
                        }}
                        {...props}
                    />
                )}
            </StateSheet>
        );
    },
    parameters: {
        pseudo: defaultPseudoStates,
    },
};
