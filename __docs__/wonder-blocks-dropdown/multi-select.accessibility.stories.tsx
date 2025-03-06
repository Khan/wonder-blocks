import * as React from "react";
import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";
import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {View} from "@khanacademy/wonder-blocks-core";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

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
        <LabeledField
            label="Associated label element"
            field={
                <MultiSelect selectedValues={["one"]} onChange={() => {}}>
                    <OptionItem label="First element" value="one" />
                    <OptionItem label="Second element" value="two" />
                </MultiSelect>
            }
        />
    </View>
);

export const UsingAriaAttributes = {
    render: MultiSelectAccessibility.bind({}),
    name: "Using LabeledField",
};

const MultiSelectAriaLabel = () => (
    <View>
        <MultiSelect
            aria-label="Class options"
            id="unique-single-select"
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

export const UsingOpenerAriaLabel = {
    render: MultiSelectAriaLabel.bind({}),
    name: "Using aria-label attributes",
};

const MultiSelectCustomOpenerLabeledField = () => {
    return (
        <View>
            <LabeledField
                label="Search"
                field={
                    <MultiSelect
                        onChange={() => {}}
                        opener={(eventState: any) => (
                            <button onClick={() => {}}>
                                <PhosphorIcon
                                    icon={magnifyingGlassIcon}
                                    size="medium"
                                />
                            </button>
                        )}
                    >
                        <OptionItem label="item 1" value="1" />
                        <OptionItem label="item 2" value="2" />
                        <OptionItem label="item 3" value="3" />
                    </MultiSelect>
                }
            />
        </View>
    );
};

export const UsingCustomOpenerLabeledField = {
    render: MultiSelectCustomOpenerLabeledField.bind({}),
    name: "Using custom opener in a LabeledField",
};

const MultiSelectCustomOpenerLabel = () => {
    return (
        <View>
            <MultiSelect
                onChange={() => {}}
                opener={(eventState: any) => (
                    <button aria-label="Search button" onClick={() => {}}>
                        <PhosphorIcon
                            icon={magnifyingGlassIcon}
                            size="medium"
                        />
                    </button>
                )}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
            </MultiSelect>
        </View>
    );
};

export const UsingCustomOpenerAriaLabel = {
    render: MultiSelectCustomOpenerLabel.bind({}),
    name: "Using aria-label on custom opener",
};
