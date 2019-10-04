// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {View, getClickableBehavior} from "@khanacademy/wonder-blocks-core";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import Check from "./check.js";
import Checkbox from "./checkbox.js";

type OptionProps = {|
    /**
     * Display text of the option item.
     */
    label: string,

    /**
     * Value of the item, used as a key of sorts for the parent to manage its
     * items, because label/display text may be identical for some selects. This
     * is the value passed back when the item is selected.
     */
    value: string,

    /**
     * Whether this option item is disabled.
     */
    disabled: boolean,

    /**
     * Optional user-supplied callback when this item is called.
     */
    onClick?: () => mixed,

    /**
     * Callback for when this item is pressed to change its selection state.
     * Passes value of the item. Auto-populated by menu or select.
     * @ignore
     */
    onToggle: (value: string) => mixed,

    /**
     * Whether this item is selected. Auto-populated by menu or select.
     * @ignore
     */
    selected: boolean,

    /**
     * Aria role to use, defaults to "option".
     */
    role: "menuitem" | "option",

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Whether the item should show a check or checkbox to indicate selection
     * state. Auto-populated by menu or select.
     * @ignore
     */
    variant?: "check" | "checkbox",

    /**
     * In case we use react-window, this needs to be added in order to inject
     * styles to calculate the position
     * @ignore
     */
    style?: StyleType,
|};

/**
 * For option items that can be selected in a dropdown, selection denoted either
 * with a check ✔️ or a checkbox ☑️. Use as children in SingleSelect or
 * MultiSelect.
 */
export default class OptionItem extends React.Component<OptionProps> {
    static isClassOf(instance: React.Element<any>) {
        return instance && instance.type && instance.type.__IS_OPTION_ITEM__;
    }
    static contextTypes = {router: PropTypes.any};
    static defaultProps = {
        disabled: false,
        onToggle: () => void 0,
        role: "option",
        selected: false,
    };
    static __IS_OPTION_ITEM__ = true;

    getCheckComponent() {
        if (this.props.variant === "check") {
            return Check;
        } else {
            return Checkbox;
        }
    }

    handleClick = () => {
        const {onClick, onToggle, value} = this.props;
        onToggle(value);
        if (onClick) {
            onClick();
        }
    };

    render() {
        const {disabled, label, role, selected, testId, style} = this.props;

        const ClickableBehavior = getClickableBehavior();
        const CheckComponent = this.getCheckComponent();

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={this.handleClick}
                role={role}
            >
                {(state, handlers) => {
                    const {pressed, hovered, focused} = state;

                    const defaultStyle = [
                        styles.itemContainer,
                        pressed
                            ? styles.active
                            : (hovered || focused) && styles.focus,
                        disabled && styles.disabled,
                        // pass optional styles from react-window (if applies)
                        style,
                    ];

                    return (
                        <View
                            testId={testId}
                            style={defaultStyle}
                            aria-selected={selected ? "true" : "false"}
                            role={role}
                            {...handlers}
                        >
                            <CheckComponent
                                disabled={disabled}
                                selected={selected}
                                {...state}
                            />
                            <LabelLarge style={styles.label}>
                                {label}
                            </LabelLarge>
                        </View>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const {blue, white, offBlack, offBlack32} = Color;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        backgroundColor: white,
        color: offBlack,
        alignItems: "center",
        height: 40,
        minHeight: 40,
        border: 0,
        outline: 0,
        paddingLeft: Spacing.xSmall,
        paddingRight: Spacing.medium,
        whiteSpace: "nowrap",
        cursor: "default",
    },

    focus: {
        color: white,
        background: blue,
    },

    active: {
        color: mix(fade(blue, 0.32), white),
        background: mix(offBlack32, blue),
    },

    disabled: {
        color: offBlack32,
        background: white,
    },

    label: {
        whiteSpace: "nowrap",
        userSelect: "none",
        marginLeft: Spacing.xSmall,
    },

    hide: {
        visibility: "hidden",
    },
});
