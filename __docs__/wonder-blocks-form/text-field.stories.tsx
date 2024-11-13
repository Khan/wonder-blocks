/* eslint-disable max-lines */
import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {PropsFor, View, Text as _Text} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";
import {
    LabelLarge,
    Body,
    LabelSmall,
} from "@khanacademy/wonder-blocks-typography";

import {TextField} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import TextFieldArgTypes from "./text-field.argtypes";
import {validateEmail, validatePhoneNumber} from "./form-utilities";

/**
 * A TextField is an element used to accept a single line of text from the user.
 */
export default {
    title: "Packages / Form / TextField",
    component: TextField,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: TextFieldArgTypes,
} as Meta<typeof TextField>;

type StoryComponentType = StoryObj<typeof TextField>;

export const Default: StoryComponentType = {
    args: {
        type: "text",
        value: "",
        disabled: false,
        placeholder: "",
        required: false,
        light: false,
        testId: "",
        readOnly: false,
        autoComplete: "off",
        validate: () => undefined,
        onValidate: () => {},
        onChange: () => {},
        onKeyDown: () => {},
        onFocus: () => {},
        onBlur: () => {},
    },
};

export const Text: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-1"
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

Text.parameters = {
    docs: {
        storyDescription:
            "An input field with type `text` takes all kinds of characters.",
    },
};

export const Required: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-2"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required={true}
        />
    );
};

Required.parameters = {
    docs: {
        description: {
            story: `A required field will have error styling if the
        field is left blank. To observe this, type something into the
        field, backspace all the way, and then shift focus out of the field.`,
        },
    },
    chromatic: {
        // Disabling snapshot because it doesn't show the error style
        // until after the user interacts with this field.
        disableSnapshot: true,
    },
};

export const Number: StoryComponentType = () => {
    const [value, setValue] = React.useState("1234");
    const [value2, setValue2] = React.useState("12");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View>
            <TextField
                id="tf-3"
                type="number"
                value={value}
                placeholder="Number"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <Strut size={spacing.small_12} />
            <Body>
                The following text field has a min of 0, a max of 15, and a step
                of 3
            </Body>
            <TextField
                id="tf-3a"
                type="number"
                value={value2}
                placeholder="Number"
                onChange={setValue2}
                onKeyDown={handleKeyDown}
                min={0}
                max={15}
                step={3}
            />
        </View>
    );
};

Number.parameters = {
    docs: {
        description: {
            story: `An input field with type \`number\` will only take
                numeric characters as input.\n\nNumber inputs have a few props
                that other input types don't have - \`min\`, \`max\`, and
                \`step\`. In this example, the first number input has no
                restrictions, while the second number input has a minimum
                value of 0, a maximum value of 15, and a step of 3. Observe
                that using the arrow keys will automatically snap to the
                step, and stop at the min and max values.`,
        },
    },
};

export const Password: StoryComponentType = () => {
    const [value, setValue] = React.useState("Password123");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-4"
                type="password"
                value={value}
                placeholder="Password"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Password.parameters = {
    docs: {
        description: {
            story: `An input field with type \`password\` will
        obscure the input value. It also often contains validation.
        In this example, the password must be over 8 characters long and
        must contain a numeric value.`,
        },
    },
};

export const Email: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-5"
                type="email"
                value={value}
                placeholder="Email"
                validate={validateEmail}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Email.parameters = {
    docs: {
        description: {
            story: `An input field with type \`email\` will automatically
        validate an input on submit to ensure it's either formatted properly
        or blank. \`TextField\` will run validation on change if the
        \`validate\` prop is passed in, as in this example.`,
        },
    },
};

export const Telephone: StoryComponentType = () => {
    const [value, setValue] = React.useState("123-456-7890");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View>
            <TextField
                id="tf-6"
                type="tel"
                value={value}
                placeholder="Telephone"
                validate={validatePhoneNumber}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

Telephone.parameters = {
    docs: {
        description: {
            story: `An input field with type \`tel\` will NOT
        validate an input on submit by default as telephone numbers
        can vary considerably. \`TextField\` will run validation on blur
        if the \`validate\` prop is passed in, as in this example.`,
        },
    },
};

const ControlledTextField = (args: PropsFor<typeof TextField>) => {
    const [value, setValue] = React.useState(args.value || "");
    const [error, setError] = React.useState<string | null | undefined>(null);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <View>
            <TextField
                {...args}
                value={value}
                onChange={handleChange}
                onValidate={setError}
            />
            <Strut size={spacing.xxSmall_6} />
            {(error || args.error) && (
                <LabelSmall style={styles.errorMessage}>
                    {error || "Error from error prop"}
                </LabelSmall>
            )}
        </View>
    );
};

function ErrorRender(args: PropsFor<typeof TextField>) {
    const [value, setValue] = React.useState("khan");
    const [errorMessage, setErrorMessage] = React.useState<any>();

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View>
            <TextField
                id="tf-7"
                type="email"
                placeholder="Email"
                validate={validateEmail}
                onValidate={handleValidate}
                onKeyDown={handleKeyDown}
                {...args}
                value={value}
                onChange={handleChange}
            />
            {(errorMessage || args.error) && (
                <View>
                    <Strut size={spacing.xxSmall_6} />
                    <LabelSmall style={styles.errorMessage}>
                        {errorMessage || "Error from error prop"}
                    </LabelSmall>
                </View>
            )}
        </View>
    );
}

