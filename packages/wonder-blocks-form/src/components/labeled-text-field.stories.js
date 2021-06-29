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
    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Name"
            description="Please enter your name"
            initialValue="Khan"
            placeholder="Name"
            onKeyDown={handleKeyDown}
        />
    );
};

export const number: StoryComponentType = () => {
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
            initialValue="18"
            placeholder="Age"
            onKeyDown={handleKeyDown}
        />
    );
};

export const password: StoryComponentType = () => {
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
            initialValue="Password123"
            placeholder="Password"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const email: StoryComponentType = () => {
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
            initialValue="khan@khan.org"
            description="Please provide your personal email"
            placeholder="Email"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const telephone: StoryComponentType = () => {
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
            initialValue="123-456-7890"
            description="Please provide your personal phone number"
            placeholder="Telephone"
            validate={validate}
            onKeyDown={handleKeyDown}
        />
    );
};

export const error: StoryComponentType = () => {
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
            initialValue="khan"
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
        placeholder="Name"
        disabled={true}
    />
);

export const light: StoryComponentType = () => {
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
                placeholder="Name"
                light={true}
                onKeyDown={handleKeyDown}
            />
        </View>
    );
};

export const customStyle: StoryComponentType = () => {
    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <LabeledTextField
            label="Name"
            description="Please enter your name"
            placeholder="Name"
            style={styles.customField}
            onKeyDown={handleKeyDown}
        />
    );
};

export const ref: StoryComponentType = () => {
    const inputRef = React.createRef<HTMLInputElement>();

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
                initialValue="Khan"
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
