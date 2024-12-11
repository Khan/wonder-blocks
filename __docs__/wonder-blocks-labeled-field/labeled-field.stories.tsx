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
 *
 * Tips for using LabeledField:
 * - if `errorMessage` prop is set on `LabeledField`, the `error` prop on the
 * form field component will be auto-populated so it doesn't need to be set
 * explicitly
 * - if `required` prop is set on `LabeledField`, it will be passed onto the
 * form field component so it doesn't need to be set explicitly
 * - For TextField and TextArea, it is highly recommended that they are
 * configured with `instantValidation=false` so that validation happens on blur.
 * See Validation docs for those components for more details!
 *
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
type AllFieldsStoryComponentType = StoryObj<typeof AllFields>;

export const Default: StoryComponentType = {
    args: {
        field: <TextField value="" onChange={() => {}} />,
        label: "Name",
        description: "Helpful description text.",
        errorMessage: "Message about the error",
        required: "Custom required message",
    },
};

const AllFields = (
    storyArgs: PropsFor<typeof LabeledField> & {
        shouldValidateInStory?: boolean;
        showSubmitButtonInStory?: boolean;
    },
) => {
    const {shouldValidateInStory, showSubmitButtonInStory, ...args} = storyArgs;

    /** Values */
    const [textFieldValue, setTextFieldValue] = React.useState("");
    const [textAreaValue, setTextAreaValue] = React.useState("");
    const [singleSelectValue, setSingleSelectValue] = React.useState("");
    const [multiSelectValue, setMultiSelectValue] = React.useState<string[]>(
        [],
    );
    const [searchValue, setSearchValue] = React.useState("");

    /** Error messages */
    const errorMessage =
        typeof args.errorMessage === "string" ? args.errorMessage : "";
    const [textFieldErrorMessage, setTextFieldErrorMessage] = React.useState<
        string | null | undefined
    >(errorMessage);
    const [textAreaErrorMessage, setTextAreaErrorMessage] = React.useState<
        string | null | undefined
    >(errorMessage);
    const [singleSelectErrorMessage, setSingleSelectErrorMessage] =
        React.useState<string | null | undefined>(errorMessage);
    const [multiSelectErrorMessage, setMultiSelectErrorMessage] =
        React.useState<string | null | undefined>(errorMessage);
    const [searchErrorMessage, setSearchErrorMessage] = React.useState<
        string | null | undefined
    >(errorMessage);

    const textFieldRef = React.createRef<HTMLInputElement>();
    const textAreaRef = React.createRef<HTMLTextAreaElement>();
    const singleSelectRef = React.createRef<HTMLButtonElement>();
    const multiSelectRef = React.createRef<HTMLButtonElement>();
    const searchRef = React.createRef<HTMLInputElement>();

    const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);

    const moveFocusToFirstFieldWithError = React.useCallback(() => {
        // The errors in the order they are presented, along with the refs
        const errors = [
            {message: textFieldErrorMessage, ref: textFieldRef},
            {message: textAreaErrorMessage, ref: textAreaRef},
            {message: singleSelectErrorMessage, ref: singleSelectRef},
            {message: multiSelectErrorMessage, ref: multiSelectRef},
            {message: searchErrorMessage, ref: searchRef},
        ];

        for (const error of errors) {
            if (error.message) {
                // Once a field with an error is found, focus on it and end the loop
                error.ref?.current?.focus();
                break;
            }
        }
    }, [
        multiSelectErrorMessage,
        multiSelectRef,
        searchErrorMessage,
        searchRef,
        singleSelectErrorMessage,
        singleSelectRef,
        textAreaErrorMessage,
        textAreaRef,
        textFieldErrorMessage,
        textFieldRef,
    ]);

    React.useEffect(() => {
        if (isFormSubmitted) {
            // If the form has been submitted, move focus. We use useEffect
            // so that the error message states are updated before we move focus
            moveFocusToFirstFieldWithError();
            setIsFormSubmitted(false);
        }
    }, [isFormSubmitted, moveFocusToFirstFieldWithError]);

    const handleSubmit = () => {
        const backendErrorMessage = "Example server side error message";
        if (args.required) {
            const requiredMsg =
                typeof args.required === "string"
                    ? args.required
                    : "Story default required msg";
            if (!textFieldValue) {
                setTextFieldErrorMessage(requiredMsg);
            }
            if (!textAreaValue) {
                setTextAreaErrorMessage(requiredMsg);
            }
            if (!singleSelectValue) {
                setSingleSelectErrorMessage(requiredMsg);
            }
            if (multiSelectValue.length === 0) {
                setMultiSelectErrorMessage(requiredMsg);
            }
            if (!searchValue) {
                setSearchErrorMessage(requiredMsg);
            }
        } else {
            setTextFieldErrorMessage(backendErrorMessage);
            setTextAreaErrorMessage(backendErrorMessage);
            setSingleSelectErrorMessage(backendErrorMessage);
            setMultiSelectErrorMessage(backendErrorMessage);
            setSearchErrorMessage(backendErrorMessage);
        }
        setIsFormSubmitted(true);
    };

    const textDescription = shouldValidateInStory
        ? "Trigger error by entering text that is 4 characters or less"
        : args.description;
    const selectDescription = shouldValidateInStory
        ? "Trigger error by selecting mango"
        : args.description;

    const textValidate = (value: string) => {
        if (value.length < 5) {
            return "Should be 5 or more characters";
        }
    };

    const singleSelectValidate = (value?: string | null) => {
        if (value === "mango") {
            return "Don't pick mango!";
        }
    };

    const multiSelectValidate = (values: string[]) => {
        if (values.includes("mango")) {
            return "Don't pick mango!";
        }
    };

    return (
        <View style={{gap: spacing.large_24}}>
            <LabeledField
                {...args}
                errorMessage={textFieldErrorMessage}
                label="Text Field"
                description={textDescription}
                field={
                    <TextField
                        ref={textFieldRef}
                        value={textFieldValue}
                        onChange={setTextFieldValue}
                        onValidate={setTextFieldErrorMessage}
                        validate={
                            shouldValidateInStory ? textValidate : undefined
                        }
                        instantValidation={false}
                    />
                }
            />
            <LabeledField
                {...args}
                errorMessage={textAreaErrorMessage}
                label="Text Area"
                description={textDescription}
                field={
                    <TextArea
                        ref={textAreaRef}
                        value={textAreaValue}
                        onChange={setTextAreaValue}
                        onValidate={setTextAreaErrorMessage}
                        validate={
                            shouldValidateInStory ? textValidate : undefined
                        }
                        instantValidation={false}
                    />
                }
            />

            <LabeledField
                {...args}
                errorMessage={singleSelectErrorMessage}
                label="Single Select"
                description={selectDescription}
                field={
                    <SingleSelect
                        // ref={singleSelectRef} // TODO once SingleSelect supports ref
                        placeholder="Choose a fruit"
                        selectedValue={singleSelectValue}
                        onChange={setSingleSelectValue}
                        onValidate={setSingleSelectErrorMessage}
                        validate={singleSelectValidate}
                    >
                        <OptionItem label="Mango" value="mango" />
                        <OptionItem label="Strawberry" value="strawberry" />
                        <OptionItem label="Banana" value="banana" />
                    </SingleSelect>
                }
            />

            <LabeledField
                {...args}
                errorMessage={multiSelectErrorMessage}
                label="Multi Select"
                description={selectDescription}
                field={
                    <MultiSelect
                        // ref={multiSelectRef} // TODO once MultiSelect supports ref
                        selectedValues={multiSelectValue}
                        onChange={setMultiSelectValue}
                        onValidate={setMultiSelectErrorMessage}
                        validate={
                            shouldValidateInStory
                                ? multiSelectValidate
                                : undefined
                        }
                    >
                        <OptionItem label="Mango" value="mango" />
                        <OptionItem label="Strawberry" value="strawberry" />
                        <OptionItem label="Banana" value="banana" />
                    </MultiSelect>
                }
            />

            <LabeledField
                {...args}
                errorMessage={searchErrorMessage}
                label="Search"
                description={textDescription}
                field={
                    <SearchField
                        ref={searchRef}
                        value={searchValue}
                        onChange={setSearchValue}
                        validate={
                            shouldValidateInStory ? textValidate : undefined
                        }
                        onValidate={setSearchErrorMessage}
                        instantValidation={false}
                    />
                }
            />

            {showSubmitButtonInStory && (
                <Button onClick={handleSubmit}>Submit</Button>
            )}
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
 *
 * LabeledField works best with field components that accept `error` and
 * `required` props since these props will get auto-populated by LabeledField.
 */
export const Fields: StoryComponentType = {
    args: {
        description: "Helpful description text.",
    },
    render: AllFields,
};

/**
 * The `errorMessage` prop can be used to define the error message to show for
 * the field.
 *
 * It will also put the field component in an error state by
 * auto-populating the field's `error` prop depending on if there is an error
 * message.
 */
export const Error: StoryComponentType = {
    args: {
        description: "Helpful description text.",
        errorMessage: "Message about the error",
    },
    render: AllFields,
};

/**
 * If it is mandatory for a user to fill out a field, it can be marked as
 * required.
 *
 * LabeledField will auto-populate the `required` prop for the field
 * component and validation is handled by the specific field components. See
 * docs for each component for more details on validation logic.
 *
 * If LabeledField's `required` prop is used and the field's `onValidate` prop
 * sets LabeledField's `errorMessage` prop, the error message for the required
 * field will be shown.
 *
 * Note: The validation around required fields is only triggered if a field is
 * interacted with. If the form is submitted with required empty fields, it is
 * up to the parent component to set the `errorMessage` prop on the
 * LabeledField component.
 */
export const Required: AllFieldsStoryComponentType = {
    args: {
        description: "Helpful description text.",
        required: "Custom required error message",
        showSubmitButtonInStory: true,
    },
    render: AllFields,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * The LabeledField's `errorMessage` prop can be configured with the form field's
 * validation props like `validate` and `onValidate`. This example also shows
 * how an error message can be shown after the form is submitted.
 *
 * Note: For `TextField` and `TextArea` components, it is recommended to use
 * `instantValidation=false` so that validation occurs on blur for better
 * usability.
 *
 * In this example, the text-based fields will show an error if the value has
 * less than 5 characters. The select-based fields will show an error if "Mango"
 * is selected.
 */
export const Validation: AllFieldsStoryComponentType = {
    args: {
        description: "Helpful description text.",
        shouldValidateInStory: true,
        showSubmitButtonInStory: true,
    },
    render: AllFields,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
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
                errorMessage={errorMessage}
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
 * If the labeled field is used on a dark background, the `light` prop can be
 * set to `true`. When abled, the text in the component (label, required
 * indicator, description, and error message) are modified to work on a dark
 * background.
 */
export const Light: StoryComponentType = {
    args: {
        description: "Helpful description text.",
        errorMessage: "Message about the error",
        required: "Custom required message",
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
                errorMessage="Message about the error"
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
                errorMessage="Message about the error"
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
                errorMessage={longText}
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
                errorMessage={longTextWithNoBreak}
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
