// @flow

import * as React from "react";

import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "./group-styles.js";
import typeof Choice from "./choice.js";

// Keep synced with CheckboxGroupProps in ../util/types.js
type CheckboxGroupProps = {|
    /**
     * Children should be Choice components.
     */
    children: Array<React.Element<Choice>>,

    /**
     * Group name for this checkbox or radio group. Should be unique for all
     * such groups displayed on a page.
     */
    groupName: string,

    /**
     * Optional label for the group. This label is optional to allow for
     * greater flexibility in implementing checkbox and radio groups.
     */
    label?: string,

    /**
     * Optional description for the group.
     */
    description?: string,

    /**
     * Optional error message. If supplied, the group will be displayed in an
     * error state, along with this error message. If no error state is desired,
     * simply do not supply this prop, or pass along null.
     */
    errorMessage?: string,

    /**
     * Custom styling for this group of checkboxes.
     */
    style?: StyleType,

    /**
     * Callback for when selection of the group has changed. Passes the newly
     * selected values.
     */
    onChange: (selectedValues: Array<string>) => mixed,

    /**
     * An array of the values of the selected values in this checkbox group.
     */
    selectedValues: Array<string>,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

const StyledFieldset = addStyle<"fieldset">("fieldset");
const StyledLegend = addStyle<"legend">("legend");

/**
 * A checkbox group allows multiple selection. This component auto-populates
 * many props for its children Choice components. The Choice component is
 * exposed for the user to apply custom styles or to indicate which choices are
 * disabled.
 */
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

    render(): React.Node {
        const {
            children,
            label,
            description,
            errorMessage,
            groupName,
            selectedValues,
            style,
            testId,
        } = this.props;

        return (
            <StyledFieldset data-test-id={testId} style={styles.fieldset}>
                {/* We have a View here because fieldset cannot be used with flexbox*/}
                <View style={style}>
                    {label && (
                        <StyledLegend style={styles.legend}>
                            <LabelMedium>{label}</LabelMedium>
                        </StyledLegend>
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
                    {(label || description || errorMessage) && (
                        <Strut size={Spacing.small_12} />
                    )}

                    {React.Children.map(children, (child, index) => {
                        const {style, value} = child.props;
                        const checked = selectedValues.includes(value);
                        return (
                            <React.Fragment>
                                {React.cloneElement(child, {
                                    checked: checked,
                                    error: !!errorMessage,
                                    groupName: groupName,
                                    id: `${groupName}-${value}`,
                                    key: value,
                                    onChange: () =>
                                        this.handleChange(value, checked),
                                    style: [
                                        index > 0 && styles.defaultLineGap,
                                        style,
                                    ],
                                    variant: "checkbox",
                                })}
                            </React.Fragment>
                        );
                    })}
                </View>
            </StyledFieldset>
        );
    }
}
