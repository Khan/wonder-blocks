import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {StyleSheet} from "aphrodite";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import {color} from "../../packages/wonder-blocks-tokens/src/tokens/color";
import Button from "../../packages/wonder-blocks-button/src/components/button";
import LabelSmall from "../../packages/wonder-blocks-typography/src/components/label-small";
import {spacing} from "../../packages/wonder-blocks-tokens/src/tokens/spacing";
import Strut from "../../packages/wonder-blocks-layout/src/components/strut";
import View from "../../packages/wonder-blocks-core/src/components/view";

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

export const WithLongValue: StoryComponentType = {
    args: {
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        onChange: () => {},
    },
    render: ControlledTextArea,
};

export const Placeholder: StoryComponentType = {
    args: {
        placeholder: "Placeholder text",
    },
};

export const Disabled: StoryComponentType = {
    args: {
        disabled: true,
    },
};

export const DisabledWithPlaceholder: StoryComponentType = {
    args: {
        placeholder: "Placeholder",
        disabled: true,
    },
};

export const DisabledWithValue: StoryComponentType = {
    args: {
        value: "Text",
        disabled: true,
    },
};

export const Rows: StoryComponentType = {
    args: {
        rows: 10,
    },
};

export const ReadOnly: StoryComponentType = {
    args: {
        value: "Text",
        readOnly: true,
    },
};

export const AutoComplete: StoryComponentType = {
    args: {
        autoComplete: "email",
    },
};

export const AutoFocus: StoryComponentType = {
    args: {
        autoFocus: true,
    },
};

export const SpellCheckEnabled: StoryComponentType = {
    args: {
        spellCheck: true,
        value: "This exampull will be checkd fur spellung when you try to edit it.",
        autoFocus: true, // enable autoFocus so we see spell check errors right away
    },
};

export const SpellCheckDisabled: StoryComponentType = {
    args: {
        spellCheck: false,
        value: "This exampull will nut be checkd fur spellung when you try to edit it.",
        autoFocus: true, // enable autoFocus so we see spell check errors right away
    },
};

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
export const CustomStyle: StoryComponentType = {
    args: {
        style: styles.customField,
        value: "Text",
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

export const Required: StoryComponentType = {
    args: {
        value: "khan",
        required: true,
    },
    render: ControlledTextArea,
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

export const ResizeType: StoryComponentType = {
    args: {},
    render(args) {
        return (
            <div>
                <label htmlFor="resize-both">Resize: both</label>
                <TextArea {...args} resizeType="both" id="resize-both" />
                <br />
                <label htmlFor="resize-vertical">Resize: vertical</label>
                <TextArea
                    {...args}
                    resizeType="vertical"
                    id="resize-vertical"
                />
                <br />
                <label htmlFor="resize-horizontal">Resize: horizontal</label>
                <TextArea
                    {...args}
                    resizeType="horizontal"
                    id="resize-horizontal"
                />
                <br />
                <label htmlFor="resize-none">Resize: both</label>
                <TextArea {...args} resizeType="none" id="resize-none" />
                <br />
                <label htmlFor="resize-default">Resize: default (both)</label>
                <TextArea {...args} id="resize-default" />
            </div>
        );
    },
};
