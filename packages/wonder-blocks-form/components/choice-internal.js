// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import getClickableBehavior from "../../wonder-blocks-core/util/get-clickable-behavior";
import CheckboxCore from "./checkbox-core.js";
import RadioCore from "./radio-core.js";

type Props = {|
    /** Label for the field. */
    label: string,

    /** Optional description for the field. */
    description?: string,

    /** Should be distinct for each item in the group. */
    value?: string,

    /** Whether this choice is checked. */
    checked: boolean,

    /** Whether this choice option is disabled. */
    disabled: boolean,

    /** Whether this choice is in error mode. */
    error: boolean,

    /** Auto-populated by parent's groupName prop if in a group. */
    groupName?: string,

    /**
     * Used for accessibility purposes, where the label id should match the
     * input id.
     */
    id?: string,

    /** Returns the new checked state of the component. */
    onChange: (newCheckedState: boolean) => void,

    /** Optional additional styling. */
    style?: any,

    /** Optional id for testing purposes. */
    testId?: string,

    /** Takes either "radio" or "checkbox" value. */
    variant: "radio" | "checkbox",
|};

/**
 * This is a 🔘 or ☑️ field item. This is an internal component that's wrapped by
 * ChoiceField or Choice. Choice should be used in a CheckboxGroup or in a
 * RadioGroup. ChoiceField is the variant used outside of such a group. The two
 * are different to allow for more explicit flow typing. Choice has many of its
 * props auto-populated, but ChoiceField does not.
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
    render() {
        const {
            label,
            description,
            onChange,
            style,
            variant,
            // we don't need this to go into coreProps
            // eslint-disable-next-line no-unused-vars
            value,
            ...coreProps
        } = this.props;
        const ClickableBehavior = getClickableBehavior();

        const ChoiceCore = this.getChoiceCoreComponent();

        return (
            <View style={style}>
                <ClickableBehavior
                    disabled={coreProps.disabled}
                    onClick={(e) => {
                        // Radio buttons cannot be unchecked and do not change
                        // if clicked on when checked
                        if (variant === "radio" && coreProps.checked) {
                            return;
                        }
                        onChange(!coreProps.checked);
                    }}
                >
                    {(state, handlers) => {
                        return (
                            <View
                                style={[
                                    styles.wrapper,
                                    state.hovered && styles.hovered,
                                    style,
                                ]}
                                {...handlers}
                                // We are resetting the tabIndex=0 from handlers
                                // because the ChoiceCore component will receive
                                // focus on basis of it being an input element.
                                tabIndex={-1}
                            >
                                <ChoiceCore {...coreProps} {...state} />
                                <Strut size={Spacing.xSmall} />
                                <LabelMedium
                                    style={
                                        coreProps.disabled &&
                                        styles.disabledLabel
                                    }
                                >
                                    {label}
                                </LabelMedium>
                            </View>
                        );
                    }}
                </ClickableBehavior>
                {description && (
                    <LabelSmall style={styles.description}>
                        {description}
                    </LabelSmall>
                )}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        outline: "none",
    },
    description: {
        // 16 for icon + 8 for spacing strut
        marginLeft: Spacing.medium + Spacing.xSmall,
        marginTop: Spacing.xxSmall,
        color: Color.offBlack64,
    },
    disabledLabel: {
        color: Color.offBlack32,
    },
    hovered: {
        cursor: "pointer",
    },
});
