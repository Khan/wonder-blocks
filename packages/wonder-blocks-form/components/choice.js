// @flow
// This is a 🔘 or ☑️ field item.
import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {LabelMedium, LabelSmall} from "@khanacademy/wonder-blocks-typography";
import getClickableBehavior from "../../wonder-blocks-core/util/get-clickable-behavior";
import CheckboxCore from "./checkbox-core.js";
import RadioCore from "./radio-core.js";

type Props = {|
    /** User-defined. Label for the field. */ label: string,
    /** User-defined. Optional description for the field. */ description?: string,
    /** User-defined. Should be distinct for each item in the group. REQUIRED if
     * the Choice component is being used in a group. */ value?: string,
    /** User-defined. Whether this choice option is disabled. */ disabled?: boolean,
    /** User-defined. Optional id for testing purposes. */ testId?: string,
    /** User-defined. Optional additional styling. */ style?: any,
    /** Autopopulated by parent if in a group. Whether this choice is checked. */ checked: boolean,
    /** Autopopulated by parent if in a group. Whether this choice is in error
     * mode (everything in a choice group would be in error mode at the same
     * time). */ error?: boolean,
    /** Autopopulated by parent if in a group. Used for accesibility purposes,
     * where the label id should match the input id. */ id?: string,
    /** Autopopulated by parent if in a group. Especially importantfor radio
     * groups for keyboard navigation behavior. */ groupName?: string,
    /** Autopopulated by parent if in a group. Returns the new checked state
     * of the component. */ onChange: (newCheckedState: boolean) => void,
    /** Autopopulated by parent if in a group. Takes either "radio" or
     * "checkbox" value. */ variant: "radio" | "checkbox",
|};

export default class Choice extends React.Component<Props> {
    static defaultProps = {
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
        const ClickableBehavior = getClickableBehavior(this.context.router);

        const Choice = this.getChoiceCoreComponent();

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
                                tabIndex={-1}
                            >
                                <Choice {...coreProps} {...state} />
                                <Strut size={8} />
                                <LabelMedium
                                    style={[
                                        coreProps.disabled &&
                                            styles.disabledLabel,
                                    ]}
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
        marginLeft: 24, // 16 for icon + 8 for spacing strut
        marginTop: 6,
        color: Color.offBlack64,
    },
    disabledLabel: {
        color: Color.offBlack32,
    },
    hovered: {
        cursor: "pointer",
    },
});
