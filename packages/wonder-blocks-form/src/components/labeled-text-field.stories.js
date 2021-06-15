// @flow
import * as React from "react";

import {LabeledTextField} from "@khanacademy/wonder-blocks-form";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Form / LabeledTextField",
};

export const basic: StoryComponentType = () => <LabeledTextField />;

export const disabled: StoryComponentType = () => (
    <LabeledTextField disabled={true} />
);
