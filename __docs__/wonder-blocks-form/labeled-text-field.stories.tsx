import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {Meta, StoryObj} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {color, spacing} from "@khanacademy/wonder-blocks-tokens";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";
import LabeledTextFieldArgTypes from "./labeled-text-field.argtypes";

/**
 * A LabeledTextField is an element used to accept a single line of text from
 * the user paired with a label, description, and error field elements.
 */
export default {
    title: "Packages / Form / LabeledTextField",
    component: LabeledTextField,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
    argTypes: LabeledTextFieldArgTypes,
} as Meta<typeof LabeledTextField>;

type StoryComponentType = StoryObj<typeof LabeledTextField>;

export const Default: StoryComponentType = {
    args: {
        id: "some-ltf-id",
        type: "text",
        label: "Label",
        description: "Hello, this is the description for this field",
        value: "",
        disabled: false,
        required: false,
        light: false,
        placeholder: "Placeholder",
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
    const [value, setValue] = React.useState("Khan");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Name"
            description="Please enter your name"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            placeholder="Name"
            onKeyDown={handleKeyDown}
        />
    );
};

Text.parameters = {
    docs: {
        description: {
            story: "An input field with type `text` takes all kinds of characters.",
        },
    },
};

export const RequiredWithDefaultText: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Name"
            description="Please enter your name"
            value={value}
            onChange={setValue}
            onKeyDown={handleKeyDown}
            required={true}
        />
    );
};

RequiredWithDefaultText.parameters = {
    docs: {
        description: {
            story: `A required field will show the message
        "This field is required." by default if someone types in it
        at some point but leaves it blank. Type in the field, then
        backspace all the way and click out of the field to see
        this message. Note that this message would not appear if
        the \`validation\` prop were set.`,
        },
    },
    chromatic: {
        // Disabling snapshot because it doesn't show the error message
        // until after the user interacts with this field.
        disableSnapshot: true,
    },
};

export const RequiredWithSpecifiedText: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Name"
            description="Please enter your name"
            value={value}
            onChange={setValue}
            onKeyDown={handleKeyDown}
            required="This specific field is super required."
        />
    );
};

RequiredWithSpecifiedText.parameters = {
    docs: {
        description: {
            story: `If a string is passed into the \`required\` prop,
        the specified message will show when the field is left blank.
        Type in the field, then backspace all the way and click out of
        the field to see this message. Note that this message would not
        appear if the \`validation\` prop were set.`,
        },
    },
    chromatic: {
        // Disabling snapshot because it doesn't show the error message
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
        <View style={styles.column}>
            <LabeledTextField
                label="Age"
                id="tf-3"
                description="Please enter your age"
                type="number"
                value={value}
                placeholder="Number"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <Strut size={spacing.small_12} />
            <LabeledTextField
                id="tf-3a"
                label={`The following text field has a min of 0, a max of 15,
                    and a step of 3`}
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
    const [value, setValue] = React.useState("$ecure123");

    const validate = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Password"
            type="password"
            description="Please enter a secure password"
            value={value}
            onChange={setValue}
            placeholder="Password"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
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
    const [value, setValue] = React.useState("khan@khan.org");

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Email"
            type="email"
            value={value}
            onChange={setValue}
            description="Please provide your personal email"
            placeholder="Email"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
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

export const EmailRequired: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Email"
            type="email"
            onChange={setValue}
            description="Please provide your personal email"
            value={value}
            validate={validate}
            onKeyDown={handleKeyDown}
            required={true}
        />
    );
};

EmailRequired.parameters = {
    docs: {
        description: {
            story: `An example of a required field that also has
        a \`validation\` prop passed in. \`required\` can be a boolean or
        a string. In this case, \`required\` is set to \`true\` since a
        string would not even be used if it were passed in because the
        validation overrides it.`,
        },
    },
    chromatic: {
        // We have screenshots of other stories that cover this case.
        disableSnapshot: true,
    },
};

