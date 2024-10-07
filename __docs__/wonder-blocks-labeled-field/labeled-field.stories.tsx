import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import ComponentInfo from "../../.storybook/components/component-info";
import packageConfig from "../../packages/wonder-blocks-labeled-field/package.json";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {TextArea, TextField} from "@khanacademy/wonder-blocks-form";
import LabeledFieldArgTypes from "./labeled-field.argtypes";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {
    MultiSelect,
    OptionItem,
    SingleSelect,
} from "@khanacademy/wonder-blocks-dropdown";
import SearchField from "@khanacademy/wonder-blocks-search-field";

/**
 * The `LabeledField` component provides common elements for a form field such
 * as the label, required indicator, description, and error message.
 *
 * It is highly recommended that all form fields should be used with the
 * `LabeledField` component so that our form fields are consistent and accessible.
 */
export default {
    title: "Packages / LabeledField",
    component: LabeledField,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: LabeledFieldArgTypes,
} as Meta<typeof LabeledField>;

type StoryComponentType = StoryObj<typeof LabeledField>;

export const Default: StoryComponentType = {
    args: {
        field: <TextField value="" onChange={() => {}} />,
        label: "Name",
        description: "Helpful description text",
        error: "Error message",
        required: true,
    },
};

const AllFields = (args: PropsFor<typeof LabeledField>) => {
    const [textFieldValue, setTextFieldValue] = React.useState("");
    const [textAreaValue, setTextAreaValue] = React.useState("");
    const [singleSelectValue, setSingleSelectValue] = React.useState("");
    const [multiSelectValue, setMultiSelectValue] = React.useState<string[]>(
        [],
    );
    const [searchValue, setSearchValue] = React.useState("");

    return (
        <View style={{gap: spacing.large_24}}>
            <LabeledField
                {...args}
                label="Text Field"
                field={
                    <TextField
                        value={textFieldValue}
                        onChange={setTextFieldValue}
                    />
                }
            />
            <LabeledField
                {...args}
                label="Text Area"
                field={
                    <TextArea
                        value={textAreaValue}
                        onChange={setTextAreaValue}
                    />
                }
            />

            <LabeledField
                {...args}
                label="Single Select"
                field={
                    <SingleSelect
                        placeholder="Choose a fruit"
                        selectedValue={singleSelectValue}
                        onChange={setSingleSelectValue}
                        error={!!args.error}
                    >
                        <OptionItem label="Mango" value="mango" />
                        <OptionItem label="Strawberry" value="strawberry" />
                        <OptionItem label="Banana" value="banana" />
                    </SingleSelect>
                }
            />

            <LabeledField
                {...args}
                label="Multi Select"
                field={
                    <MultiSelect
                        selectedValues={multiSelectValue}
                        onChange={setMultiSelectValue}
                        error={!!args.error}
                    >
                        <OptionItem label="Mango" value="mango" />
                        <OptionItem label="Strawberry" value="strawberry" />
                        <OptionItem label="Banana" value="banana" />
                    </MultiSelect>
                }
            />

            <LabeledField
                {...args}
                label="Search"
                field={
                    <SearchField
                        value={searchValue}
                        onChange={setSearchValue}
                    />
                }
            />
        </View>
    );
};

/**
 * The `LabeledField` component can be used with form field components such as:
 * - `TextField`
 * - `TextArea`
 * - `SingleSelect`
 * - `MultiSelect`
 * - `SearchField`
 */
export const Fields: StoryComponentType = {
    args: {
        description: "Helpful description text",
        required: true,
    },
    render: AllFields,
};

export const Error: StoryComponentType = {
    args: {
        description: "Helpful description text",
        error: "Error message",
        required: true,
    },
    render: AllFields,
};

/**
 * If the labeled field is used on a dark background, the `light` prop can be
 * set to `true`. When abled, the text in the component (label, required
 * indicator, description, and error message) are modified to work on a dark
 * background.
 */
export const Light: StoryComponentType = {
    args: {
        description: "Helpful description text",
        error: "Error message",
        required: true,
        light: true,
    },
    parameters: {
        backgrounds: {default: "darkBlue"},
    },
    render: AllFields,
};

/**
 * The following story shows what the LabeledField looks like when different
 * props are set.
 */
export const Combinations = (args: PropsFor<typeof LabeledField>) => {
    const [textFieldValue, setTextFieldValue] = React.useState("");

    return (
        <View style={{gap: spacing.large_24}}>
            <LabeledField
                {...args}
                label="Label only"
                field={
                    <TextField
                        value={textFieldValue}
                        onChange={setTextFieldValue}
                    />
                }
            />
            <LabeledField
                {...args}
                label="With description"
                description="Description"
                field={
                    <TextField
                        value={textFieldValue}
                        onChange={setTextFieldValue}
                    />
                }
            />
            <LabeledField
                {...args}
                label="With Error"
                error="Error message"
                field={
                    <TextField
                        value="invalid value"
                        onChange={() => {}}
                        validate={() => "Error message"}
                    />
                }
            />
        </View>
    );
};
