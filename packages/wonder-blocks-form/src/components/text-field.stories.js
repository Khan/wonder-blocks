// @flow
import * as React from "react";
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

    const handleOnChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <TextField
            id="tf-1"
            type="password"
            value={value}
            onChange={handleOnChange}
        />
    );
};

export const disabled: StoryComponentType = () => (
    <TextField id="tf-1" value="" onChange={() => {}} disabled={true} />
);
