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
    alignment?: "left" | "right";
    /**
     * Whether to auto focus an option. Defaults to true.
     */
    autoFocus?: boolean;
    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled?: boolean;
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
    enableTypeAhead?: boolean;
    /**
     * Whether or not the input in is an error state. Defaults to false.
     */
    error?: boolean;
    /**
     * Whether to display the "light" version of this component instead, for
     * use when the component is used on a dark background.
     */
    light?: boolean;
    /**
     * The object containing the custom labels used inside this component.
     */
    labels?: SingleSelectLabels;
    /**
     * When false, the SelectOpener can show a Node as a label. When true, the
     * SelectOpener will use a string as a label. If using custom OptionItems, a
     * plain text label can be provided with the `labelAsText` prop.
     * Defaults to true.
     */
    showOpenerLabelAsText?: boolean;
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
const SingleSelect = (props: Props) => {
    const selectedIndex = React.useRef(0);
    const {
        children,
        error = false,
        id,
        opener,
        light = false,
        placeholder,
        selectedValue,
        testId,
        alignment = "left",
        autoFocus = true,
        dropdownStyle,
        enableTypeAhead = true,
        isFilterable,
        labels = {
            clearSearch: defaultLabels.clearSearch,
            filter: defaultLabels.filter,
            noResults: defaultLabels.noResults,
            someResults: defaultLabels.someSelected,
        },
        onChange,
        onToggle,
        opened,
        style,
        className,
        "aria-invalid": ariaInvalid,
        "aria-required": ariaRequired,
        disabled = false,
        dropdownId,
        showOpenerLabelAsText = true,
        ...sharedProps
    } = props;

    // Whether or not the dropdown is open.
    const [open, setOpen] = React.useState(false);
    // The text input to filter the items by their label. Defaults to an empty string.
    const [searchText, setSearchText] = React.useState("");
    // The DOM reference to the opener element. This is mainly used to set focus
    // to this element, and also to pass the reference to Popper.js.
    const [openerElement, setOpenerElement] = React.useState<HTMLElement>();

    React.useEffect(() => {
        // Used to sync the `opened` state when this component acts as a controlled
        if (disabled) {
            // open should always be false if select is disabled
            setOpen(false);
        } else if (typeof opened === "boolean") {
            setOpen(opened);
        }
    }, [disabled, opened]);

    const handleOpenChanged = (opened: boolean) => {
        setOpen(opened);
        setSearchText("");

        if (onToggle) {
            onToggle(opened);
        }
    };

    const handleToggle = (newSelectedValue: string) => {
        // Call callback if selection changed.
        if (newSelectedValue !== selectedValue) {
            onChange(newSelectedValue);
        }

        // Bring focus back to the opener element.
        if (open && openerElement) {
            openerElement.focus();
        }

        setOpen(false); // close the menu upon selection

        if (onToggle) {
            onToggle(false);
        }
    };

    const mapOptionItemsToDropdownItems = (
        children: OptionItemComponentArray,
    ): DropdownItem[] => {
        // Figure out which index should receive focus when this select opens
        // Needs to exclude counting items that are disabled
        let indexCounter = 0;
        selectedIndex.current = 0;

        return children.map((option) => {
            const {disabled, value} = option.props;
            const selected = selectedValue === value;

            if (selected) {
                selectedIndex.current = indexCounter;
            }

            if (!disabled) {
                indexCounter += 1;
            }

            return {
                component: option,
                focusable: !disabled,
                populatedProps: {
                    onToggle: handleToggle,
                    selected: selected,
                    variant: "check",
                },
            };
        });
    };

    const filterChildren = (
        children: OptionItemComponentArray,
    ): OptionItemComponentArray => {
        const lowercasedSearchText = searchText.toLowerCase();

        // Filter the children with the searchText if any.
        return children.filter(
            ({props}) =>
                !searchText ||
                getLabel(props).toLowerCase().indexOf(lowercasedSearchText) >
                    -1,
        );
    };

    const getMenuItems = (
        children: OptionItemComponentArray,
    ): DropdownItem[] => {
        // If it's not filterable, no need to do any extra besides mapping the
        // option items to dropdown items.
        return mapOptionItemsToDropdownItems(
            isFilterable ? filterChildren(children) : children,
        );
    };

    const handleSearchTextChanged = (searchText: string) => {
        setSearchText(searchText);
    };

    const handleOpenerRef: (node?: any) => void = (node) => {
        const openerElement = ReactDOM.findDOMNode(node) as HTMLElement;
        setOpenerElement(openerElement);
    };

    const handleClick = (e: React.SyntheticEvent) => {
        handleOpenChanged(!open);
    };

    const renderOpener = (
        isDisabled: boolean,
        dropdownId: string,
    ):
        | React.ReactElement<React.ComponentProps<typeof DropdownOpener>>
        | React.ReactElement<React.ComponentProps<typeof SelectOpener>> => {
        const items = React.Children.toArray(
            children,
        ) as OptionItemComponentArray;
        const selectedItem = items.find(
            (option) => option.props.value === selectedValue,
        );
        // If nothing is selected, or if the selectedValue doesn't match any
        // item in the menu, use the placeholder.
        const menuText = selectedItem
            ? getSelectOpenerLabel(showOpenerLabelAsText, selectedItem.props)
            : placeholder;

        const dropdownOpener = (
            <IDProvider id={id} scope="single-select-opener">
                {(uniqueOpenerId) => {
                    return opener ? (
                        <DropdownOpener
                            id={uniqueOpenerId}
                            aria-controls={dropdownId}
                            aria-haspopup="listbox"
                            onClick={handleClick}
                            disabled={isDisabled}
                            ref={handleOpenerRef}
                            text={menuText}
                            opened={open}
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
                            onOpenChanged={handleOpenChanged}
                            open={open}
                            ref={handleOpenerRef}
                            testId={testId}
                        >
                            {menuText}
                        </SelectOpener>
                    );
                }}
            </IDProvider>
        );

        return dropdownOpener;
    };

    const allChildren = (
        React.Children.toArray(children) as Array<
            React.ReactElement<React.ComponentProps<typeof OptionItem>>
        >
    ).filter(Boolean);
    const numEnabledOptions = allChildren.filter(
        (option) => !option.props.disabled,
    ).length;
    const items = getMenuItems(allChildren);
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
                    initialFocusedIndex={selectedIndex.current}
                    items={items}
                    light={light}
                    onOpenChanged={handleOpenChanged}
                    open={open}
                    opener={renderOpener(isDisabled, uniqueDropdownId)}
                    openerElement={openerElement}
                    style={style}
                    className={className}
                    isFilterable={isFilterable}
                    onSearchTextChanged={
                        isFilterable ? handleSearchTextChanged : undefined
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
};

export default SingleSelect;
