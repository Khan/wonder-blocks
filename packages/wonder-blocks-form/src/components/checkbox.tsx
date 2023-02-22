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
    disabled: boolean;
    /**
     * Whether this component should show an error state
     */
    error: boolean;
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

type DefaultProps = {
    disabled: ChoiceComponentProps["disabled"];
    error: ChoiceComponentProps["error"];
};

/**
 * ☑️ A nicely styled checkbox for all your checking needs. Can optionally take
 * label and description props.
 *
 * If used by itself, a checkbox provides two options - checked and unchecked.
 * A group of checkboxes can be used to allow a user to select multiple values
 * from a list of options.
 *
 * If you want a whole group of Checkbox[es] that are related, see the Choice
 * and CheckboxGroup components.
 *
 * ### Usage
 *
 * ```jsx
 * import {Checkbox} from "@khanacademy/wonder-blocks-form";
 *
 * const [checked, setChecked] = React.useState(false);
 *
 * <Checkbox checked={checked} onChange={setChecked} />
 * ```
 */
export default class Checkbox extends React.Component<ChoiceComponentProps> {
    static defaultProps: DefaultProps = {
        disabled: false,
        error: false,
    };

    render(): React.ReactElement {
        return <ChoiceInternal variant="checkbox" {...this.props} />;
    }
}
