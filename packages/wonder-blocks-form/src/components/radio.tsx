import * as React from "react";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import ChoiceInternal from "./choice-internal";

// Keep synced with ChoiceComponentProps in ../util/types.js
type ChoiceComponentProps = AriaProps & {
    /**
     * Whether this component is checked
     */
    checked: boolean;
    /**
     * Whether this component is disabled
     */
    disabled?: boolean;
    /**
     * Whether this component should show an error state
     */
    error?: boolean;
    /**
     * Callback when this component is selected. The newCheckedState is the
     * new checked state of the component.
     */
    onChange: (newCheckedState: boolean) => unknown;
    /**
     * Optional label for the field.
     */
    label?: React.ReactNode;
    /**
     * Optional description for the field.
     */
    description?: React.ReactNode;
    /**
     * Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<input>` elements for screenreaders.
     */
    id?: string;
    /**
     * Optional styling for the container. Does not style the component.
     */
    style?: StyleType;
    /**
     * Adds CSS classes to the Checkbox.
     */
    className?: string;
    /**
     * Optional test ID for e2e testing
     */
    testId?: string;
    /**
     * Name for the checkbox or radio button group. Only applicable for group
     * contexts, auto-populated by group components via Choice.
     * @ignore
     */
    groupName?: string;
};

/**
 * 🔘 A nicely styled radio button for all your non-AMFM radio button needs. Can
 * optionally take label and description props.
 *
 * This component should not really be used by itself because radio buttons are
 * often grouped together. See RadioGroup.
 */ const Radio = React.forwardRef(function Radio(
    props: ChoiceComponentProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {disabled = false, error = false, ...otherProps} = props;

    return (
        <ChoiceInternal
            {...otherProps}
            variant="radio"
            disabled={disabled}
            error={error}
            ref={ref}
        />
    );
});

export default Radio;
