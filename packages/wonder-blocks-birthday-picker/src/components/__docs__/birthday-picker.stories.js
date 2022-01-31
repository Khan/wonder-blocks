// @flow
import * as React from "react";

import {View} from "@khanacademy/wonder-blocks-core";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";

import ArgTypes from "./birthday-picker.argtypes.js";
import BirthdayPicker from "../birthday-picker.js";

export default {
    title: "BirthdayPicker",
    component: BirthdayPicker,
    argTypes: ArgTypes,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
        docs: {
            description: {
                component: null,
            },
            source: {
                // See https://github.com/storybookjs/storybook/issues/12596
                excludeDecorators: true,
            },
        },
    },
    decorators: [(Story: any): React.Node => <View>{Story()}</View>],
};

/**
 * Default BirthdayPicker example. It will be rendered as the first/default
 * story and it can be interacted with the controls panel in the Browser.
 */
const Template = (args) => <BirthdayPicker {...args} />;

export const BirthdayPickerDefault: StoryComponentType = Template.bind({});

BirthdayPickerDefault.args = {
    onChange: () => {},
    defaultValue: "",
};

BirthdayPickerDefault.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

export const BirthdayPickerWithDefaultValue: StoryComponentType = Template.bind(
    {},
);

BirthdayPickerWithDefaultValue.args = {
    onChange: () => {},
    defaultValue: "2021-07-19",
};

BirthdayPickerWithDefaultValue.parameters = {
    chromatic: {
        disableSnapshot: true,
    },
};

export const InvalidBirthdayPicker: StoryComponentType = Template.bind({});

InvalidBirthdayPicker.args = {
    onChange: () => {},
    defaultValue: "2030-07-19",
};
