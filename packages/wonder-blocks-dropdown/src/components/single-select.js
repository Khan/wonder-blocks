// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import type {AriaProps, StyleType} from "@khanacademy/wonder-blocks-core";

import DropdownCore from "./dropdown-core.js";
import DropdownOpener from "./dropdown-opener.js";
import SelectOpener from "./select-opener.js";
import {
    defaultLabels,
    selectDropdownStyle,
    filterableDropdownStyle,
} from "../util/constants.js";

import typeof OptionItem from "./option-item.js";
import type {DropdownItem, OpenerProps} from "../util/types.js";
import SearchTextInput from "./search-text-input.js";

type Props = {|
    ...AriaProps,

    /**
     * The items in this select.
     */
    children?: Array<?(React.Element<OptionItem> | false)>,

    /**
     * Callback for when the selection. Parameter is the value of the newly
     * selected item.
     */
    onChange: (selectedValue: string) => mixed,

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
     * Unique identifier attached to the field control. If used, we need to
     * guarantee that the ID is unique within everything rendered on a page.
     * Used to match `<label>` with `<button>` elements for screenreaders.
     */
    id?: string,

    /**
     * Placeholder for the opening component when there are no items selected.
     */
    placeholder: string,

    /**
     * Value of the currently selected item.
     */
    selectedValue?: ?string,

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

    /**
     * Adds CSS classes to the opener component wrapper.
     */
    className?: string,

    /**
     * Test ID used for e2e testing.
     */
    testId?: string,

    /**
     * Optional styling to add to the dropdown wrapper.
     */
    dropdownStyle?: StyleType,

    /**
     * The child function that returns the anchor the ActionMenu will be
     * activated by. This function takes eventState, which allows the opener
     * element to access pointer event state.
     */
    opener?: (openerProps: OpenerProps) => React.Element<any>,

    /**
     * When this is true, the dropdown body shows a search text input at the
     * top. The items will be filtered by the input.
     */
    isFilterable?: boolean,
|};

type State = {|
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean,
    /**
     * Whether or not last opened state change was triggered by a keyboard click.
     */
    keyboard?: boolean,

    /**
     * The text input to filter the items by their label. Defaults to an empty
     * string.
     */
    searchText: string,

    /**
     * The DOM reference to the opener element. This is mainly used to set focus
     * to this element, and also to pass the reference to Popper.js.
     */
    openerElement: ?HTMLElement,
|};

type DefaultProps = {|
    alignment: $PropertyType<Props, "alignment">,
    disabled: $PropertyType<Props, "disabled">,
    light: $PropertyType<Props, "light">,
|};

/**
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 *
 * The single select dropdown closes after the selection of an item. If the same
 * item is selected, there is no callback.
 *
 * *NOTE:* The component automatically uses
 * [react-window](https://github.com/bvaughn/react-window) to improve
 * performance when rendering these elements and is capable of handling many
 * hundreds of items without performance problems.
 *
 */
export default class SingleSelect extends React.Component<Props, State> {
    selectedIndex: number;

    static defaultProps: DefaultProps = {
        alignment: "left",
        disabled: false,
        light: false,
    };

