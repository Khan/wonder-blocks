import * as React from "react";
import {updateMultipleSelection} from "../util/selection";
import {MaybeValueOrValues, OptionItemComponent} from "../util/types";

type Props = {
    /**
     * The list of items to display in the listbox.
     */
    children: Array<OptionItemComponent>;
    /**
     * Whether the listbox is disabled.
     */
    disabled: boolean | undefined;
    /**
     * The unique identifier of the listbox element.
     */
    id: string;
    /**
     * The value of the currently selected items.
     */
    value?: MaybeValueOrValues;
    /**
     * The type of selection that the listbox supports.
     */
    selectionType: "single" | "multiple";
};

/**
 * Hook for managing the state of a listbox.
 *
 * It manages how the options are rendered and how the listbox behaves.
 *
 * This includes:
 * - Keyboard navigation.
 * - Selection management.
 */
export function useListbox({
    children: options,
    disabled,
    id,
    selectionType = "single",
    value,
}: Props) {
    // find the index of the first selected Item
    const selectedValueIndex = React.useMemo(() => {
        const firstValue = Array.isArray(value) ? value[0] : value;
        if (!firstValue || firstValue === "") {
            // Focus on the first item if no value is selected
            return 0;
        }
        return options.findIndex((item) => item.props.value === firstValue);
    }, [options, value]);
    // The index of the currently focused item in the listbox.
    const [focusedIndex, setFocusedIndex] = React.useState(selectedValueIndex);
    // Whether the listbox is currently focused.
    const [isListboxFocused, setIsListboxFocused] = React.useState(false);

    const [selected, setSelected] = React.useState(value);

    const focusItem = (index: number) => {
        setFocusedIndex(index);
    };

    const focusPreviousItem = React.useCallback(() => {
        if (focusedIndex === 0) {
            focusItem(options.length - 1);
        } else {
            focusItem(focusedIndex - 1);
        }
    }, [options, focusedIndex]);

    const focusNextItem = React.useCallback(() => {
        if (focusedIndex === options.length - 1) {
            focusItem(0);
        } else {
            focusItem(focusedIndex + 1);
        }
    }, [options, focusedIndex]);

    const selectOption = React.useCallback(
        (index: number) => {
            const optionItem = options[index] as OptionItemComponent;

            if (optionItem.props.disabled) {
                return;
            }

            if (selectionType === "single") {
                setSelected(optionItem.props.value);
            } else {
                setSelected((prevSelected) => {
                    const newSelectedValue = updateMultipleSelection(
                        prevSelected as Array<string>,
                        optionItem.props.value,
                    );

                    return newSelectedValue;
                });
            }
        },
        [options, selectionType],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            const {key} = event;

            switch (key) {
                case "ArrowUp":
                    event.preventDefault();
                    focusPreviousItem();
                    return;
                case "ArrowDown":
                    event.preventDefault();
                    focusNextItem();
                    return;
                case "Home":
                    event.preventDefault();
                    focusItem(0);
                    return;
                case "End":
                    event.preventDefault();
                    focusItem(options.length - 1);
                    return;
                case "Enter":
                case " ":
                    // Prevent form submission
                    event.preventDefault();

                    selectOption(focusedIndex);
                    return;
            }
        },
        [focusNextItem, focusPreviousItem, focusedIndex, options, selectOption],
    );

    // Some keys should be handled during the keyup event instead.
    const handleKeyUp = React.useCallback((event: React.KeyboardEvent) => {
        switch (event.key) {
            case " ":
                // Prevent space from scrolling down the page
                event.preventDefault();
                return;
        }
    }, []);

    const handleFocus = React.useCallback(() => {
        if (!disabled) {
            setIsListboxFocused(true);
        }
    }, [disabled]);

    const handleBlur = React.useCallback(() => {
        if (!disabled) {
            setIsListboxFocused(false);
        }
    }, [disabled]);

    const handleClick = React.useCallback(
        (value: string) => {
            const index = options.findIndex(
                (item) => item.props.value === value,
            );

            const isOptionDisabled = options[index].props.disabled;

            if (disabled || isOptionDisabled) {
                return;
            }

            focusItem(index);
            selectOption(index);
        },
        [disabled, options, selectOption],
    );

    const renderList = React.useMemo(() => {
        return options.map((component, index) => {
            const isSelected =
                selected?.includes(component.props.value) || false;
            const optionId = id ? `${id}-option-${index}` : `option-${index}`;

            // Renders option items and pass the extra props needed to manage
            // the listbox state.
            return React.cloneElement(component, {
                key: index,
                focused: isListboxFocused && index === focusedIndex,
                disabled: component.props.disabled || disabled || false,
                selected: isSelected,
                variant: selectionType === "single" ? "check" : "checkbox",
                parentComponent: "listbox",
                id: optionId,
                onToggle: () => {
                    handleClick(component.props.value);
                },
                role: "option",
            });
        });
    }, [
        options,
        selected,
        id,
        isListboxFocused,
        focusedIndex,
        disabled,
        selectionType,
        handleClick,
    ]);

    return {
        isListboxFocused,
        // current option focused
        focusedIndex,
        // list of options
        renderList,
        // selected value(s)
        selected,
        // handlers
        handleKeyDown,
        handleKeyUp,
        handleFocus,
        handleBlur,
    };
}
