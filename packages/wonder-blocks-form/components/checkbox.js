// @flow

import * as React from "react";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import ChoiceInternal from "./choice-internal.js";

// Keep synced with ChoiceComponentProps in ../util/types.js
type ChoiceComponentProps = {|
    /**
     * Whether this component is checked
     */
    checked: boolean,

    /**
     * Whether this component is disabled
     */
    disabled: boolean,

    /**
     * Whether this component should show an error state
     */
    error: boolean,

    /**
     * Callback when this component is selected. The newCheckedState is the
     * new checked state of the component.
     */
    onChange: (newCheckedState: boolean) => void,

    /**
     * Optional label if it is not obvious from the context what the checkbox
     * does. If the label and id props are defined, this props does not need to
     * be provided as the label would be matched to this input.
     */
    "aria-label"?: string,

    /**
     * Optional label for the field.
     */
    label?: string,

    /**
     * Optional description for the field.
     */
    description?: string,

    /**
     * Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<input>` elements for screenreaders.
     */
    id?: string,

    /**
     * Optional styling for the container. Does not style the component.
     */
    style?: StyleType,

    /**
     * Optional test ID for e2e testing
     */
    testId?: string,

    /**
     * Name for the checkbox or radio button group. Only applicable for group
     * contexts, auto-populated by group components via Choice.
     * @ignore
     */
    groupName?: string,
|};

/**
 * ☑️ A nicely styled checkbox for all your checking needs. Can optionally take
 * label and description props.
 *
 * If you want a whole group of Checkbox[es] that are related, see the Choice
 * and CheckboxGroup components.
 */
export default class Checkbox extends React.Component<ChoiceComponentProps> {
    static defaultProps = {
        disabled: false,
        error: false,
    };

    render() {
        return <ChoiceInternal variant="checkbox" {...this.props} />;
    }
}
