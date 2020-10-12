// @flow
import React from "react";
import {action} from "@storybook/addon-actions";
import {text, radios, object, boolean} from "@storybook/addon-knobs";

import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";

import Button from "./button.js";

export default {
    title: "Button",
};

export const buttonsWithKnobs = () => {
    const children = text("children", "Hello, world!");
    const kind = radios(
        "kind",
        {
            "primary (default)": "primary",
            secondary: "secondary",
            tertiary: "tertiary",
        },
        "primary",
    );
    const color = radios(
        "color",
        {
            "default (default)": "default",
            destructive: "destructive",
        },
        "default",
    );
    const size = radios(
        "size",
        {large: "large", "medium (default)": "medium", small: "small"},
        "medium",
    );
    const light = boolean("light", false);
    const disabled = boolean("disabled", false);
    const style = object("style", {maxWidth: 200});

    return (
        <Button
            kind={kind}
            color={color}
            size={size}
            light={light}
            disabled={disabled}
            style={style}
            onClick={action("onClick")}
        >
            {children}
        </Button>
    );
};

buttonsWithKnobs.story = {
    parameters: {
        options: {
            showAddonPanel: true,
        },
        chromatic: {
            // We already have screenshots of other stories that cover more of the button states
            disable: true,
        },
    },
};

export const basicButtons = () => (
    <View>
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}}>Hello, world!</Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} disabled={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} disabled={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} disabled={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="secondary" color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} kind="tertiary" color="destructive">
                Hello, world!
            </Button>
        </View>
    </View>
);

export const darkBackgroundButtons = () => (
    <View style={{backgroundColor: Color.darkBlue}}>
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} light={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button onClick={() => {}} light={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} light={true} disabled={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                disabled={true}
                kind="secondary"
            >
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                disabled={true}
                kind="tertiary"
            >
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button onClick={() => {}} light={true} color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                kind="secondary"
                color="destructive"
            >
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button
                onClick={() => {}}
                light={true}
                kind="tertiary"
                color="destructive"
            >
                Hello, world!
            </Button>
        </View>
    </View>
);

darkBackgroundButtons.story = {
    parameters: {
        backgrounds: [{name: "darkBlue", value: Color.darkBlue, default: true}],
    },
};

export const smallButtons = () => (
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => {}} size="small">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="small" kind="secondary">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="small" kind="tertiary">
            Hello, world!
        </Button>
    </View>
);

export const xlargeButtons = () => (
    <View style={{flexDirection: "row"}}>
        <Button onClick={() => {}} size="xlarge">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="xlarge" kind="secondary">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} size="xlarge" kind="tertiary">
            Hello, world!
        </Button>
    </View>
);

export const longLabelsAreEllipsized = () => (
    <Button onClick={() => {}} style={{maxWidth: 200}}>
        label too long for the parent container
    </Button>
);

export const buttonWithSpinner = () => (
    <View style={{flexDirection: "row"}}>
        <Button
            onClick={() => {}}
            spinner={true}
            size="xlarge"
            aria-label={"waiting"}
        >
            Hello, world
        </Button>
        <Strut size={16} />
        <Button onClick={() => {}} spinner={true} aria-label={"waiting"}>
            Hello, world
        </Button>
        <Strut size={16} />
        <Button
            onClick={() => {}}
            spinner={true}
            size="small"
            aria-label={"waiting"}
        >
            Hello, world
        </Button>
    </View>
);
