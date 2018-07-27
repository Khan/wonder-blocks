// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";

import type {RadioGroupProps} from "../util/types.js";

const StyledFieldset = addStyle("fieldset");

/**
 * A radio group allows only single selection. Like CheckboxGroup, this
 * component auto-populates many props for its children Choice components. The
 * Choice component is exposed for the user to apply custom styles or to
 * indicate which choices are disabled. The use of the groupName prop is
 * important to maintain expected keyboard navigation behavior for
 * accessibility.
 */
export default class RadioGroup extends React.Component<RadioGroupProps> {
    handleChange(changedValue: string) {
        this.props.onChange(changedValue);
    }
    render() {
        const {
            children,
            label,
            description,
            errorMessage,
            groupName,
            selectedValue,
            style,
        } = this.props;

        const lastIndex = React.Children.count(children) - 1;

        return (
            <StyledFieldset style={styles.fieldset}>
                {/* We have a View here because fieldset cannot be used with flexbox*/}
                <View style={style}>
                    <legend>
                        <LabelMedium>{label}</LabelMedium>
                    </legend>
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
                    <Strut size={Spacing.xSmall} />

                    {React.Children.map(children, (child, index) => {
                        const {value} = child.props;
                        const checked = selectedValue === value;
                        return (
                            <React.Fragment>
                                {React.cloneElement(child, {
                                    checked: checked,
                                    error: !!errorMessage,
                                    groupName: groupName,
                                    key: value,
                                    onChange: () => this.handleChange(value),
                                    variant: "radio",
                                })}
                                {index !== lastIndex && (
                                    <Strut size={Spacing.xSmall} />
                                )}
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
        marginTop: Spacing.xxSmall,
        color: Color.offBlack64,
    },
    error: {
        marginTop: Spacing.xxSmall,
        color: Color.red,
    },
});
