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

import type {SelectItemProps, SeparatorProps} from "../utils/types.js";

type ItemProps = SelectItemProps | SeparatorProps;

type Props = {
    /**
     * The items in this menu.
     */
    items: Array<ItemProps>,

    /**
     * Callback for when the selection of the menu changes. Parameter is an
     * array of the values of the selected items, in alphabetical order.
     */
    onChange: (selectedValues: Array<string>) => void,

    /**
     * Type of the menu items.
     * For example, if selectItemType is "student" and there are two students
     * selected, the SelectBox would display "2 students"
     */
    selectItemType: string,

    /**
     * Whether to display shortcuts for Select All and Select None.
     */
    displaySelectShortcuts?: boolean,

    /**
     * Optional placeholder for the opening component when there are no items
     * selected.
     */
    placeholder?: string,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment?: "left" | "right",

    /**
     * Whether this menu is disabled. A disabled menu may not be opened and
     * does not support interaction. Defaults to false.
     */
    disabled?: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */
    light?: boolean,

    /**
     * Optional styling to add.
     */
    style?: any,
};

type State = {
    /**
     * Whether or not menu is open.
     */
    open: boolean,

    /**
     * Array of the values of the selected elements.
     */
    selected: Array<string>,
};

export default class MultiSelectMenu extends React.Component<Props, State> {
    static defaultProps = {
        alignment: "left",
        disabled: false,
        displaySelectShortcuts: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            selected: props.items
                .filter((item) => item.type === "select" && item.selected)
                // item.type should always be "select" because we filter for it
                // checking again to satisfy flow
                .map((item) => (item.type === "select" ? item.value : "")),
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleSelected(selectedValue: string, selectionState: boolean) {
        const {selected} = this.state;
        const {onChange} = this.props;

        const newValues = selected || [];

        if (selectionState) {
            newValues.push(selectedValue);
        } else {
            newValues.splice(newValues.indexOf(selectedValue), 1);
        }

        this.setState({
            selected: newValues,
        });

        onChange(newValues.sort());
    }

    handleSelectAll() {
        const allValues = this.props.items
            .filter((item) => item.type === "select")
            // adding another check to satisfy flow
            .map((item) => (item.type === "select" ? item.value : ""));
        this.setState({
            selected: allValues,
        });
    }

    handleSelectNone() {
        this.setState({
            selected: [],
        });
    }

    render() {
        const {
            alignment,
            displaySelectShortcuts,
            disabled,
            items,
            light,
            placeholder,
            selectItemType,
            style,
        } = this.props;

        const {open, selected} = this.state;

        // TODO(sophie): figure out how to configure plurals for i18n
        const menuText =
            selected.length === 0 && placeholder
                ? placeholder
                : `${selected.length} ${selectItemType}`;

        const opener = (
            <SelectBox
                disabled={disabled}
                light={light}
                onClick={() => this.toggleMenu()}
            >
                {menuText}
            </SelectBox>
        );

        const menuItems = items.map((item, index) => {
            return item.type === "separator" ? (
                <SeparatorItem key={index} />
            ) : (
                <SelectItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    onClick={item.onClick}
                    onToggle={(value, state) =>
                        this.handleSelected(value, state)
                    }
                    selected={selected.includes(item.value)}
                    value={item.value}
                    variant={"checkbox"}
                />
            );
        });

        if (displaySelectShortcuts) {
            // TODO(sophie): translate for i18n
            const selectAll = (
                <ActionItem
                    label={`Select all (${items.length})`}
                    disabled={items.length === selected.length}
                    indent={true}
                    onClick={() => this.handleSelectAll()}
                />
            );

            const selectNone = (
                <ActionItem
                    label={"Select none"}
                    disabled={selected.length === 0}
                    indent={true}
                    onClick={() => this.handleSelectNone()}
                />
            );

            const separator = <SeparatorItem key={"selectOptSep"} />;

            // Add options at beginning, add a separator
            menuItems.unshift([selectAll, selectNone, separator]);
        }

        return (
            <DropdownCore
                alignment={alignment}
                items={menuItems}
                open={open}
                opener={opener}
                style={[styles.menuTopSpace, style]}
            />
        );
    }
}

const styles = StyleSheet.create({
    // This is to add extra space on top of the menu options to separate the
    // options from the opener component.
    menuTopSpace: {
        top: 48,
    },
});
