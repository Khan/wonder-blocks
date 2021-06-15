// @flow
import * as React from "react";

import FieldHeading from "./field-heading.js";
import TextField from "./text-field.js";

type Props = {|
    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean,
|};

type DefaultProps = {|
    disabled: $PropertyType<Props, "disabled">,
|};

type State = {|
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
        disabled: false,
    };

    state: State = {
        error: null,
        focused: false,
    };

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

    render(): React.Node {
        const {disabled} = this.props;
        return (
            <FieldHeading
                field={
                    <TextField
                        id="tf-1"
                        value="Value"
                        placeholder="Placeholder"
                        disabled={disabled}
                        onChange={() => {}}
                        onFocus={this.handleOnFocus}
                        onBlur={this.handleOnBlur}
                    />
                }
                label="Label"
                description="Description"
                error="Error"
            />
        );
    }
}
