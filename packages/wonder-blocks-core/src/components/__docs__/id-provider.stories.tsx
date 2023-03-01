import * as React from "react";

import {IDProvider, View} from "@khanacademy/wonder-blocks-core";

// @ts-expect-error [FEI-5019] - TS2305 - Module '"@storybook/react"' has no exported member 'StoryComponentType'.
import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info";
import {name, version} from "../../../package.json";

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
            <ComponentInfo name={name} version={version} />
        ) as any,
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
    decorators: [(Story: any): React.ReactElement => <View>{Story()}</View>],
};

// @ts-expect-error [FEI-5019] - TS7006 - Parameter 'args' implicitly has an 'any' type.
export const Default: StoryComponentType = (args) => (
    <IDProvider {...args}>
        {(uniqueId) => (
            <label htmlFor={uniqueId}>
                Label with ID {uniqueId}:
                <input type="text" id={uniqueId} />
            </label>
        )}
    </IDProvider>
);

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
        storyDescription:
            "This example allows you to generate an unique ID and make it available to associate the `<label>` and `<input>` elements. To see this example in action, check that `label[for]` and `input[id]` are using the same id.",
    },
};

export const IdProvided: StoryComponentType = () => (
    <IDProvider scope="field" id="some-user-id">
        {(uniqueId) => (
            <label htmlFor={uniqueId}>
                Label with ID {uniqueId}:
                <input type="text" id={uniqueId} />
            </label>
        )}
    </IDProvider>
);

IdProvided.storyName = "Identifier provided by parent component";

IdProvided.parameters = {
    docs: {
        storyDescription:
            "In some cases, a parent component using `IDProvider` could have an identifier as well. For this particular scenario, we can reuse this ID and pass it down to `IDProvider`. This will avoid generating a unique identifier, and it will reuse the passed identifier instead.",
    },
};
