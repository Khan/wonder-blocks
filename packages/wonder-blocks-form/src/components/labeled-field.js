// @flow
import * as React from "react";

import {
    useOnMountEffect,
    useUniqueIdWithMock,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";

import FieldHeading from "./field-heading.js";

const DEFAULT_ERROR_MESSAGE = "This field is required.";

type MaybeAsyncString = ?string | Promise<?string>;

type Props = {|
    /**
     * An optional unique identifier for the TextField.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string,

    /**
     * The form field to render (e.g. `Checkbox`, `SingleSelect`, `SearchField`,
     * etc).
     */
    field: React.Element<any>,

    /**
     * Provide a label for the TextField.
     */
    label: React.Node,

    /**
     * Whether the label should be visually hidden.
     */
    isLabelHidden?: boolean,

    /**
     * Provide a description for the form field.
     */
    description?: React.Node,

    /**
     * Whether this field is required to to continue, or the error message to
     * render if this field is left blank.
     *
     * This can be a boolean or a string.
     *
     * String:
     * Please pass in a translated string to use as the error message that will
     * render if the user leaves this field blank. If this field is required,
     * and a string is not passed in, a default untranslated string will render
     * upon error.
     * Note: The string will not be used if a `validate` prop is passed in.
     *
     * Example message: i18n._("A password is required to log in.")
     *
     * Boolean:
     * True/false indicating whether this field is required. Please do not pass
     * in `true` if possible - pass in the error string instead.
     * If `true` is passed, and a `validate` prop is not passed, that means
     * there is no corresponding message and the default untranlsated message
     * will be used.
     */
    required?: boolean | string,

    /**
     * Identifies the element or elements that describes this form field.
     */
    ariaDescribedby?: string | Array<string>,

    /**
     * Custom styles for the container.
     */
    style?: StyleType,

    /**
     * Optional test ID for e2e testing.
     */
    testId?: string,

    /**
     * Whether to validate the field value on change.
     */
    instantValidation?: boolean,

    /**
     * Provide a validation for the field element.
     * Returns a string error message, a promise with a string error message or
     * null | void for a valid result.
     */
    validate?:
        | ((value: string) => MaybeAsyncString)
        | ((Array<string>) => MaybeAsyncString),

    /**
     * Called right after the field is validated. Note that validation is called
     * on change.
     */
    onValidate?: (errorMessage: ?string) => mixed,

    layout?: "stacked" | "horizontal" | "inline",
|};

/**
 * A LabeledField is an element used to accept a single line of text from the
 * user paired with a label, description, and error field elements.
 *
 * ### Usage
 *
 * ```jsx
 * import {LabeledField} from "@khanacademy/wonder-blocks-form";
 *
 * const [value, setValue] = React.useState("");
 *
 * <LabeledField
 *     label="Label"
 *     description="Hello, this is the description for this field"
 *     field={<SingleSelect onChange={setValue} value={value} />}
 *     required={true}
 *     validate={(value => {
 *         if (!value) {
 *              return "Please select an option";
 *         }
 *      })}
 * />
 * ```
 */
const LabeledField: React.AbstractComponent<Props, HTMLElement> =
    React.forwardRef<Props, HTMLElement>(function LabeledField(
        props: Props,
        ref,
    ) {
        const {
            ariaDescribedby,
            description,
            field,
            id,
            label,
            instantValidation = true,
            required,
            style,
            testId,
            onValidate,
            validate,
        } = props;

        const ids = useUniqueIdWithMock("labeled-field");
        const uniqueId = id ?? ids.get("labeled-field-id");

        const [error, setError] = React.useState(null);
        const [active, setActive] = React.useState(false);

        useOnMountEffect(() => {
            const textFieldValue = field.props.value;
            if (textFieldValue) {
                maybeValidate(textFieldValue);
            }

            const singleSelectValue = field.props.selectedValue;
            if (singleSelectValue) {
                maybeValidate(singleSelectValue);
            }

            const multiSelectValue = field.props.selectedValues;
            if (multiSelectValue && multiSelectValue.length > 0) {
                maybeValidate(multiSelectValue);
            }
        });

        function maybeValidate(newValue) {
            const maybeRenderError = (maybeError: ?string) => {
                setError(maybeError);
                if (onValidate) {
                    onValidate(maybeError);
                }
            };

            if (validate) {
                const validateResult = validate(newValue);
                if (validateResult instanceof Promise) {
                    // Async validation
                    validateResult
                        ?.then((result) => {
                            maybeRenderError(result || null);
                            return;
                        })
                        .catch(() => {});
                } else {
                    // Regular validation
                    maybeRenderError(validateResult || null);
                    return;
                }
            } else if (required) {
                const requiredMessage =
                    typeof required === "string"
                        ? required
                        : DEFAULT_ERROR_MESSAGE;
                const maybeError = newValue ? null : requiredMessage;
                maybeRenderError(maybeError);
            }
        }

        function shouldDisplayError() {
            return instantValidation || (!instantValidation && !active);
        }

        function maybeDisplayValidationResultOnLeave() {
            if (instantValidation) {
                return {};
            }

            return {
                // Dropdowns don't have an onBlur event, so we need to use
                // onToggle instead.
                onToggle: (open) => {
                    setActive(open);
                    // We need to call the original onToggle event if it exists.
                    if (field.props.onToggle) {
                        field.props.onToggle(open);
                    }
                },
                // For inputs, we need to use onFocus and onBlur to determine
                // when to show the error message.
                onFocus: (event) => {
                    setActive(true);
                    // We need to call the original onFocus event if it exists.
                    if (field.props.onFocus) {
                        field.props.onFocus(event);
                    }
                },
                onBlur: (event) => {
                    setActive(false);
                    // We need to call the original onBlur event if it exists.
                    if (field.props.onBlur) {
                        field.props.onBlur(event);
                    }
                },
            };
        }

        function maybeIncludeValidationProps() {
            // If the field won't be validated, we don't need to add any props.
            if (!validate && !required) {
                return {};
            }

            return {
                onChange: (value) => {
                    field.props.onChange(value);
                    // NOTE: value can be a string or an array of strings.
                    maybeValidate(value);
                },
                isInvalid: shouldDisplayError() && !!error,
                ...maybeDisplayValidationResultOnLeave(),
            };
        }

        const Field = React.cloneElement(field, {
            ...field.props,
            // Override the following props if they are already set.
            id: `${uniqueId}-field`,
            "aria-describedby": ariaDescribedby
                ? ariaDescribedby
                : `${uniqueId}-error`,
            "aria-invalid": error ? "true" : "false",
            "aria-required": required ? "true" : "false",
            required: required,
            testId: testId && `${testId}-field`,
            ref,
            style: [
                props.layout === "inline" ? {display: "inline-flex"} : null,
            ],
            ...maybeIncludeValidationProps(),
        });

        return (
            <FieldHeading
                id={uniqueId}
                label={label}
                isLabelHidden={props.isLabelHidden}
                description={description}
                field={Field}
                error={shouldDisplayError() && error}
                required={!!required}
                style={style}
                testId={testId}
                layout={props.layout}
            />
        );
    });

export default LabeledField;
