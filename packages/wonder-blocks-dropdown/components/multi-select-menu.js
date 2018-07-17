// @flow
// A menu that consists of multiple selection items. This menu allows multiple
// items to be selected.

import * as React from "react";
import {StyleSheet} from "aphrodite";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";
import SelectBox from "./select-box.js";
import SelectItem from "./select-item.js";
import SeparatorItem from "./separator-item.js";
import type {SelectItemProps} from "../utils/types.js";

type Props = {|
    /**
     * The items in this menu.
     */
    items: Array<SelectItemProps>,

    /**
     * Callback for when the selection of the menu changes. Parameter is an
     * updated array of the values that are now selected.
     */
    onChange: (selectedValues: Array<string>) => void,

    /**
     * List of the item values that are currently selected.
     */
    selectedValues: Array<string>,

    /**
     * Type of the menu items.
     * For example, if selectItemType is "student" and there are two students
     * selected, the SelectBox would display "2 students"
     */
    selectItemType: string,

    /**
     * Optional placeholder for the opening component when there are no items
     * selected.
     */
    placeholder?: string,

    /**
     * Whether to display shortcuts for Select All and Select None.
     */
    shortcuts?: boolean,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right",

    /**
     * Whether this menu is disabled. A disabled menu may not be opened and
     * does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light: boolean,

    /**
     * Optional styling to add.
     */
    style?: any,
|};

type State = {|
    /**
     * Whether or not menu is open.
     */
    open: boolean,
|};

export default class MultiSelectMenu extends React.Component<Props, State> {
    static defaultProps = {
        alignment: "left",
        disabled: false,
        light: false,
        shortcuts: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }

    handleSelected(selectedValue: string, oldSelectionState: boolean) {
        const {onChange, selectedValues} = this.props;

        if (oldSelectionState) {
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
    }

    handleSelectAll() {
        const {items, onChange} = this.props;
        const selected = items.map((item) => item.value);
        onChange(selected);
    }

    handleSelectNone() {
        const {onChange} = this.props;
        onChange([]);
    }

    getShortcuts() {
        const {items, selectedValues, shortcuts} = this.props;
        if (shortcuts) {
            // TODO(sophie): translate for i18n
            const selectAll = (
                <ActionItem
                    disabled={items.length === selectedValues.length}
                    key={"select-all"}
                    label={`Select all (${items.length})`}
                    indent={true}
                    onClick={() => this.handleSelectAll()}
                />
            );

            const selectNone = (
                <ActionItem
                    disabled={selectedValues.length === 0}
                    key={"select-none"}
                    label={"Select none"}
                    indent={true}
                    onClick={() => this.handleSelectNone()}
                />
            );

            const separator = <SeparatorItem key={"shortcuts-separator"} />;

            return [selectAll, selectNone, separator];
        } else {
            return [];
        }
    }

    // TODO(sophie): need to configure for i18n for the word "All" and
    // potentially the concept of plurals
    getMenuText() {
        const {items, placeholder, selectItemType, selectedValues} = this.props;
        // If there is nothing selected, use the placeholder if it exists
        const noSelectionText = placeholder || `0 ${selectItemType}`;
        switch (selectedValues.length) {
            case 0:
                return noSelectionText;
            case 1:
                // If there is one item selected, we display its label. If for
                // some reason we can't find the selected item, we use the
                // display text for the case where nothing is selected.
                const selectedItem = items.find(
                    (item) => item.value === selectedValues[0],
                );
                return selectedItem ? selectedItem.label : noSelectionText;
            case items.length:
                return `All ${selectItemType}`;
            default:
                return `${selectedValues.length} ${selectItemType}`;
        }
    }

    getMenuItems() {
        const {items, selectedValues} = this.props;
        const menuItems = items.map((item, index) => {
            return (
                <SelectItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    /* eslint-disable-next-line react/jsx-handler-names */
                    onClick={item.onClick}
                    onToggle={(value, state) =>
                        this.handleSelected(value, state)
                    }
                    selected={selectedValues.includes(item.value)}
                    value={item.value}
                    variant={"checkbox"}
                />
            );
        });
        return menuItems;
    }

    render() {
        const {alignment, disabled, light, style} = this.props;

        const {open} = this.state;

        const menuText = this.getMenuText();

        const opener = (
            <SelectBox
                disabled={disabled}
                light={light}
                onClick={() => this.toggleMenu()}
                style={style}
            >
                {menuText}
            </SelectBox>
        );

        const menuItems = [...this.getShortcuts(), ...this.getMenuItems()];

        return (
            <DropdownCore
                alignment={alignment}
                items={menuItems}
                light={light}
                onClose={() => this.handleClose()}
                open={open}
                opener={opener}
                style={[styles.menuTopSpace, style]}
            />
        );
    }
}

const styles = StyleSheet.create({
    // This is to add extra space on top of the menu options to separate the
    // options from the opener component. The opener (select box) has a height
    // of 40, and there is a space of 8 between the opener and top of the menu.
    menuTopSpace: {
        top: 48,
    },
});
