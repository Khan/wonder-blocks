import {Meta} from "@storybook/react";
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {ActionItem} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import actionItemArgtypes from "./action-item.argtypes";
import {BodyText} from "@khanacademy/wonder-blocks-typography";

const defaultArgs = {
    label: "Action Item",
    onClick: () => {},
    disabled: false,
    testId: "",
    lang: "",
    role: "menuitem",
    style: {},
    horizontalRule: "none",
    leftAccessory: null,
    rightAccessory: null,
};

const styles = StyleSheet.create({
    example: {
        background: semanticColor.surface.secondary,
        padding: sizing.size_160,
        width: 300,
    },
    items: {
        background: semanticColor.core.background.base.default,
    },
});

/**
 * The action item trigger actions, such as navigating to a different page or
 * opening a modal. Supply the `href` and/or `onClick` props. This component is
 * as a child of `ActionMenu`.
 *
 * ### Usage
 *
 * ```tsx
 * import {ActionItem, ActionMenu} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <ActionMenu {...props}>
 *   <ActionItem label="Action Item" onClick={() => {}} />
 * </ActionMenu>
 * ```
 */
export default {
    title: "Packages / Dropdown / ActionItem",
    component: ActionItem,
    argTypes: actionItemArgtypes,
    args: defaultArgs,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <div role="menu" aria-label="Example">
                    <Story />
                </div>
            </View>
        ),
    ],
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        // These stories are being tested in action-item-variants.stories.tsx
        chromatic: {
            disableSnapshot: true,
        },
    },
} as Meta<typeof ActionItem>;

/**
 * The default action item with a `label` and an `onClick` handler. This is used
 * to trigger actions, such as opening a modal.
 */
export const Default = {
    args: {
        label: "Action Item",
        onClick: () => {},
    },
};

/**
 * The action item with a `label` and an `href` prop. This is used to trigger
 * navigation to a different page.
 */
export const WithHref = {
    args: {
        label: "Action Item",
        href: "https://khanacademy.org",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * ActionItem can be `disabled`. This is used to indicate that the action is not
 * available.
 */
export const Disabled = {
    args: {
        label: "Action Item",
        onClick: () => {},
        disabled: true,
    },
};

/**
 * ActionItem can have more complex content, such as icons and subtitles.
 *
 * This can be done by passing in a `subtitle1`, `subtitle2`, `leftAccessory`
 * and/or `rightAccessory` props. These can be any React node, and internally
 * use the WB `DetailCell` component to render.
 */
export const CustomActionItem = {
    args: {
        label: "Action Item",
        subtitle1: "Subtitle 1",
        subtitle2: "Subtitle 2",
        onClick: () => {},
        leftAccessory: (
            <PhosphorIcon icon={IconMappings.calendar} size="medium" />
        ),
        rightAccessory: (
            <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
        ),
    },
};

/**
 * Another example of a custom action item with a larger label
 */
export const CustomActionItemMultiLine = {
    args: {
        label: (
            <View>
                <BodyText weight="bold">Title</BodyText>
                <BodyText>Subtitle</BodyText>
            </View>
        ),
        onClick: () => {},
        leftAccessory: (
            <PhosphorIcon icon={IconMappings.calendar} size="medium" />
        ),
        rightAccessory: (
            <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
        ),
    },
};

/**
 * `horizontalRule` can be used to separate items within ActionMenu instances.
 * It defaults to `none`, but can be set to `inset` or `full-width` to add a
 * horizontal rule at the bottom of the cell.
 */
export const HorizontalRule = {
    args: {
        label: "Action Item",
        onClick: () => {},
    },
    render: (args: PropsFor<typeof ActionItem>): React.ReactNode => (
        <View style={styles.items}>
            <ActionItem
                {...args}
                label="full-width"
                horizontalRule="full-width"
            />
            <ActionItem {...args} label="inset" horizontalRule="inset" />
            <ActionItem {...args} label="none" />
            <ActionItem {...args} />
        </View>
    ),
    parameters: {
        chromatic: {
            // Enabling to test how the horizontal rule looks.
            disableSnapshot: false,
        },
    },
};
