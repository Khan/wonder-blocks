// @flow
import * as React from "react";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

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
            onKeyDown={handleKeyDown}
        />
    );
};

export const password: StoryComponentType = () => {
    const validation = (value: string) => {
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
            validation={validation}
            onKeyDown={handleKeyDown}
        />
    );
};

export const email: StoryComponentType = () => {
    const validation = (value: string) => {
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
            validation={validation}
            onKeyDown={handleKeyDown}
        />
    );
};

export const telephone: StoryComponentType = () => {
    const validation = (value: string) => {
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
            validation={validation}
            onKeyDown={handleKeyDown}
        />
    );
};

export const error: StoryComponentType = () => {
    const validation = (value: string) => {
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
            validation={validation}
            onKeyDown={handleKeyDown}
        />
    );
};

export const disabled: StoryComponentType = () => (
    <LabeledTextField
        label="Name"
        description="Please enter your name"
        disabled={true}
    />
);
