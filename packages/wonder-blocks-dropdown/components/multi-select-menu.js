// @flow
// A menu that consists of multiple selection items. This menu allows multiple
// items to be selected.

import * as React from "react";

import DropdownCore from "./dropdown-core.js";
import SelectBox from "./select-box.js";
import SelectItem from "./select-item.js";

type SelectItemProps = {
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** Initial selection state of this item. */
    selected: boolean,
    /** Value of this item. Treat as a key. */
    value: string,
    // TODO: figure this out
    // onClick: () => void,
};

type MenuProps = {
    /**
     * The items in this menu.
     */
    items: Array<SelectItemProps>,

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
    // TODO: add abstraction to selectbox?
    selectItemType: string,

    /**
     * Whether to display shortcuts for Select All and Select None.
     */
    // TODO: implement
    displaySelectShortcuts?: boolean,

    /**
     * Optional placeholder for the opening component when there are no items
     * selected.
     */
    // TODO: incorporate
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

export default class MultiSelectMenu extends React.Component<MenuProps, State> {
    static defaultProps = {
        alignment: "left",
        disabled: false,
        displaySelectShortcuts: false,
        light: false,
        placeholder: "",
    };

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            open: false,
            selected: props.items
                .filter((item) => item.selected)
                .map((item) => item.value),
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleSelected(selectedValue: string) {
        const {selected} = this.state;
        const {onChange} = this.props;

        let newValues = selected || [];

        if (newValues.includes(selectedValue)) {
            const location = newValues.indexOf(selectedValue);
            newValues = [
                ...newValues.slice(0, location),
                ...newValues.slice(location + 1),
            ];
        } else {
            newValues = [...newValues, selectedValue];
        }

        this.setState({
            selected: newValues,
        });

        onChange(newValues.sort());
    }

    render() {
        const {
            alignment,
            disabled,
            items,
            light,
            // onChange,
            // placeholder,
            selectItemType,
            style,
        } = this.props;

        const {open, selected} = this.state;

        const menuText = `${selected.length} ${selectItemType}`;

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
            return (
                <SelectItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    onToggle={(v) => this.handleSelected(v)}
                    selected={selected.includes(item.value)}
                    value={item.value}
                    // onClick={item.onClick}
                    variant={"checkbox"}
                />
            );
        });

        return (
            <DropdownCore
                alignment={alignment}
                items={menuItems}
                open={open}
                opener={opener}
                style={style}
            />
        );
    }
}
