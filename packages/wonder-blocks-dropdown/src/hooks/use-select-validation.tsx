import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

const defaultErrorMessage = "This field is required.";

type SelectValidationProps = {
    selectedValue?: string | null;
    disabled?: boolean;
    validate?: (value: string) => string | null | void;
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
    required?: boolean | string;
    open: boolean;
};

export function useSelectValidation({
    selectedValue,
    disabled = false,
    validate,
    onValidate,
    required,
    open,
}: SelectValidationProps) {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleValidation = React.useCallback(
        (value?: string | null) => {
            // Should not handle validation if it is disabled
            if (disabled) {
                return;
            }
            if (validate && value) {
                const error = validate(value) || null;
                setErrorMessage(error);
                if (onValidate) {
                    onValidate(error);
                }
                if (error) {
                    // If there is an error, do not continue with required validation
                    return;
                }
            }
            if (required) {
                const requiredString =
                    typeof required === "string"
                        ? required
                        : defaultErrorMessage;
                const error = value ? null : requiredString;
                setErrorMessage(error);
                if (onValidate) {
                    onValidate(error);
                }
            }
        },
        [disabled, validate, setErrorMessage, onValidate, required],
    );

    useOnMountEffect(() => {
        // Only validate on mount if the value is not empty and the field is not
        // required. This is so that fields don't render an error when they are
        //initially empty
        if (selectedValue && !required) {
            handleValidation(selectedValue);
        }
    });

    const onOpenerBlurValidation = () => {
        if (!open && required && !selectedValue) {
            // Only validate on opener blur if the dropdown is closed, the field
            // is required, and no value is selected. This prevents an error when
            // the dropdown is opened without a value yet.
            handleValidation(selectedValue);
        }
    };

    const onDropdownClosedValidation = () => {
        if (required && !selectedValue) {
            // If closed, field is required, and no value is selected, validate
            handleValidation(selectedValue);
        }
    };

    const onSelectionValidation = (value: string) => {
        handleValidation(value);
    };

    return {
        errorMessage,
        onOpenerBlurValidation,
        onDropdownClosedValidation,
        onSelectionValidation,
    };
}
