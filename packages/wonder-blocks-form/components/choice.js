// @flow

import * as React from "react";

import Checkbox from "./checkbox.js";
import Radio from "./radio.js";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

type Props = {|
    /** User-defined. Label for the field. */
    label: string,

    /** User-defined. Optional description for the field. */
    description?: string,

    /** User-defined. Should be distinct for each item in the group. */
    value: string,

    /** User-defined. Whether this choice option is disabled. Default false. */
    disabled?: boolean,

    /** User-defined. Optional id for testing purposes. */
    testId?: string,

    /** User-defined. Optional additional styling. */
    style?: StyleType,

    /**
     * Auto-populated by parent. Whether this choice is checked.
     * @ignore
     */
    checked?: boolean,

    /**
     * Auto-populated by parent. Whether this choice is in error mode (everything
     * in a choice group would be in error mode at the same time).
     * @ignore
     */
    error?: boolean,

    /**
     * Auto-populated by parent. Used for accessibility purposes, where the label
     * id should match the input id.
     * @ignore
     */
    id?: string,

    /**
     * Auto-populated by parent's groupName prop.
     * @ignore
     */
    groupName?: string,

    /**
     * Auto-populated by parent. Returns the new checked state of the component.
     * @ignore
     */
    onChange?: (newCheckedState: boolean) => void,

    /**
     * Auto-populated by parent.
     * @ignore
     */
    variant?: "radio" | "checkbox",
|};

/**
 * This is a labeled 🔘 or ☑️ item. Choice is meant to be used as children of
 * CheckboxGroup and RadioGroup because many of its props are auto-populated
 * and not shown in the documentation here. See those components for usage
 * examples.
 *
 * If you wish to use just a single field, use Checkbox or Radio with the
 * optional label and description props.
 */ export default class Choice extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
    };

    getChoiceComponent(variant: ?string) {
        if (variant === "checkbox") {
            return Checkbox;
        } else {
            return Radio;
        }
    }

    render() {
        // we don't need this going into the ChoiceComponent
        // eslint-disable-next-line no-unused-vars
        const {value, variant, ...remainingProps} = this.props;
        const ChoiceComponent = this.getChoiceComponent(variant);
        return <ChoiceComponent {...remainingProps} />;
    }
}
