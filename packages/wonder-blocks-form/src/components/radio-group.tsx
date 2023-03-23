import * as React from "react";

import {View, addStyle} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "./group-styles";
import Choice from "./choice";

// Keep synced with RadioGroupProps in ../util/types.js
type RadioGroupProps = {
    /**
     * Children should be Choice components.
     */
    children: Array<
        | React.ReactElement<React.ComponentProps<typeof Choice>>
        | false
        | null
        | undefined
    >;
    /**
     * Group name for this checkbox or radio group. Should be unique for all
     * such groups displayed on a page.
     */
    groupName: string;
    /**
     * Optional label for the group. This label is optional to allow for
     * greater flexibility in implementing checkbox and radio groups.
     */
    label?: React.ReactNode;
    /**
     * Optional description for the group.
     */
    description?: React.ReactNode;
    /**
     * Optional error message. If supplied, the group will be displayed in an
     * error state, along with this error message. If no error state is desired,
     * simply do not supply this prop, or pass along null.
     */
    errorMessage?: string;
    /**
     * Custom styling for this group of checkboxes.
     */
    style?: StyleType;
    /**
     * Callback for when the selected value of the radio group has changed.
     */
    onChange: (selectedValue: string) => unknown;
    /**
     * Value of the selected radio item.
     */
    selectedValue: string;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

const StyledFieldset = addStyle<"fieldset">("fieldset");
const StyledLegend = addStyle<"legend">("legend");

/**
 * A radio group allows only single selection. Like CheckboxGroup, this
 * component auto-populates many props for its children Choice components. The
 * Choice component is exposed for the user to apply custom styles or to
 * indicate which choices are disabled. The use of the groupName prop is
 * important to maintain expected keyboard navigation behavior for
 * accessibility.
 *
 * ### Usage
 *
 * ```jsx
 * import {Choice, RadioGroup} from "@khanacademy/wonder-blocks-form";
 *
 * const [selectedValue, setSelectedValue] = React.useState("");
 *
 * <RadioGroup
 *     label="some-label"
 *     description="some-description"
 *     groupName="some-group-name"
 *     onChange={setSelectedValue}
 *     selectedValue={selectedValue}
 * >
 *     // Add as many choices as necessary
 *     <Choice
 *        label="Choice 1"
 *        value="some-choice-value"
 *     />
 *     <Choice
 *        label="Choice 2"
 *        value="some-choice-value-2"
 *        description="Some choice description."
 *     />
 * </RadioGroup>
 * ```
 */
export default class RadioGroup extends React.Component<RadioGroupProps> {
    handleChange(changedValue: string) {
        this.props.onChange(changedValue);
    }

    render(): React.ReactNode {
        const {
            children,
            label,
            description,
            errorMessage,
            groupName,
            selectedValue,
            style,
            testId,
        } = this.props;

        const allChildren = React.Children.toArray(children).filter(Boolean);

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

                    {allChildren.map((child, index) => {
                        // @ts-expect-error [FEI-5019] - TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'.
                        const {style, value} = child.props;
                        const checked = selectedValue === value;
                        // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                        return React.cloneElement(child, {
                            checked: checked,
                            error: !!errorMessage,
                            groupName: groupName,
                            id: `${groupName}-${value}`,
                            key: value,
                            onChange: () => this.handleChange(value),
                            style: [index > 0 && styles.defaultLineGap, style],
                            variant: "radio",
                        });
                    })}
                </View>
            </StyledFieldset>
        );
    }
}