/**
 * If the `error` prop is set to true, the TextField will have error styling and
 * `aria-invalid` set to `true`.
 *
 * This is useful for scenarios where we want to show an error on a
 * specific field after a form is submitted (server validation).
 *
 * Note: The `required` and `validate` props can also put the TextField in an
 * error state.
 */
export const Error: StoryComponentType = {
    render: ErrorRender,
    args: {
        error: true,
        validate: undefined,
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * If an input value fails validation, `TextField` will have error styling.
 *
 * This is useful for scenarios where we want to show errors while a
 * user is filling out a form (client validation).
 *
 * Note that we will internally set the correct `aria-invalid` attribute to the
 * `input` element:
 * - aria-invalid="true" if there is an error.
 * - aria-invalid="false" if there is no error.
 */
export const ErrorFromValidation: StoryComponentType = {
    render: ErrorRender,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * This example shows how the `error` and `validate` props can both be used to
 * put the field in an error state. This is useful for scenarios where we want
 * to show errors while a user is filling out a form (client validation)
 * and after a form is submitted (server validation).
 *
 * In this example:
 * 1. It starts with an invalid email. The error message shown is the message returned
 * by the `validate` function prop
 * 2. Once the email is fixed to `test@test.com`, the validation error message
 * goes away since it is a valid email.
 * 3. When the Submit button is pressed, another error message is shown (this
 * simulates backend validation).
 * 4. When you enter any other email address, the error message is
 * cleared.
 */
export const ErrorFromPropAndValidation = (
    args: PropsFor<typeof TextField>,
) => {
    const [value, setValue] = React.useState(args.value || "test@test,com");
    const [validationErrorMessage, setValidationErrorMessage] = React.useState<
        string | null | undefined
    >(null);
    const [backendErrorMessage, setBackendErrorMessage] = React.useState<
        string | null | undefined
    >(null);

    const handleChange = (newValue: string) => {
        setValue(newValue);
        // Clear the backend error message on change
        setBackendErrorMessage(null);
    };

    const errorMessage = validationErrorMessage || backendErrorMessage;

    return (
        <View>
            <TextField
                {...args}
                value={value}
                onChange={handleChange}
                validate={validateEmail}
                onValidate={setValidationErrorMessage}
                error={!!errorMessage}
            />
            <Strut size={spacing.xxSmall_6} />
            {errorMessage && (
                <LabelSmall style={styles.errorMessage}>
                    {errorMessage}
                </LabelSmall>
            )}
            <Strut size={spacing.xxSmall_6} />
            <Button
                onClick={() => {
                    if (value === "test@test.com") {
                        setBackendErrorMessage(
                            "This email is already being used, please try another email.",
                        );
                    } else {
                        setBackendErrorMessage(null);
                    }
                }}
            >
                Submit
            </Button>
        </View>
    );
};

ErrorFromPropAndValidation.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * The `instantValidation` prop controls when validation is triggered. Validation
 * is triggered if the `validate` or `required` props are set.
 *
 * It is preferred to set `instantValidation` to `false` so that the user isn't
 * shown an error until they are done with a field. Note: if `instantValidation`
 * is not explicitly set, it defaults to `true` since this is the current
 * behaviour of existing usage. Validation on blur needs to be opted in.
 *
 * Validation is triggered:
 * - On mount if the `value` prop is not empty
 * - If `instantValidation` is `true`, validation occurs `onChange` (default)
 * - If `instantValidation` is `false`, validation occurs `onBlur`
 *
 * When `required` is set to `true`:
 * - If `instantValidation` is `true`, the required error message is shown after
 * a value is cleared
 * - If `instantValidation` is `false`, the required error message is shown
 * whenever the user tabs away from the required field
 */
export const InstantValidation: StoryComponentType = {
    args: {
        validate: validateEmail,
    },
    render: (args) => {
        return (
            <View style={{gap: spacing.small_12}}>
                <LabelSmall htmlFor="instant-validation-true-not-required">
                    Validation on mount if there is a value
                </LabelSmall>
                <ControlledTextField
                    {...args}
                    id="instant-validation-true-not-required"
                    value="invalid"
                />
                <LabelSmall htmlFor="instant-validation-true-not-required">
                    Error shown immediately (instantValidation: true, required:
                    false)
                </LabelSmall>
                <ControlledTextField
                    {...args}
                    id="instant-validation-true-not-required"
                    instantValidation={true}
                />
                <LabelSmall htmlFor="instant-validation-false-not-required">
                    Error shown onBlur (instantValidation: false, required:
                    false)
                </LabelSmall>
                <ControlledTextField
                    {...args}
                    id="instant-validation-false-not-required"
                    instantValidation={false}
                />

                <LabelSmall htmlFor="instant-validation-true-required">
                    Error shown immediately after clearing the value
                    (instantValidation: true, required: true)
                </LabelSmall>
                <ControlledTextField
                    {...args}
                    validate={undefined}
                    value="T"
                    id="instant-validation-true-required"
                    instantValidation={true}
                    required="Required"
                />
                <LabelSmall htmlFor="instant-validation-false-required">
                    Error shown on blur if it is empty (instantValidation:
                    false, required: true)
                </LabelSmall>
                <ControlledTextField
                    {...args}
                    validate={undefined}
                    id="instant-validation-false-required"
                    instantValidation={false}
                    required="Required"
                />
            </View>
        );
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

export const Light: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View style={styles.darkBackground}>
            <TextField
                id="tf-9"
                type="email"
                value={value}
                placeholder="Email"
                light={true}
                validate={validateEmail}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={spacing.xSmall_8} />
                    <_Text style={styles.errorMessageLight}>
                        {errorMessage}
                    </_Text>
                </View>
            )}
        </View>
    );
};

Light.parameters = {
    docs: {
        description: {
            story: `If the \`light\` prop is set to true,
        \`TextField\` will have light styling. This is intended to be used
        on a dark background. There is also a specific light styling for the
        error state, as seen in the \`ErrorLight\` story.`,
        },
    },
};

export const ErrorLight: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan");
    const [errorMessage, setErrorMessage] = React.useState<any>();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidate = (errorMessage?: string | null) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <View style={styles.darkBackground}>
            <TextField
                id="tf-7"
                type="email"
                value={value}
                placeholder="Email"
                light={true}
                validate={validateEmail}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

ErrorLight.parameters = {
    docs: {
        description: {
            story: `If an input value fails validation and the
        \`light\` prop is true, \`TextField\` will have light error styling.`,
        },
    },
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * If the disabled prop is set to `true`, TextField will have disabled styling
 * and will not be interactable.
 *
 * Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
 * instead of setting the `disabled` attribute. This is so that the component
 * remains focusable while communicating to screen readers that it is disabled.
 * This `disabled` prop will also set the `readonly` attribute to prevent
 * typing in the field.
 */
export const Disabled: StoryComponentType = () => (
    <TextField
        id="tf-8"
        value=""
        placeholder="This field is disabled."
        onChange={() => {}}
        disabled={true}
    />
);

Disabled.parameters = {
    docs: {
        description: {
            story: `If the \`disabled\` prop is set to true,
        \`TextField\` will have disabled styling and will not be interactable.`,
        },
    },
};

export const CustomStyle: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-10"
            style={styles.customField}
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

CustomStyle.parameters = {
    docs: {
        description: {
            story: `\`TextField\` can take in custom styles that
        override the default styles. This example has custom styles for the
        \`backgroundColor\`, \`color\`, \`border\`, \`maxWidth\`, and
        placeholder \`color\` properties.`,
        },
    },
};

export const Ref: StoryComponentType = () => {
    const [value, setValue] = React.useState("");
    const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleSubmit = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <View>
            <TextField
                id="tf-11"
                type="text"
                value={value}
                placeholder="Text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <Strut size={spacing.medium_16} />
            <Button style={styles.button} onClick={handleSubmit}>
                Focus Input
            </Button>
        </View>
    );
};

Ref.parameters = {
    docs: {
        description: {
            story: `If you need to save a reference to the input
        field, you can do so by using the \`ref\` prop. In this example,
        we want the input field to receive focus when the button is
        pressed. We can do this by creating a React ref of type
        \`HTMLInputElement\` and passing it into \`TextField\`'s \`ref\` prop.
        Now we can use the ref variable in the \`handleSubmit\` function to
        shift focus to the field.`,
        },
        chromatic: {
            // Disabling snapshot because this is testing interaction,
            // not visuals.
            disableSnapshot: true,
        },
    },
};

export const ReadOnly: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-12"
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            readOnly={true}
        />
    );
};

