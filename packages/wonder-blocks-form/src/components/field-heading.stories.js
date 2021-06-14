// @flow
import * as React from "react";

import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabelLarge, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import type {StoryComponentType} from "@storybook/react";
import FieldHeading from "./field-heading.js";

export default {
    title: "Form / FieldHeading",
};

export const basic: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan");
    const [errorMessage, setErrorMessage] = React.useState();
    const [focused, setFocused] = React.useState(false);
    const uniqueId = "uniqueid123";

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    const validation = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleOnValidation = (errorMessage: ?string) => {
        setErrorMessage(errorMessage);
    };

    const handleOnKeyDown = (
        event: SyntheticKeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleOnFocus = () => {
        setFocused(true);
    };

    const handleOnBlur = () => {
        setFocused(false);
    };

    return (
        <FieldHeading
            field={
                <TextField
                    id={`${uniqueId}-field`}
                    aria-describedby={`${uniqueId}-error`}
                    aria-invalid={errorMessage ? "true" : "false"}
                    type="email"
                    value={value}
                    placeholder="Email"
                    validation={validation}
                    onValidation={handleOnValidation}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
            }
            label="Email"
            description="Please enter your personal email."
            error={!focused && errorMessage ? errorMessage : undefined}
            id={uniqueId}
        />
    );
};

export const withTypography: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");
    const uniqueId = "uniqueid123";

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleOnKeyDown = (
        event: SyntheticKeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <FieldHeading
            field={
                <TextField
                    id={`${uniqueId}-field`}
                    type="text"
                    value={value}
                    placeholder="Name"
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                />
            }
            label={
                <LabelLarge tag="label" htmlFor={`${uniqueId}-field`}>
                    Your Name
                </LabelLarge>
            }
            description={<LabelSmall>Please enter your full name.</LabelSmall>}
            id={uniqueId}
        />
    );
};
