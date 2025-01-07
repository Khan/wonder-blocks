import * as React from "react";
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
    useController,
} from "react-hook-form";
import {Meta} from "@storybook/react/*";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {
    CheckboxGroup,
    Choice,
    RadioGroup,
    TextArea,
    TextField,
} from "@khanacademy/wonder-blocks-form";
import {
    MultiSelect,
    OptionItem,
    SingleSelect,
} from "@khanacademy/wonder-blocks-dropdown";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";

export default {
    title: "Test/ReactHookForm",
    argTypes: {
        mode: {
            control: {
                type: "select",
            },
            options: ["onBlur", "onChange", "onSubmit", "onTouched", "all"],
        },
        disableFields: {
            control: {
                type: "boolean",
            },
        },
    },
} as Meta;

type Inputs = {
    exampleTextField: string;
    exampleTextArea: string;
    exampleSingleSelect: string;
    exampleMultiSelect: string[];
    exampleRadioGroup: string;
    exampleCheckboxGroup: string[];
};

const textRules = {
    required: "This field is required",
    maxLength: {value: 5, message: "Max length is 5"},
    minLength: {value: 3, message: "Min length is 3"},
};
const selectedValueRules = {
    required: "This field is required",
    validate: (value: string) => {
        if (value === "banana") {
            return "Banana is not allowed";
        }
        return true;
    },
};

const selectedValuesRules = {
    required: "This field is required",
    validate: (value: string[]) => {
        if (value.includes("banana")) {
            return "Banana is not allowed";
        }
        return true;
    },
};

const defaultValues = {
    exampleTextField: "textfield",
    exampleTextArea: "textarea",
    exampleSingleSelect: "banana",
    exampleMultiSelect: ["banana"],
    exampleCheckboxGroup: ["banana"],
    exampleRadioGroup: "banana",
};

type StoryArgs = {
    mode: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
    disableFields: boolean;
};

/**
 * Example of using the Controller component from React Hook Form with controlled
 * UI components from Wonder Blocks.
 *
 * By default, validation is triggered on submit. To change validation mode,
 * see other stories or update the story control (you'll need to refresh the page
 * after though)
 *
 * To trigger error messages:
 * - TextField, TextArea:
 *   - No value (because it is required)
 *   - Text is < 3 or > 5 characters
 * - SingleSelect, MultiSelect, RadioGroup, CheckboxGroup:
 *   - No selected value (because it is required)
 *   - Include "Banana" in the selection
 */
