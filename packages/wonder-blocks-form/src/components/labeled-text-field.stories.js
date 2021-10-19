// @flow
import * as React from "react";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Button from "@khanacademy/wonder-blocks-button";
import {StyleSheet} from "aphrodite";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Form / LabeledTextField",
};

export const text: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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

export const number: StoryComponentType = () => {
    const [value, setValue] = React.useState("18");

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Age"
            type="number"
            description="Please enter your age"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            placeholder="Age"
            onKeyDown={handleKeyDown}
        />
    );
};

export const password: StoryComponentType = () => {
    const [value, setValue] = React.useState("Password123");

    const validate = (value: string) => {
        if (value.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
            onChange={(newValue) => setValue(newValue)}
            placeholder="Password"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const email: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khan.org");

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Email"
            type="email"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            description="Please provide your personal email"
            placeholder="Email"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const telephone: StoryComponentType = () => {
    const [value, setValue] = React.useState("123-456-7890");

    const validate = (value: string) => {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Telephone"
            type="tel"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            description="Please provide your personal phone number"
            placeholder="Telephone"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const error: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan");

    const validate = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Email"
            type="email"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            description="Please provide your personal email"
            placeholder="Email"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const disabled: StoryComponentType = () => (
    <LabeledTextField
        label="Name"
        description="Please enter your name"
        value=""
        onChange={() => {}}
        placeholder="Name"
        disabled={true}
    />
);

export const light: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View style={styles.darkBackground}>
            <LabeledTextField
                label={
                    <LabelMedium style={styles.whiteColor}>Name</LabelMedium>
                }
                description={
                    <LabelSmall style={styles.offWhiteColor}>
                        Please enter your name
                    </LabelSmall>
                }
                value={value}
                onChange={(newValue) => setValue(newValue)}
                placeholder="Name"
                light={true}
                onKeyDown={handleKeyDown}
            />
        </View>
    );
};

export const customStyle: StoryComponentType = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
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
                onChange={(newValue) => setFirstName(newValue)}
                placeholder="Khan"
                style={styles.grow}
                onKeyDown={handleKeyDown}
            />
            <Strut size={Spacing.xLarge_32} />
            <LabeledTextField
                label="Last name"
                description="Please enter your last name"
                value={lastName}
                onChange={(newValue) => setLastName(newValue)}
                placeholder="Academy"
                style={styles.grow}
                onKeyDown={handleKeyDown}
            />
        </View>
    );
};

export const ref: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");
    const inputRef = React.createRef();

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
            <LabeledTextField
                label="Name"
                description="Please enter your name"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                placeholder="Name"
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

export const readOnly: StoryComponentType = () => {
    const [value, setValue] = React.useState("Khan");

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Read Only"
            description="This is a read-only field."
            value={value}
            onChange={(newValue) => setValue(newValue)}
            placeholder="Name"
            onKeyDown={handleKeyDown}
            readOnly={true}
        />
    );
};

export const autoComplete: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Name"
            description="Please enter your name."
            value={value}
            onChange={(newValue) => setValue(newValue)}
            placeholder="Name"
            onKeyDown={handleKeyDown}
            autoComplete="name"
        />
    );
};

const styles = StyleSheet.create({
    darkBackground: {
        background: Color.darkBlue,
        padding: `${Spacing.medium_16}px`,
    },
    whiteColor: {
        color: Color.white,
    },
    offWhiteColor: {
        color: Color.white64,
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
});
