// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import Dropdown from "./dropdown.js";
import SelectOpener from "./select-opener.js";

import typeof OptionItem from "./option-item.js";

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
     * Optional styling to add to the opener component.
     */
    openerStyle?: any,

    /**
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: any,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,
|};

/**
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 */
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

    handleOpenChanged(open: boolean) {
        this.setState({
            open: open,
        });
    }

    handleToggle(selectedValue: string) {
        this.setState({
            open: false, // close the menu upon selection
        });

        // Call callback if selection changes.
        if (selectedValue !== this.props.selectedValue) {
            this.props.onChange(selectedValue);
        }
    }

    getMenuItems(): Array<React.Element<OptionItem>> {
        const {children, selectedValue} = this.props;
        return React.Children.map(children, (option) => {
            const {value} = option.props;
            return React.cloneElement(option, {
                onToggle: (value, state) => this.handleToggle(value),
                selected: selectedValue === value,
                variant: "check",
            });
        });
    }

    render() {
        const {
            alignment,
            children,
            disabled,
            light,
            placeholder,
            selectedValue,
            openerStyle,
            dropdownStyle,
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
                onClick={() => this.handleOpenChanged(!open)}
                ref={(node) =>
                    (this.openerElement = ((ReactDOM.findDOMNode(
                        node,
                    ): any): Element))
                }
                style={openerStyle}
            >
                {menuText}
            </SelectOpener>
        );

        const items = [...this.getMenuItems()];

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={[{marginTop: 8, marginBottom: 8}, dropdownStyle]}
                light={light}
                onOpenChanged={(open, source) => this.handleOpenChanged(open)}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
            >
                {items}
            </Dropdown>
        );
    }
}