ReadOnly.parameters = {
    docs: {
        description: {
            story: `An input field with the prop \`readOnly\` set
        to true is not interactable. It looks the same as if it were not
        read only, and it can still receive focus, but the interaction
        point will not appear and the input will not change.`,
        },
        chromatic: {
            // Disabling snapshot because this is testing interaction,
            // not visuals.
            disableSnapshot: true,
        },
    },
};

export const WithAutofocus: StoryComponentType = () => {
    const [value, setValue] = React.useState("");
    const [showDemo, setShowDemo] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleShowDemo = () => {
        setShowDemo(!showDemo);
    };

    const AutoFocusDemo = () => (
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}}>Some other focusable element</Button>
            <TextField
                id="tf-13"
                value={value}
                placeholder="Placeholder"
                autoFocus={true}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{flexGrow: 1, marginLeft: spacing.small_12}}
            />
        </View>
    );

    return (
        <View>
            <LabelLarge style={{marginBottom: spacing.small_12}}>
                Press the button to view the text field with autofocus.
            </LabelLarge>
            <Button
                onClick={handleShowDemo}
                style={{width: 300, marginBottom: spacing.large_24}}
            >
                Toggle autoFocus demo
            </Button>
            {showDemo && <AutoFocusDemo />}
        </View>
    );
};

