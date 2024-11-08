import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

const defaultErrorMessage = "This field is required.";

type FieldValidationProps = {
    value: string;
    disabled?: boolean;
    validate?: (value: string) => string | null | void;
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
    required?: boolean | string;
    instantValidation?: boolean;
};

/**
 * Hook for validation logic for text based fields. It will call the `validate`
 * and `onValidate` callbacks depending on the props provided.
 *
 * @param {FieldValidationProps} props An object with:
 * - `value` - The value of the field.
 * - `disabled` - If the field is disabled.
 * - `required` - Whether the field is required to continue, or the error
 * message if it is left blank.
 * - `instantValidation` - If the field should be validated instantly.
 * - `validate` - Validation for the field.
 * - `onValidate` - Called after the `validate` prop is called.
 * @returns {object} An object with:
 * - `errorMessage` - The error message from validation.
 * - `onBlurValidation` - Validation logic for when a field is blurred.
 * - `onChangeValidation` - Validation logic for when a field changes.
 *
 * @example
 *  export const MyComponent = ({
 *     value,
 *     disabled,
 *     validate,
 *     onValidate,
 *     required,
 *     instantValidation,
 *  }) => {
 *   const {errorMessage, onBlurValidation, onChangeValidation} =
 *       useFieldValidation({
 *           value,
 *           disabled,
 *           validate,
 *           onValidate,
 *           required,
 *           instantValidation,
 *       });
 *     return (
 *       <input
 *           onBlur={(event) => {
 *               onBlurValidation(event.target.value);
 *           }}
 *           onChange={(event) => {
 *               onChangeValidation(event.target.value);
 *           }}
 *           aria-invalid={!!errorMessage}
 *       />
 *   );
 * }
 *
 */
export const useFieldValidation = ({
    value,
    disabled = false,
    validate,
    onValidate,
    required = false,
    instantValidation = true,
}: FieldValidationProps) => {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(
        // Ensures error is updated on unmounted server-side renders
        // Pass in an initializer function so the validate prop is not called
        // on every render here
        () =>
            (validate && value !== "" && !disabled && validate(value)) || null,
    );

    const onChangeValidation = (newValue: string) => {
        if (instantValidation) {
            handleValidation(newValue);
        } else {
            if (errorMessage) {
                // If instantValidation is false and there is an error
                // message, error needs to be cleared when the user updates
                // the value
                setErrorMessage(null);
                if (onValidate) {
                    onValidate(null);
                }
            }
        }
    };

    const onBlurValidation = (newValue: string) => {
        // Only handle validation on blur if instantValidation is false
        if (!instantValidation) {
            // Handle validation on blur if:
            // 1. There is a value in the field so a user tabbing through
            // fields doesn't trigger the error state when the field is left
            // empty. Or,
            // 2. The field is required. Tabbing through an empty field that
            // is required will trigger the error state
            if (newValue || required) {
                handleValidation(newValue);
            }
        }
    };

    const handleValidation = (newValue: string) => {
        // Should not handle validation if it is disabled
        if (disabled) {
            return;
        }
        if (validate) {
            const error = validate(newValue) || null;
            setErrorMessage(error);
            if (onValidate) {
                onValidate(error);
            }
        } else if (required) {
            const requiredString =
                typeof required === "string" ? required : defaultErrorMessage;
            const error = newValue ? null : requiredString;
            setErrorMessage(error);
            if (onValidate) {
                onValidate(error);
            }
        }
    };

    useOnMountEffect(() => {
        // Only validate on mount if the value is not empty. This is so that fields
        // don't render an error when they are initially empty
        if (value !== "") {
            handleValidation(value);
        }
    });

    return {
        errorMessage,
        onBlurValidation,
        onChangeValidation,
    };
};
