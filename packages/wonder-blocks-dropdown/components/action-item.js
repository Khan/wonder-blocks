// @flow
// For menu items that trigger an action, such as going to a new page or
// opening a modal.

import * as React from "react";
import {StyleSheet} from "aphrodite";

import Color, {mix, fade} from "@khanacademy/wonder-blocks-color";
import Spacing, {Strut} from "@khanacademy/wonder-blocks-spacing";
import {LabelLarge} from "@khanacademy/wonder-blocks-typography";
import {
    View,
    addStyle,
    getClickableBehavior,
} from "@khanacademy/wonder-blocks-core";

const {blue, white, offBlack, offBlack32} = Color;

type ActionProps = {
    /**
     * Display text of the menu item.
     */
    label: string,
    /**
     * Whether this menu item is disabled. A disabled item may not be selected.
     */
    disabled?: boolean,
    /**
     * Whether this item should be indented to have menu items left-align in
     * text when an ActionItem is used in the same menu as items that have
     * checks or checkboxes.
     */
    indent?: boolean,
    // TODO(sophie): figure out href, clientNav, onClick stuff
    onClick: () => void,
    /**
     * Custom styles.
     */
    style?: any,
};

const StyledLink = addStyle("a");

export default class ActionItem extends React.Component<ActionProps> {
    static defaultProps = {
        disabled: false,
        indent: false,
        onClick: () => void 0,
    };

    render() {
        const {disabled, indent, label, onClick, style} = this.props;

        const ClickableBehavior = getClickableBehavior(this.context.router);

        return (
            <ClickableBehavior disabled={disabled} onClick={onClick}>
                {(state, handlers) => {
                    const {pressed, hovered, focused} = state;

                    const defaultStyle = [
                        styles.shared,
                        disabled && styles.disabled,
                        !disabled &&
                            (pressed
                                ? styles.active
                                : (hovered || focused) && styles.focus),
                    ];

                    const allStyles = [defaultStyle, style];

                    return (
                        <StyledLink style={allStyles} {...handlers}>
                            <View
                                style={[styles.itemContainer]}
                                role="menuitem"
                            >
                                {indent && <Strut size={Spacing.medium} />}
                                <LabelLarge>{label}</LabelLarge>
                            </View>
                        </StyledLink>
                    );
                }}
            </ClickableBehavior>
        );
    }
}

const styles = StyleSheet.create({
    shared: {
        color: offBlack,
        cursor: "pointer",
    },

    // hover and focus states
    focus: {
        color: white,
        background: blue,
    },

    // active and pressed states
    active: {
        color: mix(fade(blue, 0.32), white),
        background: mix(offBlack32, blue),
    },

    // disabled state
    disabled: {
        color: offBlack32,
        cursor: "default",
    },

    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        padding: "8px 16px",
        whiteSpace: "nowrap",
    },
});
