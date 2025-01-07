import * as React from "react";
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from "react-hook-form";
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

export default {title: "Packages / ReactHookForm"};

type Inputs = {
    exampleTextField: string;
    exampleTextArea: string;
    exampleSingleSelect: string;
    exampleMultiSelect: string[];
    exampleRadioGroup: string;
    exampleCheckboxGroup: string[];
};

export const ExampleController = (args) => {
    const {
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<Inputs>({
        mode: "onTouched",
        // NOTE: comment out defaultValues to see behaviour when empty
        defaultValues: {
            exampleTextField: "textfield",
            exampleTextArea: "textarea",
            exampleSingleSelect: "banana",
            exampleMultiSelect: ["banana"],
            exampleCheckboxGroup: ["banana"],
            exampleRadioGroup: "banana",
        },
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
                <Controller
                    name="exampleTextField"
                    control={control}
                    rules={{
                        required: "This field is required",
                        maxLength: {value: 5, message: "Max length is 5"},
                        minLength: {value: 3, message: "Min length is 3"},
                    }}
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
                    rules={{
                        required: "This field is required",
                        maxLength: {value: 5, message: "Max length is 5"},
                        minLength: {value: 3, message: "Min length is 3"},
                    }}
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
                    rules={{
                        required: "This field is required",
                        validate: (value) => {
                            if (value === "banana") {
                                return "Banana is not allowed";
                            }
                            return true;
                        },
                    }}
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
                    rules={{
                        required: "This field is required",
                        validate: (value) => {
                            if (value.includes("banana")) {
                                return "Banana is not allowed";
                            }
                            return true;
                        },
                    }}
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
                    rules={{
                        required: "This field is required",
                        validate: (value) => {
                            if (value === "banana") {
                                return "Banana is not allowed";
                            }
                            return true;
                        },
                    }}
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
                    rules={{
                        required: "This field is required",
                        validate: (value) => {
                            if (value.includes("banana")) {
                                return "Banana is not allowed";
                            }
                            return true;
                        },
                    }}
                    render={({field, ...others}) => {
                        console.log("others", others);
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
