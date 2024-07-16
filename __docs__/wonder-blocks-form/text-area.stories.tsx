import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {StyleSheet} from "aphrodite";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import Button from "@khanacademy/wonder-blocks-button";
import {LabelSmall, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {View} from "@khanacademy/wonder-blocks-core";

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
    },
} as Meta<typeof TextArea>;

type StoryComponentType = StoryObj<typeof TextArea>;

const styles = StyleSheet.create({
    customField: {
        backgroundColor: color.darkBlue,
        color: color.white,
        border: "none",
        maxWidth: 250,
        "::placeholder": {
            color: color.white64,
        },
    },
    error: {
        color: color.red,
    },
});

const ControlledTextArea = (args: any) => {
    const [value, setValue] = React.useState(args.value || "");
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <View>
            <TextArea
                {...args}
                value={value}
                onChange={handleChange}
                onValidate={setError}
            />
            <Strut size={spacing.xxSmall_6} />
            {error && <LabelSmall style={styles.error}>{error}</LabelSmall>}
        </View>
    );
};

export const Default: StoryComponentType = {
    args: {
        value: "",
        onChange: () => {},
    },
};

export const Controlled: StoryComponentType = {
    render: ControlledTextArea,
};

export const WithValue: StoryComponentType = {
    args: {
        value: "Text",
        onChange: () => {},
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
 * If the textarea fails validation, `TextArea` will have error styling.
 * Note that we will internally set the correct `aria-invalid` attribute to the
 * `textarea` element:
 * - `aria-invalid="true"` if there is an error message.
 * - `aria-invalid="false"` if there is no error message.
 */
export const Error: StoryComponentType = {
    args: {
        value: "khan",
        validate(value: string) {
            const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
            if (!emailRegex.test(value)) {
                return "Please enter a valid email";
            }
        },
    },
    render: ControlledTextArea,
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
};

/**
 * When the `autoFocus` prop is set, the TextArea will be focused on page load.
 * Try to avoid using this if possible as it is bad for accessibility.
 */
export const AutoFocus: StoryComponentType = () => {
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

export const SpellCheckDisabled: StoryComponentType = {
    args: {
        spellCheck: false,
        value: "This exampull will nut be checkd fur spellung when you try to edit it.",
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
                    <label htmlFor="soft-wrap">Wrap: soft</label>
                    <TextArea
                        {...args}
                        wrap="soft"
                        id="soft-wrap"
                        name="soft-wrap"
                    />
                    <br />
                    <label htmlFor="hard-wrap">Wrap: hard</label>
                    <TextArea
                        {...args}
                        wrap="hard"
                        id="hard-wrap"
                        name="hard-wrap"
                    />
                    <br />
                    <label htmlFor="off-wrap">Wrap: off</label>
                    <TextArea
                        {...args}
                        wrap="off"
                        id="off-wrap"
                        name="off-wrap"
                    />
                    <br />
                    <label htmlFor="default-wrap">Wrap: default (soft)</label>
                    <TextArea {...args} id="default-wrap" name="default-wrap" />
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
    render: ControlledTextArea,
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
                <label htmlFor="resize-both">Resize Type: both</label>
                <TextArea {...args} resizeType="both" id="resize-both" />
                <br />
                <label htmlFor="resize-vertical">Resize Type: vertical</label>
                <TextArea
                    {...args}
                    resizeType="vertical"
                    id="resize-vertical"
                />
                <br />
                <label htmlFor="resize-horizontal">
                    Resize Type: horizontal
                </label>
                <TextArea
                    {...args}
                    resizeType="horizontal"
                    id="resize-horizontal"
                />
                <br />
                <label htmlFor="resize-none">Resize Type: none</label>
                <TextArea {...args} resizeType="none" id="resize-none" />
                <br />
                <label htmlFor="resize-default">
                    Resize Type: default (both)
                </label>
                <TextArea {...args} id="resize-default" />
            </div>
        );
    },
};

export const Light: StoryComponentType = {
    args: {
        light: true,
        value: "Text",
    },
    render: ControlledTextArea,
    parameters: {
        backgrounds: {
            default: "darkBlue",
        },
    },
};

export const CustomStyle: StoryComponentType = {
    args: {
        style: styles.customField,
        value: "Text",
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
