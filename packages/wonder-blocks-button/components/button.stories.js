// @flow
import React from "react";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Color from "@khanacademy/wonder-blocks-color";

import Button from "./button.js";

export default {title: "Button"};

export const basicButtons = () => (
    <View>
        <View style={{flexDirection: "row"}}>
            <Button>Hello, world!</Button>
            <Strut size={16} />
            <Button kind="secondary">Hello, world!</Button>
            <Strut size={16} />
            <Button kind="tertiary">Hello, world!</Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button disabled={true}>Hello, world!</Button>
            <Strut size={16} />
            <Button disabled={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button disabled={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button color="destructive">Hello, world!</Button>
            <Strut size={16} />
            <Button kind="secondary" color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button kind="tertiary" color="destructive">
                Hello, world!
            </Button>
        </View>
    </View>
);

export const darkBackgroundButtons = () => (
    <View style={{backgroundColor: Color.darkBlue}}>
        <View style={{flexDirection: "row"}}>
            <Button light={true}>Hello, world!</Button>
            <Strut size={16} />
            <Button light={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button light={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button light={true} disabled={true}>
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button light={true} disabled={true} kind="secondary">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button light={true} disabled={true} kind="tertiary">
                Hello, world!
            </Button>
        </View>
        <Strut size={16} />
        <View style={{flexDirection: "row"}}>
            <Button light={true} color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button light={true} kind="secondary" color="destructive">
                Hello, world!
            </Button>
            <Strut size={16} />
            <Button light={true} kind="tertiary" color="destructive">
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
        <Button size="small">Hello, world!</Button>
        <Strut size={16} />
        <Button size="small" kind="secondary">
            Hello, world!
        </Button>
        <Strut size={16} />
        <Button size="small" kind="tertiary">
            Hello, world!
        </Button>
    </View>
);

export const longLabelsAreEllipsized = () => (
    <Button style={{maxWidth: 200}}>
        label too long for the parent container
    </Button>
);

export const buttonWithSpinner = () => (
    <Button spinner={true} aria-label={"waiting"}>
        Hello, world
    </Button>
);
