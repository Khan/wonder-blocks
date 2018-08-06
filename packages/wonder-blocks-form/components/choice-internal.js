// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import {getClickableBehavior} from "@khanacademy/wonder-blocks-core";
import CheckboxCore from "./checkbox-core.js";
import RadioCore from "./radio-core.js";

type Props = {|
    /** Whether this choice is checked. */
    checked: boolean,

    /** Whether this choice option is disabled. */
    disabled: boolean,

    /** Whether this choice is in error mode. */
    error: boolean,

    /** Returns the new checked state of the component. */
    onChange: (newCheckedState: boolean) => void,

    /**
     * Used for accessibility purposes, where the label id should match the
     * input id.
     */
    id?: string,

    /** Optional additional styling. */
    style?: any,

    /** Optional id for testing purposes. */
    testId?: string,

    /** Label for the field. */
    label?: string,

    /** Optional description for the field. */
    description?: string,

    /** Auto-populated by parent's groupName prop if in a group. */
    groupName?: string,

    /** Takes either "radio" or "checkbox" value. */
    variant: "radio" | "checkbox",
|};

/**
 * This is a potentially labeled 🔘 or ☑️ item. This is an internal component
 * that's wrapped by Checkbox and Radio. Choice is a wrapper for Checkbox and
 * Radio with many of its props auto-populated, to be used with CheckboxGroup
 * and RadioGroup. This design allows for more explicit prop typing. For
 * example, we can make onChange a required prop on Checkbox but not on Choice
 * (because for Choice, that prop would be auto-populated by CheckboxGroup).
 */ export default class ChoiceInternal extends React.Component<Props> {
    static defaultProps = {
        checked: false,
        disabled: false,
        error: false,
    };

    getChoiceCoreComponent() {
        if (this.props.variant === "radio") {
            return RadioCore;
        } else {
            return CheckboxCore;
        }
    }
    getLabel() {
        const {disabled, id, label} = this.props;
        return (
            <LabelMedium
                style={[styles.label, disabled && styles.disabledLabel]}
            >
                <label
                    htmlFor={id}
                    // Browsers automatically use the for attribute to select
                    // the input, but we use ClickableBehavior to handle this.
                    onClick={(e) => e.preventDefault()}
                >
                    {label}
                </label>
            </LabelMedium>
        );
    }
    getDescription() {
        const {description} = this.props;
        return (
            <LabelSmall style={styles.description}>{description}</LabelSmall>
        );
    }
    render() {
        const {
            label,
            description,
            onChange,
            style,
            variant,
            ...coreProps
        } = this.props;

        const {checked} = coreProps;

        const ChoiceCore = this.getChoiceCoreComponent();
        const ClickableBehavior = getClickableBehavior();

        return (
            <View style={style}>
                <ClickableBehavior
                    disabled={coreProps.disabled}
                    onClick={(e) => {
                        // Radio buttons cannot be unchecked and do not change
                        // if clicked on when checked
                        if (variant === "radio" && checked) {
                            return;
                        }
                        onChange(!checked);
                    }}
                >
                    {(state, handlers) => {
                        return (
                            <View
                                style={[styles.wrapper]}
                                {...handlers}
                                // We are resetting the tabIndex=0 from handlers
                                // because the ChoiceCore component will receive
                                // focus on basis of it being an input element.
                                tabIndex={-1}
                            >
                                <ChoiceCore {...coreProps} {...state} />
                                <Strut size={Spacing.xSmall} />
                                {label && this.getLabel()}
                            </View>
                        );
                    }}
                </ClickableBehavior>
                {description && this.getDescription()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "flex-start",
        outline: "none",
    },
    label: {
        // NOTE: The checkbox/radio button (height 16px) should be center
        // aligned with the first line of the label. However, LabelMedium has a
        // declared line height of 20px, so we need to adjust the top to get the
        // desired alignment.
        marginTop: -2,
    },
    disabledLabel: {
        color: Color.offBlack32,
    },
    description: {
        // 16 for icon + 8 for spacing strut
        marginLeft: Spacing.medium + Spacing.xSmall,
        marginTop: Spacing.xxxSmall,
        color: Color.offBlack64,
    },
});
