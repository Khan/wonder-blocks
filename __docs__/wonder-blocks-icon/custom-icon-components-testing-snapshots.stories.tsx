import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react-vite";

import {GemIcon, StreakIcon} from "@khanacademy/wonder-blocks-icon";
import {View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import {commonStates, StateSheet} from "../components/state-sheet";
import {allThemeModes} from "../../.storybook/modes";

/**
 * The following stories are used to generate visual regression snapshots
 * for the custom icon components (GemIcon, StreakIcon) across themes.
 *
 * Custom icon components use semantic color tokens for the different parts of
 * the icon, so they are the most theme-sensitive icons to verify in syl-dark.
 */
export default {
    title: "Packages / Icon / Testing / Snapshots / Custom Icon Components",
    component: GemIcon,
    parameters: {
        chromatic: {
            modes: allThemeModes,
        },
    },
    tags: ["!autodocs", "!manifest"],
} as Meta<typeof GemIcon>;

type Story = StoryObj<typeof GemIcon>;

// Custom icons can be styled using the `style` prop.
const customStyle = {
    backgroundColor: semanticColor.core.background.base.subtle,
    padding: sizing.size_040,
    borderRadius: border.radius.radius_040,
    border: `${border.width.thin} solid ${semanticColor.core.border.neutral.subtle}`,
};

const columns = [
    {name: "Default", props: {}},
    {name: "Custom style", props: {style: customStyle}},
];

const rows = [
    {name: "GemIcon", props: {Component: GemIcon}},
    {name: "StreakIcon", props: {Component: StreakIcon}},
];

export const StateSheetStory: Story = {
    name: "StateSheet",
    render: () => (
        <StateSheet
            rows={rows}
            columns={columns}
            states={[commonStates.rest]}
            title="Icon / Style"
        >
            {({props}) => {
                // Pull `Component` out of the props so it isn't spread onto
                // the underlying svg element (which would trigger an unknown
                // DOM attribute warning).
                const {Component, ...rest} = props;
                return (
                    // Custom icons expand to fill their parent, so we set a
                    // fixed size on the container.
                    <View style={styles.iconContainer}>
                        <Component {...rest} />
                    </View>
                );
            }}
        </StateSheet>
    ),
};

const styles = StyleSheet.create({
    iconContainer: {
        height: sizing.size_400,
        width: sizing.size_400,
    },
});
