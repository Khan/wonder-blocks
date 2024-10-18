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
import {
    HeadingLarge,
    HeadingMedium,
    HeadingSmall,
} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Button from "@khanacademy/wonder-blocks-button";

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
        description: "Helpful description text.",
        error: "Message about the error",
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
        description: "Helpful description text.",
        required: true,
    },
    render: AllFields,
};

export const Error: StoryComponentType = {
    args: {
        description: "Helpful description text.",
        error: "Message about the error",
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
        description: "Helpful description text.",
        error: "Message about the error",
        required: true,
        light: true,
    },
    parameters: {
        backgrounds: {default: "darkBlue"},
    },
    render: AllFields,
};

/**
 * When this story is used with a screen reader, any updates to an existing
 * error message will be announced.
 */
export const ChangingErrors: StoryComponentType = () => {
    const errorMsg1 = "First error message";
    const errorMsg2 = "Second error message";

    const [errorMessage, setErrorMessage] = React.useState(errorMsg1);

    return (
        <View>
            <LabeledField
                label="Label"
                field={<TextField value="" onChange={() => {}} />}
                error={errorMessage}
            />
            <Strut size={spacing.small_12} />
            <Button
                onClick={() =>
                    setErrorMessage(
                        errorMessage === errorMsg1 ? errorMsg2 : errorMsg1,
                    )
                }
            >
                Change error message
            </Button>
        </View>
    );
};

ChangingErrors.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * The following story shows what the LabeledField looks like when different
 * props are set.
 */
export const Scenarios = (args: PropsFor<typeof LabeledField>) => {
    const [textFieldValue, setTextFieldValue] = React.useState("");
    const longText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    const longTextWithNoBreak =
        "LoremipsumdolorsitametconsecteturadipiscingelitseddoeiusmodtemporincididuntutlaboreetdoloremagnaaliquaUtenimadminimveniamquisnostrudexercitationullamcolaborisnisiutaliquipexeacommodoconsequatDuisauteiruredolorinreprehenderitinvoluptatevelitessecillumdoloreeufugiatnullapariatur";
    return (
        <View style={{gap: spacing.large_24}}>
            <HeadingLarge>Scenarios</HeadingLarge>
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
                label="With error"
                error="Message about the error"
                field={
                    <TextField
                        value="invalid value"
                        onChange={() => {}}
                        validate={() => "Message about the error"}
                    />
                }
            />
            <LabeledField
                {...args}
                label="With description and error"
                error="Message about the error"
                description="Description"
                field={
                    <TextField
                        value="invalid value"
                        onChange={() => {}}
                        validate={() => "Message about the error"}
                    />
                }
            />
            <HeadingMedium>Text Scenarios</HeadingMedium>
            <HeadingSmall>With Long Text</HeadingSmall>
            <LabeledField
                required={true}
                {...args}
                label={longText}
                error={longText}
                description={longText}
                field={
                    <TextField
                        value="invalid value"
                        onChange={() => {}}
                        validate={() => "Message about the error"}
                    />
                }
            />
            <HeadingSmall>With Long Text and No Word Break</HeadingSmall>
            <LabeledField
                required={true}
                {...args}
                label={longTextWithNoBreak}
                error={longTextWithNoBreak}
                description={longTextWithNoBreak}
                field={
                    <TextField
                        value="invalid value"
                        onChange={() => {}}
                        validate={() => "Message about the error"}
                    />
                }
            />
        </View>
    );
};
