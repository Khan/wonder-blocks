import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Id,
    type AriaProps,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";

import {
    initAnnouncer,
    announceMessage,
} from "@khanacademy/wonder-blocks-announcer";
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
import {
    getLabel,
    getSelectOpenerLabel,
    maybeExtractStringFromNode,
} from "../util/helpers";
import {useSelectValidation} from "../hooks/use-select-validation";

export type SingleSelectLabelsValues = {
    /**
     * Label to create an accessible name for the dismiss icon on the search filter.
     */
    clearSearch: string;
    /**
     * Label for the search placeholder.
     */
    filter: string;
    /**
     * Value for when the filter returns no results.
     */
    noResults: string;
    /**
     * Value for the opening component when there are some items selected.
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
     * The object containing the custom labels and placeholder values used inside this component.
     */
    labels?: SingleSelectLabelsValues;
    /**
     * When false, the SelectOpener can show a Node as a value. When true, the
     * SelectOpener will use a string as a value. If using custom OptionItems, a
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
         * Placeholder value for the opening component when there are no items selected.
         * Note: a label is still necessary to describe the purpose of the select.
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
        /**
         * Whether this field is required to continue, or the error message to
         * render if this field is left blank.
         *
         * This can be a boolean or a string.
         *
         * String:
         * Please pass in a translated string to use as the error message that will
         * render if the user leaves this field blank. If this field is required,
         * and a string is not passed in, a default untranslated string will render
         * upon error.
         * Note: The string will not be used if a `validate` prop is passed in.
         *
         * Example message: i18n._("A password is required to log in.")
         *
         * Boolean:
         * True/false indicating whether this field is required. Please do not pass
         * in `true` if possible - pass in the error string instead.
         * If `true` is passed, and a `validate` prop is not passed, that means
         * there is no corresponding message and the default untranlsated message
         * will be used.
         */
        required?: boolean | string;
        /**
         * Provide a validation for the field value.
         * Return a string error message or null | void for a valid input.
         *
         * Use this for errors that are shown to the user while they are filling out
         * a form.
         */
        validate?: (value?: string | null) => string | null | void;
        /**
         * Called right after the field is validated.
         */
        onValidate?: (errorMessage?: string | null | undefined) => unknown;
    }>;

/**
 * The single select allows the selection of one item. Clients are responsible
 * for keeping track of the selected item in the select.
 *
 * The single select dropdown closes after the selection of an item. If the same
 * item is selected, there is no callback.
 *
 * Make sure to provide a label for the field. This can be done by either:
 * - (recommended) Using the **LabeledField** component to provide a label,
 * description, and/or error message for the field
 * - Using a `label` html tag with the `htmlFor` prop set to the unique id of
 * the field
 * - Using an `aria-label` attribute on the field
 * - Using an `aria-labelledby` attribute on the field
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
 * <SingleSelect aria-label="Your Favorite Fruits" placeholder="Choose a fruit" onChange={setSelectedValue} selectedValue={selectedValue}>
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
 *     aria-label="Your Favorite Fruits"
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
        "aria-label": ariaLabel,
        "aria-invalid": ariaInvalid,
        "aria-required": ariaRequired,
        disabled = false,
        dropdownId,
        validate,
        onValidate,
        required,
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
    const {
        errorMessage,
        onOpenerBlurValidation,
        onDropdownClosedValidation,
        onSelectionValidation,
    } = useSelectValidation({
        value: selectedValue,
        disabled,
        validate,
        onValidate,
        required,
        open,
    });
    const hasError = error || !!errorMessage;

    React.useEffect(() => {
        initAnnouncer();
    }, []);

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
        if (!opened) {
            // If dropdown is closed, handle dropdown closed validation
            onDropdownClosedValidation();
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

        // Validate when a value is selected
        onSelectionValidation(newSelectedValue);
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
        // eslint-disable-next-line import/no-deprecated
        const openerElement = ReactDOM.findDOMNode(node) as HTMLElement;
        setOpenerElement(openerElement);
    };

    const handleClick = (e: React.SyntheticEvent) => {
        handleOpenChanged(!open);
    };

    const handleAnnouncement = (message: string) => {
        announceMessage({
            message,
        });
    };

    // Announce when selectedValue or children changes in the opener
    React.useEffect(() => {
        const optionItems = React.Children.toArray(
            children,
        ) as OptionItemComponentArray;
        const selectedItem = optionItems.find(
            (option) => option.props.value === selectedValue,
        );
        if (selectedItem) {
            const label = getLabel(selectedItem.props);
            if (label) {
                handleAnnouncement(label);
            }
        }
    }, [selectedValue, children]);

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

        let menuContent;
        if (selectedItem) {
            const menuStringOrNode = getSelectOpenerLabel(
                showOpenerLabelAsText,
                selectedItem.props,
            );
            // We only need the guaranteed node for SingleSelect here
            // As the string label for the Announcer is in a useEffect above
            const [, node] = maybeExtractStringFromNode(menuStringOrNode);
            menuContent = node;
        } else {
            // If nothing is selected, or if the selectedValue doesn't match any
            // item in the menu, use the placeholder.
            menuContent = placeholder;
        }

        const dropdownOpener = (
            <Id id={id}>
                {(uniqueOpenerId) => {
                    return opener ? (
                        <DropdownOpener
                            id={uniqueOpenerId}
                            aria-label={ariaLabel}
                            aria-controls={dropdownId}
                            aria-haspopup="listbox"
                            onClick={handleClick}
                            disabled={isDisabled}
                            ref={handleOpenerRef}
                            role="combobox"
                            text={menuContent}
                            opened={open}
                            error={hasError}
                            onBlur={onOpenerBlurValidation}
                        >
                            {opener}
                        </DropdownOpener>
                    ) : (
                        <SelectOpener
                            {...sharedProps}
                            aria-label={ariaLabel}
                            aria-controls={dropdownId}
                            disabled={isDisabled}
                            id={uniqueOpenerId}
                            error={hasError}
                            isPlaceholder={!selectedItem}
                            onOpenChanged={handleOpenChanged}
                            open={open}
                            ref={handleOpenerRef}
                            testId={testId}
                            onBlur={onOpenerBlurValidation}
                        >
                            {menuContent}
                        </SelectOpener>
                    );
                }}
            </Id>
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

    // Extract out someResults. When we put labels in the dependency array,
    // useEffect happens on every render (I think because labels is a new object)
    // each time so it thinks it has changed
    const {someResults} = labels;

    // Announce in a screen reader when the number of filtered items changes
    React.useEffect(() => {
        handleAnnouncement(someResults(items.length));
    }, [items.length, someResults]);

    return (
        <Id id={dropdownId}>
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
        </Id>
    );
};

export default SingleSelect;
