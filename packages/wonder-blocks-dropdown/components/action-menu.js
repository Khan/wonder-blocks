// @flow

import * as React from "react";
import {StyleSheet} from "aphrodite";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import Dropdown from "./dropdown.js";
import ActionMenuOpenerCore from "./action-menu-opener-core.js";
import type {Item} from "../util/types.js";

type MenuProps = {|
    ...AriaProps,

    /**
     * The items in this dropdown.
     */
    children?: Array<Item> | Item,

    /**
     * Text for the opener of this menu.
     */
    menuText: string,

    /**
     * A callback that returns items that are newly selected. Use only if this
     * menu contains select items (and make sure selectedValues is defined).
     */
    onChange?: (selectedItems: Array<string>) => mixed,

    /**
     * The values of the items that are currently selected. Use only if this
     * menu contains select items (and make sure onChange is defined).
     */
    selectedValues?: Array<string>,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right",

    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Styling specific to the dropdown component that isn't part of the opener,
     * passed by the specific implementation of the dropdown menu,
     */
    dropdownStyle?: StyleType,

    /**
     * Optional styling for the entire dropdown component.
     */
    style?: StyleType,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    opened: boolean,
    /**
     * Whether or not last open state change was triggered by a keyboard click.
     */
    keyboard?: boolean,
|};

/**
 * A menu that consists of various types of items.
 */
export default class ActionMenu extends React.Component<MenuProps, State> {
    openerElement: ?HTMLElement;

    static defaultProps = {
        alignment: "left",
        disabled: false,
    };

    state = {
        opened: false,
    };

    render() {
        const {
            alignment,
            disabled,
            menuText,
            testId,
            dropdownStyle,
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable no-unused-vars */
            children,
            onChange,
            selectedValues,
            style,
            "aria-disabled": ariaDisabled, // WB-535 avoids passing this prop to the opener
            /* eslint-enable no-unused-vars */
            ...sharedProps
        } = this.props;

        const menuItems = React.Children.toArray(this.props.children);
        return (
            <Dropdown
                alignment={alignment}
                menuItems={menuItems}
                onChange={this.props.onChange}
                selectedValues={this.props.selectedValues}
                style={style}
                dropdownStyle={[styles.menuTopSpace, dropdownStyle]}
            >
                {(eventState) => (
                    <ActionMenuOpenerCore
                        {...sharedProps}
                        {...eventState}
                        opened={this.state.opened}
                        disabled={menuItems.length === 0 || disabled}
                        testId={testId}
                    >
                        {menuText}
                    </ActionMenuOpenerCore>
                )}
            </Dropdown>
        );
    }
}

const styles = StyleSheet.create({
    caret: {
        marginLeft: 4,
    },

    // The design calls for additional offset around the opener.
    opener: {
        whiteSpace: "nowrap",
        userSelect: "none",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    // This is to adjust the space between the menu and the opener.
    menuTopSpace: {
        top: -4,
    },
});
