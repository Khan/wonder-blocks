import * as React from "react";
import caretDown from "@phosphor-icons/core/regular/caret-down.svg";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";

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
            label="Associated label element"
            field={
                <SingleSelect
                    placeholder="Accessible SingleSelect"
                    selectedValue="one"
                    onChange={() => {}}
                >
                    <OptionItem label="First element" value="one" />
                    <OptionItem label="Second element" value="two" />
                </SingleSelect>
            }
        />
    </View>
);

export const UsingAriaAttributes = {
    render: SingleSelectAccessibility.bind({}),
    name: "Using LabeledField",
};

const SingleSelectAriaLabel = () => (
    <View>
        <SingleSelect
            aria-label="Class options"
            placeholder="Choose"
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

export const UsingOpenerAriaLabel = {
    render: SingleSelectAriaLabel.bind({}),
    name: "Using aria-label for opener",
};

const SingleSelectCustomOpenerLabeledField = () => {
    return (
        <View>
            <LabeledField
                label="Preferences"
                field={
                    <SingleSelect
                        placeholder="Choose"
                        onChange={() => {}}
                        opener={(eventState: any) => (
                            <button onClick={() => {}}>
                                <PhosphorIcon icon={caretDown} size="medium" />
                            </button>
                        )}
                    >
                        <OptionItem label="item 1" value="1" />
                        <OptionItem label="item 2" value="2" />
                        <OptionItem label="item 3" value="3" />
                    </SingleSelect>
                }
            />
        </View>
    );
};

export const UsingCustomOpenerLabeledField = {
    render: SingleSelectCustomOpenerLabeledField.bind({}),
    name: "Using custom opener in a LabeledField",
};

const SingleSelectCustomOpenerLabel = () => {
    return (
        <View>
            <SingleSelect
                placeholder="Choose"
                onChange={() => {}}
                opener={(eventState: any) => (
                    <button aria-label="Preferences" onClick={() => {}}>
                        <PhosphorIcon icon={caretDown} size="medium" />
                    </button>
                )}
            >
                <OptionItem label="item 1" value="1" />
                <OptionItem label="item 2" value="2" />
                <OptionItem label="item 3" value="3" />
            </SingleSelect>
        </View>
    );
};

export const UsingCustomOpenerAriaLabel = {
    render: SingleSelectCustomOpenerLabel.bind({}),
    name: "Using aria-label on custom opener",
};
