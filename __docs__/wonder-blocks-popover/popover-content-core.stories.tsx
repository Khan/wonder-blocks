import * as React from "react";
import {StyleSheet} from "aphrodite";

import type {ComponentStory, ComponentMeta} from "@storybook/react";
import Color from "@khanacademy/wonder-blocks-color";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {
    Body,
    HeadingSmall,
    LabelLarge,
} from "@khanacademy/wonder-blocks-typography";

import {PopoverContentCore} from "@khanacademy/wonder-blocks-popover";
import {name, version} from "../../packages/wonder-blocks-popover/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

// NOTE: We are reusing an existing Cell SB Story to test how Popovers can be
// composed by Cells.
import {ClickableDetailCell} from "../wonder-blocks-cell/detail-cell.stories";
import popoverContentCoreArgtypes from "./popover-content-core.argtypes";

export default {
    title: "Popover/PopoverContentCore",
    component: PopoverContentCore,
    argTypes: popoverContentCoreArgtypes,
    parameters: {
        componentSubtitle: <ComponentInfo name={name} version={version} />,
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [
        (Story: any): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>{Story()}</View>
        ),
    ],
} as ComponentMeta<typeof PopoverContentCore>;

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
        justifyContent: "center",
    },
    popoverWithIcon: {
        alignItems: "center",
        flexDirection: "row",
        gap: Spacing.medium_16,
    },
    popoverWithCell: {
        padding: 0,
    },
    customPopover: {
        maxWidth: Spacing.medium_16 * 25,
        width: Spacing.medium_16 * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${Spacing.small_12}px 0`,
    },
    action: {
        backgroundColor: "transparent",
        border: "none",
        color: Color.white,
        cursor: "pointer",
        margin: Spacing.small_12,
        padding: Spacing.xxSmall_6,
        alignItems: "center",
        justifyContent: "center",
    },
});

const Template = (args: any) => <PopoverContentCore {...args} />;

export const WithIcon: ComponentStory<any> = Template.bind({});

WithIcon.args = {
    children: (
        <>
            <Icon size="large" icon={icons.contentArticle} />
            <View>
                <LabelLarge>This is an article</LabelLarge>
                <Body>With the content</Body>
            </View>
        </>
    ),
    closeButtonVisible: true,
    style: styles.popoverWithIcon,
};

/**
 * Using DetailCell as the content
 */
export const WithDetailCell: ComponentStory<any> = Template.bind({});

WithDetailCell.args = {
    children: <ClickableDetailCell {...ClickableDetailCell.args} />,
    style: styles.popoverWithCell,
};

WithDetailCell.parameters = {
    docs: {
        description: {
            story: "Popovers can also benefit from other Wonder Blocks components. In this example, we are using the DetailCell component embedded as part of the popover contents.",
        },
    },
};

/**
 * Dark custom popover
 */
const customIcon = {
    small: "M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z",
} as const;

const CustomPopoverContent = (
    <>
        <HeadingSmall>Custom popover title</HeadingSmall>
        <View style={styles.row}>
            <Clickable style={styles.action} onClick={close} id="btn-1">
                {() => (
                    <>
                        <Icon
                            icon={customIcon}
                            color={Color.gold}
                            size="large"
                        />
                        <LabelLarge>Option 1</LabelLarge>
                    </>
                )}
            </Clickable>
            <Clickable style={styles.action} onClick={close} id="btn-2">
                {() => (
                    <>
                        <Icon
                            icon={customIcon}
                            color={Color.green}
                            size="large"
                        />
                        <LabelLarge>Option 2</LabelLarge>
                    </>
                )}
            </Clickable>
            <Clickable style={styles.action} onClick={close} id="btn-3">
                {() => (
                    <>
                        <Icon
                            icon={customIcon}
                            color={Color.blue}
                            size="large"
                        />
                        <LabelLarge>Option 3</LabelLarge>
                    </>
                )}
            </Clickable>
        </View>
    </>
);

export const Dark: ComponentStory<any> = Template.bind({});

Dark.args = {
    children: CustomPopoverContent,
    color: "darkBlue",
    style: styles.customPopover,
};

Dark.parameters = {
    docs: {
        description: {
            story: "This component provides a flexible variant that can be used for example, for our Confidence Prompt in test prep and popovers that don't fit into other categories. If you want to use a different background, you can set `color` as part of `PopoverContentCore`.",
        },
    },
};
