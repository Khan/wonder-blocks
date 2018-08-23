// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import Dropdown from "./dropdown.js";
import SelectOpener from "./select-opener.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem} from "../util/types.js";

type Props = {|
    /**
     * The items in this select.
     */
    children: Array<React.Element<OptionItem>>,

    /**
     * Callback for when the selection. Parameter is the value of the newly
     * selected item.
     */
    onChange: (selectedValue: string) => void,

    /**
     * Placeholder for the opening component when there are no items selected.
     */
    placeholder: string,

    /**
     * Value of the currently selected item.
     */
    selectedValue?: string,

    /**
     * Whether this dropdown should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right",

    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Whether to display the "light" version of this component instead, for
     * use when the component is used on a dark background.
     */
    light: boolean,

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
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 *
 * The single select dropdown closes after the selection of an item. If the
 * same item is selected, there is no callback.
 */
export default class SingleSelect extends React.Component<Props, State> {
    openerElement: ?HTMLElement;
    selectedIndex: number;

    static defaultProps = {
        alignment: "left",
        disabled: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);

        this.selectedIndex = 0;

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

    handleToggle = (selectedValue: string) => {
        // Call callback if selection changed.
        if (selectedValue !== this.props.selectedValue) {
            this.props.onChange(selectedValue);
        }

        // Bring focus back to the opener element.
        if (open && this.openerElement) {
            this.openerElement.focus();
        }

        this.setState({
            open: false, // close the menu upon selection
        });
    };

    getMenuItems(): Array<DropdownItem> {
        const {children, selectedValue} = this.props;
        // Figure out which index should receive focus when this select opens
        // Needs to exclude counting items that are disabled
        let indexCounter = 0;
        this.selectedIndex = 0;

        return React.Children.map(children, (option) => {
            const {disabled, value} = option.props;
            const selected = selectedValue === value;
            if (selected) {
                this.selectedIndex = indexCounter;
            }
            if (!disabled) {
                indexCounter += 1;
            }
            return {
                component: option,
                focusable: !disabled,
                populatedProps: {
                    onToggle: this.handleToggle,
                    selected: selected,
                    variant: "check",
                },
            };
        });
    }

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    render() {
        const {
            alignment,
            children,
            disabled,
            light,
            placeholder,
            selectedValue,
            style,
        } = this.props;
        const {open} = this.state;

        const selectedItem = React.Children.toArray(children).find(
            (option) => option.props.value === selectedValue,
        );
        // If nothing is selected, or if the selectedValue doesn't match any
        // item in the menu, use the placeholder.
        const menuText = selectedItem ? selectedItem.props.label : placeholder;

        const opener = (
            <SelectOpener
                disabled={disabled}
                isPlaceholder={!selectedItem}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                ref={this.handleOpenerRef}
            >
                {menuText}
            </SelectOpener>
        );

        const items = this.getMenuItems();

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={{marginTop: 8, marginBottom: 8}}
                initialFocusedIndex={this.selectedIndex}
                items={items}
                keyboard={this.state.keyboard}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={style}
            />
        );
    }
}
