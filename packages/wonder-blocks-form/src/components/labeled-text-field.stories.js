// @flow
import * as React from "react";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Form / LabeledTextField",
};

export const basic: StoryComponentType = () => (
    <LabeledTextField
        label="Label"
        description="Description"
        initialValue="Value"
    />
);

export const disabled: StoryComponentType = () => (
    <LabeledTextField label="Label" description="Description" disabled={true} />
);
