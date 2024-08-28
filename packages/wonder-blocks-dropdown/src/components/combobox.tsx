import {StyleSheet} from "aphrodite";
import * as React from "react";

import caretDownIcon from "@phosphor-icons/core/regular/caret-down.svg";

import {
    StyleType,
    useUniqueIdWithMock,
    View,
} from "@khanacademy/wonder-blocks-core";
import {TextField} from "@khanacademy/wonder-blocks-form";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {border, color, spacing} from "@khanacademy/wonder-blocks-tokens";

import {DetailCell} from "@khanacademy/wonder-blocks-cell";
import {useListbox} from "../hooks/use-listbox";
import {useMultipleSelection} from "../hooks/use-multiple-selection";
import {
    ComboboxLabels,
    MaybeValueOrValues,
    OptionItemComponent,
} from "../util/types";
import {defaultComboboxLabels} from "../util/constants";
import {ComboboxLiveRegion} from "./combobox-live-region";
import {MultipleSelection} from "./combobox-multiple-selection";
import DropdownPopper from "./dropdown-popper";
import Listbox from "./listbox";
import {getLabel} from "../util/helpers";

type Props = {
    /**
     * The list of items to display in the listbox.
     */
    children: Array<OptionItemComponent>;

    /**
     * Whether the use can select more than one option item. Defaults to
     * `single`.
     *
     * If `multiple` is selected, `aria-multiselectable={true}` is set
     * internally in the listbox element.
     */
    selectionType: "single" | "multiple";

    /**
     * The value of the currently selected items.
     */
    value: MaybeValueOrValues;

    /**
     * Callback for when the selection changes. The value passed as an argument
     * is an updated array of the selected value(s).
     */
    onChange?: (value: MaybeValueOrValues) => void;

    /**
     * Whether the combobox is disabled.
     *
     * A disabled combobox does not support interaction, but it supports focus
     * for a11y reasons. It internally maps to`aria-disabled`. Defaults to
     * false.
     */
    disabled?: boolean;

    /**
     * The unique identifier of the combobox element.
     */
    id?: string;

    /**
     * The object containing the custom labels used inside this component.
     */
    labels?: ComboboxLabels;

    /**
     * Whether to display the light version of this component.
     *
     * For use when the component is used on a dark background. Defaults to
     * false.
     */
    light?: boolean;

    /**
     * TODO(WB-1678): Add async support to the listbox.
     *
     * Whether to display the loading state to let the user know that the
     * results are being loaded asynchronously. Defaults to false.
     */
    loading?: boolean;

    /**
     * Can be used to programmatically control the opening of the listbox.
     */
    opened?: boolean;

    /**
     * In controlled mode, use this prop in case the parent needs to be notified
     * when the listbox opens/closes.
     */
    onToggle?: (opened: boolean) => void;

    /**
     * Text that provides context for the user when there are no items selected.
     */
    placeholder?: string;

    /**
     * Custom styles to add to the combobox element (input).
     */
    style?: StyleType;

    /**
     * Test ID used for e2e testing.
     */
    testId?: string;

    /**
     * Indicates whether inputting text could trigger display of one or more
     * predictions of the user’s intended value.
     *
     * It’s internally mapped to aria-autocomplete set in the input field
     * (combobox).
     *
     * TODO(WB-1740): Add support to `inline` and `both` values.
     */
    autoComplete?: "none" | "list" | undefined;
};

/**
 * A `Combobox` is an input widget that has an associated `listbox`. This
 * listbox enables users to choose one or more values for the input from a
 * collection of option items.
 *
 * The `listbox` is hidden by default, so its default state is collapsed. The
 * conditions that trigger expanding the `listbox` are:
 *
 * - It is displayed when the `ArrowDown`, `ArrowUp` keys are pressed, or the
 *   Open button (🔽) is pressed.
 * - It is displayed when the combobox receives focus.
 */
