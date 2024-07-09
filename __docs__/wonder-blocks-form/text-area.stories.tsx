import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {TextArea} from "@khanacademy/wonder-blocks-form";
import packageConfig from "../../packages/wonder-blocks-form/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

/**
 * A TextArea is an element used to accept text from the user.
 */
export default {
    title: "Packages / Form / TextArea",
    component: TextArea,
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
    },
} as Meta<typeof TextArea>;

type StoryComponentType = StoryObj<typeof TextArea>;

export const Default: StoryComponentType = {
    args: {
        value: "",
        onChange: () => {},
    },
};

export const WithValue: StoryComponentType = {
    args: {
        value: "Text",
        onChange: () => {},
    },
};

export const Placeholder: StoryComponentType = {
    args: {
        placeholder: "Placeholder text",
    },
};

export const Disabled: StoryComponentType = {
    args: {
        disabled: true,
    },
};

export const DisabledWithPlaceholder: StoryComponentType = {
    args: {
        placeholder: "Placeholder",
        disabled: true,
    },
};

export const DisabledWithValue: StoryComponentType = {
    args: {
        value: "Text",
        disabled: true,
    },
};
