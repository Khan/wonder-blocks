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
     * The value and label of the selected element.
     */
    selected: {
        value: string,
        label: string,
    },
};

export default class SingleSelectMenu extends React.Component<Props, State> {
    static defaultProps = {
        alignment: "left",
        disabled: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);

        const selected = props.items.filter(
            (item) => item.type === "select" && item.selected,
        )[0];

        this.state = {
            open: false,
            selected: selected && {
                // have to check type again to appease flow
                value: selected.type === "select" ? selected.value : "",
                label: selected.type === "select" ? selected.label : "",
            },
        };
    }

    toggleMenu() {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }

    handleSelected(selectedValue: string, selectedLabel: string) {
        const {onChange} = this.props;
        const {selected} = this.state;
        // If selected value was the same, don't call the onChange callback.
        if (selected && selectedValue === selected.value) {
            this.setState({
                open: false, // close the menu upon selection
            });
        } else {
            this.setState({
                open: false, // close the menu upon selection
                selected: {
                    value: selectedValue,
                    label: selectedLabel,
                },
            });
            onChange(selectedValue);
        }
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

        const menuText = `${selected ? selected.label : placeholder}`;

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
            return item.type === "separator" ? (
                <SeparatorItem key={index} />
            ) : (
                <SelectItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    onToggle={(value, label, state) =>
                        this.handleSelected(value, label)
                    }
                    selected={selected && selected.value === item.value}
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
