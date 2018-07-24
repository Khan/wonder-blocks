// @flow
// A group of checkbox ☑️ items

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import type {CheckboxGroupProps} from "../util/types.js";

const StyledFieldset = addStyle("fieldset");

export default class CheckboxGroup extends React.Component<CheckboxGroupProps> {
    handleChange(changedValue: string, originalCheckedState: boolean) {
        const {onChange, selectedValues} = this.props;

        if (originalCheckedState) {
            const index = selectedValues.indexOf(changedValue);
            const updatedSelection = [
                ...selectedValues.slice(0, index),
                ...selectedValues.slice(index + 1),
            ];
            onChange(updatedSelection);
        } else {
            onChange([...selectedValues, changedValue]);
        }
    }

    render() {
        const {
            children,
            label,
            description,
            errorMessage,
            groupName,
            selectedValues,
            style,
        } = this.props;
        const Spacing = <Strut size={8} />;

        const lastIndex = React.Children.count(children) - 1;

        return (
            <StyledFieldset style={styles.fieldset}>
                {/* We have a View here because fieldset cannot be used with flexbox*/}
                <View style={style}>
                    {label && (
                        <legend>
                            <LabelMedium>{label}</LabelMedium>
                        </legend>
                    )}
                    {description && (
                        <LabelSmall style={styles.description}>
                            {description}
                        </LabelSmall>
                    )}
                    {errorMessage && (
                        <LabelSmall style={styles.error}>
                            {errorMessage}
                        </LabelSmall>
                    )}
                    {Spacing}

                    {React.Children.map(children, (child, index) => {
                        const value = child.props.value;
                        const checked = selectedValues.includes(value);
                        return (
                            <React.Fragment>
                                {React.cloneElement(child, {
                                    checked: checked,
                                    error: !!errorMessage,
                                    groupName: groupName,
                                    key: value,
                                    onChange: () =>
                                        this.handleChange(value, checked),
                                    variant: "checkbox",
                                })}
                                {index !== lastIndex && Spacing}
                            </React.Fragment>
                        );
                    })}
                </View>
            </StyledFieldset>
        );
    }
}

const styles = StyleSheet.create({
    fieldset: {
        border: "none",
        padding: 0,
        margin: 0,
    },

    description: {
        marginTop: 6,
        color: Color.offBlack64,
    },

    error: {
        marginTop: 6,
        color: Color.red,
    },
});
