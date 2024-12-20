import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Id,
    type AriaProps,
    type StyleType,
} from "@khanacademy/wonder-blocks-core";

import ActionItem from "./action-item";
import DropdownCore from "./dropdown-core";
import DropdownOpener from "./dropdown-opener";
import SelectOpener from "./select-opener";
import SeparatorItem from "./separator-item";
import {
    defaultLabels,
    selectDropdownStyle,
    filterableDropdownStyle,
} from "../util/constants";

import OptionItem from "./option-item";
import type {
    DropdownItem,
    OpenerProps,
    OptionItemComponent,
    OptionItemComponentArray,
} from "../util/types";
import {getLabel, getSelectOpenerLabel} from "../util/helpers";
import {useSelectValidation} from "../hooks/use-select-validation";

export type Labels = {
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
     * Label for the "select all" shortcut option.
     */
    selectAllLabel: (numOptions: number) => string;
    /**
     * Label for the "select none" shortcut option
     */

    selectNoneLabel: string;
    /**
     * Label for the opening component when there are no items selected.
     */
    noneSelected: string;
    /**
     * Label for the opening component when there are some items selected.
     */
    someSelected: (numOptions: number) => string;
    /**
     * Label for the opening component when all the items have been selected.
     */
    allSelected: string;
};

type DefaultProps = Readonly<{
    /**
     * Whether this dropdown should be left-aligned or right-aligned with the
     * opener component. Defaults to left-aligned.
     */
    alignment?: "left" | "right";
    /**
     * Whether this component is disabled. A disabled dropdown may not be opened
     * and does not support interaction. Defaults to false.
     */
    disabled?: boolean;
    /**
     * Whether this component is in an error state. Defaults to false.
     */
    error?: boolean;
    /**
     * Whether to display the "light" version of this component instead, for
     * use when the component is used on a dark background.
     */
    light?: boolean;
    /**
     * The values of the items that are currently selected.
     */
    selectedValues?: Array<string>;
    /**
     * Whether to display shortcuts for Select All and Select None.
     */
    shortcuts?: boolean;
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
         * Optional styling to add to the dropdown wrapper.
         */
        dropdownStyle?: StyleType;
        /**
         * Unique identifier attached to the field control. If used, we need to
         * guarantee that the ID is unique within everything rendered on a page.
         * Used to match `<label>` with `<button>` elements for screenreaders.
         */
        id?: string;
        /**
         * When this is true, the menu text shows either "All items" or the value
         * set in `props.labels.allSelected` when no item is selected.
         */
        implicitAllEnabled?: boolean;
        /**
         * When this is true, the dropdown body shows a search text input at the
         * top. The items will be filtered by the input.
         * Selected items will be moved to the top when the dropdown is re-opened.
         */
        isFilterable?: boolean;
        /**
         * The object containing the custom labels used inside this component.
         */
        labels?: Labels;
        /**
         * Callback for when the selection changes. Parameter is an updated array of
         * the values that are now selected.
         */
        onChange: (selectedValues: Array<string>) => unknown;
        /**
         * In controlled mode, use this prop in case the parent needs to be notified
         * when the menu opens/closes.
         */
        onToggle?: (opened: boolean) => unknown;
        /**
         * Can be used to override the state of the ActionMenu by parent elements
         */
        opened?: boolean;
        /**
         * The child function that returns the anchor the MultiSelect will be
         * activated by. This function takes eventState, which allows the opener
         * element to access pointer event state.
         */
        opener?: (openerProps: OpenerProps) => React.ReactElement<any>;
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
        validate?: (value: string[]) => string | null | void;
        /**
         * Called right after the field is validated.
         */
        onValidate?: (errorMessage?: string | null | undefined) => unknown;
    }>;

/**
 * A dropdown that consists of multiple selection items. This select allows
 * multiple options to be selected. Clients are responsible for keeping track
 * of the selected items.
 *
 * The multi select stays open until closed by the user. The onChange callback
 * happens every time there is a change in the selection of the items.
 *
 * ## Usage
 *
 * ```jsx
 * import {OptionItem, MultiSelect} from "@khanacademy/wonder-blocks-dropdown";
 *
 * <MultiSelect onChange={setSelectedValues} selectedValues={selectedValues}>
 *  <OptionItem value="pear">Pear</OptionItem>
 *  <OptionItem value="mango">Mango</OptionItem>
 * </MultiSelect>
 * ```
 */
