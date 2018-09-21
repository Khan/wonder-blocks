// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import Dropdown from "./dropdown.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";
import ActionMenuOpener from "./action-menu-opener.js";

import type {Item, DropdownItem} from "../util/types.js";

type MenuProps = {|
    /**
     * The items in this dropdown.
     */
    children: Array<React.Element<Item>>,

    /**
     * Text for the opener of this menu.
     */
    menuText: string,

    /**
     * A callback that returns items that are newly selected. Use only if this
     * menu contains select items (and make sure selectedValues is defined).
     */
    onChange?: (selectedItems: Array<string>) => void,

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
     * Optional styling to add to the opener component wrapper.
     */
    style?: StyleType,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,
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

    constructor(props: MenuProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleOpenChanged = (open: boolean, keyboard?: boolean) => {
        this.setState({
            open,
            keyboard,
        });
    };

    handleItemSelected = () => {
        // Bring focus back to the opener element.
        if (this.openerElement) {
            this.openerElement.focus();
        }

        this.setState({
            open: false, // close the menu upon selection
        });
    };

    handleOptionSelected = (selectedValue: string) => {
        const {onChange, selectedValues} = this.props;

        // If either of these are not defined, return.
        if (!onChange || !selectedValues) {
            return;
        }

        if (selectedValues.includes(selectedValue)) {
            const index = selectedValues.indexOf(selectedValue);
            const updatedSelection = [
                ...selectedValues.slice(0, index),
                ...selectedValues.slice(index + 1),
            ];
            onChange(updatedSelection);
        } else {
            // Item was newly selected
            onChange([...selectedValues, selectedValue]);
        }
        this.handleItemSelected();
    };

    getMenuItems(): Array<DropdownItem> {
        const {children, selectedValues} = this.props;
        const containsOptionItems = Array.isArray(selectedValues);

        return React.Children.map(children, (item) => {
            const {
                type,
                props: {disabled, value},
            } = item;
            if (type === ActionItem) {
                return {
                    component: item,
                    focusable: !disabled,
                    populatedProps: {
                        indent: containsOptionItems,
                    },
                };
            } else if (type === OptionItem) {
                return {
                    component: item,
                    focusable: !disabled,
                    populatedProps: {
                        onToggle: this.handleOptionSelected,
                        selected: selectedValues
                            ? selectedValues.includes(value)
                            : false,
                        variant: "check",
                    },
                };
            } else {
                return {
                    component: item,
                    focusable: false,
                    populatedProps: {},
                };
            }
        });
    }

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    render() {
        const {alignment, disabled, menuText, style} = this.props;
        const {open} = this.state;

        const opener = (
            <ActionMenuOpener
                disabled={disabled}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                ref={this.handleOpenerRef}
            >
                {menuText}
            </ActionMenuOpener>
        );

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={styles.menuTopSpace}
                items={this.getMenuItems()}
                keyboard={this.state.keyboard}
                light={false}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={style}
            />
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
