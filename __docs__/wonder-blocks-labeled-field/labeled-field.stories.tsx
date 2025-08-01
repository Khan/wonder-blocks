import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";
import {StyleSheet} from "aphrodite";
import ComponentInfo from "../components/component-info";
import packageConfig from "../../packages/wonder-blocks-labeled-field/package.json";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {TextArea, TextField} from "@khanacademy/wonder-blocks-form";
import LabeledFieldArgTypes from "./labeled-field.argtypes";
import {addStyle, PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {
    MultiSelect,
    OptionItem,
    SingleSelect,
} from "@khanacademy/wonder-blocks-dropdown";
import SearchField from "@khanacademy/wonder-blocks-search-field";
import Button from "@khanacademy/wonder-blocks-button";
import {allModes} from "../../.storybook/modes";
import {Heading} from "@khanacademy/wonder-blocks-typography";

/**
 * A LabeledField is an element that provides a label, context label, and
 * helper text to present more information about any type of form field
 * component. Helper text includes a description, error message, read only
 * message, and any additional helper message.
 *
 * It is highly recommended that all form fields should be used with the
 * `LabeledField` component so that our form fields are consistent and accessible.
 *
 * Tips for using LabeledField:
 * - If the `errorMessage` prop is set on `LabeledField`, the `error` prop on the
 * form field component will be auto-populated so it doesn't need to be set
 * explicitly on the field
 * - Setting the `readOnlyMessage` prop will also auto-populate the `readOnly`
 * prop on the form field component
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
        chromatic: {
            // Disabling snapshots for all stories by default because the testing
            // snapshots cover the different scenarios
            disableSnapshot: true,
        },
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
        contextLabel: "Context label",
    },
};

/**
 * Consider the following when providing helper text:
 * - Use the `description` prop for the main helper text for a field
 * - If providing an error message for the field, use the `errorMessage` prop
 * - If providing a message related to the read only state for the field, use
 *   the `readOnlyMessage` prop
 * - For any other helper text, use the `additionalHelperMessage` prop
 *
 * If all of these props are used, they will all be shown. It us up to the
 * consuming application to manage when the helper text is shown.
 *
 * When any of these props are used, the field's `aria-describedby` attribute
 * will include the id of the element for the corresponding prop.
 */
export const HelperText: StoryComponentType = {
    render: (args) => {
        return (
            <View style={{gap: sizing.size_240}}>
                <Heading>A field with an error message</Heading>
                <LabeledField
                    {...args}
                    description="Helpful description text"
                    errorMessage="Error message"
                />
                <Heading>A field with a read only message</Heading>
                <LabeledField
                    {...args}
                    description="Helpful description text"
                    readOnlyMessage="Read only message"
                />
                <Heading>A field with an additional helper message</Heading>
                <LabeledField
                    {...args}
                    description="Helpful description text"
                    additionalHelperMessage="Additional helper message"
                />
                <Heading>
                    A field with an error, readonly, and additional helper
                    message
                </Heading>
                <LabeledField
                    {...args}
                    description="Helpful description text"
                    errorMessage="Error message"
                    readOnlyMessage="Read only message"
                    additionalHelperMessage="Additional helper message"
                />
            </View>
        );
    },
    args: {
        field: <TextField value="" onChange={() => {}} />,
        label: "Name",
    },
};

/**
 * The `contextLabel` prop can be used to show a translated "required" or
 * "optional" label for the field.
 *
 * See the [Required](#required) docs for more information on required form
 * validation in fields!
 */
export const ContextLabel: StoryComponentType = {
    args: {
        field: <TextField value="" onChange={() => {}} />,
        label: "Label",
    },
    render: (args) => {
        return (
            <View style={{gap: sizing.size_240}}>
                <LabeledField {...args} contextLabel="Context label" />
                <LabeledField {...args} contextLabel="required" />
                <LabeledField {...args} contextLabel="optional" />
            </View>
        );
    },
};

const StyledForm = addStyle("form");

const AllFields = (
    storyArgs: PropsFor<typeof LabeledField> & {
        shouldValidateInStory?: boolean;
        showSubmitButtonInStory?: boolean;
        disabled?: boolean;
        textValue?: string;
        required?: boolean | string; // Used for the field component's required prop
    },
) => {
    const {
        shouldValidateInStory,
        showSubmitButtonInStory,
        disabled,
        textValue,
        ...args
    } = storyArgs;

    /** Values */
    const [textFieldValue, setTextFieldValue] = React.useState(textValue || "");
    const [textAreaValue, setTextAreaValue] = React.useState(textValue || "");
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

    /** Refs */
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
        <StyledForm
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: sizing.size_240,
            }}
        >
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
                        disabled={disabled}
                        required={args.required}
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
                        disabled={disabled}
                        required={args.required}
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
                        // ref={singleSelectRef} // TODO(WB-1841) once SingleSelect supports ref
                        placeholder="Choose a fruit"
                        selectedValue={singleSelectValue}
                        onChange={setSingleSelectValue}
                        onValidate={setSingleSelectErrorMessage}
                        validate={singleSelectValidate}
                        disabled={disabled}
                        required={args.required}
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
                        // ref={multiSelectRef} // TODO(WB-1841) once MultiSelect supports ref
                        selectedValues={multiSelectValue}
                        onChange={setMultiSelectValue}
                        onValidate={setMultiSelectErrorMessage}
                        validate={
                            shouldValidateInStory
                                ? multiSelectValidate
                                : undefined
                        }
                        disabled={disabled}
                        required={args.required}
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
                        disabled={disabled}
                    />
                }
            />

            {showSubmitButtonInStory && <Button type="submit">Submit</Button>}
        </StyledForm>
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
 * The `LabeledField`'s `errorMessage` prop can be used to define the error
 * message to show for the field. It will also put the field component in an
 * error state by auto-populating the field's `error` prop depending on if there
 * is an error message.
 *
 * Because of this, LabeledField works best with field components that accept
 * `error` and `readOnly` props since these props will get auto-populated by
 * LabeledField.
 */
