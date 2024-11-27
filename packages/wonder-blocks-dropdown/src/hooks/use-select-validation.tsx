import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

const defaultErrorMessage = "This field is required.";

type SingleSelectedValue = string | null | undefined;
type MultiSelectedValues = string[];

type SelectValue = SingleSelectedValue | MultiSelectedValues;

type SelectValidationProps<T extends SelectValue> = {
    selectedValue?: T;
    disabled?: boolean;
    validate?: (value: T) => string | null | void;
    onValidate?: (errorMessage?: string | null | undefined) => unknown;
    required?: boolean | string;
    open?: boolean;
};

function hasValue<T extends SelectValue>(value?: T | null): value is T {
    return value ? value.length > 0 : false;
}

export function useSelectValidation<T extends SelectValue>({
    selectedValue,
    disabled = false,
    validate,
    onValidate,
    required,
    open,
}: SelectValidationProps<T>) {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleValidation = React.useCallback(
        (value?: T) => {
            // Should not handle validation if it is disabled
            if (disabled) {
                return;
            }
            if (validate && hasValue(value)) {
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
                const error = hasValue(value) ? null : requiredString;
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
        if (hasValue(selectedValue) && !required) {
            handleValidation(selectedValue);
        }
    });

    function onOpenerBlurValidation() {
        if (!open && required && !hasValue(selectedValue)) {
            // Only validate on opener blur if the dropdown is closed, the field
            // is required, and no value is selected. This prevents an error when
            // the dropdown is opened without a value yet.
            handleValidation(selectedValue);
        }
    }

    const onDropdownClosedValidation = () => {
        if (required && !hasValue(selectedValue)) {
            // If closed, field is required, and no value is selected, validate
            handleValidation(selectedValue);
        }
    };

    const onSelectionValidation = (value: T) => {
        handleValidation(value);
    };

    const onSelectedValuesChangeValidation = () => {
        // When selected values change, clear the error message
        // This is so errors aren't shown to the user while they update the
        // selected values. Note that this should only be called when there are
        // multiple values that can be selected. onSelectionValidation should be
        // used whenever the user is done selecting a value or values.
        setErrorMessage(null);
        if (onValidate) {
            onValidate(null);
        }
    };

    return {
        errorMessage,
        onOpenerBlurValidation,
        onDropdownClosedValidation,
        onSelectionValidation,
        onSelectedValuesChangeValidation,
    };
}
