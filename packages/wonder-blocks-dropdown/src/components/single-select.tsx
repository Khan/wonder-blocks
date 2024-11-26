import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    IDProvider,
    type AriaProps,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";

import DropdownCore from "./dropdown-core";
import DropdownOpener from "./dropdown-opener";
import SelectOpener from "./select-opener";
import {
    defaultLabels,
    selectDropdownStyle,
    filterableDropdownStyle,
} from "../util/constants";

import OptionItem from "./option-item";
import type {
    DropdownItem,
    OpenerProps,
    OptionItemComponentArray,
} from "../util/types";
import {getLabel, getSelectOpenerLabel} from "../util/helpers";

export type SingleSelectLabels = {
    /**
     * Label for describing the dismiss icon on the search filter.
     */
    clearSearch: string;
    /**
     * Label for the search placeholder.
     */
    filter: string;
    /**
     * Label for when the filter returns no results.
     */
    noResults: string;
    /**
     * Label for the opening component when there are some items selected.
     */
    someResults: (numOptions: number) => string;
};

type DefaultProps = Readonly<{
    /**
     * Whether this dropdown should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment: "left" | "right";
    /**
     * Whether to auto focus an option. Defaults to true.
     */
    autoFocus: boolean;
    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled: boolean;
    /**
     * Whether to enable the type-ahead suggestions feature. Defaults to true.
     *
     * This feature allows to navigate the listbox using the keyboard.
     * - Type a character: focus moves to the next item with a name that starts
     *   with the typed character.
     * - Type multiple characters in rapid succession: focus moves to the next
     *   item with a name that starts with the string of characters typed.
     *
     * **NOTE:** Type-ahead is recommended for all listboxes, but there might be
     * some cases where it's not desirable (for example when using a `TextField`
     * as the opener element).
     */
    enableTypeAhead: boolean;
    /**
     * Whether or not the input in is an error state. Defaults to false.
     */
    error: boolean;
    /**
     * Whether to display the "light" version of this component instead, for
     * use when the component is used on a dark background.
     */
    light: boolean;
    /**
     * The object containing the custom labels used inside this component.
     */
    labels: SingleSelectLabels;
    /**
     * When false, the SelectOpener can show a Node as a label. When true, the
     * SelectOpener will use a string as a label. If using custom OptionItems, a
     * plain text label can be provided with the `labelAsText` prop.
     * Defaults to true.
     */
    showLabelAsText: boolean;
}>;

type Props = AriaProps &
    DefaultProps &
    Readonly<{
        /**
         * The items in this select.
         */
        children?: Array<
            | React.ReactElement<React.ComponentProps<typeof OptionItem>>
            | false
            | null
            | undefined
        >;
        /**
         * Callback for when the selection. Parameter is the value of the newly
         * selected item.
         */
        onChange: (selectedValue: string) => unknown;
        /**
         * Can be used to override the state of the ActionMenu by parent elements
         */
        opened?: boolean;
        /**
         * In controlled mode, use this prop in case the parent needs to be notified
         * when the menu opens/closes.
         */
        onToggle?: (opened: boolean) => unknown;
        /**
         * Unique identifier attached to the field control. If used, we need to
         * guarantee that the ID is unique within everything rendered on a page.
         * Used to match `<label>` with `<button>` elements for screenreaders.
         */
        id?: string;
        /**
         * Placeholder for the opening component when there are no items selected.
         */
        placeholder: string;
        /**
         * Value of the currently selected item.
         */
        selectedValue?: string | null | undefined;
        /**
         * Optional styling to add to the opener component wrapper.
         */
        style?: StyleType;
        /**
         * Adds CSS classes to the opener component wrapper.
         */
        className?: string;
        /**
         * Test ID used for e2e testing.
         */
        testId?: string;
        /**
         * Optional styling to add to the dropdown wrapper.
         */
        dropdownStyle?: StyleType;
        /**
         * The child function that returns the anchor the ActionMenu will be
         * activated by. This function takes eventState, which allows the opener
         * element to access pointer event state.
         */
        opener?: (openerProps: OpenerProps) => React.ReactElement<any>;
        /**
         * When this is true, the dropdown body shows a search text input at the
         * top. The items will be filtered by the input.
         */
        isFilterable?: boolean;
        /**
         * Unique identifier attached to the listbox dropdown. If used, we need to
         * guarantee that the ID is unique within everything rendered on a page.
         * If one is not provided, one is auto-generated. It is used for the
         * opener's `aria-controls` attribute for screenreaders.
         */
        dropdownId?: string;
    }>;

