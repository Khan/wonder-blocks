import {useOnMountEffect} from "@khanacademy/wonder-blocks-core";
import * as React from "react";

const defaultErrorMessage = "This field is required.";

type SingleSelectedValue = string | null | undefined;
type MultiSelectedValues = string[];

type SelectValue = SingleSelectedValue | MultiSelectedValues;

type SelectValidationProps<T extends SelectValue> = {
    value?: T;
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
    value,
    disabled = false,
    validate,
    onValidate,
    required,
    open,
}: SelectValidationProps<T>) {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleValidation = React.useCallback(
        (newValue?: T) => {
            // Should not handle validation if it is disabled
            if (disabled) {
                return;
            }
            if (validate && hasValue(newValue)) {
                const error = validate(newValue) || null;
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
                const error = hasValue(newValue) ? null : requiredString;
                setErrorMessage(error);
                if (onValidate) {
                    onValidate(error);
                }
            }
        },
        [disabled, validate, setErrorMessage, onValidate, required],
    );

    useOnMountEffect(() => {
        // Only validate on mount if the value is not empty. This is so that
        // fields don't render an error when they are initially empty
        if (hasValue(value)) {
            handleValidation(value);
        }
    });

    function onOpenerBlurValidation() {
        if (!open && required && !hasValue(value)) {
            // Only validate on opener blur if the dropdown is closed, the field
            // is required, and no value is selected. This prevents an error when
            // the dropdown is opened without a value yet.
            handleValidation(value);
        }
    }

    const onDropdownClosedValidation = () => {
        if (required && !hasValue(value)) {
            // If closed, field is required, and no value is selected, validate
            handleValidation(value);
        }
    };

    const onSelectionValidation = (newValue: T) => {
        handleValidation(newValue);
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
