import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";

import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";

// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import SearchField from "../search-field";

export default {
    component: SearchField,
    title: "Search Field/SearchField",
    args: {disabled: false, placeholder: "Placeholder"},
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <SearchField
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => {
                action("onKeyDown")(e);
                handleKeyDown(e);
            }}
            {...args}
        />
    );
};

export const Light: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <View style={styles.darkBackground}>
            <SearchField
                value={value}
                placeholder="Placeholder"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                light={true}
            />
        </View>
    );
};

Light.parameters = {
    docs: {
        storyDescription:
            "SearchField takes a `light` prop, which gives it an extra white ring on focus to make it visible against a dark background.",
    },
};

export const Disabled: StoryComponentType = () => {
    const [value, setValue] = React.useState("");

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    return (
        <SearchField
            value={value}
            placeholder="Placeholder"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={true}
        />
    );
};

Disabled.parameters = {
    docs: {
        storyDescription:
            "SearchField takes a `disabled` prop, which makes it unusable. Try to avoid using this if possible as it is bad for accessibility.",
    },
};

const styles = StyleSheet.create({
    darkBackground: {
        background: Color.darkBlue,
        padding: Spacing.medium_16,
    },
});