WithAutofocus.parameters = {
    docs: {
        description: {
            story: `TextField takes an \`autoFocus\` prop, which
            makes it autofocus on page load. Try to avoid using this if
            possible as it is bad for accessibility.\n\nPress the button
            to view this example. Notice that the text field automatically
            receives focus. Upon pressing the botton, try typing and
            notice that the text appears directly in the text field. There
            is another focusable element present to demonstrate that
            focus skips that element and goes straight to the text field.`,
        },
    },
};

export const AutoComplete: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <form>
            <TextField
                id="tf-14"
                type="text"
                value={value}
                placeholder="Name"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={styles.fieldWithButton}
                autoComplete="name"
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};

AutoComplete.parameters = {
    docs: {
        description: {
            story: `If \`TextField\`'s \`autocomplete\` prop is set,
        the browser can predict values for the input. When the user starts
        to type in the field, a list of options will show up based on
        values that may have been submitted at a previous time.
        In this example, the text field provides options after you
        input a value, press the submit button, and refresh the page.`,
        },
        chromatic: {
            // Disabling snapshot because this is testing interaction,
            // not visuals.
            disableSnapshot: true,
        },
    },
};

const styles = StyleSheet.create({
    errorMessage: {
        color: color.red,
        paddingLeft: spacing.xxxSmall_4,
    },
    errorMessageLight: {
        color: color.white,
        paddingLeft: spacing.xxxSmall_4,
    },
    darkBackground: {
        backgroundColor: color.darkBlue,
        padding: spacing.medium_16,
    },
    customField: {
        backgroundColor: color.darkBlue,
        color: color.white,
        border: "none",
        maxWidth: 250,
        "::placeholder": {
            color: color.white64,
        },
    },
    button: {
        maxWidth: 150,
    },
    fieldWithButton: {
        marginBottom: spacing.medium_16,
    },
});