export const ExampleController = (args: StoryArgs) => {
    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<Inputs>({
        mode: args.mode,
        defaultValues,
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("successful submit", data);
    };

    const onInvalidSubmit: SubmitErrorHandler<Inputs> = (data) => {
        console.log("invalid submit", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
            <View style={{gap: spacing.medium_16}}>
                <Controller
                    name="exampleTextField"
                    control={control}
                    rules={textRules}
                    disabled={args.disableFields}
                    render={({field}) => {
                        return (
                            <LabeledField
                                label="TextField"
                                description="Helpful description text."
                                errorMessage={errors.exampleTextField?.message}
                                field={<TextField {...field} />}
                            />
                        );
                    }}
                />
                <Controller
                    name="exampleTextArea"
                    control={control}
                    rules={textRules}
                    disabled={args.disableFields}
                    render={({field}) => {
                        return (
                            <LabeledField
                                label="TextArea"
                                description="Helpful description text."
                                errorMessage={errors.exampleTextArea?.message}
                                field={<TextArea {...field} />}
                            />
                        );
                    }}
                />
                <Controller
                    name="exampleSingleSelect"
                    control={control}
                    rules={selectedValueRules}
                    disabled={args.disableFields}
                    render={({field}) => {
                        return (
                            <LabeledField
                                label="SingleSelect"
                                description="Helpful description text."
                                errorMessage={
                                    errors.exampleSingleSelect?.message
                                }
                                field={
                                    <SingleSelect
                                        placeholder="Choose a fruit"
                                        {...field} // NOTE: field includes onBlur, which SingleSelect doesn't support currently
                                        selectedValue={field.value} // NOTE: Need to explicitly map since single select takes in selectedValue prop instead of value
                                    >
                                        <OptionItem
                                            label="Mango"
                                            value="mango"
                                        />
                                        <OptionItem
                                            label="Strawberry"
                                            value="strawberry"
                                        />
                                        <OptionItem
                                            label="Banana"
                                            value="banana"
                                        />
                                    </SingleSelect>
                                }
                            />
                        );
                    }}
                />
                <Controller
                    name="exampleMultiSelect"
                    control={control}
                    rules={selectedValuesRules}
                    disabled={args.disableFields}
                    render={({field}) => {
                        return (
                            <LabeledField
                                label="MultiSelect"
                                description="Helpful description text."
                                errorMessage={
                                    errors.exampleMultiSelect?.message
                                }
                                field={
                                    <MultiSelect
                                        {...field} // NOTE: field includes onBlur, which MultiSelect doesn't support currently
                                        selectedValues={field.value} // NOTE: Need to explicitly map since single select takes in selectedValue prop instead of value
                                    >
                                        <OptionItem
                                            label="Mango"
                                            value="mango"
                                        />
                                        <OptionItem
                                            label="Strawberry"
                                            value="strawberry"
                                        />
                                        <OptionItem
                                            label="Banana"
                                            value="banana"
                                        />
                                    </MultiSelect>
                                }
                            />
                        );
                    }}
                />
                <Controller
                    name="exampleRadioGroup"
                    control={control}
                    rules={selectedValueRules}
                    disabled={args.disableFields}
                    render={({field}) => {
                        return (
                            <RadioGroup
                                label="RadioGroup"
                                description="Helpful description text."
                                groupName="radio-group"
                                {...field}
                                selectedValue={field.value}
                                errorMessage={errors.exampleRadioGroup?.message}
                            >
                                <Choice label="Mango" value="mango" />
                                <Choice label="Strawberry" value="strawberry" />
                                <Choice label="Banana" value="banana" />
                            </RadioGroup>
                        );
                    }}
                />
                <Controller
                    name="exampleCheckboxGroup"
                    control={control}
                    rules={selectedValuesRules}
                    disabled={args.disableFields}
                    render={({field}) => {
                        return (
                            <CheckboxGroup
                                label="CheckboxGroup"
                                description="Helpful description text."
                                groupName="checkbox-group"
                                {...field}
                                selectedValues={field.value}
                                errorMessage={
                                    errors.exampleCheckboxGroup?.message
                                }
                            >
                                <Choice label="Mango" value="mango" />
                                <Choice label="Strawberry" value="strawberry" />
                                <Choice label="Banana" value="banana" />
                            </CheckboxGroup>
                        );
                    }}
                />
                <Button type="submit" style={{marginTop: spacing.small_12}}>
                    Submit
                </Button>
            </View>
        </form>
    );
};

/**
 * Same example as above but using the useController hook instead.
 */
export const UseController = (args: StoryArgs) => {
    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<Inputs>({
        mode: args.mode,
        defaultValues,
    });

    const {field: tfField} = useController({
        name: "exampleTextField",
        control,
        rules: textRules,
        disabled: args.disableFields,
    });

    const {field: taField} = useController({
        name: "exampleTextArea",
        control,
        rules: textRules,
        disabled: args.disableFields,
    });

    const {field: ssField} = useController({
        name: "exampleSingleSelect",
        control,
        rules: selectedValueRules,
        disabled: args.disableFields,
    });

    const {field: msField} = useController({
        name: "exampleMultiSelect",
        control,
        rules: selectedValuesRules,
        disabled: args.disableFields,
    });

    const {field: rgField} = useController({
        name: "exampleRadioGroup",
        control,
        rules: selectedValueRules,
        disabled: args.disableFields,
    });

    const {field: cbgField} = useController({
        name: "exampleCheckboxGroup",
        control,
        rules: selectedValuesRules,
        disabled: args.disableFields,
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("successful submit", data.exampleTextField);
    };

    const onInvalidSubmit: SubmitErrorHandler<Inputs> = (data) => {
        console.log("invalid submit", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
            <View style={{gap: spacing.medium_16}}>
                <LabeledField
                    label="TextField"
                    description="Helpful description text."
                    errorMessage={errors.exampleTextField?.message}
                    field={<TextField {...tfField} />}
                />
                <LabeledField
                    label="TextArea"
                    description="Helpful description text."
                    errorMessage={errors.exampleTextArea?.message}
                    field={<TextArea {...taField} />}
                />

                <LabeledField
                    label="SingleSelect"
                    description="Helpful description text."
                    errorMessage={errors.exampleSingleSelect?.message}
                    field={
                        <SingleSelect
                            placeholder="Choose a fruit"
                            {...ssField} // NOTE: field includes onBlur, which SingleSelect doesn't support currently
                            selectedValue={ssField.value} // NOTE: Need to explicitly map since single select takes in selectedValue prop instead of value
                        >
                            <OptionItem label="Mango" value="mango" />
                            <OptionItem label="Strawberry" value="strawberry" />
                            <OptionItem label="Banana" value="banana" />
                        </SingleSelect>
                    }
                />
                <LabeledField
                    label="MultiSelect"
                    description="Helpful description text."
                    errorMessage={errors.exampleMultiSelect?.message}
                    field={
                        <MultiSelect
                            {...msField} // NOTE: field includes onBlur, which MultiSelect doesn't support currently
                            selectedValues={msField.value} // NOTE: Need to explicitly map since single select takes in selectedValue prop instead of value
                        >
                            <OptionItem label="Mango" value="mango" />
                            <OptionItem label="Strawberry" value="strawberry" />
                            <OptionItem label="Banana" value="banana" />
                        </MultiSelect>
                    }
                />

                <RadioGroup
                    label="RadioGroup"
                    description="Helpful description text."
                    groupName="radio-group"
                    {...rgField}
                    selectedValue={rgField.value}
                    errorMessage={errors.exampleRadioGroup?.message}
                >
                    <Choice label="Mango" value="mango" />
                    <Choice label="Strawberry" value="strawberry" />
                    <Choice label="Banana" value="banana" />
                </RadioGroup>
                <CheckboxGroup
                    label="CheckboxGroup"
                    description="Helpful description text."
                    groupName="checkbox-group"
                    {...cbgField}
                    selectedValues={cbgField.value}
                    errorMessage={errors.exampleCheckboxGroup?.message}
                >
                    <Choice label="Mango" value="mango" />
                    <Choice label="Strawberry" value="strawberry" />
                    <Choice label="Banana" value="banana" />
                </CheckboxGroup>
                <Button type="submit" style={{marginTop: spacing.small_12}}>
                    Submit
                </Button>
            </View>
        </form>
    );
};

/**
 * [React Hook Form modes](https://react-hook-form.com/docs/useform#mode)
 */
export const ValidationOnBlur = {
    render: UseController,
    args: {mode: "onBlur"},
};

/**
 * [React Hook Form modes](https://react-hook-form.com/docs/useform#mode)
 */
export const ValidationOnTouched = {
    render: UseController,
    args: {mode: "onTouched"},
};

/**
 * [React Hook Form modes](https://react-hook-form.com/docs/useform#mode)
 */
export const ValidationOnChange = {
    render: UseController,
    args: {mode: "onChange"},
};

/**
 * When we set `required` as part of the form field rules for React Hook Form,
 * it does not pass the required message to the field. We need to pass in information
 * about the field being required to either LabeledField or the field (TextField)
 * component so that the Labeledfield can show the required indicator (*) and
 * the field can properly mark input with `aria-required`.
 *
 * When we pass in the required message to the field, since the fields also implemet
 * their own validationg logic around the required prop, there could be a mix of
 * validation logic occuring.
 *
 * In this example, the form is set to validate on blur and TextField is set to
 * validate onChange (instantValidation=true). Because of this, when you erase
 * the value, the field is in an error state and the error message isn't shown
 * yet.
 *
 * We could simplify WB components and avoid a mix of validation logic by
 * removing validation related props from the components and rely on RHF to
 * handle validation. For the `required` case, we would still have the prop, but
 * all it would need to do is mark the field as required without doing any validation.
 */
export const Required = {
    render: function RequiredStory(args: StoryArgs) {
        const {
            handleSubmit,
            formState: {errors},
            control,
        } = useForm<Inputs>({
            mode: args.mode,
            defaultValues,
        });

        const {field: tfField} = useController({
            name: "exampleTextField",
            control,
            rules: textRules,
            disabled: args.disableFields,
        });

        const onSubmit: SubmitHandler<Inputs> = (data) => {
            console.log("successful submit", data.exampleTextField);
        };

        const onInvalidSubmit: SubmitErrorHandler<Inputs> = (data) => {
            console.log("invalid submit", data);
        };

        return (
            <form onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
                <View style={{gap: spacing.medium_16}}>
                    <LabeledField
                        label="TextField"
                        description="Helpful description text."
                        errorMessage={errors.exampleTextField?.message}
                        field={
                            <TextField
                                {...tfField}
                                required={textRules.required} // NOTE: explicitly map required message from rules since it is not passed by RHF. Required could also be set on LabeledField instead.
                            />
                        }
                    />
                    <Button type="submit" style={{marginTop: spacing.small_12}}>
                        Submit
                    </Button>
                </View>
            </form>
        );
    },
    args: {mode: "onBlur"},
};
