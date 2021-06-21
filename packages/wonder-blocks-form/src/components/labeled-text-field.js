// @flow
import * as React from "react";

import {IDProvider, type StyleType} from "@khanacademy/wonder-blocks-core";
import {type Typography} from "@khanacademy/wonder-blocks-typography";

import FieldHeading from "./field-heading.js";
import TextField, {type TextFieldType} from "./text-field.js";

type Props = {|
    /**
     * An optional unique identifier for the TextField.
     * If no id is specified, a unique id will be auto-generated.
     */
    id?: string,

    /**
     * Determines the type of input. Defaults to text.
     */
    type: TextFieldType,

    /**
     * Provide a label for the TextField.
     */
    label: string | React.Element<Typography>,

    /**
     * Provide a description for the TextField.
     */
    description?: string | React.Element<Typography>,

    /**
     * The initial input value.
     */
    initialValue?: string,

    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean,

    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validation?: (value: string) => ?string,

    /**
     * Called when the TextField input is validated.
     */
    onValidation?: (errorMessage: ?string) => mixed,

    /**
     * Called when the value has changed.
     */
    onChange?: (newValue: string) => mixed,

    /**
     * Called when a key is pressed.
     */
    onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed,

    /**
     * Called when the element has been focused.
     */
    onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,

    /**
     * Called when the element has been blurred.
     */
    onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,

    /**
     * Provide hints or examples of what to enter.
     */
    placeholder?: string,

    /**
     * Change the field’s sub-components to fit a dark background.
     */
    light: boolean,

    /**
     * Custom styles for the TextField component.
     */
    style?: StyleType,

    /**
     * Optional test ID for e2e testing.
     */
    testId?: string,
|};

type DefaultProps = {|
    type: $PropertyType<Props, "type">,
    disabled: $PropertyType<Props, "disabled">,
    light: $PropertyType<Props, "light">,
|};

type State = {|
    /**
     * The value of the input.
     */
    value: string,

    /**
     * Displayed when the validation fails.
     */
    error: ?string,

    /**
     * The user focuses on the textfield.
     */
    focused: boolean,
|};

export default class LabeledTextField extends React.Component<Props, State> {
    static defaultProps: DefaultProps = {
        type: "text",
        disabled: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.initialValue || "",
            error: null,
            focused: false,
        };
    }

    handleValidation: (errorMessage: ?string) => mixed = (errorMessage) => {
        const {onValidation} = this.props;
        this.setState({error: errorMessage}, () => {
            if (onValidation) {
                onValidation(errorMessage);
            }
        });
    };

    handleChange: (newValue: string) => mixed = (newValue) => {
        const {onChange} = this.props;
        this.setState({value: newValue}, () => {
            if (onChange) {
                onChange(newValue);
            }
        });
    };

    handleFocus: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onFocus} = this.props;
        this.setState({focused: true}, () => {
            if (onFocus) {
                onFocus(event);
            }
        });
    };

    handleBlur: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed = (
        event,
    ) => {
        const {onBlur} = this.props;
        this.setState({focused: false}, () => {
            if (onBlur) {
                onBlur(event);
            }
        });
    };

    render(): React.Node {
        const {
            id,
            type,
            label,
            description,
            disabled,
            validation,
            onKeyDown,
            placeholder,
            light,
            style,
            testId,
        } = this.props;

        return (
            <IDProvider id={id} scope="labeled-text-field">
                {(uniqueId) => (
                    <FieldHeading
                        id={uniqueId}
                        testId={testId}
                        field={
                            <TextField
                                id={`${uniqueId}-field`}
                                aria-describedby={`${uniqueId}-error`}
                                aria-invalid={
                                    this.state.error ? "true" : "false"
                                }
                                testId={testId && `${testId}-field`}
                                type={type}
                                value={this.state.value}
                                placeholder={placeholder}
                                disabled={disabled}
                                validation={validation}
                                onValidation={this.handleValidation}
                                onChange={this.handleChange}
                                onKeyDown={onKeyDown}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                light={light}
                                style={style}
                            />
                        }
                        label={label}
                        description={description}
                        error={(!this.state.focused && this.state.error) || ""}
                    />
                )}
            </IDProvider>
        );
    }
}
