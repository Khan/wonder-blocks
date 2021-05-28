// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {View, Text} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {TextField} from "@khanacademy/wonder-blocks-form";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Form / TextField",
};

export const text: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <TextField
            id="tf-1"
            type="text"
            value={value}
            onChange={handleOnChange}
        />
    );
};

export const number: StoryComponentType = () => {
    const [value, setValue] = React.useState("12345");

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <TextField
            id="tf-1"
            type="number"
            value={value}
            onChange={handleOnChange}
        />
    );
};

export const password: StoryComponentType = () => {
    const [value, setValue] = React.useState("Password123");
    const [errorMessage, setErrorMessage] = React.useState();

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidation = (value: string) => {
        if (value.length <= 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/\d/.test(value)) {
            return "Password must contain a numeric value";
        }
        setErrorMessage();
    };

    const handleOnError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
    };

    return (
        <View>
            <TextField
                id="tf-1"
                type="password"
                value={value}
                validation={handleValidation}
                onChange={handleOnChange}
                onError={handleOnError}
            />
            {errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </View>
    );
};

export const email: StoryComponentType = () => {
    const [value, setValue] = React.useState("khan@khanacademy.org");
    const [errorMessage, setErrorMessage] = React.useState();

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidation = (value: string) => {
        const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;
        if (!emailRegex.test(value)) {
            return "Please enter a valid email";
        }
        setErrorMessage();
    };

    const handleOnError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
    };

    return (
        <View>
            <TextField
                id="tf-1"
                type="email"
                value={value}
                validation={handleValidation}
                onChange={handleOnChange}
                onError={handleOnError}
            />
            {errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </View>
    );
};

export const telephone: StoryComponentType = () => {
    const [value, setValue] = React.useState("123-456-7890");
    const [errorMessage, setErrorMessage] = React.useState();

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleValidation = (value: string) => {
        const telRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!telRegex.test(value)) {
            return "Invalid US telephone number";
        }
        setErrorMessage();
    };

    const handleOnError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
    };

    return (
        <View>
            <TextField
                id="tf-1"
                type="tel"
                value={value}
                validation={handleValidation}
                onChange={handleOnChange}
                onError={handleOnError}
            />
            {errorMessage && (
                <View>
                    <Strut size={Spacing.xSmall_8} />
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            )}
        </View>
    );
};

export const disabled: StoryComponentType = () => (
    <TextField id="tf-1" value="" onChange={() => {}} disabled={true} />
);

const styles = StyleSheet.create({
    errorMessage: {
        color: Color.red,
        paddingLeft: Spacing.xxxSmall_4,
    },
});