type State = Readonly<{
    /**
     * Whether or not the dropdown is open.
     */
    open: boolean;
    /**
     * The text input to filter the items by their label. Defaults to an empty
     * string.
     */
    searchText: string;
    /**
     * The DOM reference to the opener element. This is mainly used to set focus
     * to this element, and also to pass the reference to Popper.js.
     */
    openerElement?: HTMLElement;
}>;

/**
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 *
 * The single select dropdown closes after the selection of an item. If the same
 * item is selected, there is no callback.
 *
 * **NOTE:** If there are more than 125 items, the component automatically uses
 * [react-window](https://github.com/bvaughn/react-window) to improve
 * performance when rendering these elements and is capable of handling many
 * hundreds of items without performance problems.
 *
 * ## Usage
 * General usage
 *
 * ```jsx
 * import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
 *
 * const [selectedValue, setSelectedValue] = React.useState("");
 *
 * <SingleSelect placeholder="Choose a fruit" onChange={setSelectedValue} selectedValue={selectedValue}>
 *     <OptionItem label="Pear" value="pear" />
 *     <OptionItem label="Mango" value="mango" />
 * </SingleSelect>
 * ```
 *
 * Mapping a list
 *
 * ```jsx
 * import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
 *
 * const [selectedValue, setSelectedValue] = React.useState("");
 * const fruitArray = ["Apple", "Banana", "Orange", "Mango", "Pear"];
 *
 * <SingleSelect
 *     placeholder="Choose a fruit"
 *     onChange={setSelectedValue}
 *     selectedValue={selectedValue}
 * >
 *     {fruitArray.map((value, index) => (
 *         <OptionItem key={index} value={value} label={value} />
 *     ))}
 * </SingleSelect>
 * ```
 */
export default class SingleSelect extends React.Component<Props, State> {
    selectedIndex: number;

    static defaultProps: DefaultProps = {
        alignment: "left",
        autoFocus: true,
        disabled: false,
        enableTypeAhead: true,
        error: false,
        light: false,
        labels: {
            clearSearch: defaultLabels.clearSearch,
            filter: defaultLabels.filter,
            noResults: defaultLabels.noResults,
            someResults: defaultLabels.someSelected,
        },
        showLabelAsText: true,
    };

    constructor(props: Props) {
        super(props);

        this.selectedIndex = 0;

        this.state = {
            open: false,
            searchText: "",
        };
    }

    /**
     * Used to sync the `opened` state when this component acts as a controlled
     * component
     */
    static getDerivedStateFromProps(
        props: Props,
        state: State,
    ): Partial<State> | null {
        return {
            // open should always be false if select is disabled
            open: props.disabled
                ? false
                : typeof props.opened === "boolean"
                ? props.opened
                : state.open,
        };
    }

