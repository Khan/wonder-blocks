import * as React from "react";
import {StyleSheet} from "aphrodite";
import {action} from "@storybook/addon-actions";
import type {ComponentStory, ComponentMeta} from "@storybook/react";

import {View} from "@khanacademy/wonder-blocks-core";
import Button from "@khanacademy/wonder-blocks-button";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

import SearchField from "../../packages/wonder-blocks-search-field/src/components/search-field";

export default {
    component: SearchField,
    title: "Search Field/SearchField",
    args: {disabled: false, placeholder: "Placeholder"},
} as ComponentMeta<typeof SearchField>;

type StoryComponentType = ComponentStory<typeof SearchField>;

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
            {...args}
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => {
                action("onKeyDown")(e);
                handleKeyDown(e);
            }}
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

export const WithAutofocus: StoryComponentType = () => {
    const [value, setValue] = React.useState("");
    const [showDemo, setShowDemo] = React.useState(false);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const handleShowDemo = () => {
        setShowDemo(!showDemo);
    };

    const AutoFocusDemo = () => (
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}}>Some other focusable element</Button>
            <SearchField
                value={value}
                placeholder="Placeholder"
                autoFocus={true}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{flexGrow: 1, marginLeft: 12}}
            />
        </View>
    );

    return (
        <View>
            <LabelLarge style={{marginBottom: 12}}>
                Press the button to view the search field with autofocus.
            </LabelLarge>
            <Button
                onClick={handleShowDemo}
                style={{width: 300, marginBottom: 24}}
            >
                Toggle autoFocus demo
            </Button>
            {showDemo && <AutoFocusDemo />}
        </View>
    );
};

WithAutofocus.parameters = {
    docs: {
        storyDescription: `SearchField takes an \`autoFocus\` prop, which
            makes it autofocus on page load. Try to avoid using this if
            possible as it is bad for accessibility.\n\nPress the button
            to view this example. Notice that the search field automatically
            receives focus. Upon pressing the botton, try typing and
            notice that the text appears directly in the search field.
            There is another focusable element present to demonstrate that
            focus skips that element and goes straight to the search field.`,
    },
};

const styles = StyleSheet.create({
    darkBackground: {
        background: Color.darkBlue,
        padding: Spacing.medium_16,
    },
});
