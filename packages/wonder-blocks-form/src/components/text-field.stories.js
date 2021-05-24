// @flow
import * as React from "react";
import {TextField} from "@khanacademy/wonder-blocks-form";

import type {StoryComponentType} from "@storybook/react";

export default {
    title: "Form / TextField",
};

export const basic: StoryComponentType = () => <TextField />;
