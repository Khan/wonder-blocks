// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {View, getClickableBehavior} from "@khanacademy/wonder-blocks-core";

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
    onClick?: () => void,

    /**
     * Callback for when this item is pressed to change its selection state.
     * Passes value of the item. Auto-populated by menu or select.
     * @ignore
     */
    onToggle: (value: string) => void,

    /**
     * Whether this item is selected. Auto-populated by menu or select.
     * @ignore
     */
    selected: boolean,

    /**
     * Whether the item should show a check or checkbox to indicate selection
     * state. Auto-populated by menu or select.
     * @ignore
     */
    variant?: "check" | "checkbox",
|};

/**
 * For option items that can be selected in a dropdown, selection denoted either
 * with a check ✔️ or a checkbox ☑️. Use as children in SingleSelect or
 * MultiSelect.
 */
export default class OptionItem extends React.Component<OptionProps> {
    static defaultProps = {
        disabled: false,
        onToggle: () => void 0,
        selected: false,
    };

    static contextTypes = {router: PropTypes.any};

    getCheckComponent() {
        if (this.props.variant === "check") {
            return Check;
        } else {
            return Checkbox;
        }
    }

    render() {
        const {
            disabled,
            label,
            onClick,
            onToggle,
            selected,
            value,
        } = this.props;

        const ClickableBehavior = getClickableBehavior();
        const CheckComponent = this.getCheckComponent();

        return (
            <ClickableBehavior
                disabled={disabled}
                onClick={() => {
                    onToggle(value);
                    if (onClick) {
                        onClick();
                    }
                }}
            >
                {(state, handlers) => {
                    const {pressed, hovered, focused} = state;

                    const defaultStyle = [
                        styles.itemContainer,
                        pressed
                            ? styles.active
                            : (hovered || focused) && styles.focus,
                        disabled && styles.disabled,
                    ];

                    return (
                        <View
                            style={defaultStyle}
                            aria-checked={selected ? "true" : "false"}
                            role="menuitemcheckbox"
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
        backgroundColor: white,
        color: offBlack,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        minHeight: 40,
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
