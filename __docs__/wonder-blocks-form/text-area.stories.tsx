import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {StyleSheet} from "aphrodite";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../components/component-info";
import {semanticColor, spacing} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {PropsFor, View} from "@khanacademy/wonder-blocks-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

import TextAreaArgTypes from "./text-area.argtypes";
import {validateEmail} from "./form-utilities";

/**
 * A TextArea is an element used to accept text from the user.
 */
export default {
    title: "Packages / Form / TextArea",
    component: TextArea,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
        a11y: {
            config: {
                rules: [
                    {
                        // Disable the check for an associated label since
                        // these stories are for the text area on its own
                        id: "label",
                        enabled: false,
                    },
                ],
            },
        },
    },
    argTypes: TextAreaArgTypes,
} as Meta<typeof TextArea>;

type StoryComponentType = StoryObj<typeof TextArea>;
type ControlledStoryComponentType = StoryObj<typeof ControlledTextArea>;

const styles = StyleSheet.create({
    customField: {
        backgroundColor: semanticColor.status.notice.background,
        color: semanticColor.status.notice.foreground,
        border: "none",
        maxWidth: 250,
        "::placeholder": {
            color: semanticColor.text.secondary,
        },
    },
});

const ControlledTextArea = (
    storyArgs: PropsFor<typeof TextArea> & {label?: string},
) => {
    const {label, ...args} = storyArgs;
    const [value, setValue] = React.useState(args.value || "");
    const [error, setError] = React.useState<string | null | undefined>(null);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <LabeledField
            label={label || "Text Area"}
            errorMessage={error || (args.error && "Error from error prop")}
            field={
                <TextArea
                    {...args}
                    value={value}
                    onChange={handleChange}
                    onValidate={setError}
                />
            }
        />
    );
};

export const Default: StoryComponentType = {
    args: {
        value: "",
        onChange: () => {},
    },
};

/**
 * When setting a value and onChange props, you can use it as a controlled
 * component.
 */
