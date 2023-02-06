// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {LabeledField} from "@khanacademy/wonder-blocks-form";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
// import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
// import {Strut} from "@khanacademy/wonder-blocks-layout";
import {
    MultiSelect,
    SingleSelect,
    OptionItem,
} from "@khanacademy/wonder-blocks-dropdown";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import LabeledFieldArgTypes, {FieldMappings} from "./labeled-field.argtypes.js";
import TextField from "../text-field.js";

export default {
    title: "Form / LabeledField",
    component: LabeledField,
    parameters: {
        componentSubtitle: ((
            <ComponentInfo name={name} version={version} />
        ): any),
    },
    argTypes: LabeledFieldArgTypes,
    decorators: [
        (Story: any): React.Node => (
            <RenderStateRoot>
                <View style={styles.example}>{Story()}</View>
            </RenderStateRoot>
        ),
    ],
};

export const Default: StoryComponentType = (args) => {
    return <LabeledField {...args} />;
};

Default.args = {
    id: "some-ltf-id",
    label: "Label",
    description: "Hello, this is the description for this field",
    required: false,
    field: FieldMappings.SingleSelect,
};

export const ControlledSingleSelect: StoryComponentType = (args) => {
    const [selectedValue, setSelectedValue] = React.useState("invalid");

    const validateField = (value: string) => {
        if (value === "invalid") {
            return "Please select a valid drink";
        }

        if (value) {
            return;
        }

        return "Please select a drink";
    };

    return (
        <LabeledField
            id="some-ltf-id"
            label="Label"
            required={true}
            validate={validateField}
            field={
                <SingleSelect
                    onChange={setSelectedValue}
                    placeholder="Choose a drink"
                    selectedValue={selectedValue}
                >
                    <OptionItem label="Empty option" value="" />
                    <OptionItem label="Invalid" value="invalid" />
                    <OptionItem
                        label="Regular milk tea with boba"
                        value="regular"
                    />
                    <OptionItem
                        label="Wintermelon milk tea with boba"
                        value="wintermelon"
                    />
                    <OptionItem
                        label="Taro milk tea, half sugar"
                        value="taro"
                    />
                </SingleSelect>
            }
        />
    );
};

export const ControlledMultiSelect: StoryComponentType = (args) => {
    const [selectedValues, setSelectedValues] = React.useState([]);

    const validateField = (values: Array<string>) => {
        if (values.length > 1) {
            return;
        }

        return "Please select at least 1 drink";
    };

    return (
        <LabeledField
            id="some-ltf-id"
            label="Label"
            required={true}
            validate={validateField}
            instantValidation={false}
            field={
                <MultiSelect
                    onChange={setSelectedValues}
                    selectedValues={selectedValues}
                >
                    <OptionItem label="Empty option" value="" />
                    <OptionItem
                        label="Regular milk tea with boba"
                        value="regular"
                    />
                    <OptionItem
                        label="Wintermelon milk tea with boba"
                        value="wintermelon"
                    />
                    <OptionItem
                        label="Taro milk tea, half sugar"
                        value="taro"
                    />
                </MultiSelect>
            }
        />
    );
};

export const WithSearchField: StoryComponentType = (args) => {
    return <LabeledField {...args} />;
};

WithSearchField.args = {
    id: "some-ltf-id",
    label: "Label",
    description: "Hello, this is the description for this field",
    required: false,
    field: FieldMappings.SearchField,
};

export const ControlledTextField: StoryComponentType = (args) => {
    const [value, setValue] = React.useState("");

    const validator = (value: string): ?string => {
        if (!value) {
            return "Pick a valid character";
        }

        if (value.length < 3) {
            return "Please enter at least 3 characters";
        }
    };

    return (
        <LabeledField
            id="some-ltf-id"
            label="Label"
            instantValidation={true}
            required={true}
            validate={validator}
            field={
                <TextField
                    id="some-ltf-id"
                    onChange={setValue}
                    placeholder="Find a Star wars character"
                    value={value}
                    autoComplete="off"
                />
            }
        />
    );
};

/**
 * Async validation example
 */
const debounceAsync = (fn, delay) => {
    let timeout;
    return (...args) => {
        return new Promise((resolve, reject) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn(...args)
                    .then((result) => {
                        return resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }, delay);
        });
    };
};

const checkCharacter = async (value: string) => {
    const response = await fetch(
        `https://swapi.dev/api/people/?search=${value}`,
    );
    const data = await response.json();
    return data?.count === 0;
};
const debouncedValidatorAsync = debounceAsync(checkCharacter, 500);

export const AsyncTextField: StoryComponentType = (args) => {
    const [value, setValue] = React.useState("");

    const validator = async (value: string): Promise<?string> => {
        if (!value) {
            return Promise.resolve("Pick a valid character");
        }

        if (value.length < 3) {
            return Promise.resolve("Please enter at least 3 characters");
        } else {
            const isInvalid = await debouncedValidatorAsync(value);

            if (isInvalid) {
                return Promise.resolve("No results found");
            }
        }
    };

    return (
        <LabeledField
            id="some-ltf-id"
            label="Username"
            description="Please enter at least 3 characters"
            instantValidation={true}
            required={true}
            validate={validator}
            field={
                <TextField
                    id="some-ltf-id"
                    onChange={setValue}
                    placeholder="Find a Star wars character"
                    value={value}
                    autoComplete="off"
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    example: {
        border: `1px dashed ${Color.offBlack16}`,
        padding: Spacing.large_24,
        width: 320 + Spacing.xxLarge_48,
    },
});
