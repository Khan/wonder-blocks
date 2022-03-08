// @flow
import * as React from "react";

import type {StoryComponentType} from "@storybook/react";

import SearchField from "../index.js";

export default {
    title: "SearchField",
};

export const Default: StoryComponentType = () => {
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
        <SearchField
            id="sf-1"
            value={value}
            placeholder="Placeholder"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    );
};
