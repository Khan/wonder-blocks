// @flow
// A menu that consists of action items

import * as React from "react";

import DropdownCore from "./dropdown-core.js";
import SelectBox from "./select-box.js";
import SelectItem from "./select-item.js";

//TODO: dedupe
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
     * Callback for when the selection of the menu changes. Parameter is the
     * newly selected item.
     */
    onChange: (selectedValue: string) => void,

    /**
     * Placeholder for the opening component when there are no items selected.
     */
    placeholder: string,

    /**
     * Whether this menu should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment?: "left" | "right",

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the item is used on a dark background.
     */

    light?: boolean,

    /**
     * Whether this menu is disabled. A disabled menu may not be opened and
     * does not support interaction. Defaults to false.
     */
    disabled?: boolean,

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
     * The value of the selected element.
     */
    selected: string,
};

export default class SingleSelectMenu extends React.Component<
    MenuProps,
    State,
> {
    static defaultProps = {
        alignment: "left",
        disabled: false,
        light: false,
    };

    constructor(props: MenuProps) {
        super(props);
        this.state = {
            open: false,
            selected: props.items
                .filter((item) => item.selected)
                .map((item) => item.value)[0],
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleSelected(selectedValue: string) {
        const {onChange} = this.props;

        this.setState({
            selected: selectedValue,
        });

        onChange(selectedValue);
    }

    render() {
        const {
            alignment,
            disabled,
            items,
            light,
            // onChange,
            placeholder,
            style,
        } = this.props;

        const {selected, open} = this.state;

        // TODO: display displayText instead of value
        const menuText = `${selected ? selected : placeholder}`;

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
                    selected={this.state.selected === item.value}
                    value={item.value}
                    // onClick={item.onClick}
                    variant={"check"}
                />
            );
        });

        return (
            <DropdownCore
                items={menuItems}
                open={open}
                opener={opener}
                alignment={alignment}
                style={style}
            />
        );
    }
}
