// @flow

import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import CheckboxCore from "./checkbox-core.js";

// Keep synced with ChoiceComponentProps in ../util/types.js
type ChoiceComponentProps = {|
    /** Whether this component is checked */
    checked: boolean,

    /** Whether this component is disabled */
    disabled?: boolean,

    /** Whether this component should show an error state */
    error?: boolean,

    /** Name for the checkbox or radio button group */
    groupName?: string,

    /**
     * Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<input>` elements for screenreaders.
     */
    id?: string,

    /** Optional test ID for e2e testing */
    testId?: string,

    /** Optional styling for the container. Does not style the component. */
    style?: any,

    /**
     * Callback when this component is selected. The newCheckedState is the
     * new checked state of the component.
     */
    onChange: (newCheckedState: boolean) => void,
|};

/**
 * ☑️ A nicely styled checkbox for all your checking needs.
 *
 * If you wish to use a single Checkbox for a settings-like item or as part of a
 * group of Checkbox[es], see the ChoiceField and CheckboxGroup components.
 */
export default class Checkbox extends React.Component<ChoiceComponentProps> {
    static defaultProps = {
        disabled: false,
        error: false,
    };

    render() {
        const {onChange, ...coreProps} = this.props;
        const ClickableBehavior = getClickableBehavior();

        return (
            <ClickableBehavior
                disabled={coreProps.disabled}
                onClick={() => onChange(!coreProps.checked)}
            >
                {(state, handlers) => {
                    return (
                        <CheckboxCore {...coreProps} {...state} {...handlers} />
                    );
                }}
            </ClickableBehavior>
        );
    }
}
