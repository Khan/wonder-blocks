// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View, Text as _Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";
import Button from "@khanacademy/wonder-blocks-button";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Form / TextField",
};

export const Text: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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

export const Required: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-1"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required={true}
        />
    );
};

export const Number: StoryComponentType = () => {
    const [value, setValue] = React.useState("12345");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-1"
            type="number"
            value={value}
            placeholder="Number"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export const Password: StoryComponentType = () => {
    const [value, setValue] = React.useState("Password123");
    const [errorMessage, setErrorMessage] = React.useState();
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

    const handleValidate = (errorMessage: ?string) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                id="tf-1"
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
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

export const Email: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage: ?string) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                id="tf-1"
                type="email"
                value={value}
                placeholder="Email"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

export const Telephone: StoryComponentType = () => {
    const [value, setValue] = React.useState("123-456-7890");
    const [errorMessage, setErrorMessage] = React.useState();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
    };

    const handleValidate = (errorMessage: ?string) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                id="tf-1"
                type="tel"
                value={value}
                placeholder="Telephone"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

export const Error: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan");
    const [errorMessage, setErrorMessage] = React.useState();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage: ?string) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                id="tf-1"
                type="email"
                value={value}
                placeholder="Email"
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessage}>{errorMessage}</_Text>
                </View>
            )}
        </View>
    );
};

export const Disabled: StoryComponentType = () => (
    <TextField
        id="tf-1"
        value=""
        placeholder="This field is disabled."
        onChange={() => {}}
        disabled={true}
    />
);

export const Light: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState();
    const [focused, setFocused] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleValidate = (errorMessage: ?string) => {
        setErrorMessage(errorMessage);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                id="tf-1"
                type="email"
                value={value}
                placeholder="Email"
                light={true}
                validate={validate}
                onValidate={handleValidate}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {!focused && errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <_Text style={styles.errorMessageLight}>
                        {errorMessage}
                    </_Text>
                </View>
            )}
        </View>
    );
};

export const CustomStyle: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-1"
            style={styles.customField}
            type="text"
            value={value}
            placeholder="Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};

export const Ref: StoryComponentType = () => {
    const [value, setValue] = React.useState("");
    const inputRef: RefObject<typeof HTMLInputElement> = React.createRef();

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                id="tf-1"
                type="text"
                value={value}
                placeholder="Text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <Strut size={Spacing.medium_16} />
            <Button style={styles.button} onClick={handleSubmit}>
                Focus Input
            </Button>
        </View>
    );
};

export const ReadOnly: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
            readOnly={true}
        />
    );
};

export const AutoComplete: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <TextField
            id="tf-1"
            type="text"
            value={value}
            placeholder="Name"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="name"
        />
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
    errorMessageLight: {
        color: Color.white,
        paddingLeft: Spacing.xxxSmall_4,
    },
    darkBackground: {
        backgroundColor: Color.darkBlue,
        padding: Spacing.medium_16,
    },
    customField: {
        backgroundColor: Color.darkBlue,
        color: Color.white,
        border: "none",
        maxWidth: 250,
        "::placeholder": {
            color: Color.white64,
        },
    },
    button: {
        maxWidth: 150,
    },
});