export default function Combobox({
    autoComplete,
    children,
    disabled,
    id,
    labels = defaultComboboxLabels,
    onChange,
    onToggle,
    opened,
    placeholder,
    selectionType = "single",
    testId,
    value = "",
}: Props) {
    const ids = useUniqueIdWithMock("combobox");
    const uniqueId = id ?? ids.get("listbox");
    // Ref to the combobox input element.
    const comboboxRef = React.useRef<HTMLInputElement>(null);
    // Ref to the top-level node of the combobox.
    const rootNodeRef = React.useRef<HTMLDivElement>(null);
    // Determines whether the component is controlled or not.
    const [open, setOpen] = React.useState<boolean>(opened ?? false);
    const isControlled = opened !== undefined;
    // Open can change only if the component is not disabled.
    const openState = disabled ? false : isControlled ? opened : open;
    // Stores the selected value(s) of the combobox internally.
    const [selectedValue, setSelectedValue] =
        React.useState<MaybeValueOrValues>(value);
    const isValueControlled = value !== "" && onChange !== undefined;
    const valueState = isValueControlled ? value : selectedValue;
    // A reference to the options in case these are filtered/updated.
    const [currentOptions, setCurrentOptions] = React.useState(children);

    const {
        focusedIndex,
        isListboxFocused,
        setFocusedIndex,
        handleKeyDown,
        handleFocus,
        handleBlur,
        selected,
        setSelected,
        renderList,
    } = useListbox({
        children: currentOptions,
        disabled,
        id: uniqueId,
        value: valueState,
        // Allows pressing the space key in the input element without selecting
        // an item from the listbox.
        disableSpaceSelection: true,
        selectionType,
    });

    const itemFromSelected = renderList.find(
        (item) => item.props.value === selected,
    )?.props;
    const labelFromSelected = itemFromSelected
        ? getLabel(itemFromSelected)
        : "";

    // NOTE: Clear input value if we are in multi-select mode. The selected
    // values are handled as individual Pill instances.
    const initialValue = typeof value === "string" ? labelFromSelected : "";
    const [inputValue, setInputValue] = React.useState(initialValue);

    /**
     * Updates the open state of the combobox.
     */
    const updateOpenState = React.useCallback(
        (newState: boolean) => {
            if (disabled || newState === openState) {
                return;
            }

            if (!isControlled) {
                setOpen(newState);
            }

            if (!newState) {
                // Reset focused index when the listbox is closed.
                setFocusedIndex(-1);

                const isSingleSelection =
                    selectionType === "single" && typeof selected === "string";
                if (
                    selectionType === "multiple" ||
                    (isSingleSelection && selected?.length === 0)
                ) {
                    // Reset the input value when the listbox is closed.
                    setInputValue("");
                }
                // Revert the input value to the selected value when the listbox
                // is closed.
                if (isSingleSelection && selected?.length > 0) {
                    setInputValue(labelFromSelected);
                }

                // Reset the options list
                setCurrentOptions(children);
            }

            onToggle?.(newState);
        },
        [
            children,
            disabled,
            isControlled,
            labelFromSelected,
            onToggle,
            openState,
            selected,
            selectionType,
            setFocusedIndex,
        ],
    );

    // if selected value changes, update the input value
    React.useEffect(() => {
        if (openState) {
            comboboxRef.current?.focus();
        }

        if (selected === valueState) {
            return;
        }

        if (selectionType === "single" && typeof selected === "string") {
            const itemFromSelected = renderList.find(
                (item) => item.props.value === selected,
            )?.props;
            const labelFromSelected = itemFromSelected
                ? getLabel(itemFromSelected)
                : "";

            // If the value changes, update the parent component.
            setInputValue(labelFromSelected);
            setSelectedValue(selected);
            onChange?.(selected);
            // Close the dropdown when a selection is made.
            updateOpenState(false);
        } else if (Array.isArray(selected)) {
            // If the value changes, update the parent component.
            setInputValue("");
            setSelectedValue(selected);
            onChange?.(selected);
            // Reset the options list
            setCurrentOptions(children);
        }
    }, [
        renderList,
        onChange,
        openState,
        selected,
        selectionType,
        updateOpenState,
        value,
        valueState,
        children,
    ]);

    const {
        focusedMultiSelectIndex,
        handleKeyDown: handleMultipleSelectionKeyDown,
    } = useMultipleSelection({
        inputValue,
        selected,
        setSelected,
    });

    const focusOnFilteredItem = React.useCallback(
        (filtered: Array<OptionItemComponent>, value: string) => {
            const lowercasedSearchText = value.normalize("NFC").toLowerCase();

            // Find the index of the first item that matches the search text.
            const itemIndex = filtered.findIndex((item) =>
                getLabel(item.props)
                    .normalize("NFC")
                    .toLowerCase()
                    .trim()
                    .includes(lowercasedSearchText),
            );

            // If no item matches the search text, don't focus on any item.
            // Otherwise, focus on the first item that matches the search
            // text.
            setFocusedIndex(itemIndex);
        },
        [setFocusedIndex],
    );

    /**
     * Handles specific keyboard events for the combobox.
     */
    const onKeyDown = (event: React.KeyboardEvent) => {
        const {key} = event;

        // Open the listbox under the following conditions:
        const conditionsToOpen =
            // The user presses specific keys
            key === "ArrowDown" ||
            key === "ArrowUp" ||
            key === "Backspace" ||
            // The user starts typing
            key.length === 1;

        if (!openState && conditionsToOpen) {
            updateOpenState(true);
        }

        /**
         * Handle keyboard navigation for multi-select combobox
         */
        if (key === "ArrowLeft" || key === "ArrowRight") {
            setFocusedIndex(-1);
        }
        // Propagate the event to useMultipleSelection to handle keyboard
        // navigation
        handleMultipleSelectionKeyDown(event);

        /**
         * Shared keyboard navigation for single and multi-select combobox
         */

        // Close only the dropdown, not other elements that are listening for an
        // escape press
        if (key === "Escape" && openState) {
            event.stopPropagation();
            updateOpenState(false);
        }

        // Propagate the event to useListbox to handle keyboard navigation
        handleKeyDown(event);
    };

    // The labels of the selected values.
    const selectedLabels = React.useMemo(() => {
        // NOTE: Using the children prop to get the labels of the selected
        // values, even when the list of options is filtered.
        return children
            .filter((item) => selected?.includes(item.props.value))
            .map((item) => getLabel(item.props) as string);
    }, [children, selected]);

    /**
     * Handles the click event on a pill to remove it from the list of selected
     * items.
     */
    const handleOnRemove = React.useCallback(
        (value: string) => {
            const selectedValues = selected as Array<string>;
            // Remove the selected item from the list of selected items.
            const newValues = selectedValues.filter(
                (selectedValue) => selectedValue !== value,
            );

            setSelected(newValues);
        },
        [selected, setSelected],
    );

    const pillIdPrefix = id ? `${id}-pill-` : ids.get("pill");

    const currentActiveDescendant = !openState
        ? undefined
        : focusedIndex >= 0
        ? // listbox is focused
          renderList[focusedIndex]?.props?.id
        : // pills are focused (multiple values selected)
          pillIdPrefix + focusedMultiSelectIndex;

    // Determine which widget will be controlled by the combobox (listbox or
    // pills group).
    const controlledWidget = !openState
        ? undefined
        : focusedIndex >= 0
        ? uniqueId
        : pillIdPrefix;

    /**
     * Filters the items based on the input value. This is used when the
     * `autoComplete` prop is set to `list` or `both`.
     */
    const filterItems = React.useCallback(
        (value: string) => {
            return children.filter((item) => {
                const lowerCasedLabel = getLabel(item.props)
                    .normalize("NFC")
                    .trim()
                    .toLowerCase();

                const lowercasedSearchText = value
                    .normalize("NFC")
                    .toLowerCase();

                return lowerCasedLabel.indexOf(lowercasedSearchText) > -1;
            });
        },
        [children],
    );

    return (
        <>
            <View
                onClick={() => {
                    updateOpenState(true);
                }}
                ref={rootNodeRef}
                style={[
                    styles.wrapper,
                    isListboxFocused && styles.focused,
                    disabled && styles.disabled,
                ]}
            >
                <ComboboxLiveRegion
                    focusedIndex={focusedIndex}
                    focusedMultiSelectIndex={focusedMultiSelectIndex}
                    labels={labels}
                    options={renderList}
                    selectedLabels={selectedLabels}
                    testId={testId}
                    opened={openState}
                    selected={selected}
                    selectionType={selectionType}
                />

                {/* Multi-select pills display before the input (if options are selected) */}
                {selectionType === "multiple" && Array.isArray(selected) && (
                    <MultipleSelection
                        labels={selectedLabels}
                        focusedMultiSelectIndex={focusedMultiSelectIndex}
                        id={pillIdPrefix}
                        selected={selected as Array<string>}
                        onRemove={handleOnRemove}
                        disabled={disabled}
                        testId={testId}
                        removeSelectedLabel={labels.removeSelected}
                    />
                )}
                <TextField
                    id={ids.get("input")}
                    testId={testId}
                    style={styles.combobox}
                    value={inputValue}
                    onChange={(value: string) => {
                        setInputValue(value);
                        let filteredItems = renderList;
                        if (autoComplete === "list") {
                            filteredItems = filterItems(value);

                            // Update the list of options to display the
                            // filtered items.
                            setCurrentOptions(filteredItems);
                        }

                        focusOnFilteredItem(filteredItems, value);
                    }}
                    disabled={disabled}
                    onFocus={() => {
                        updateOpenState(true);
                        handleFocus();
                    }}
                    placeholder={placeholder}
                    onBlur={() => {
                        updateOpenState(false);
                        handleBlur();
                    }}
                    aria-controls={controlledWidget}
                    onKeyDown={onKeyDown}
                    aria-activedescendant={currentActiveDescendant}
                    aria-autocomplete={autoComplete}
                    aria-expanded={openState}
                    ref={comboboxRef}
                    // We don't want the browser to suggest autocompletions as
                    // the combobox is already providing suggestions.
                    autoComplete="off"
                    role="combobox"
                />

                <IconButton
                    disabled={disabled}
                    icon={caretDownIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        updateOpenState(!openState);
                    }}
                    onMouseDown={(e: React.MouseEvent) => {
                        // Prevents the combobox from losing focus when clicking
                        // this element.
                        e.preventDefault();
                    }}
                    size="small"
                    style={[styles.button, openState && styles.buttonOpen]}
                    tabIndex={-1}
                    aria-controls={uniqueId}
                    aria-expanded={openState}
                    aria-label={labels.comboboxButton}
                />
            </View>

            {openState && (
                <DropdownPopper
                    alignment="left"
                    // NOTE: We need to cast comboboxRef to HTMLElement because
                    // the DropdownPopper component expects an HTMLElement.
                    referenceElement={rootNodeRef?.current as HTMLElement}
                >
                    {(isReferenceHidden) => (
                        <>
                            {renderList.length === 0 ? (
                                // No items to display
                                <DetailCell
                                    title={labels.noItems}
                                    style={[
                                        styles.listbox,
                                        // The listbox width is at least the
                                        // width of the combobox.
                                        {
                                            minWidth:
                                                rootNodeRef?.current
                                                    ?.offsetWidth,
                                        },
                                    ]}
                                    horizontalRule="none"
                                />
                            ) : (
                                <Listbox
                                    id={uniqueId}
                                    tabIndex={-1}
                                    selectionType={selectionType}
                                    style={[
                                        styles.listbox,
                                        isReferenceHidden && styles.hidden,
                                        // The listbox width is at least the
                                        // width of the combobox.
                                        {
                                            minWidth:
                                                rootNodeRef?.current
                                                    ?.offsetWidth,
                                        },
                                    ]}
                                    testId={
                                        testId ? `${testId}-listbox` : undefined
                                    }
                                    aria-label={labels.listbox}
                                    aria-labelledby={ids.get("input")}
                                >
                                    {renderList}
                                </Listbox>
                            )}
                        </>
                    )}
                </DropdownPopper>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        maxWidth: "100%",
        flexWrap: "wrap",
        // The following styles are to emulate the input styles
        background: color.white,
        borderRadius: border.radius.medium_4,
        border: `solid 1px ${color.offBlack16}`,
        paddingInline: spacing.xSmall_8,
    },
    focused: {
        background: color.white,
        border: `1px solid ${color.blue}`,
    },
    disabled: {
        background: color.offWhite,
        border: `1px solid ${color.offBlack16}`,
        color: color.offBlack64,
    },
    /**
     * Combobox input styles
     */
    combobox: {
        // reset input styles
        appearance: "none",
        background: "none",
        border: "none",
        outline: "none",
        padding: 0,
        minWidth: spacing.xxxSmall_4,
        width: "auto",
        display: "inline-grid",
        gridArea: "1 / 2",
        ":focus-visible": {
            outline: "none",
            border: "none",
        },
    },
    /**
     * Listbo custom styles
     */
    listbox: {
        backgroundColor: color.white,
        borderRadius: border.radius.medium_4,
        border: `solid 1px ${color.offBlack16}`,
        boxShadow: `0px ${spacing.xSmall_8}px ${spacing.xSmall_8}px 0px ${color.offBlack8}`,
        // We use a custom property to set the max height of the dropdown.
        // This comes from the maxHeight custom modifier.
        // @see ../util/popper-max-height-modifier.ts
        maxHeight: "var(--popper-max-height)",
    },
    hidden: {
        pointerEvents: "none",
        visibility: "hidden",
    },
    /**
     * Arrow button styles
     */
    button: {
        position: "absolute",
        right: spacing.xxxSmall_4,
        top: spacing.xxxSmall_4,
        margin: 0,
    },
    buttonOpen: {
        transform: "rotate(180deg)",
    },
});