    handleOpenChanged: (opened: boolean) => void = (opened) => {
        this.setState({
            open: opened,
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
        children: OptionItemComponentArray,
    ) => DropdownItem[] = (children) => {
        // Figure out which index should receive focus when this select opens
        // Needs to exclude counting items that are disabled
        let indexCounter = 0;
        this.selectedIndex = 0;

        return children.map((option) => {
            const {selectedValue} = this.props;
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
    };

    filterChildren(
        children: OptionItemComponentArray,
    ): OptionItemComponentArray {
        const {searchText} = this.state;

        const lowercasedSearchText = searchText.toLowerCase();

        // Filter the children with the searchText if any.
        return children.filter(
            ({props}) =>
                !searchText ||
                getLabel(props).toLowerCase().indexOf(lowercasedSearchText) >
                    -1,
        );
    }

    getMenuItems(children: OptionItemComponentArray): DropdownItem[] {
        const {isFilterable} = this.props;

        // If it's not filterable, no need to do any extra besides mapping the
        // option items to dropdown items.
        return this.mapOptionItemsToDropdownItems(
            isFilterable ? this.filterChildren(children) : children,
        );
    }

    handleSearchTextChanged: (searchText: string) => void = (searchText) => {
        this.setState({searchText});
    };

    handleOpenerRef: (node?: any) => void = (node) => {
        const openerElement = ReactDOM.findDOMNode(node) as HTMLElement;
        this.setState({openerElement});
    };

    handleClick: (e: React.SyntheticEvent) => void = (e) => {
        this.handleOpenChanged(!this.state.open);
    };

    renderOpener(
        isDisabled: boolean,
        dropdownId: string,
    ):
        | React.ReactElement<React.ComponentProps<typeof DropdownOpener>>
        | React.ReactElement<React.ComponentProps<typeof SelectOpener>> {
        const {
            children,
            error,
            id,
            light,
            opener,
            placeholder,
            selectedValue,
            testId,
            // the following props are being included here to avoid
            // passing them down to the opener as part of sharedProps
            /* eslint-disable @typescript-eslint/no-unused-vars */
            alignment,
            autoFocus,
            dropdownStyle,
            enableTypeAhead,
            isFilterable,
            labels,
            onChange,
            onToggle,
            opened,
            style,
            className,
            "aria-invalid": ariaInvalid,
            "aria-required": ariaRequired,
            showLabelAsText,
            ...sharedProps
        } = this.props;

        const items = React.Children.toArray(
            children,
        ) as OptionItemComponentArray;
        const selectedItem = items.find(
            (option) => option.props.value === selectedValue,
        );
        // If nothing is selected, or if the selectedValue doesn't match any
        // item in the menu, use the placeholder.
        const menuText = selectedItem
            ? getSelectOpenerLabel(showLabelAsText, selectedItem.props)
            : placeholder;

        const dropdownOpener = (
            <IDProvider id={id} scope="single-select-opener">
                {(uniqueOpenerId) => {
                    return opener ? (
                        <DropdownOpener
                            id={uniqueOpenerId}
                            aria-controls={dropdownId}
                            aria-haspopup="listbox"
                            onClick={this.handleClick}
                            disabled={isDisabled}
                            ref={this.handleOpenerRef}
                            text={menuText}
                            opened={this.state.open}
                        >
                            {opener}
                        </DropdownOpener>
                    ) : (
                        <SelectOpener
                            {...sharedProps}
                            aria-controls={dropdownId}
                            disabled={isDisabled}
                            id={uniqueOpenerId}
                            error={error}
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
                }}
            </IDProvider>
        );

        return dropdownOpener;
    }

    render(): React.ReactNode {
        const {
            alignment,
            autoFocus,
            children,
            className,
            dropdownStyle,
            enableTypeAhead,
            isFilterable,
            labels,
            light,
            style,
            "aria-invalid": ariaInvalid,
            "aria-required": ariaRequired,
            disabled,
            dropdownId,
        } = this.props;
        const {searchText} = this.state;
        const allChildren = (
            React.Children.toArray(children) as Array<
                React.ReactElement<React.ComponentProps<typeof OptionItem>>
            >
        ).filter(Boolean);
        const numEnabledOptions = allChildren.filter(
            (option) => !option.props.disabled,
        ).length;
        const items = this.getMenuItems(allChildren);
        const isDisabled = numEnabledOptions === 0 || disabled;

        return (
            <IDProvider id={dropdownId} scope="single-select-dropdown">
                {(uniqueDropdownId) => (
                    <DropdownCore
                        id={uniqueDropdownId}
                        role="listbox"
                        selectionType="single"
                        alignment={alignment}
                        autoFocus={autoFocus}
                        enableTypeAhead={enableTypeAhead}
                        dropdownStyle={[
                            isFilterable && filterableDropdownStyle,
                            selectDropdownStyle,
                            dropdownStyle,
                        ]}
                        initialFocusedIndex={this.selectedIndex}
                        items={items}
                        light={light}
                        onOpenChanged={this.handleOpenChanged}
                        open={this.state.open}
                        opener={this.renderOpener(isDisabled, uniqueDropdownId)}
                        openerElement={this.state.openerElement}
                        style={style}
                        className={className}
                        isFilterable={isFilterable}
                        onSearchTextChanged={
                            isFilterable
                                ? this.handleSearchTextChanged
                                : undefined
                        }
                        searchText={isFilterable ? searchText : ""}
                        labels={labels}
                        aria-invalid={ariaInvalid}
                        aria-required={ariaRequired}
                        disabled={isDisabled}
                    />
                )}
            </IDProvider>
        );
    }
}
