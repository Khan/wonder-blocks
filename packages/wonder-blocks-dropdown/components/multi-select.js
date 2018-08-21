// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {StyleType} from "@khanacademy/wonder-blocks-core";
import ActionItem from "./action-item.js";
import Dropdown from "./dropdown.js";
import SelectOpener from "./select-opener.js";
import SeparatorItem from "./separator-item.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem} from "../util/types.js";

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
 * A dropdown that consists of multiple selection items. This select allows
 * multiple options to be selected. Clients are responsible for keeping track
 * of the selected items.
 *
 * The multi select stays open until closed by the user. The onChange callback
 * happens every time there is a change in the selection of the items.
 */
export default class MultiSelect extends React.Component<Props, State> {
    openerElement: ?HTMLElement;

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

    handleOpenChanged = (open: boolean, keyboard?: boolean) => {
        this.setState({
            open,
            keyboard,
        });
    };

    handleToggle = (selectedValue: string) => {
        const {onChange, selectedValues} = this.props;

        if (selectedValues.includes(selectedValue)) {
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
    };

    handleSelectAll = () => {
        const {children, onChange} = this.props;
        const selected = React.Children.map(
            children,
            (option) => option.props.value,
        );
        onChange(selected);
    };

    handleSelectNone = () => {
        const {onChange} = this.props;
        onChange([]);
    };

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

    getShortcuts(): Array<DropdownItem> {
        const {children, selectedValues, shortcuts} = this.props;

        if (shortcuts) {
            const numOptions = React.Children.count(children);

            const selectAllDisabled = numOptions === selectedValues.length;
            const selectAll = {
                component: (
                    <ActionItem
                        disabled={selectAllDisabled}
                        // TODO(sophie): translate for i18n
                        label={`Select all (${numOptions})`}
                        indent={true}
                        onClick={this.handleSelectAll}
                    />
                ),
                focusable: !selectAllDisabled,
                populatedProps: {},
            };

            const selectNoneDisabled = selectedValues.length === 0;
            const selectNone = {
                component: (
                    <ActionItem
                        disabled={selectNoneDisabled}
                        // TODO(sophie): translate for i18n
                        label="Select none"
                        indent={true}
                        onClick={this.handleSelectNone}
                    />
                ),
                focusable: !selectNoneDisabled,
                populatedProps: {},
            };

            const separator = {
                component: <SeparatorItem key="shortcuts-separator" />,
                focusable: false,
                populatedProps: {},
            };

            return [selectAll, selectNone, separator];
        } else {
            return [];
        }
    }

    getMenuItems(): Array<DropdownItem> {
        const {children, selectedValues} = this.props;
        return React.Children.map(children, (option) => {
            const {disabled, value} = option.props;
            return {
                component: option,
                focusable: !disabled,
                populatedProps: {
                    onToggle: this.handleToggle,
                    selected: selectedValues.includes(value),
                    variant: "checkbox",
                },
            };
        });
    }

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    render() {
        const {alignment, disabled, light, placeholder, style} = this.props;
        const {open} = this.state;

        const menuText = this.getMenuText();

        const opener = (
            <SelectOpener
                disabled={disabled}
                isPlaceholder={menuText === placeholder}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                ref={this.handleOpenerRef}
            >
                {menuText}
            </SelectOpener>
        );

        const items = [...this.getShortcuts(), ...this.getMenuItems()];

        return (
            <Dropdown
                alignment={alignment}
                dropdownStyle={{marginTop: 8, marginBottom: 8}}
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
