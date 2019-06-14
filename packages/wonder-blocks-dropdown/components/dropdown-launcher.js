// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import {StyleSheet} from "aphrodite";
import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";
import Dropdown from "./dropdown.js";
import type {Item, DropdownItem} from "../util/types.js";
import ActionItem from "./action-item.js";
import OptionItem from "./option-item.js";

type Props = {|
    ...AriaProps,

    /*
     * The callback function used to open the Dropdown.
     */
    children: (openDropdown: () => void) => React.Element<any>,

    opened?: boolean,

    /*
     * Text for the opener of this menu.
     */
    menuText: string,

    /*
     * The items present in the dropdown.
     */
    menuItems: Array<Item> | Item,

    /*
     * A callback that returns items that are newly selected. Use only if this
     * menu contains select items (and make sure selectedValues is defined).
     */
    onChange?: (selectedItems: Array<string>) => mixed,

    /*
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

    /*
     * Optional styling to add to the opener component wrapper.
     */
    style?: StyleType,

    /*
     * Test ID used for e2e testing.
     */
    testId?: string,

    /*
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: StyleType,
|};

type State = {|
    /**
     * Whether or not the dropdown is currently open.
     */
    open: boolean,

    /**
     * Whether or not last open state change was triggered by a keyboard click.
     */
    keyboard?: boolean,
|};

export default class DropdownLauncher extends React.Component<Props, State> {
    openerElement: ?HTMLElement;

    static defaultProps = {
        alignment: "left",
        disabled: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            keyboard: false,
        };
    }

    handleItemSelected = () => {
        // Bring focus back to the opener element.
        if (this.openerElement) {
            this.openerElement.focus();
        }

        this.setState({
            open: false, // close the menu upon selection
        });
    };

    handleOpenChanged = (open: boolean, keyboard?: boolean) => {
        this.setState({
            open,
            keyboard,
        });
    };

    handleOptionSelected = (selectedValue: string) => {
        const {onChange, selectedValues} = this.props;

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

    _openDropdown = () => {
        this.setState({open: true});
    };

    _getMenuItems = (): Array<DropdownItem> => {
        const {selectedValues} = this.props;
        return React.Children.toArray(this.props.menuItems)
            .filter(Boolean)
            .map((item) => {
                const {value, disabled} = item.props;
                const itemObject = {
                    component: item,
                    focusable:
                        ActionItem.isClassOf(item) || OptionItem.isClassOf(item)
                            ? !disabled
                            : false,
                    populatedProps: {},
                };
                if (ActionItem.isClassOf(item)) {
                    return {
                        ...itemObject,
                        populatedProps: {
                            indent: true,
                            onClick: this.handleItemSelected,
                        },
                    };
                } else if (OptionItem.isClassOf(item)) {
                    return {
                        ...itemObject,
                        populatedProps: {
                            onToggle: this.handleOptionSelected,
                            selected: selectedValues
                                ? selectedValues.includes(value)
                                : false,
                            variant: "check",
                        },
                    };
                } else {
                    return itemObject;
                }
            });
    };

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    render() {
        const dropdownItems = this._getMenuItems();
        const {
            children,
            alignment,
            disabled,
            style,
            dropdownStyle,
            /* eslint-disable no-unused-vars */
            onChange,
            selectedValues,
            "aria-disabled": ariaDisabled,
            ...sharedProps
        } = this.props;

        const childAnchor = React.cloneElement(children(this._openDropdown), {
            disabled,
        });

        const opener = (
            <span
                ref={this.handleOpenerRef}
                disabled={!dropdownItems.length || disabled}
            >
                {childAnchor}
            </span>
        );

        return (
            <Dropdown
                alignment={alignment}
                items={this._getMenuItems()}
                keyboard={this.state.keyboard}
                dropdownStyle={[styles.menuTopSpace, dropdownStyle]}
                onOpenChanged={this.handleOpenChanged}
                open={this.state.open}
                opener={opener}
                openerElement={this.openerElement}
                role="menu"
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
