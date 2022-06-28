/* eslint-disable no-console */
// @flow
import * as React from "react";
import {action} from "@storybook/addon-actions";
import type {StoryComponentType} from "@storybook/react";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {icons} from "@khanacademy/wonder-blocks-icon";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

export default {
    title: "IconButton / IconButton",
    component: IconButton,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
    argTypes: {
        icon: {
            options: icons,
        },
    },
};

export const Default: StoryComponentType = (args) => {
    return <IconButton {...args} />;
};

Default.args = {
    icon: icons.search,
    color: "default",
    kind: "primary",
    onClick: (e) => {
        console.log("Click!");
        action("clicked")(e);
    },
};

export const Basic: StoryComponentType = () => {
    return (
        <IconButton icon={icons.search} onClick={() => console.log("Click!")} />
    );
};

Basic.parameters = {
    docs: {
        storyDescription: `Minimal icon button. The only props specified in
            this example are \`icon\` and \`onClick\`.`,
    },
};

export const Variants: StoryComponentType = () => {
    return (
        <View style={{flexDirection: "row"}}>
            <IconButton
                icon={icons.search}
                onClick={(e) => console.log("hello")}
            />
            <Strut size={16} />
            <IconButton
                icon={icons.search}
                kind="secondary"
                onClick={(e) => console.log("hello")}
            />
            <Strut size={16} />
            <IconButton
                icon={icons.search}
                kind="tertiary"
                onClick={(e) => console.log("hello")}
            />
            <Strut size={16} />
            <IconButton
                disabled={true}
                icon={icons.search}
                onClick={(e) => console.log("hello")}
            />
        </View>
    );
};

Variants.parameters = {
    docs: {
        storyDescription: ``,
    },
};