export const Telephone: StoryComponentType = () => {
    const [value, setValue] = React.useState("123-456-7890");

    const validate = (value: string) => {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Telephone"
            type="tel"
            value={value}
            onChange={setValue}
            description="Please provide your personal phone number"
            placeholder="Telephone"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
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

function ErrorRender() {
    const [value, setValue] = React.useState("khan");

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Email"
            type="email"
            value={value}
            onChange={setValue}
            description="Please provide your personal email"
            placeholder="Email"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
}

/**
 * If an input value fails validation, `LabeledTextField` will have error
 * styling.
 *
 * Note that we will internally set the correct `aria-invalid` attribute to the
 * `input` element:
 * - aria-invalid="true" if there is an error message.
 * - aria-invalid="false" if there is no error message.
 */
export const Error: StoryComponentType = {
    render: ErrorRender,
};

export const Light: StoryComponentType = (args: any) => {
    const [value, setValue] = React.useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View style={styles.darkBackground}>
            <LabeledTextField
                {...args}
                label={<LabelMedium>Name</LabelMedium>}
                description={<LabelSmall>Please enter your name</LabelSmall>}
                value={value}
                onChange={setValue}
                placeholder="Name"
                light={true}
                onKeyDown={handleKeyDown}
            />
        </View>
    );
};

Light.args = {
    disabled: false,
};

Light.parameters = {
    docs: {
        description: {
            story: `If the \`light\` prop is set to true, the
        underlying \`TextField\` will have a light border when focused.
        This is intended to be used on a dark background. There is also a
        specific light styling for the error state, as seen in the
        \`ErrorLight\` story.`,
        },
    },
};

export const ErrorLight: StoryComponentType = (args: any) => {
    const [value, setValue] = React.useState("khan");

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View style={styles.darkBackground}>
            <LabeledTextField
                {...args}
                label={<LabelMedium>Email</LabelMedium>}
                description={
                    <LabelSmall>Please provide your personal email</LabelSmall>
                }
                type="email"
                value={value}
                light={true}
                onChange={setValue}
                placeholder="Email"
                validate={validate}
                onKeyDown={handleKeyDown}
            />
        </View>
    );
};

ErrorLight.args = {
    disabled: false,
};

ErrorLight.parameters = {
    docs: {
        description: {
            story: `If an input value fails validation and the
        \`light\` prop is true, \`TextField\` will have light error styling.`,
        },
    },
};

export const Disabled: StoryComponentType = () => (
    <LabeledTextField
        label="Name"
        description="Please enter your name"
        value=""
        onChange={() => {}}
        placeholder="Name"
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
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View style={styles.row}>
            <LabeledTextField
                label="First name"
                description="Please enter your first name"
                value={firstName}
                onChange={setFirstName}
                placeholder="Khan"
                style={styles.grow}
                onKeyDown={handleKeyDown}
            />
            <Strut size={spacing.xLarge_32} />
            <LabeledTextField
                label="Last name"
                description="Please enter your last name"
                value={lastName}
                onChange={setLastName}
                placeholder="Academy"
                style={styles.grow}
                onKeyDown={handleKeyDown}
            />
        </View>
    );
};

CustomStyle.parameters = {
    docs: {
        description: {
            story: `\`LabeledTextField\` can take in custom styles that
        override the default styles. In this example, each field has the
        style property \`flexGrow: 1\``,
        },
    },
};

export const WithMarkup: StoryComponentType = {
    render: (args) => {
        return (
            <LabeledTextField
                {...args}
                label="Name"
                description={
                    <span>
                        Description with <strong>strong</strong> text and a{" "}
                        <Link href="/path/to/resource" inline={true}>
                            link
                        </Link>
                    </span>
                }
            />
        );
    },
};

WithMarkup.parameters = {
    docs: {
        description: `\`LabeledTextField\`'s \`label\` and \`description\` props
        can accept \`React.Node\`s.  This is helpful when you need to decorate or use
        specific elements in your form field (e.g. including Popovers, Tooltips or
        emphasized text)`,
    },
};

export const Ref: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");
    const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

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
            <LabeledTextField
                label="Name"
                description="Please enter your name"
                value={value}
                onChange={setValue}
                placeholder="Name"
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Read Only"
            description="This is a read-only field."
            value={value}
            onChange={setValue}
            placeholder="Name"
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

export const AutoComplete: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <form>
            <LabeledTextField
                label="Name"
                description="Please enter your name."
                value={value}
                onChange={setValue}
                placeholder="Name"
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
    darkBackground: {
        background: color.darkBlue,
        padding: `${spacing.medium_16}px`,
    },
    button: {
        maxWidth: 150,
    },
    row: {
        flexDirection: "row",
    },
    grow: {
        flexGrow: 1,
    },
    fieldWithButton: {
        marginBottom: spacing.medium_16,
    },
});
