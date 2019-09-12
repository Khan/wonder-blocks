// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";
import SelectOpener from "./select-opener.js";
import SeparatorItem from "./separator-item.js";
import {selectDropdownStyle} from "../util/constants.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem} from "../util/types.js";

type Props = {|
    ...AriaProps,

    /**
     * The items in this select.
     */
    children?: Array<?(React.Element<OptionItem> | false)>,

    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled: boolean,

    /**
     * Unique identifier attached to the field control. If used, we need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<button>` elements for screenreaders.
     */
    id?: string,

    /**
     * Callback for when the selection changes. Parameter is an updated array of
     * the values that are now selected.
     */
    onChange: (selectedValues: Array<string>) => mixed,

    /**
     * Can be used to override the state of the ActionMenu by parent elements
     */
    opened?: boolean,

    /**
     * In controlled mode, use this prop in case the parent needs to be notified
     * when the menu opens/closes.
     */
    onToggle?: (opened: boolean) => mixed,

    /**
     * The values of the items that are currently selected.
     */
    selectedValues: Array<string>,

    /**
     * Type of the option.
     * For example, if selectItemType is "students" and there are two students
     * selected, the SelectOpener would display "2 students"
     */
    selectItemType: string,

    /**
     * Optional placeholder for the opening component when there are no items
     * selected and not implicit all enabled.
     */
    placeholder?: string,

    /**
     * When this is true, the menu text shows "All {selectItemType}" when no
     * item is selected.
     */
    implicitAllEnabled?: boolean,

    /**
     * When this is true, the dropdown body shows a search text input at the
     * top. The items will be filtered by the input.
     * Selected items will be moved to the top and shortcuts won't be added
     * even if shortcuts prop is set to true.
     */
    isFilterable?: boolean,

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
     * Whether to display the "light" version of this component instead, for
     * use when the component is used on a dark background.
     */
    light: boolean,

    /**
     * Optional styling to add to the opener component wrapper.
     */
    style?: StyleType,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: StyleType,
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
    /**
     * The text input to filter the items by their label. Defaults to an empty
     * string.
     */
    searchText: string,
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
        selectedValues: [],
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            open: false,
            searchText: "",
        };
    }

    /**
     * Used to sync the `opened` state when this component acts as a controlled
     * component
     */
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            open: typeof props.opened === "boolean" ? props.opened : state.open,
        };
    }

    handleOpenChanged = (opened: boolean, keyboard?: boolean) => {
        this.setState({
            open: opened,
            keyboard,
            searchText: "",
        });

        if (this.props.onToggle) {
            this.props.onToggle(opened);
        }
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
    getMenuText(children: Array<React.Element<OptionItem>>) {
        const {
            placeholder,
            implicitAllEnabled,
            selectItemType,
            selectedValues,
        } = this.props;
        const allSelectedText = `All ${selectItemType}`;

        // When implicit all enabled, use the allSelectedText when no selection
        // but otherwise, use the placeholder if it exists
        const noSelectionText = implicitAllEnabled
            ? allSelectedText
            : placeholder || `0 ${selectItemType}`;

        switch (selectedValues.length) {
            case 0:
                return noSelectionText;
            case 1:
                // If there is one item selected, we display its label. If for
                // some reason we can't find the selected item, we use the
                // display text for the case where nothing is selected.
                const selectedItem = children.find(
                    (option) => option.props.value === selectedValues[0],
                );
                return selectedItem
                    ? selectedItem.props.label
                    : noSelectionText;
            case children.length:
                return allSelectedText;
            default:
                return `${selectedValues.length} ${selectItemType}`;
        }
    }

    getShortcuts(numOptions: number): Array<DropdownItem> {
        const {selectedValues, shortcuts} = this.props;

        if (shortcuts) {
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

    getMenuItems(
        children: Array<React.Element<OptionItem>>,
    ): Array<DropdownItem> {
        const {selectedValues, isFilterable} = this.props;
        const {searchText} = this.state;
        let filteredChildren = children;

        if (isFilterable && searchText) {
            const lowercasedSearchText = searchText.toLowerCase();
            filteredChildren = filteredChildren.filter(
                ({props}) =>
                    props.label.toLowerCase().indexOf(lowercasedSearchText) >
                    -1,
            );
        }

        filteredChildren = filteredChildren.map((option) => {
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

        return filteredChildren;
    }

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    handleSearchTextChanged = (searchText: string) => {
        this.setState({searchText});
    };

    render() {
        const {
            alignment,
            disabled,
            id,
            light,
            placeholder,
            style,
            testId,
            dropdownStyle,
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable no-unused-vars */
            children,
            onChange,
            onToggle,
            opened,
            selectedValues,
            selectItemType,
            implicitAllEnabled,
            isFilterable,
            shortcuts,
            /* eslint-enable no-unused-vars */
            ...sharedProps
        } = this.props;
        const {open, searchText} = this.state;

        const allChildren = React.Children.toArray(children).filter(Boolean);
        const numOptions = allChildren.length;
        const menuText = this.getMenuText(allChildren);

        const opener = (
            <SelectOpener
                {...sharedProps}
                disabled={numOptions === 0 || disabled}
                id={id}
                isPlaceholder={menuText === placeholder}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                ref={this.handleOpenerRef}
                testId={testId}
            >
                {menuText}
            </SelectOpener>
        );

        const filteredItems = this.getMenuItems(allChildren);

        const searchHandler = isFilterable
            ? {
                  onSearchTextChanged: this.handleSearchTextChanged,
                  searchText,
              }
            : {};

        return (
            <DropdownCore
                role="listbox"
                alignment={alignment}
                dropdownStyle={[selectDropdownStyle, dropdownStyle]}
                items={
                    isFilterable
                        ? filteredItems
                        : [...this.getShortcuts(numOptions), ...filteredItems]
                }
                keyboard={this.state.keyboard}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={style}
                {...searchHandler}
            />
        );
    }
}
