// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {LabeledField} from "@khanacademy/wonder-blocks-form";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
// import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
// import {Strut} from "@khanacademy/wonder-blocks-layout";
import {SingleSelect, OptionItem} from "@khanacademy/wonder-blocks-dropdown";

import type {StoryComponentType} from "@storybook/react";

import ComponentInfo from "../../../../../.storybook/components/component-info.js";
import {name, version} from "../../../package.json";
import LabeledFieldArgTypes, {FieldMappings} from "./labeled-field.argtypes.js";

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
    validate: () => {},
    onValidate: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {},
};

export const ControlledSingleSelect: StoryComponentType = (args) => {
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [error, setError] = React.useState("sdf");

    React.useEffect(() => {
        console.log("selectedValue", selectedValue);
        if (!selectedValue) {
            setError("Please select a drink");
        }
    }, [selectedValue]);

    const validateField = (value) => {
        if (value) {
            setError(null);
        }
        setSelectedValue(value);
    };

    return (
        <LabeledField
            id="some-ltf-id"
            label="Label"
            error={error}
            required={true}
            field={
                <SingleSelect
                    alignment="right"
                    onChange={validateField}
                    placeholder="Choose a drink"
                    selectedValue={selectedValue}
                >
                    <OptionItem label="---" value={""} />
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

const styles = StyleSheet.create({
    example: {
        border: `1px dashed ${Color.offBlack16}`,
        padding: Spacing.large_24,
        width: 320 + Spacing.xxLarge_48,
    },
});
