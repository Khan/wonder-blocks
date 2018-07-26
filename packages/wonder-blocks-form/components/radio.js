// @flow

import * as React from "react";

import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import RadioCore from "./radio-core.js";

// Keep synced with ChoiceComponentProps in ../util/types.js
type ChoiceComponentProps = {|
    /**
     * Whether this component is checked
     */ checked: boolean,
    /**
     * Whether this component is disabled
     */ disabled?: boolean,
    /**
     * Whether this component should show an error state
     */ error?: boolean,
    /**
     * Name for the checkbox or radio button group
     */ groupName?: string,
    /**
     * Unique identifier attached to the HTML input element. If used, need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<input>` elements for screenreaders.
     */ id?: string,
    /**
     * Optional test ID for e2e testing
     */ testId?: string,
    /**
     * Optional styling for the container. Does not style the component.
     */ style?: any,
    /**
     * Callback when this component is selected. The newCheckedState is the
     * new checked state of the component.
     */ onChange: (newCheckedState: boolean) => void,
|};

/**
 * 🔘 A nicely styled radio button for all your non-AMFM radio button needs.
 *
 * This component should not really be used by itself because radio buttons are
 * often grouped together. See RadioGroup.
 */
export default class Radio extends React.Component<ChoiceComponentProps> {
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
                onClick={() => {
                    // Radio buttons cannot be unchecked and therefore only
                    // call onChange if they were not originally checked
                    if (!coreProps.checked) {
                        onChange(!coreProps.checked);
                    }
                }}
            >
                {(state, handlers) => {
                    return (
                        <RadioCore {...coreProps} {...state} {...handlers} />
                    );
                }}
            </ClickableBehavior>
        );
    }
}
