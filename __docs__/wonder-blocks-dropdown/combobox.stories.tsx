import {Meta} from "@storybook/react";
import * as React from "react";
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";
import Combobox from "../../packages/wonder-blocks-dropdown/src/components/combobox";

const items = [
    <OptionItem label="Banana" value="banana" key={0} />,
    <OptionItem label="Strawberry" value="strawberry" disabled key={1} />,
    <OptionItem label="Pear" value="pear" key={2} />,
    <OptionItem label="Orange" value="orange" key={3} />,
    <OptionItem label="Watermelon" value="watermelon" key={4} />,
    <OptionItem label="Apple" value="apple" key={5} />,
    <OptionItem label="Grape" value="grape" key={6} />,
    <OptionItem label="Lemon" value="lemon" key={7} />,
    <OptionItem label="Mango" value="mango" key={8} />,
];

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

const defaultArgs = {
    children: items,
    disabled: false,
    testId: "",
};

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
    title: "Dropdown/Combobox",
    component: Combobox,
    // argTypes: optionItemArgtypes,
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
    },
} as Meta<typeof Combobox>;

/**
 * The default Combobox with a list of items.
 */
export const Default = {
    args: {
        children: items,
    },
};

/**
 * TBD
 */
export const SelectedValue = {
    args: {
        children: items,
        value: "pear",
    },
};

/**
 * TBD
 */
export const MultipleSelectedValue = {
    args: {
        children: items,
        value: ["pear", "grape"],
    },
};

/**
 * A listbox with a list of items that are all disabled.
 */
export const Disabled = {
    args: {
        disabled: true,
        value: "pear",
    },
};
