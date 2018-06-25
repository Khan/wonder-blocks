// @flow
// A menu that consists of action items

import * as React from "react";
import {StyleSheet} from "aphrodite";

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
     * Optional styling to add to dropdown.
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

export default class SingleSelectMenu extends React.Component<Props, State> {
    static defaultProps = {
        alignment: "left",
        disabled: false,
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
                .map((item) => (item.type === "select" ? item.value : ""))[0],
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
            open: false, // close the menu upon selection
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

        // TODO: use display label instead
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
            return item.type === "separator" ? (
                <SeparatorItem key={index} />
            ) : (
                <SelectItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    onToggle={(value, state) => this.handleSelected(value)}
                    selected={this.state.selected === item.value}
                    value={item.value}
                    variant={"check"}
                />
            );
        });

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
