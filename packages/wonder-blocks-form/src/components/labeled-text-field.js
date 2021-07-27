// @flow
import * as React from "react";

import {IDProvider, type StyleType} from "@khanacademy/wonder-blocks-core";
import {type Typography} from "@khanacademy/wonder-blocks-typography";

import FieldHeading from "./field-heading.js";
import TextField, {type TextFieldType} from "./text-field.js";

type WithForwardRef = {|forwardedRef: React.Ref<"input">|};

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
     * The input value.
     */
    value: string,

    /**
     * Makes a read-only input field that cannot be focused. Defaults to false.
     */
    disabled: boolean,

    /**
     * Provide a validation for the input value.
     * Return a string error message or null | void for a valid input.
     */
    validate?: (value: string) => ?string,

    /**
     * Called when the TextField input is validated.
     */
    onValidate?: (errorMessage: ?string) => mixed,

    /**
     * Called when the value has changed.
     */
    onChange: (newValue: string) => mixed,

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
     * Custom styles for the container.
     *
     * Note: This style is passed to the field heading container
     * due to scenarios where we would like to set a specific
     * width for the text field. If we apply the style directly
     * to the text field, the container would not be affected.
     * For example, setting text field to "width: 50%" would not
     * affect the container since text field is a child of the container.
     * In this case, the container would maintain its width ocuppying
     * unnecessary space when the text field is smaller.
     */
    style?: StyleType,

    /**
     * Optional test ID for e2e testing.
     */
    testId?: string,

    /**
     * Specifies if the TextField is read-only.
     */
    readOnly?: boolean,

    /**
     * Specifies if the TextField allows autocomplete.
     */
    autoComplete?: string,
|};

type PropsWithForwardRef = {|
    ...Props,
    ...WithForwardRef,
|};

type DefaultProps = {|
    type: $PropertyType<PropsWithForwardRef, "type">,
    disabled: $PropertyType<PropsWithForwardRef, "disabled">,
    light: $PropertyType<PropsWithForwardRef, "light">,
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

// TODO(WB-1081): Change class name back to LabeledTextField after Styleguidist is gone.
/**
 * A LabeledTextField is an element used to accept a single line of text
 * from the user paired with a label, description, and error field elements.
 */
class LabeledTextFieldInternal extends React.Component<
    PropsWithForwardRef,
    State,
> {
    static defaultProps: DefaultProps = {
        type: "text",
        disabled: false,
        light: false,
    };

    constructor(props: PropsWithForwardRef) {
        super(props);
        this.state = {
            error: null,
            focused: false,
        };
    }

    handleValidate: (errorMessage: ?string) => mixed = (errorMessage) => {
        const {onValidate} = this.props;
        this.setState({error: errorMessage}, () => {
            if (onValidate) {
                onValidate(errorMessage);
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
            value,
            disabled,
            validate,
            onChange,
            onKeyDown,
            placeholder,
            light,
            style,
            testId,
            readOnly,
            autoComplete,
            forwardedRef,
        } = this.props;

        return (
            <IDProvider id={id} scope="labeled-text-field">
                {(uniqueId) => (
                    <FieldHeading
                        id={uniqueId}
                        testId={testId}
                        style={style}
                        field={
                            <TextField
                                id={`${uniqueId}-field`}
                                aria-describedby={`${uniqueId}-error`}
                                aria-invalid={
                                    this.state.error ? "true" : "false"
                                }
                                testId={testId && `${testId}-field`}
                                type={type}
                                value={value}
                                placeholder={placeholder}
                                disabled={disabled}
                                validate={validate}
                                onValidate={this.handleValidate}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                light={light}
                                readOnly={readOnly}
                                autoComplete={autoComplete}
                                ref={forwardedRef}
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

type ExportProps = $Diff<
    React.ElementConfig<typeof LabeledTextFieldInternal>,
    WithForwardRef,
>;

const LabeledTextField: React.AbstractComponent<
    ExportProps,
    HTMLInputElement,
> = React.forwardRef<ExportProps, HTMLInputElement>((props, ref) => (
    <LabeledTextFieldInternal {...props} forwardedRef={ref} />
));

export default LabeledTextField;
