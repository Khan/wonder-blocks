// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import ActionItem from "./action-item.js";
import Dropdown from "./dropdown.js";
import SelectOpener from "./select-opener.js";
import SeparatorItem from "./separator-item.js";

import typeof OptionItem from "./option-item.js";

type Props = {|
    /**
     * The items in this select.
     */
    children: Array<React.Element<OptionItem>>,

    /**
     * Callback for when the selection changes. Parameter is an updated array of
     * the values that are now selected.
     */
    onChange: (selectedValues: Array<string>) => void,

    /**
     * The values of the items that are currently selected.
     */
    selectedValues: Array<string>,

    /**
     * Type of the option.
     * For example, if selectItemType is "student" and there are two students
     * selected, the SelectOpener would display "2 students"
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
 *  A dropdown that consists of multiple selection items. This select allows
 * multiple options to be selected. Clients are responsible for keeping track
 * of the selected items.
 */
export default class MultiSelect extends React.Component<Props, State> {
    openerElement: ?Element;

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

    handleOpenChanged(open: boolean) {
        this.setState({
            open: open,
        });
    }

    handleToggle(selectedValue: string, oldSelectionState: boolean) {
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
        const {children, onChange} = this.props;
        const selected = React.Children.map(
            children,
            (option) => option.props.value,
        );
        onChange(selected);
    }

    handleSelectNone() {
        const {onChange} = this.props;
        onChange([]);
    }

    // TODO(sophie): need to configure for i18n for the word "All" and
    // potentially the concept of plurals
    getMenuText() {
        const {
            children,
            placeholder,
            selectItemType,
            selectedValues,
        } = this.props;
        // If there is nothing selected, use the placeholder if it exists
        const noSelectionText = placeholder || `0 ${selectItemType}`;
        switch (selectedValues.length) {
            case 0:
                return noSelectionText;
            case 1:
                // If there is one item selected, we display its label. If for
                // some reason we can't find the selected item, we use the
                // display text for the case where nothing is selected.
                const selectedItem = React.Children.toArray(children).find(
                    (option) => option.props.value === selectedValues[0],
                );
                return selectedItem
                    ? selectedItem.props.label
                    : noSelectionText;
            case React.Children.count(children):
                return `All ${selectItemType}`;
            default:
                return `${selectedValues.length} ${selectItemType}`;
        }
    }

    getShortcuts(): Array<
        React.Element<typeof ActionItem | typeof SeparatorItem>,
    > {
        const {children, selectedValues, shortcuts} = this.props;
        const numOptions = React.Children.count(children);
        // TODO(sophie): translate for i18n
        if (shortcuts) {
            return [
                <ActionItem
                    disabled={numOptions === selectedValues.length}
                    key="select-all"
                    label={`Select all (${numOptions})`}
                    indent={true}
                    onClick={() => this.handleSelectAll()}
                />,
                <ActionItem
                    disabled={selectedValues.length === 0}
                    key="select-none"
                    label="Select none"
                    indent={true}
                    onClick={() => this.handleSelectNone()}
                />,
                <SeparatorItem key="shortcuts-separator" />,
            ];
        } else {
            return [];
        }
    }

    getMenuItems(): Array<React.Element<OptionItem>> {
        const {children, selectedValues} = this.props;
        return React.Children.map(children, (option) => {
            const {value} = option.props;
            return React.cloneElement(option, {
                onToggle: (value, state) => this.handleToggle(value, state),
                selected: selectedValues.includes(value),
                variant: "checkbox",
            });
        });
    }

    render() {
        const {
            alignment,
            disabled,
            light,
            placeholder,
            openerStyle,
            dropdownStyle,
        } = this.props;

        const {open} = this.state;

        const menuText = this.getMenuText();

        const opener = (
            <SelectOpener
                disabled={disabled}
                isPlaceholder={menuText === placeholder}
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

        const items = [...this.getShortcuts(), ...this.getMenuItems()];

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={[{marginTop: 8, marginBottom: 8}, dropdownStyle]}
                light={light}
                onOpenChanged={(open) => this.handleOpenChanged(open)}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
            >
                {items}
            </Dropdown>
        );
    }
}
