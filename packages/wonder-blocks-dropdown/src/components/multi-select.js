// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import ActionItem from "./action-item.js";
import DropdownCore from "./dropdown-core.js";
import DropdownOpener from "./dropdown-opener.js";
import SearchTextInput from "./search-text-input.js";
import SelectOpener from "./select-opener.js";
import SeparatorItem from "./separator-item.js";
import {
    defaultLabels,
    selectDropdownStyle,
    filterableDropdownStyle,
} from "../util/constants.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem, OpenerProps} from "../util/types.js";

export type Labels = {|
    /**
     * Label for describing the dismiss icon on the search filter.
     */
    clearSearch: string,

    /**
     * Label for the search placeholder.
     */
    filter: string,

    /**
     * Label for when the filter returns no results.
     */
    noResults: string,

    /**
     * Label for the "select all" shortcut option.
     */
    selectAllLabel: (numOptions: number) => string,

    /**
     * Label for the "select none" shortcut option
     */

    selectNoneLabel: string,

    /**
     * Label for the opening component when there are no items selected.
     */
    noneSelected: string,

    /**
     * Label for the opening component when there are some items selected.
     */
    someSelected: (numOptions: number) => string,

    /**
     * Label for the opening component when all the items have been selected.
     */
    allSelected: string,
|};

type DefaultProps = {|
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
     * The values of the items that are currently selected.
     */
    selectedValues: Array<string>,

    /**
     * Whether to display shortcuts for Select All and Select None.
     */
    shortcuts: boolean,
|};

