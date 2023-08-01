import * as React from "react";
import type {Meta, StoryObj} from "@storybook/react";

import {IDProvider, View} from "@khanacademy/wonder-blocks-core";
import packageConfig from "../../packages/wonder-blocks-core/package.json";

import ComponentInfo from "../../.storybook/components/component-info";

export default {
    title: "Core / IDProvider",
    component: IDProvider,
    args: {
        scope: "field",
        id: "",
        testId: "",
    },
    parameters: {
        componentSubtitle: (
            <ComponentInfo
                name={packageConfig.name}
                version={packageConfig.version}
            />
        ),
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
    decorators: [(Story): React.ReactElement => <View>{Story()}</View>],
} as Meta<typeof IDProvider>;

type StoryComponentType = StoryObj<typeof IDProvider>;

export const Default: StoryComponentType = {
    render: (args) => (
        <IDProvider {...args}>
            {(uniqueId) => (
                <label htmlFor={uniqueId}>
                    Label with ID {uniqueId}:
                    <input type="text" id={uniqueId} />
                </label>
            )}
        </IDProvider>
    ),
};

export const WithFormFields: StoryComponentType = () => (
    <IDProvider scope="field">
        {(uniqueId) => (
            <label htmlFor={uniqueId}>
                Label with ID {uniqueId}:
                <input type="text" id={uniqueId} />
            </label>
        )}
    </IDProvider>
);

WithFormFields.parameters = {
    docs: {
        description: {
            story: "This example allows you to generate an unique ID and make it available to associate the `<label>` and `<input>` elements. To see this example in action, check that `label[for]` and `input[id]` are using the same id.",
        },
    },
};

export const IdProvided: StoryComponentType = {
    name: "Identifier provided by parent component",
    render: () => (
        <IDProvider scope="field" id="some-user-id">
            {(uniqueId) => (
                <label htmlFor={uniqueId}>
                    Label with ID {uniqueId}:
                    <input type="text" id={uniqueId} />
                </label>
            )}
        </IDProvider>
    ),
};

IdProvided.parameters = {
    docs: {
        description: {
            story: "In some cases, a parent component using `IDProvider` could have an identifier as well. For this particular scenario, we can reuse this ID and pass it down to `IDProvider`. This will avoid generating a unique identifier, and it will reuse the passed identifier instead.",
        },
    },
};