export const Fields: StoryComponentType = {
    args: {
        description: "Helpful description text.",
        contextLabel: "Context label",
    },
    render: (args) => {
        return (
            <View style={{gap: sizing.size_240}}>
                <Heading>Default</Heading>
                <AllFields {...args} />
                <Heading>Error</Heading>
                <AllFields {...args} errorMessage="Message about the error" />
                <Heading>Disabled</Heading>
                <AllFields {...args} disabled />
                <Heading>Read Only</Heading>
                <AllFields
                    {...args}
                    textValue={"Value"}
                    readOnlyMessage="Message about why it is read only"
                />
            </View>
        );
    },
    parameters: {
        chromatic: {
            // Keep snapshots enabled for this story because it shows all the fields
            // with LabeledField
            disableSnapshot: false,
            modes: {
                default: allModes.themeDefault,
                thunderblocks: allModes.themeThunderBlocks,
            },
        },
    },
};

/**
 * If it is mandatory for a user to fill out a field, it can be marked as
 * required by:
 * - using the `contextLabel` prop for a "required" label on the `LabeledField`
 * component for the field
 * - providing a `required` prop on the `field` component
 *
 * If field's `required` prop is used and the field's `onValidate` prop
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
        showSubmitButtonInStory: true,
        contextLabel: "required",
    },
    render: (args) => (
        <AllFields {...args} required="Custom required error message" />
    ),
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
};

/**
 * When this story is used with a screen reader, any updates to an existing
 * error message will be announced.
 */
export const ChangingErrors: StoryComponentType = {
    render: function ChangingErrors() {
        const errorMsg1 = "First error message";
        const errorMsg2 = "Second error message";

        const [errorMessage, setErrorMessage] = React.useState(errorMsg1);

        return (
            <View style={{gap: sizing.size_120}}>
                <LabeledField
                    label="Label"
                    field={<TextField value="" onChange={() => {}} />}
                    errorMessage={errorMessage}
                />
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
    },
};

/**
 * Here is an example where LabeledField is used with a non-Wonder Blocks
 * component.
 *
 * Although it can be used with custom components, it is recommended that
 * LabeledField is used with the following Wonder Blocks components:
 * - TextField
 * - TextArea
 * - SearchField
 * - SingleSelect
 * - MultiSelect
 *
 * This is recommended because LabeledField will inject WB specific props:
 * `readOnly`, `error`, and `testId`. The `field` component should handle these
 * props accordingly. This is helpful because for example, if LabeledField has
 * an error message, the field should also be in an error state. If the `field`
 * component doesn't support these props, there will be console warnings.
 */
export const WithNonWb = {
    args: {
        label: "Label",
        description: "Description",
        errorMessage: "Error message",
        field: <input type="text" />,
    },
};

/**
 * Custom ReactNode elements can be used for the `label`, `description`, and
 * `error` props. Ideally, the styling of LabeledField should not be overridden.
 * If there is a specific use case where the styling needs to be overridden,
 * please reach out to the Wonder Blocks team!
 */
export const Custom = {
    args: {
        label: (
            <span>
                <b>Label</b> <i>using</i> <u>JSX</u>
            </span>
        ),
        description: (
            <span>
                <b>Description</b> <i>using</i> <u>JSX</u>
            </span>
        ),
        field: <TextField value="" onChange={() => {}} />,
        errorMessage: (
            <span>
                <b>Error</b> <i>using</i> <u>JSX</u>
            </span>
        ),
        readOnlyMessage: (
            <span>
                <b>Read</b> <i>only</i> <u>message</u>
            </span>
        ),
        additionalHelperMessage: (
            <span>
                <b>Additional</b> <i>helper</i> <u>message</u>
            </span>
        ),
        contextLabel: (
            <span>
                <b>Context</b> <i>label</i>
            </span>
        ),
    },
};

const styles = StyleSheet.create({
    customStyle: {
        border: `${border.width.medium} solid ${semanticColor.core.border.instructive.subtle}`,
    },
    alternativeCustomStyle: {
        border: `${border.width.medium} solid ${semanticColor.core.border.neutral.subtle}`,
    },
});

/**
 * Custom styles can be set for the elements in LabeledField using the `styles`
 * prop.
 *
 * It is useful for specific cases where spacing between elements needs to be
 * customized. If there is a specific use case where the styling needs to be
 * overridden, please reach out to the Wonder Blocks team!
 */
export const CustomStyles = {
    args: {
        field: <TextField value="" onChange={() => {}} />,
        label: "Name",
        description: "Helpful description text.",
        errorMessage: "Message about the error",
        readOnlyMessage: "Message about why it is read only",
        additionalHelperMessage: "Additional helper message",
        contextLabel: "Context label",
        styles: {
            root: {
                outline: `${border.width.thin} dashed ${semanticColor.core.border.neutral.default}`,
            },
            label: styles.customStyle,
            contextLabel: styles.customStyle,
            description: styles.alternativeCustomStyle,
            additionalHelperMessage: styles.customStyle,
            readOnlyMessage: styles.alternativeCustomStyle,
            error: styles.customStyle,
        },
    },
};
