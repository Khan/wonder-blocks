import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {Meta, StoryObj} from "@storybook/react";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Body, LabelLarge} from "@khanacademy/wonder-blocks-typography";

import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import packageConfig from "../../packages/wonder-blocks-popover/package.json";
import ComponentInfo from "../components/component-info";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

// NOTE: We are reusing an existing Cell SB Story to test how Popovers can be
// composed by Cells.
import {ClickableDetailCell} from "../wonder-blocks-cell/detail-cell.stories";
import popoverContentCoreArgtypes from "./popover-content-core.argtypes";

export default {
    title: "Packages / Popover / PopoverContentCore",
    component: PopoverContentCore,
    argTypes: popoverContentCoreArgtypes,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    decorators: [
        (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
} as Meta<typeof PopoverContentCore>;

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    popoverWithIcon: {
        alignItems: "center",
        flexDirection: "row",
        gap: spacing.medium_16,
    },
    popoverWithCell: {
        padding: 0,
    },
    customPopover: {
        maxWidth: spacing.medium_16 * 25,
        width: spacing.medium_16 * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${spacing.small_12}px 0`,
    },
    action: {
        backgroundColor: "transparent",
        border: "none",
        color: semanticColor.text.inverse,
        cursor: "pointer",
        margin: spacing.small_12,
        padding: spacing.xxSmall_6,
        alignItems: "center",
        justifyContent: "center",
    },
});

type StoryComponentType = StoryObj<typeof PopoverContentCore>;

export const WithIcon: StoryComponentType = {
    args: {
        children: (
            <>
                <PhosphorIcon size="large" icon={IconMappings.article} />
                <View>
                    <LabelLarge id="custom-popover-title">
                        This is an article
                    </LabelLarge>
                    <Body id="custom-popover-content">With the content</Body>
                </View>
            </>
        ),
        closeButtonVisible: true,
        style: styles.popoverWithIcon,
    },
    render: (args) => <PopoverContentCore {...args} />,
};

// NOTE: Adding a wrapper to cast the component so Storybook doesn't complain.
const ClickableDetailCellWrapper = ClickableDetailCell as React.ElementType;

/**
 * Popovers can also benefit from other Wonder Blocks components. In this
 * example, we are using the `DetailCell` component embedded as part of the
 * popover contents.
 */
export const WithDetailCell: StoryComponentType = {
    args: {
        // use the composed DetailCell component
        children: <ClickableDetailCellWrapper {...ClickableDetailCell.args} />,
        style: styles.popoverWithCell,
    },
    render: (args) => <PopoverContentCore {...args} />,
};
