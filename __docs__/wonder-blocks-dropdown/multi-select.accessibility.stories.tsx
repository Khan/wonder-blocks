import * as React from "react";
import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";

export default {
    title: "Packages / Dropdown / MultiSelect / Accessibility",
    component: MultiSelect,

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

const MultiSelectAccessibility = () => (
    <View>
        <LabelLarge
            tag="label"
            id="label-for-multi-select"
            htmlFor="unique-multi-select"
        >
            Associated label element
        </LabelLarge>
        <MultiSelect
            id="unique-multi-select"
            selectedValues={["one"]}
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
        </MultiSelect>
    </View>
);

export const UsingAriaAttributes = {
    render: MultiSelectAccessibility.bind({}),
    name: "Using aria attributes",
};

const MultiSelectAriaLabel = () => {
    const [selectedValues, setSelectedValues] = React.useState([""]);
    return (
        <View>
            <MultiSelect
                aria-label="Class options"
                id="unique-single-select"
                selectedValues={selectedValues}
                onChange={setSelectedValues}
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
            </MultiSelect>
        </View>
    );
};

export const UsingOpenerAriaLabel = {
    render: MultiSelectAriaLabel.bind({}),
    name: "Using aria-label on opener",
};
