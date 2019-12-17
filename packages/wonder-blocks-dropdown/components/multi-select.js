// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {
    AriaProps,
    ClickableState,
    StyleType,
} from "@khanacademy/wonder-blocks-core";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";
import DropdownOpener from "./dropdown-opener.js";
import SearchTextInput from "./search-text-input.js";
import SelectOpener from "./select-opener.js";
import SeparatorItem from "./separator-item.js";
import {
    selectDropdownStyle,
    filterableDropdownStyle,
} from "../util/constants.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem} from "../util/types.js";

type TranslatedLabels = {|
    clearSearch?: string,
    filter?: string,
    noResults?: string,
    selectAllLabel?: string,
    selectNoneLabel?: string,
    noneSelected?: string,
    someSelected?: string,
    allSelected?: string,
|};

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
     * Selected items will be moved to the top when the dropdown is re-opened.
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

    /**
     * The child function that returns the anchor the MultiSelect will be
     * activated by. This function takes eventState, which allows the opener
     * element to access pointer event state.
     */
    opener?: (eventState: ClickableState) => React.Element<any>,

    /**
     * The object containing the translated labels used inside this component.
     */
    translatedLabels?: TranslatedLabels,
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

    /**
     * The selected values that are set when the dropdown is opened. We use
     * this to move the selected items to the top when the dropdown is
     * re-opened.
     */
    lastSelectedValues: Array<string>,
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
            lastSelectedValues: [],
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
            lastSelectedValues: this.props.selectedValues,
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
        const selected = React.Children.toArray(children)
            .filter(Boolean)
            .map((option) => option.props.value);
        onChange(selected);
    };

    handleSelectNone = () => {
        const {onChange} = this.props;
        onChange([]);
    };

    getMenuText(children: Array<React.Element<OptionItem>>) {
        const {
            placeholder,
            implicitAllEnabled,
            selectItemType,
            selectedValues,
            translatedLabels,
        } = this.props;

        // get translations
        const {noneSelected, someSelected, allSelected} =
            translatedLabels || {};

        const allSelectedText = allSelected
            ? allSelected
            : `All ${selectItemType}`;

        // When implicit all enabled, use the allSelectedText when no selection
        // but otherwise, use the placeholder if it exists
        const noSelectionText = implicitAllEnabled
            ? allSelectedText
            : placeholder || noneSelected || `0 ${selectItemType}`;

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
                return (
                    someSelected || `${selectedValues.length} ${selectItemType}`
                );
        }
    }

    getSearchField(): Array<DropdownItem> {
        if (!this.props.isFilterable) {
            return [];
        }

        const {clearSearch, filter} = this.props.translatedLabels || {};

        return [
            {
                component: (
                    <SearchTextInput
                        key="search-text-input"
                        onChange={this.handleSearchTextChanged}
                        searchText={this.state.searchText}
                        translatedLabels={{
                            clearSearch,
                            filter,
                        }}
                    />
                ),
                focusable: true,
                populatedProps: {},
            },
        ];
    }

    getShortcuts(numOptions: number): Array<DropdownItem> {
        const {selectedValues, shortcuts, translatedLabels} = this.props;

        // When there's search text input to filter, shortcuts should be hidden
        if (shortcuts && !this.state.searchText) {
            const selectAllDisabled = numOptions === selectedValues.length;
            const {selectAllLabel, selectNoneLabel} = translatedLabels || {};
            const selectAll = {
                component: (
                    <ActionItem
                        disabled={selectAllDisabled}
                        label={selectAllLabel || `Select all (${numOptions})`}
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
                        label={selectNoneLabel || "Select none"}
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
        const {isFilterable} = this.props;
        // If it's not filterable, no need to do any extra besides mapping the
        // option items to dropdown items.
        if (!isFilterable) {
            return children.map(this.mapOptionItemToDropdownItem);
        }

        const {searchText, lastSelectedValues} = this.state;

        const lowercasedSearchText = searchText.toLowerCase();

        // Filter the children with the searchText if any.
        const filteredChildren = children.filter(
            ({props}) =>
                !searchText ||
                props.label.toLowerCase().indexOf(lowercasedSearchText) > -1,
        );

        const lastSelectedChildren = [];
        const restOfTheChildren = [];
        for (const child of filteredChildren) {
            if (lastSelectedValues.includes(child.props.value)) {
                lastSelectedChildren.push(child);
            } else {
                restOfTheChildren.push(child);
            }
        }

        const lastSelectedItems = lastSelectedChildren.map(
            this.mapOptionItemToDropdownItem,
        );

        // We want to add SeparatorItem in between last selected items and the
        // rest of the items only when both of them exists.
        if (lastSelectedChildren.length && restOfTheChildren.length) {
            lastSelectedItems.push({
                component: <SeparatorItem key="selected-separator" />,
                focusable: false,
                populatedProps: {},
            });
        }

        return [
            ...lastSelectedItems,
            ...restOfTheChildren.map(this.mapOptionItemToDropdownItem),
        ];
    }

    mapOptionItemToDropdownItem = (
        option: React.Element<OptionItem>,
    ): DropdownItem => {
        const {selectedValues} = this.props;
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
    };

    handleOpenerRef = (node: any) => {
        this.openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
    };

    handleSearchTextChanged = (searchText: string) => {
        this.setState({searchText});
    };

    handleClick = (e: SyntheticEvent<>) => {
        this.handleOpenChanged(!this.state.open, e.type === "keyup");
    };

    renderOpener(allChildren: Array<React.Element<OptionItem>>) {
        const {
            disabled,
            id,
            light,
            opener,
            placeholder,
            testId,
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable no-unused-vars */
            alignment,
            dropdownStyle,
            implicitAllEnabled,
            isFilterable,
            onChange,
            onToggle,
            opened,
            selectItemType,
            selectedValues,
            shortcuts,
            style,
            translatedLabels,
            /* eslint-enable no-unused-vars */
            ...sharedProps
        } = this.props;

        const menuText = this.getMenuText(allChildren);
        const numOptions = allChildren.length;

        const dropdownOpener = opener ? (
            <DropdownOpener
                onClick={this.handleClick}
                disabled={numOptions === 0 || disabled}
                ref={this.handleOpenerRef}
                text={menuText}
            >
                {opener}
            </DropdownOpener>
        ) : (
            <SelectOpener
                {...sharedProps}
                disabled={numOptions === 0 || disabled}
                id={id}
                isPlaceholder={menuText === placeholder}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={this.state.open}
                ref={this.handleOpenerRef}
                testId={testId}
            >
                {menuText}
            </SelectOpener>
        );

        return dropdownOpener;
    }

    render() {
        const {
            alignment,
            light,
            style,
            dropdownStyle,
            children,
            isFilterable,
            translatedLabels,
        } = this.props;
        const {open, searchText} = this.state;
        // translations
        const {noResults} = translatedLabels || {};

        const allChildren = React.Children.toArray(children).filter(Boolean);
        const numOptions = allChildren.length;
        const filteredItems = this.getMenuItems(allChildren);
        const opener = this.renderOpener(allChildren);

        return (
            <DropdownCore
                role="listbox"
                alignment={alignment}
                dropdownStyle={[
                    isFilterable && filterableDropdownStyle,
                    selectDropdownStyle,
                    dropdownStyle,
                ]}
                items={[
                    ...this.getSearchField(),
                    ...this.getShortcuts(numOptions),
                    ...filteredItems,
                ]}
                keyboard={this.state.keyboard}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                opener={opener}
                openerElement={this.openerElement}
                style={style}
                onSearchTextChanged={
                    isFilterable ? this.handleSearchTextChanged : null
                }
                searchText={isFilterable ? searchText : ""}
                translatedLabels={{
                    noResults,
                }}
            />
        );
    }
}
