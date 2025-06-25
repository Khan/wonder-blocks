import * as React from "react";

import {addStyle, View} from "@khanacademy/wonder-blocks-core";
import {spacing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

import styles from "./group-styles";
import Choice from "./choice";

// Keep synced with CheckboxGroupProps in ../util/types.js
type CheckboxGroupProps = {
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
    errorMessage?: string | null | undefined;
    /**
     * Custom styling for this group of checkboxes.
     */
    style?: StyleType;
    /**
     * Callback for when selection of the group has changed. Passes the newly
     * selected values.
     */
    onChange: (selectedValues: Array<string>) => unknown;
    /**
     * An array of the values of the selected values in this checkbox group.
     */
    selectedValues: Array<string>;
    /**
     * Test ID used for e2e testing.
     */
    testId?: string;
};

const StyledFieldset = addStyle("fieldset");
const StyledLegend = addStyle("legend");

/**
 * A checkbox group allows multiple selection. This component auto-populates
 * many props for its children Choice components. The Choice component is
 * exposed for the user to apply custom styles or to indicate which choices are
 * disabled.
 *
 * ### Usage
 *
 * ```jsx
 * import {Choice, CheckboxGroup} from "@khanacademy/wonder-blocks-form";
 *
 * const [selectedValues, setSelectedValues] = React.useState([]);
 *
 * <CheckboxGroup
 *     label="some-label"
 *     description="some-description"
 *     groupName="some-group-name"
 *     onChange={setSelectedValues}
 *     selectedValues={selectedValues}
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
 * </CheckboxGroup>
 * ```
 */
const CheckboxGroup = React.forwardRef(function CheckboxGroup(
    props: CheckboxGroupProps,
    ref: React.ForwardedRef<HTMLFieldSetElement>,
) {
    const {
        children,
        label,
        description,
        errorMessage,
        groupName,
        onChange,
        selectedValues,
        style,
        testId,
    } = props;

    const handleChange = (
        changedValue: string,
        originalCheckedState: boolean,
    ) => {
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
    };

    const allChildren = React.Children.toArray(children).filter(Boolean);

    const legendId = React.useId();

    return (
        <StyledFieldset
            aria-labelledby={legendId}
            data-testid={testId}
            style={[styles.fieldset, style]}
            ref={ref}
        >
            <View
                style={
                    label || description || errorMessage
                        ? {
                              marginBlockEnd: spacing.small_12,
                          }
                        : undefined
                }
            >
                {label && (
                    <StyledLegend style={styles.legend} id={legendId}>
                        <BodyText tag="span">{label}</BodyText>
                    </StyledLegend>
                )}
                {description && (
                    <BodyText
                        size="small"
                        tag="span"
                        style={styles.description}
                    >
                        {description}
                    </BodyText>
                )}
                {errorMessage && (
                    <BodyText size="small" tag="span" style={styles.error}>
                        {errorMessage}
                    </BodyText>
                )}
            </View>

            {allChildren.map((child, index) => {
                // @ts-expect-error [FEI-5019] - TS2339 - Property 'props' does not exist on type 'ReactChild | ReactFragment | ReactPortal'.
                const {style, value} = child.props;
                const checked = selectedValues.includes(value);
                // @ts-expect-error [FEI-5019] - TS2769 - No overload matches this call.
                return React.cloneElement(child, {
                    checked: checked,
                    error: !!errorMessage,
                    groupName: groupName,
                    id: `${groupName}-${value}`,
                    key: value,
                    onChange: () => handleChange(value, checked),
                    style: [index > 0 && styles.defaultLineGap, style],
                    variant: "checkbox",
                });
            })}
        </StyledFieldset>
    );
});

export default CheckboxGroup;