export const Controlled: ControlledStoryComponentType = {
    render: ControlledTextArea,
    args: {
        label: "Controlled",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * When the `value` prop is provided, the value is rendered in the text area.
 */
export const WithValue: ControlledStoryComponentType = {
    args: {
        value: "Text",
        onChange: () => {},
        label: "With Value",
    },
    render: ControlledTextArea,
};

/**
 * Use the `placeholder` prop to provide hints or examples of what to enter.
 *
 * - Placeholder text is not a replacement for labels. Assistive
 * technologies, such as screen readers, do not treat placeholder text as
 * labels.
 * - Placeholder text is not displayed when there is a value. Critical details
 * should not be in the placeholder text as they can be missed if the TextArea
 * is fille already.
 */
export const Placeholder: StoryComponentType = {
    args: {
        placeholder: "Placeholder text",
    },
};

/**
 * If the disabled prop is set to `true`, TextArea will have disabled styling
 * and will not be interactable.
 *
 * Note: The `disabled` prop sets the `aria-disabled` attribute to `true`
 * instead of setting the `disabled` attribute. This is so that the component
 * remains focusable while communicating to screen readers that it is disabled.
 * This `disabled` prop will also set the `readonly` attribute to prevent
 * typing in the field.
 */
export const Disabled: StoryComponentType = {
    args: {
        disabled: true,
    },
};

/**
 * A textarea with the prop `readOnly` set to `true` is not interactable. It
 * looks the same as if it were not read only, and it can still receive focus,
 * but the interaction point will not appear and the textarea will not change.
 */
export const ReadOnly: StoryComponentType = {
    args: {
        value: "Readonly text",
        readOnly: true,
    },
};

/**
 * If the `error` prop is set to true, the TextArea will have error styling and
 * `aria-invalid` set to `true`.
 *
 * This is useful for scenarios where we want to show an error on a
 * specific field after a form is submitted (server validation).
 *
 * Note: The `required` and `validate` props can also put the TextArea in an
 * error state.
 */
export const Error: ControlledStoryComponentType = {
    render: ControlledTextArea,
    args: {
        value: "With error",
        error: true,
        label: "Error using error prop",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * If the textarea fails validation, `TextArea` will have error styling.
 *
 * This is useful for scenarios where we want to show errors while a
 * user is filling out a form (client validation).
 *
 * Note that we will internally set the correct `aria-invalid` attribute to the
 * `textarea` element:
 * - `aria-invalid="true"` if there is an error.
 * - `aria-invalid="false"` if there is no error.
 */
export const ErrorFromValidation: ControlledStoryComponentType = {
    args: {
        value: "khan",
        validate: validateEmail,
        label: "Error from validation",
    },
    render: ControlledTextArea,
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
 * to show error while a user is filling out a form (client validation)
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
export const ErrorFromPropAndValidation = (args: PropsFor<typeof TextArea>) => {
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
        <View style={{gap: spacing.small_12}}>
            <LabeledField
                label="Error from prop and validation"
                field={
                    <TextArea
                        {...args}
                        value={value}
                        onChange={handleChange}
                        validate={validateEmail}
                        onValidate={setValidationErrorMessage}
                        error={!!errorMessage}
                    />
                }
                errorMessage={errorMessage}
            />
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
                <ControlledTextArea
                    {...args}
                    label="Validation on mount if there is a value"
                    value="invalid"
                />
                <ControlledTextArea
                    {...args}
                    label="Error shown immediately (instantValidation: true, required:
                    false)"
                    instantValidation={true}
                />
                <ControlledTextArea
                    {...args}
                    label="Error shown onBlur (instantValidation: false, required:
                    false)"
                    instantValidation={false}
                />

                <ControlledTextArea
                    {...args}
                    validate={undefined}
                    value="T"
                    label="Error shown immediately after clearing the value
                    (instantValidation: true, required: true)"
                    instantValidation={true}
                    required="Required"
                />

                <ControlledTextArea
                    {...args}
                    label="Error shown on blur if it is empty (instantValidation:
                    false, required: true)"
                    validate={undefined}
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

/**
 * A required field will have error styling if the field is left blank. To
 * observe this, type something into the field, backspace all the way,
 * and then shift focus out of the field.
 */
export const Required: StoryComponentType = {
    args: {
        value: "",
        required: true,
    },
    render: ControlledTextArea,
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * The number of rows to use by default can be specified using the `rows` prop.
 * This will be ignored if:
 * - the height is set on the textarea using CSS
 * - the user resizes the textarea using the built-in resize control
 *
 * It is often helpful to set the initial number of rows based on how much
 * content we expect from the user.
 */
export const Rows: StoryComponentType = {
    args: {
        rows: 10,
    },
};

/**
 * If the `autoComplete` prop is set, the browser can predict values for the
 * textarea. For more details, see the
 * [MDN docs for the textarea attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes).
 */
export const AutoComplete: StoryComponentType = {
    args: {
        autoComplete: "on",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * When the `autoFocus` prop is set, the TextArea will be focused on page load.
 * Try to avoid using this if possible as it is bad for accessibility.
 */
export const AutoFocus = () => {
    const [value, setValue] = React.useState("");
    const [showDemo, setShowDemo] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
            <TextArea
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
                Press the button to view the textarea with autofocus.
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
AutoFocus.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * Spell check can be enabled for the TextArea. It will be checked for spelling
 * when you try to edit it (ie. once the textarea is focused).
 *
 * **Note**: Consider disabling `spellCheck` for
 *  sensitive information (see [Security and Privacy concerns](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck#security_and_privacy_concerns) for more details)
 */
export const SpellCheckEnabled: StoryComponentType = {
    args: {
        spellCheck: true,
        value: "This exampull will be checkd fur spellung when you try to edit it.",
    },
};
SpellCheckEnabled.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

export const SpellCheckDisabled: StoryComponentType = {
    args: {
        spellCheck: false,
        value: "This exampull will nut be checkd fur spellung when you try to edit it.",
    },
};
SpellCheckDisabled.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};

/**
 * The `wrap` prop configures the wrapping behaviour of the value for form
 * submission.
 */
export const Wrap: StoryComponentType = {
    args: {
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    render(args) {
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            /* eslint-disable no-console */
            console.log("Soft Wrap:");
            console.log(formData.get("soft-wrap"));
            console.log("Hard Wrap:");
            console.log(formData.get("hard-wrap"));
            console.log("Off Wrap:");
            console.log(formData.get("off-wrap"));
            console.log("Default Wrap:");
            console.log(formData.get("default-wrap"));
            /* eslint-enable no-console */
        };
        return (
            <div>
                <p>
                    Once submitted, check the console to observe the wrapping
                    behaviour in the form data
                </p>
                <form
                    method="POST"
                    action="/submit"
                    id="wrapForm"
                    onSubmit={handleSubmit}
                    style={{width: "300px"}}
                >
                    <LabeledField
                        label="Wrap: soft"
                        field={
                            <TextArea {...args} wrap="soft" name="soft-wrap" />
                        }
                    />
                    <br />
                    <LabeledField
                        label="Wrap: hard"
                        field={
                            <TextArea {...args} wrap="hard" name="hard-wrap" />
                        }
                    />
                    <br />
                    <LabeledField
                        label="Wrap: off"
                        field={
                            <TextArea {...args} wrap="off" name="off-wrap" />
                        }
                    />
                    <br />
                    <LabeledField
                        label="Wrap: default (soft)"
                        field={<TextArea {...args} name="default-wrap" />}
                    />
                    <br />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    },
};

/**
 * The `minlength` and `maxlength` textarea attributes can be set using the
 * `minLength` and `maxLength` props.
 *
 * Note: At this time, character length requirements are not displayed as part of
 * the Text Area component. These props are only setting the underlying HTML
 * attributes ([minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength)
 * and [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength)).
 */
export const MinMaxLength: StoryComponentType = {
    args: {
        minLength: 2,
        maxLength: 4,
        value: "Text",
    },
    parameters: {
        chromatic: {
            // Disabling because this doesn't test anything visual.
            disableSnapshot: true,
        },
    },
};

/**
 * The behaviour of the built-in resize control can be configured using the
 * `resizeType` prop. Here are some tips:
 * - The initial size of the TextArea can be configured using the `rows` prop.
 * This size should be large enough for the expected user input.
 * - Avoid having too small of a TextArea and having `resizeType=none`. This
 * makes it difficult for users to scroll through their input.
 */
export const ResizeType: StoryComponentType = {
    args: {},
    render(args) {
        return (
            <div>
                <LabeledField
                    label="Resize Type: both"
                    field={<TextArea {...args} resizeType="both" />}
                />
                <br />
                <LabeledField
                    label="Resize Type: vertical"
                    field={<TextArea {...args} resizeType="vertical" />}
                />
                <br />
                <LabeledField
                    label="Resize Type: horizontal"
                    field={<TextArea {...args} resizeType="horizontal" />}
                />
                <br />
                <LabeledField
                    label="Resize Type: none"
                    field={<TextArea {...args} resizeType="none" />}
                />
                <br />
                <LabeledField
                    label="Resize Type: default (both)"
                    field={<TextArea {...args} />}
                />
            </div>
        );
    },
};

/**
 * Custom styling can be passed to the TextArea component using the `style`
 * prop.
 */
export const CustomStyle: StoryComponentType = {
    args: {
        style: styles.customField,
        value: "Text",
    },
};

/**
 * Custom styling can be passed to the root node of the component using the
 * `rootStyle` prop. If possible, try to use this prop carefully and use the
 * `style` prop instead.
 *
 * Note: The `rootStyle` prop adds styling to the root node, which is a `div`
 * that wraps the underlying `textarea` element, whereas the `style` prop adds styling
 * to the `textarea` element directly. There is a `div` that wraps the textarea
 * so that the layout of the component is still controlled by the TextArea component.
 * This will be useful for future work where the TextArea component could include
 * other elements such as a character counter.
 *
 * The following example shows that applying root styles can enable the textarea
 * to fill in the remaining height:
 */
export const RootStyle: StoryComponentType = {
    render(args) {
        return (
            <View style={{height: "500px", gap: spacing.large_24}}>
                <div>Example flex item child </div>
                <TextArea
                    {...args}
                    style={{height: "100%"}}
                    rootStyle={{flexGrow: 1}}
                />
            </View>
        );
    },
};

/**
 * A ref can be passed to the component to have access to the textarea element.
 */
export const WithRef = () => {
    const [value, setValue] = React.useState("Text");
    const ref = React.useRef<HTMLTextAreaElement>(null);

    const handleClick = () => {
        ref.current?.focus();
    };

    return (
        <View style={{alignItems: "flex-start"}}>
            <TextArea value={value} onChange={setValue} ref={ref} />
            <Strut size={spacing.large_24} />
            <Button onClick={handleClick}>Focus using ref</Button>
        </View>
    );
};
WithRef.parameters = {
    chromatic: {
        // Disabling because this doesn't test anything visual.
        disableSnapshot: true,
    },
};