const MultiSelect = (props: Props) => {
    const {
        id,
        light = false,
        opener,
        testId,
        alignment = "left",
        dropdownStyle,
        implicitAllEnabled,
        isFilterable,
        labels: propLabels,
        onChange,
        onToggle,
        opened,
        selectedValues = [],
        shortcuts = false,
        style,
        className,
        "aria-invalid": ariaInvalid,
        "aria-required": ariaRequired,
        disabled = false,
        error = false,
        children,
        dropdownId,
        showOpenerLabelAsText = true,
        validate,
        onValidate,
        required,
        ...sharedProps
    } = props;

    // Merge custom labels with the default ones
    const labels = {...defaultLabels, ...propLabels};

    // Whether or not the dropdown is open.
    const [open, setOpen] = React.useState(false);

    // The text input to filter the items by their label. Defaults to an empty
    // string.
    const [searchText, setSearchText] = React.useState("");

    // The selected values that are set when the dropdown is opened. We use this
    // to move the selected items to the top when the dropdown is re-opened.
    const [lastSelectedValues, setLastSelectedValues] = React.useState<
        string[]
    >([]);

    // The DOM reference to the opener element. This is mainly used to set focus
    // to this element, and also to pass the reference to Popper.js.
    const [openerElement, setOpenerElement] = React.useState<HTMLElement>();

    const {
        errorMessage,
        onOpenerBlurValidation,
        onDropdownClosedValidation,
        onSelectionValidation,
        onSelectedValuesChangeValidation,
    } = useSelectValidation({
        value: selectedValues,
        disabled,
        validate,
        onValidate,
        required,
        open,
    });

    const hasError = error || !!errorMessage;

    React.useEffect(() => {
        // Used to sync the `opened` state when this component acts as a controlled component
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
        setLastSelectedValues(selectedValues);

        if (onToggle) {
            onToggle(opened);
        }

        // Handle validation when it is closed
        if (!opened) {
            if (lastSelectedValues !== selectedValues) {
                // If lastSelectedValues is not the same as selectedValues, trigger selection validation
                onSelectionValidation(selectedValues);
            } else {
                // If there are no changes to the selected values, trigger closed validation
                onDropdownClosedValidation();
            }
        }
    };

    const handleToggle = (selectedValue: string) => {
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
        // Handle validation when the selected values change
        onSelectedValuesChangeValidation();
    };

    const handleSelectAll = () => {
        const allChildren = React.Children.toArray(
            children,
        ) as Array<React.ReactElement>;

        const selected = allChildren
            .filter((option) => !!option && !option.props.disabled)
            .map((option) => option.props.value);
        onChange(selected);
        onSelectedValuesChangeValidation();
    };

    const handleSelectNone = () => {
        onChange([]);
        onSelectedValuesChangeValidation();
    };

    const getMenuText = (
        children: OptionItemComponentArray,
    ): string | JSX.Element => {
        const {noneSelected, someSelected, allSelected} = labels;
        const numSelectedAll = children.filter(
            (option) => !option.props.disabled,
        ).length;

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

                if (selectedItem) {
                    const selectedLabel = getSelectOpenerLabel(
                        showOpenerLabelAsText,
                        selectedItem?.props,
                    );
                    if (selectedLabel) {
                        return selectedLabel;
                        // If the label is a ReactNode and `labelAsText` is not set,
                        // we fallback to, the default label for the case where only
                        // one item is selected.
                    } else {
                        return someSelected(1);
                    }
                }

                return noSelectionText;
            case numSelectedAll:
                return allSelected;
            default:
                return someSelected(selectedValues.length);
        }
    };

    const getShortcuts = (numOptions: number): DropdownItem[] => {
        const {selectAllLabel, selectNoneLabel} = labels;

        // When there's search text input to filter, shortcuts should be hidden
        if (shortcuts && !searchText) {
            const selectAllDisabled = numOptions === selectedValues.length;
            const selectAll = {
                component: (
                    <ActionItem
                        disabled={selectAllDisabled}
                        label={selectAllLabel(numOptions)}
                        indent={true}
                        onClick={handleSelectAll}
                    />
                ),
                focusable: !selectAllDisabled,
                populatedProps: {},
            } as const;

            const selectNoneDisabled = selectedValues.length === 0;
            const selectNone = {
                component: (
                    <ActionItem
                        disabled={selectNoneDisabled}
                        label={selectNoneLabel}
                        indent={true}
                        onClick={handleSelectNone}
                    />
                ),
                focusable: !selectNoneDisabled,
                populatedProps: {},
            } as const;

            const separator = {
                component: <SeparatorItem key="shortcuts-separator" />,
                focusable: false,
                populatedProps: {},
            } as const;

            return [selectAll, selectNone, separator];
        } else {
            return [];
        }
    };

    const getMenuItems = (
        children: OptionItemComponentArray,
    ): DropdownItem[] => {
        // If it's not filterable, no need to do any extra besides mapping the
        // option items to dropdown items.
        if (!isFilterable) {
            return children.map(mapOptionItemToDropdownItem);
        }

        const lowercasedSearchText = searchText.toLowerCase();

        // Filter the children with the searchText if any.
        const filteredChildren = children.filter(
            ({props}) =>
                !searchText ||
                getLabel(props).toLowerCase().indexOf(lowercasedSearchText) >
                    -1,
        );

        const lastSelectedChildren: OptionItemComponentArray = [];
        const restOfTheChildren: OptionItemComponentArray = [];
        for (const child of filteredChildren) {
            if (lastSelectedValues.includes(child.props.value)) {
                lastSelectedChildren.push(child);
            } else {
                restOfTheChildren.push(child);
            }
        }

        const lastSelectedItems = lastSelectedChildren.map(
            mapOptionItemToDropdownItem,
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
            ...restOfTheChildren.map(mapOptionItemToDropdownItem),
        ];
    };

    const mapOptionItemToDropdownItem = (
        option: OptionItemComponent,
    ): DropdownItem => {
        const {disabled, value} = option.props;
        return {
            component: option,
            focusable: !disabled,
            populatedProps: {
                onToggle: handleToggle,
                selected: selectedValues.includes(value),
                variant: "checkbox",
            },
        };
    };

    const handleOpenerRef = (node?: any) => {
        const openerElement = ReactDOM.findDOMNode(node) as HTMLElement;
        setOpenerElement(openerElement);
    };

    const handleSearchTextChanged = (searchText: string) => {
        setSearchText(searchText);
    };

    const handleClick = (e: React.SyntheticEvent) => {
        handleOpenChanged(!open);
    };

    const renderOpener = (
        allChildren: React.ReactElement<
            React.ComponentProps<typeof OptionItem>
        >[],
        isDisabled: boolean,
        dropdownId: string,
    ):
        | React.ReactElement<React.ComponentProps<typeof DropdownOpener>>
        | React.ReactElement<React.ComponentProps<typeof SelectOpener>> => {
        const {noneSelected} = labels;

        const menuText = getMenuText(allChildren);

        const dropdownOpener = (
            <Id id={id}>
                {(uniqueOpenerId) => {
                    return opener ? (
                        <DropdownOpener
                            id={uniqueOpenerId}
                            error={hasError}
                            aria-controls={dropdownId}
                            aria-haspopup="listbox"
                            onClick={handleClick}
                            onBlur={onOpenerBlurValidation}
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
                            error={hasError}
                            disabled={isDisabled}
                            id={uniqueOpenerId}
                            aria-controls={dropdownId}
                            isPlaceholder={menuText === noneSelected}
                            light={light}
                            onOpenChanged={handleOpenChanged}
                            onBlur={onOpenerBlurValidation}
                            open={open}
                            ref={handleOpenerRef}
                            testId={testId}
                        >
                            {menuText}
                        </SelectOpener>
                    );
                }}
            </Id>
        );

        return dropdownOpener;
    };

    const {clearSearch, filter, noResults, someSelected} = labels;

    const allChildren = (
        React.Children.toArray(children) as Array<
            React.ReactElement<React.ComponentProps<typeof OptionItem>>
        >
    ).filter(Boolean);
    const numEnabledOptions = allChildren.filter(
        (option) => !option.props.disabled,
    ).length;
    const filteredItems = getMenuItems(allChildren);
    const isDisabled = numEnabledOptions === 0 || disabled;

    return (
        <Id id={dropdownId}>
            {(uniqueDropdownId) => (
                <DropdownCore
                    id={uniqueDropdownId}
                    role="listbox"
                    alignment={alignment}
                    dropdownStyle={[
                        isFilterable && filterableDropdownStyle,
                        selectDropdownStyle,
                        dropdownStyle,
                    ]}
                    isFilterable={isFilterable}
                    items={[
                        ...getShortcuts(numEnabledOptions),
                        ...filteredItems,
                    ]}
                    light={light}
                    onOpenChanged={handleOpenChanged}
                    open={open}
                    opener={renderOpener(
                        allChildren,
                        isDisabled,
                        uniqueDropdownId,
                    )}
                    openerElement={openerElement}
                    selectionType="multi"
                    style={style}
                    className={className}
                    onSearchTextChanged={
                        isFilterable ? handleSearchTextChanged : undefined
                    }
                    searchText={isFilterable ? searchText : ""}
                    labels={{
                        clearSearch,
                        filter,
                        noResults,
                        someResults: someSelected,
                    }}
                    aria-invalid={ariaInvalid}
                    aria-required={ariaRequired}
                    disabled={isDisabled}
                />
            )}
        </Id>
    );
};

export default MultiSelect;
