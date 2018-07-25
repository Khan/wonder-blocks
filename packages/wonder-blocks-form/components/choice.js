// @flow
// This is a 🔘 or ☑️ field item. This component is meant to be used as a child
// of CheckboxGroup or RadioGroup. Many of the props are auto-populated. If you
// wish to use a single choice field, use the ChoiceField component.
import * as React from "react";

import ChoiceInternal from "./choice-internal.js";

type Props = {|
    /** User-defined. Label for the field. */ label: string,
    /** User-defined. Optional description for the field. */ description?: string,
    /** User-defined. Should be distinct for each item in the group. */ value: string,
    /** User-defined. Whether this choice option is disabled. Default false. */ disabled?: boolean,
    /** User-defined. Optional id for testing purposes. */ testId?: string,
    /** User-defined. Optional additional styling. */ style?: any,
    /**
     * Autopopulated by parent. Whether this choice is checked.
     * @ignore
     */ checked?: boolean,
    /**
     * Autopopulated by parent. Whether this choice is in error mode (everything
     * in a choice group would be in error mode at the same time).
     * @ignore
     */ error?: boolean,
    /**
     * Autopopulated by parent. Used for accessibility purposes, where the label
     * id should match the input id.
     * @ignore
     */ id?: string,
    /**
     * Autopopulated by parent's groupName prop.
     * @ignore
     */ groupName?: string,
    /**
     * Autopopulated by parent. Returns the new checked state of the component.
     * @ignore
     */ onChange?: (newCheckedState: boolean) => void,
    /**
     * Autopopulated by parent.
     * @ignore
     */ variant?: "radio" | "checkbox",
|};

export default class Choice extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
    };

    render() {
        return <ChoiceInternal {...this.props} />;
    }
}
