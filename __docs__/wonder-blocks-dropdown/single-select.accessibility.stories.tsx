import * as React from "react";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Dropdown / SingleSelect / Accessibility",
    component: SingleSelect,

    // Disables chromatic testing for these stories.
    parameters: {
        previewTabs: {
            canvas: {
                hidden: true,
            },
        },

        viewMode: "docs",

        chromatic: {
            disableSnapshot: true,
        },
    },
};

const SingleSelectAccessibility = () => (
    <View>
        <LabelLarge
            tag="label"
            id="label-for-single-select"
            htmlFor="unique-single-select"
        >
            Associated label element
        </LabelLarge>
        <SingleSelect
            aria-labelledby="label-for-single-select"
            id="unique-single-select"
            placeholder="Accessible SingleSelect"
            selectedValue="one"
            onChange={() => {}}
        >
            <OptionItem
                label="First element"
                aria-label="First element, selected"
                value="one"
            />
            <OptionItem
                label="Second element"
                aria-label="Second element, unselelected"
                value="two"
            />
        </SingleSelect>
    </View>
);

export const UsingAriaAttributes = {
    render: SingleSelectAccessibility.bind({}),
    name: "Using aria attributes",
};
