// @flow
// A menu that consists of items to be selected, single-choice

import * as React from "react";
import ReactDOM from "react-dom";

import Dropdown from "./dropdown.js";
import SelectOpener from "./select-opener.js";
import OptionItem from "./option-item.js";
import type {OptionItemProps} from "../util/types.js";

type Props = {|
    /**
     * The items in this select.
     */
    items: Array<OptionItemProps>,

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
     * Optional styling to add.
     */
    style?: any,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,
|};

export default class SingleSelect extends React.Component<Props, State> {
    openerElement: ?Element;

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

    handleOpenChanged = (open: boolean, source: any) => {
        this.setState({
            open: open,
        });
    };

    handleOpenerClick = () => {
        this.handleOpenChanged(!this.state.open);
    };

    handleSelected = (selectedValue: string, state: any) => {
        this.setState({
            open: false, // close the menu upon selection
        });

        // Call callback if selection changes.
        if (selectedValue !== this.props.selectedValue) {
            this.props.onChange(selectedValue);
        }
    };

    getOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): Element);
    };

    render() {
        const {
            alignment,
            disabled,
            items,
            light,
            placeholder,
            selectedValue,
            style,
        } = this.props;

        const {open} = this.state;

        const selectedItem = items.find((item) => item.value === selectedValue);
        // If nothing is selected, or if the selectedValue doesn't match any
        // item in the menu, use the placeholder.
        const menuText = selectedItem ? selectedItem.label : placeholder;

        const opener = (
            <SelectOpener
                disabled={disabled}
                light={light}
                onClick={this.handleOpenerClick}
                ref={this.getOpenerRef}
                style={style}
            >
                {menuText}
            </SelectOpener>
        );

        const menuItems = items.map((item, index) => {
            return (
                <OptionItem
                    disabled={item.disabled}
                    key={item.value}
                    label={item.label}
                    onToggle={this.handleSelected}
                    selected={selectedValue === item.value}
                    value={item.value}
                    variant="check"
                />
            );
        });

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={{marginTop: 8, marginBottom: 8}}
                items={menuItems}
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
