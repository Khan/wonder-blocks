import * as React from "react";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";

export default {
    title: "Packages / Dropdown / SingleSelect / Accessibility",
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
        <LabeledField
            label={<strong>Associated label element</strong>}
            field={
                <SingleSelect
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
            }
        />
    </View>
);

export const UsingAriaAttributes = {
    render: SingleSelectAccessibility.bind({}),
    name: "Using aria attributes",
};

const SingleSelectAriaLabel = () => {
    const [selectedValue, setSelectedValue] = React.useState("");
    return (
        <View>
            <SingleSelect
                aria-label="Class options"
                placeholder="Choose"
                onChange={setSelectedValue}
                selectedValue={selectedValue}
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
};

export const UsingOpenerAriaLabel = {
    render: SingleSelectAriaLabel.bind({}),
    name: "Using aria-label for opener",
};
