import {Meta} from "@storybook/react";
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import optionItemArgtypes, {AccessoryMappings} from "./option-item.argtypes";

const defaultArgs = {
    label: "Option Item",
    onClick: () => {},
    disabled: false,
    testId: "",
    horizontalRule: "none",
    leftAccessory: null,
    rightAccessory: null,
};

const styles = StyleSheet.create({
    example: {
        background: color.offWhite,
        padding: spacing.medium_16,
        width: 300,
    },
    items: {
        background: color.white,
    },
});

/**
 * For option items that can be selected in a dropdown, selection denoted either
 * with a check ✔️ or a checkbox ☑️. Use as children in `SingleSelect` or
 * `MultiSelect`.
 *
 * ### Usage
 *
 * ```tsx
 * import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <SingleSelect {...props}>
 *   <OptionItem label="Option Item" onClick={() => {}} />
 * </SingleSelect>
 * ```
 */
export default {
    title: "Packages / Dropdown / OptionItem",
    component: OptionItem,
    argTypes: optionItemArgtypes,
    args: defaultArgs,
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.example}>
                <Story />
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
        // These stories are being tested in option-item-variants.stories.tsx
        chromatic: {
            disableSnapshot: true,
        },
    },
} as Meta<typeof OptionItem>;

/**
 * The default option item with a `label` and an `onClick` handler. This is used
 * to trigger actions (if needed).
 */
export const Default = {
    args: {
        label: "Option Item",
        onClick: () => {},
    },
};

/**
 * OptionItem can be `disabled`. This is used to indicate that the Option is not
 * available.
 */
export const Disabled = {
    args: {
        label: "Option Item",
        onClick: () => {},
        disabled: true,
    },
};

/**
 * OptionItem can have more complex content, such as icons.
 *
 * This can be done by passing in a `leftAccessory` and/or `rightAccessory`
 * prop. These can be any React node, and internally use the WB DetailCell
 * component to render.
 *
 * If you need more control over the content, you can also use `subtitle1` and
 * `subtitle2` props. These can be any React node, and internally use the WB
 * `LabelSmall` component to render.
 */
export const CustomOptionItem = {
    args: {
        label: "Option Item",
        onClick: () => {},
        subtitle1: AccessoryMappings.pill,
        subtitle2: "Subtitle 2",
        leftAccessory: (
            <PhosphorIcon icon={IconMappings.calendar} size="medium" />
        ),
        rightAccessory: (
            <PhosphorIcon icon={IconMappings.caretRight} size="medium" />
        ),
    },
};

/**
 * `horizontalRule` can be used to separate items within
 * SingleSelect/MultiSelect instances. It defaults to `none`, but can be set to
 * `inset` or `full-width` to add a horizontal rule at the bottom of the cell.
 */
export const HorizontalRule = {
    args: {
        label: "Option Item",
        onClick: () => {},
    },
    render: (args: PropsFor<typeof OptionItem>): React.ReactNode => (
        <View style={styles.items}>
            <OptionItem
                {...args}
                label="full-width"
                horizontalRule="full-width"
            />
            <OptionItem {...args} label="inset" horizontalRule="inset" />
            <OptionItem {...args} label="none" />
            <OptionItem {...args} />
        </View>
    ),
    parameters: {
        chromatic: {
            // Enabling to test how the horizontal rule looks.
            disableSnapshot: false,
        },
    },
};
