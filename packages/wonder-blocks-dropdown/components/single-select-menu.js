// @flow
// A menu that consists of action items

import * as React from "react";
import {StyleSheet} from "aphrodite";

import DropdownCore from "./dropdown-core.js";
import SelectBox from "./select-box.js";
import SelectItem from "./select-item.js";

export type SingleSelectItemProps = {
    /** Whether this item is disabled. Default false. */
    disabled?: boolean,
    /** Display text of the item. */
    label: string,
    /** Value of this item. Treat as a key. */
    value: string,
    /** Optional extra callback. Passes whether this item is selected. */
    onClick?: (selected: boolean) => void,
};

type Props = {
    /**
     * The items in this menu.
     */
    items: Array<SingleSelectItemProps>,

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
     * Value of the currently selected item for this menu.
     */
    selectedItem?: string,

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
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleSelected(selectedValue: string) {
        this.setState({
            open: false, // close the menu upon selection
        });

        // Call callback if selection changes.
        if (selectedValue !== this.props.selectedItem) {
            this.props.onChange(selectedValue);
        }
    }

    render() {
        const {
            alignment,
            disabled,
            items,
            light,
            placeholder,
            selectedItem,
            style,
        } = this.props;

        const {open} = this.state;

        const menuText = `${
            selectedItem
                ? items.filter((item) => item.value === selectedItem)[0].label
                : placeholder
        }`;

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

        const menuItems = items.map((item, index) => {
            return (
                <SelectItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    onToggle={(value, state) => this.handleSelected(value)}
                    selected={selectedItem === item.value}
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
                style={[styles.menuSpacer, style]}
            />
        );
    }
}

const styles = StyleSheet.create({
    // This is to add extra space on top of the menu options to separate the
    // options from the opener component.
    menuSpacer: {
        top: 48,
    },
});
