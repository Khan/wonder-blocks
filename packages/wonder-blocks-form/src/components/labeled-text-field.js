// @flow
import * as React from "react";

import {IDProvider} from "@khanacademy/wonder-blocks-core";
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
|};

type DefaultProps = {|
    type: $PropertyType<Props, "type">,
    disabled: $PropertyType<Props, "disabled">,
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
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.initialValue ? props.initialValue : "",
            error: null,
            focused: false,
        };
    }

    handleOnFocus: (
        event: SyntheticFocusEvent<HTMLInputElement>,
    ) => mixed = () => {
        this.setState({
            focused: true,
        });
    };

    handleOnBlur: (
        event: SyntheticFocusEvent<HTMLInputElement>,
    ) => mixed = () => {
        this.setState({
            focused: false,
        });
    };

    handleOnChange: (newValue: string) => mixed = (newValue) => {
        this.setState({
            value: newValue,
        });
    };

    render(): React.Node {
        const {id, type, label, description, disabled} = this.props;

        return (
            <IDProvider id={id} scope="labeled-text-field">
                {(uniqueId) => (
                    <FieldHeading
                        id={uniqueId}
                        field={
                            <TextField
                                id={`${uniqueId}-field`}
                                aria-describedby={`${uniqueId}-error`}
                                aria-invalid={
                                    this.state.error ? "true" : "false"
                                }
                                type={type}
                                value={this.state.value}
                                placeholder="Placeholder"
                                disabled={disabled}
                                onChange={this.handleOnChange}
                                onFocus={this.handleOnFocus}
                                onBlur={this.handleOnBlur}
                            />
                        }
                        label={label}
                        description={description}
                        error="Error"
                    />
                )}
            </IDProvider>
        );
    }
}