    constructor(props: Props) {
        super(props);

        this.selectedIndex = 0;

        this.state = {
            open: false,
            searchText: "",
            openerElement: null,
        };
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

    handleOpenChanged: (opened: boolean, keyboard?: boolean) => void = (
        opened,
        keyboard,
    ) => {
        this.setState({
            open: opened,
            keyboard,
            searchText: "",
        });

        if (this.props.onToggle) {
            this.props.onToggle(opened);
        }
    };

    handleToggle: (selectedValue: string) => void = (selectedValue) => {
        // Call callback if selection changed.
        if (selectedValue !== this.props.selectedValue) {
            this.props.onChange(selectedValue);
        }

        // Bring focus back to the opener element.
        if (this.state.open && this.state.openerElement) {
            this.state.openerElement.focus();
        }

        this.setState({
            open: false, // close the menu upon selection
        });

        if (this.props.onToggle) {
            this.props.onToggle(false);
        }
    };

    mapOptionItemsToDropdownItems: (
        children: Array<React.Element<OptionItem>>,
    ) => Array<DropdownItem> = (children) => {
        // Figure out which index should receive focus when this select opens
        // Needs to exclude counting items that are disabled
        let indexCounter = 0;
        this.selectedIndex = 0;

        return children.map((option) => {
            const {selectedValue} = this.props;
            const {disabled, value} = option.props;
            const selected = selectedValue === value;

            if (!disabled) {
                indexCounter += 1;
            }
            if (selected) {
                this.selectedIndex = indexCounter;
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
    };

    filterChildren(
        children: Array<React.Element<OptionItem>>,
    ): Array<React.Element<OptionItem>> {
        const {searchText} = this.state;

        const lowercasedSearchText = searchText.toLowerCase();

        // Filter the children with the searchText if any.
        return children.filter(
            ({props}) =>
                !searchText ||
                props.label.toLowerCase().indexOf(lowercasedSearchText) > -1,
        );
    }

    getMenuItems(
        children: Array<React.Element<OptionItem>>,
    ): Array<DropdownItem> {
        const {isFilterable} = this.props;

        // If it's not filterable, no need to do any extra besides mapping the
        // option items to dropdown items.
        return this.mapOptionItemsToDropdownItems(
            isFilterable ? this.filterChildren(children) : children,
        );
    }

    getSearchField(): ?DropdownItem {
        if (!this.props.isFilterable) {
            return null;
        }

        return {
            component: (
                <SearchTextInput
                    key="search-text-input"
                    onChange={this.handleSearchTextChanged}
                    searchText={this.state.searchText}
                    labels={{
                        clearSearch: defaultLabels.clearSearch,
                        filter: defaultLabels.filter,
                    }}
                />
            ),
            focusable: true,
            populatedProps: {},
        };
    }

    handleSearchTextChanged: (searchText: string) => void = (searchText) => {
        this.setState({searchText});
    };

    handleOpenerRef: (node: any) => void = (node) => {
        const openerElement = ((ReactDOM.findDOMNode(node): any): HTMLElement);
        this.setState({openerElement});
    };

    handleClick: (e: SyntheticEvent<>) => void = (e) => {
        this.handleOpenChanged(!this.state.open, e.type === "keyup");
    };

    renderOpener(
        numItems: number,
    ):
        | React.Element<typeof DropdownOpener>
        | React.Element<typeof SelectOpener> {
        const {
            children,
            disabled,
            id,
            light,
            opener,
            placeholder,
            selectedValue,
            testId,
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable no-unused-vars */
            alignment,
            dropdownStyle,
            isFilterable,
            onChange,
            onToggle,
            opened,
            style,
            className,
            /* eslint-enable no-unused-vars */
            ...sharedProps
        } = this.props;

        const selectedItem = React.Children.toArray(children).find(
            (option) => option.props.value === selectedValue,
        );
        // If nothing is selected, or if the selectedValue doesn't match any
        // item in the menu, use the placeholder.
        const menuText = selectedItem ? selectedItem.props.label : placeholder;

        const dropdownOpener = opener ? (
            <DropdownOpener
                onClick={this.handleClick}
                disabled={numItems === 0 || disabled}
                ref={this.handleOpenerRef}
                text={menuText}
            >
                {opener}
            </DropdownOpener>
        ) : (
            <SelectOpener
                {...sharedProps}
                disabled={numItems === 0 || disabled}
                id={id}
                isPlaceholder={!selectedItem}
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
            children,
            dropdownStyle,
            isFilterable,
            light,
            style,
            className,
        } = this.props;
        const {searchText} = this.state;
        const allChildren = React.Children.toArray(children).filter(Boolean);
        const filteredItems = this.getMenuItems(allChildren);
        const opener = this.renderOpener(allChildren.length);
        const searchField = this.getSearchField();
        const items = searchField
            ? [searchField, ...filteredItems]
            : filteredItems;

        return (
            <DropdownCore
                role="listbox"
                alignment={alignment}
                dropdownStyle={[
                    isFilterable && filterableDropdownStyle,
                    selectDropdownStyle,
                    dropdownStyle,
                ]}
                initialFocusedIndex={this.selectedIndex}
                items={items}
                keyboard={this.state.keyboard}
                light={light}
                onOpenChanged={this.handleOpenChanged}
                open={this.state.open}
                opener={opener}
                openerElement={this.state.openerElement}
                style={style}
                className={className}
                onSearchTextChanged={
                    isFilterable ? this.handleSearchTextChanged : null
                }
                searchText={isFilterable ? searchText : ""}
            />
        );
    }
}
