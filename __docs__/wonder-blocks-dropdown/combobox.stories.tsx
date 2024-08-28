import {action} from "@storybook/addon-actions";
import {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import * as React from "react";
import {expect, userEvent, within} from "@storybook/test";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {Combobox, OptionItem} from "@khanacademy/wonder-blocks-dropdown";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {allProfilesWithPictures} from "./option-item-examples";

import packageConfig from "../../packages/wonder-blocks-dropdown/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

const items = [
    <OptionItem label="Banana" value="banana" key={0} />,
    <OptionItem label="Strawberry" value="strawberry" disabled key={1} />,
    <OptionItem label="Pear" value="pear" key={2} />,
    <OptionItem label="Pineapple" value="pineapple" key={3} />,
    <OptionItem label="Orange" value="orange" key={4} />,
    <OptionItem label="Watermelon" value="watermelon" key={5} />,
    <OptionItem label="Apple" value="apple" key={6} />,
    <OptionItem label="Grape" value="grape" key={7} />,
    <OptionItem label="Lemon" value="lemon" key={8} />,
    <OptionItem label="Mango" value="mango" key={9} />,
];

const customItems = allProfilesWithPictures.map((user, index) => (
    <OptionItem
        key={user.id}
        value={user.id}
        horizontalRule="full-width"
        label={<LabelLarge>{user.name}</LabelLarge>}
        // TODO(WB-1752): Refactor API and types to enforce this prop when
        // `label` is not a string.
        labelAsText={user.name}
        leftAccessory={user.picture}
        subtitle2={user.email}
    />
));

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

/**
 * Combobox supports multiple selection. This means that more than one element
 * can be selected from the listbox at a time. In this example, we show how this
 * is done by using an array of strings as the value and setting the
 * `selectionType` prop to "multiple".
 *
 * To navigate using the keyboard, use:
 * - Arrow keys (`up`, `down`) to navigate through the listbox.
 * - `Enter` to select an item.
 * - Arrow keys (`left`, `right`) to navigate through the selected items.
 */
export const MultipleSelection: Story = {
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
        value: ["pear", "grape"],
        selectionType: "multiple",
    },
    parameters: {
        chromatic: {
            // we don't need screenshots because this story only tests behavior.
            disableSnapshot: true,
        },
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        // focus on the combobox (input)
        await userEvent.tab();

        // Move to second option item
        await userEvent.keyboard("{ArrowDown}");

        // Act
        // Select the second option item
        await userEvent.keyboard("{Enter}");

        // Assert
        expect(canvas.getByRole("log")).toHaveTextContent(
            "Pineapple selected, 4 of 10. 10 results available.",
        );
    },
};

/**
 * This example shows how to use the multi-select `Combobox` component in
 * controlled mode.
 */
export const ControlledMultilpleCombobox: Story = {
    name: "Controlled Multi-select Combobox (opened state)",
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
        value: ["pear", "grape"],
        selectionType: "multiple",
    },
    decorators: [
        (Story): React.ReactElement<React.ComponentProps<typeof View>> => (
            <View style={styles.wrapper}>{Story()}</View>
        ),
    ],
};

/**
 * `Combobox` supports autocompletion. This means that the listbox will show
 * options that match the user's input. Note that the search is case-insensitive
 * and it will match any part of the option item's label. This is useful when
 * using custom option items that could contain Typography components or other
 * elements.
 *
 * In this example, we show how this is done by setting the `autoComplete` prop
 * to "list".
 */
export const AutoComplete: Story = {
    args: {
        children: items,
        placeholder: "Type to search",
        autoComplete: "list",
    },
    name: "Autocomplete",
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * Below you can see an example of a multi-select `Combobox` with custom option
 * items and autocompletion. This means that the listbox will show options that
 * match the user's input.
 *
 * **NOTE:** If you want to use a custom Typography component in the option
 * label, you'll need to set the `labelAsText` prop to the text you want to
 * search for.
 */
export const AutoCompleteMultiSelect: Story = {
    args: {
        children: customItems,
        placeholder: "Type to search",
        autoComplete: "list",
        selectionType: "multiple",
    },
    name: "Autocomplete (Multi-select)",
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};