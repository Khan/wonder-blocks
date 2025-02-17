import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import * as React from "react";

import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Listbox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import Pill from "@khanacademy/wonder-blocks-pill";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";

import {allProfilesWithPictures} from "./option-item-examples";

import ComponentInfo from "../components/component-info";
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
        background: semanticColor.surface.secondary,
        padding: spacing.medium_16,
        width: 360,
    },
    customListbox: {
        border: `5px solid ${semanticColor.border.primary}`,
        width: 250,
    },
});

const defaultArgs = {
    children: items,
    disabled: false,
    testId: "",
};

export default {
    title: "Packages / Dropdown / Listbox",
    component: Listbox,
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
} as Meta<typeof Listbox>;

type Story = StoryObj<typeof Listbox>;

/**
 * The default listbox with a list of items.
 *
 * By default, the listbox is single-select and there are no selected items.
 * This means that the listbox is in uncontrolled mode.
 *
 * To navigate the listbox, focus on it, then use the arrow keys. To select an
 * item, press `Enter` or `Space`.
 */
export const Default: Story = {
    args: {
        children: items,
    },
};

/**
 * `Listbox` can also be used in controlled mode. In this example, the selected
 * value is "pear". If another item is selected, the previously selected item is
 * deselected. This is the default selection type, and it is also set by
 * specifying value as a `string`.
 */
export const SingleSelection: Story = {
    name: "Single selection (Controlled)",
    render: function Render(args: PropsFor<typeof Listbox>) {
        const [value, setValue] = React.useState(args.value);

        return (
            <Listbox
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
};

/**
 * Listbox can also have multiple selection. This is set by adding
 * `selectionType="multiple"` and specifying `value` as an array of strings.
 */
export const MultipleSelection: Story = {
    args: {
        children: items,
        value: ["pear", "grape"],
        onChange: (values) => {
            action("onChange")(values);
        },
        selectionType: "multiple",
    },
};

/**
 * This example shows a controlled multi-select listbox with a default value of
 * "pear" and "grape".
 */
export const MultipleSelectionControlled: Story = {
    name: "Multiple selection (Controlled)",
    render: function Render(args: PropsFor<typeof Listbox>) {
        const [value, setValue] = React.useState(args.value);

        return (
            <Listbox
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
        value: ["pear", "grape"],
        selectionType: "multiple",
    },
    parameters: {
        chromatic: {
            // Disabling because this snapshot is already covered in the
            // MultipleSelection story.
            disableSnapshot: true,
        },
    },
};

/**
 * A listbox with a list of items that are all disabled.
 */
export const Disabled: Story = {
    args: {
        disabled: true,
        value: "pear",
    },
};

/**
 * Aria attributes are used to describe the listbox. In this case, the listbox
 * will be announced as "Favorite fruit" by screen readers.
 */
export const UsingAriaLabel: Story = {
    args: {
        children: items,
        value: "pear",
        "aria-label": "Favorite fruit",
    },
    parameters: {
        chromatic: {
            // Disabling because this snapshot is only for screen reader users.
            disableSnapshot: true,
        },
    },
};

/**
 * The listbox element can use custom styles when needed. In this example, we
 * are passing a custom style to the listbox container, via the `style` prop.
 */
export const CustomStyles: Story = {
    args: {
        children: items,
        value: "pear",
        style: styles.customListbox,
    },
};

/**
 * This example illustrates how you can use the `OptionItem` component to
 * display a `listbox` with custom option items. Note that in this example, we
 * are using `leftAccessory` to display a custom icon for each option item,
 * `subtitle1` to optionally display a pill and `subtitle2` to display the
 * email.
 */
export const SingleSelectionCustomOptionItems: Story = {
    name: "Single selection with custom OptionItems",
    args: {
        children: allProfilesWithPictures.map((user, index) => (
            <OptionItem
                key={user.id}
                value={user.id}
                horizontalRule="full-width"
                label={user.name}
                leftAccessory={user.picture}
                subtitle1={
                    index === 1 ? <Pill kind="accent">New</Pill> : undefined
                }
                subtitle2={user.email}
            />
        )),
        onChange: (value) => {
            action("onChange")(value);
        },
    },
};

/**
 * This example illustrates how you can use the custom `OptionItem` component
 * with a multi-select `Listbox`.
 */
export const MultipleSelectionCustomOptionItems: Story = {
    name: "Multiple selection with custom OptionItems",
    args: {
        ...SingleSelectionCustomOptionItems.args,
        selectionType: "multiple",
    },
};