type Props = {|
    ...AriaProps,

    ...DefaultProps,

    /**
     * The items in this select.
     */
    children?: Array<?(React.Element<OptionItem> | false)>,

    /**
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: StyleType,

    /**
     * Unique identifier attached to the field control. If used, we need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<button>` elements for screenreaders.
     */
    id?: string,

    /**
     * When this is true, the menu text shows either "All items" or the value
     * set in `props.labels.allSelected` when no item is selected.
     */
    implicitAllEnabled?: boolean,

    /**
     * When this is true, the dropdown body shows a search text input at the
     * top. The items will be filtered by the input.
     * Selected items will be moved to the top when the dropdown is re-opened.
     */
    isFilterable?: boolean,

    /**
     * The object containing the custom labels used inside this component.
     */
    labels?: Labels,

    /**
     * Callback for when the selection changes. Parameter is an updated array of
     * the values that are now selected.
     */
    onChange: (selectedValues: Array<string>) => mixed,

    /**
     * In controlled mode, use this prop in case the parent needs to be notified
     * when the menu opens/closes.
     */
    onToggle?: (opened: boolean) => mixed,

    /**
     * Can be used to override the state of the ActionMenu by parent elements
     */
    opened?: boolean,

    /**
     * The child function that returns the anchor the MultiSelect will be
     * activated by. This function takes eventState, which allows the opener
     * element to access pointer event state.
     */
    opener?: (openerProps: OpenerProps) => React.Element<any>,

    /**
     * Optional styling to add to the opener component wrapper.
     */
    style?: StyleType,

    /**
     * Adds CSS classes to the opener component wrapper.
     */
    className?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,

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

    /**
     * The object containing the custom labels used inside this component.
     */
    labels: Labels,

    /**
     * The DOM reference to the opener element. This is mainly used to set focus
     * to this element, and also to pass the reference to Popper.js.
     */
    openerElement: ?HTMLElement,
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
    labels: Labels;

    static defaultProps: DefaultProps = {
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
            // merge custom labels with the default ones
            labels: {...defaultLabels, ...props.labels},
            openerElement: null,
        };
        // merge custom labels with the default ones
        this.labels = {...defaultLabels, ...props.labels};
    }

    /**
     * Used to sync the `opened` state when this component acts as a controlled
     * component
     */
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): ?Partial<State> {
        return {
            open: typeof props.opened === "boolean" ? props.opened : state.open,
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.labels !== prevProps.labels) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                labels: {...this.state.labels, ...this.props.labels},
            });
        }
    }

    handleOpenChanged: (opened: boolean) => void = (opened) => {
        this.setState({
            open: opened,
            searchText: "",
            lastSelectedValues: this.props.selectedValues,
        });

        if (this.props.onToggle) {
            this.props.onToggle(opened);
        }
    };

    handleToggle: (selectedValue: string) => void = (selectedValue) => {
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

    handleSelectAll: () => void = () => {
        const {children, onChange} = this.props;
        const selected = React.Children.toArray(children)
            .filter(Boolean)
            .map((option) => option.props.value);
        onChange(selected);
    };

    handleSelectNone: () => void = () => {
        const {onChange} = this.props;
        onChange([]);
    };

    getMenuText(children: Array<React.Element<OptionItem>>): string {
        const {implicitAllEnabled, selectedValues} = this.props;
        const {noneSelected, someSelected, allSelected} = this.state.labels;

        // When implicit all enabled, use `labels.allSelected` when no selection
        // otherwise, use the `labels.noneSelected` value
        const noSelectionText = implicitAllEnabled ? allSelected : noneSelected;

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
                return allSelected;
            default:
                return someSelected(selectedValues.length);
        }
    }

    getSearchField(): Array<DropdownItem> {
        if (!this.props.isFilterable) {
            return [];
        }

        const {clearSearch, filter} = this.state.labels;

        return [
            {
                component: (
                    <SearchTextInput
                        key="search-text-input"
                        onChange={this.handleSearchTextChanged}
                        searchText={this.state.searchText}
                        labels={{
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
        const {selectedValues, shortcuts} = this.props;
        const {selectAllLabel, selectNoneLabel} = this.state.labels;

        // When there's search text input to filter, shortcuts should be hidden
        if (shortcuts && !this.state.searchText) {
            const selectAllDisabled = numOptions === selectedValues.length;
            const selectAll = {
                component: (
                    <ActionItem
                        disabled={selectAllDisabled}
                        label={selectAllLabel(numOptions)}
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
                        label={selectNoneLabel}
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

    mapOptionItemToDropdownItem: (
        option: React.Element<OptionItem>,
    ) => DropdownItem = (option: React.Element<OptionItem>): DropdownItem => {
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

    handleOpenerRef: (node: any) => void = (node: any) => {
        const openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
        this.setState({openerElement});
    };

    handleSearchTextChanged: (searchText: string) => void = (
        searchText: string,
    ) => {
        this.setState({searchText});
    };

    handleClick: (e: SyntheticEvent<>) => void = (e: SyntheticEvent<>) => {
        this.handleOpenChanged(!this.state.open);
    };

    renderOpener(
        allChildren: Array<React.Element<OptionItem>>,
    ):
        | React.Element<typeof DropdownOpener>
        | React.Element<typeof SelectOpener> {
        const {
            disabled,
            id,
            light,
            opener,
            testId,
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable no-unused-vars */
            alignment,
            dropdownStyle,
            implicitAllEnabled,
            isFilterable,
            labels,
            onChange,
            onToggle,
            opened,
            selectedValues,
            shortcuts,
            style,
            className,
            /* eslint-enable no-unused-vars */
            ...sharedProps
        } = this.props;
        const {noneSelected} = this.state.labels;

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
                isPlaceholder={menuText === noneSelected}
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

    render(): React.Node {
        const {
            alignment,
            light,
            style,
            className,
            dropdownStyle,
            children,
            isFilterable,
        } = this.props;
        const {open, searchText} = this.state;
        const {noResults} = this.state.labels;

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
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={open}
                opener={opener}
                openerElement={this.state.openerElement}
                style={style}
                className={className}
                onSearchTextChanged={
                    isFilterable ? this.handleSearchTextChanged : null
                }
                searchText={isFilterable ? searchText : ""}
                labels={{
                    noResults,
                }}
            />
        );
    }
}
