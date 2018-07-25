// @flow
// This is a 🔘 or ☑️ field item. This component is meant to be used
// independently of CheckboxGroup, RadioGroup, or other ChoiceField components.
// If you want to use a choice in a group, look at CheckboxGroup and RadioGroup.
// This wrapper exists to allow for more specific flow typing.
import * as React from "react";

import ChoiceInternal from "./choice-internal.js";

type Props = {|
    /** User-defined. Label for the field. */ label: string,
    /** User-defined. Optional description for the field. */ description?: string,
    /** User-defined. Whether this choice is checked. */ checked: boolean,
    /** User-defined. Whether this choice option is disabled. Default false. */ disabled: boolean,
    /** User-defined. Whether this choice is in error mode. Default false. */ error: boolean,
    /** User-defined. Returns the new checked state of the component. */ onChange: (
        newCheckedState: boolean,
    ) => void,
    /** User-defined. Takes either "radio" or "checkbox" value. */ variant:
        | "radio"
        | "checkbox",
    /**
     * User-defined. Used for accessibility purposes, where the label id should
     * match the input id.
     */ id?: string,
    /** User-defined. Optional id for testing purposes. */ testId?: string,
    /** User-defined. Optional additional styling. */ style?: any,
    /**
     * Ignored because only applicable to Choice components in a group.
     * @ignore
     */ groupName?: string,
    /**
     * Ignored because only applicable to Choice components in a group.
     * @ignore
     */ value?: string,
|};

export default class ChoiceField extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
        error: false,
    };

    render() {
        return <ChoiceInternal {...this.props} />;
    }
}
