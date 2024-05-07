import {action} from "@storybook/addon-actions";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Combobox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";

import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

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
    wrapper: {
        height: 500,
    },
});

const defaultArgs = {
    children: items,
    disabled: false,
    placeholder: "Select an item",
    testId: "",
};

export default {
    title: "Packages / Dropdown / Combobox",
    component: Combobox,
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

type Story = StoryObj<typeof Combobox>;

/**
 * The default Combobox with a list of items.
 */
export const Default: Story = {
    args: {
        children: items,
    },
};

/**
 * Combobox supports by default single selection. This means that only one
 * element can be selected from the listbox at a time. In this example, we show
 * how this is done by setting a state variable in the parent component.
 */
export const SingleSelectCombobox = {
    name: "Combobox with single selection",
    args: {
        children: items,
        value: "pear",
    },
};

/**
 * `Combobox` can also be used in controlled mode. In this example, the selected
 * value is "pear". If another item is selected, the previously selected item is
 * deselected. This is the default selection type, and it is also set by
 * specifying value as a `string`.
 */
export const SingleSelection: Story = {
    name: "Single selection (Controlled input)",
    render: function Render(args: PropsFor<typeof Combobox>) {
        const [value, setValue] = React.useState(args.value);

        return (
            <Combobox
                {...args}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    action("onChange")(newValue);
                }}
            />
        );
    },
    args: {
        children: items,
        value: "pear",
    },
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disableSnapshot: true,
        },
    },
};

/**
 * `Combobox` can work as a controlled component. This can be done by setting a
 * value to the `opened` prop (`true` or `false`). In this case, the parent is
 * responsible for managing the opening/closing of the listbox when using this
 * prop.
 *
 * This means that you'll also have to update `opened` to the value triggered by
 * the `onToggle` prop.
 */
export const ControlledCombobox: Story = {
    name: "Controlled Combobox (opened state)",
    render: function Render(args: PropsFor<typeof Combobox>) {
        const [opened, setOpened] = React.useState(args.opened);
        const [value, setValue] = React.useState(args.value);

        return (
            <Combobox
                {...args}
                opened={opened}
                onToggle={() => {
                    setOpened(!opened);
                    action("onToggle")();
                }}
                onChange={(newValue) => {
                    setValue(newValue);
                    action("onChange")(newValue);
                }}
                value={value}
            />
        );
    },
    args: {
        children: items,
        opened: true,
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>{Story()}</View>
        ),
    ],
};

/**
 * A Combobox can be disabled. When disabled, the Combobox cannot be interacted
 * with.
 */
export const Disabled = {
    args: {
        disabled: true,
        value: "pear",
    },
};
