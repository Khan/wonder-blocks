import * as React from "react";
import {MaybeValueOrValues} from "../util/types";

type Props = {
    /**
     * The list of selected items, where each item represents the value of the
     * selected option.
     */
    selected: MaybeValueOrValues;
    /**
     * Function to set the selected items.
     */
    setSelected: (value: MaybeValueOrValues) => void;
    /**
     * The current value of the input.
     */
    inputValue: string;
};

/**
 * Hook for managing the state of the multi-select values in the combobox.
 *
 * It manages how the options are rendered and how the listbox behaves.
 *
 * This includes:
 * - Keyboard navigation.
 * - Selection management.
 */
export function useMultipleSelection({
    inputValue,
    selected,
    setSelected,
}: Props) {
    // Index of the currently focused pill in the multi-select combobox.
    const [focusedMultiSelectIndex, setFocusedMultiSelectIndex] =
        React.useState<number>(-1);

    /**
     * Keyboard specific behaviors for the multi-select combobox.
     */
    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            const {key} = event;

            // only works for multi-select mode
            if (!Array.isArray(selected) || selected.length === 0) {
                return;
            }

            if (key === "ArrowLeft") {
                setFocusedMultiSelectIndex((prev) => {
                    const newIndex = prev - 1;
                    return newIndex < 0 ? selected?.length - 1 : newIndex;
                });
            }

            if (key === "ArrowRight") {
                setFocusedMultiSelectIndex((prev) => {
                    const newIndex = prev + 1;
                    return newIndex >= selected?.length ? 0 : newIndex;
                });
            }

            // Remove the last selected option with the backspace key.
            if (inputValue === "" && key === "Backspace") {
                let newSelected = [];
                if (focusedMultiSelectIndex < 0) {
                    // remove last selection (if there's any)
                    newSelected = selected?.slice(0, -1);
                } else {
                    // remove focused pill
                    newSelected = selected.filter(
                        (_, index) => index !== focusedMultiSelectIndex,
                    );
                }

                setSelected(newSelected);
                setFocusedMultiSelectIndex(-1);
                return;
            }

            if (focusedMultiSelectIndex >= 0 && key === "Enter") {
                const newSelected = selected?.filter(
                    (_, index) => index !== focusedMultiSelectIndex,
                );

                // remove current selected option
                setSelected(newSelected);
                setFocusedMultiSelectIndex(-1);
                return;
            }

            // Clear the focused pill index when navigating through the listbox, so
            // the visual focus is back to the listbox.
            if (key === "ArrowDown" || key === "ArrowUp") {
                setFocusedMultiSelectIndex(-1);
            }

            // Clear the focused pill index when pressing the escape key.
            if (key === "Escape") {
                setFocusedMultiSelectIndex(-1);
            }
        },
        [focusedMultiSelectIndex, inputValue, selected, setSelected],
    );

    return {
        focusedMultiSelectIndex,
        handleKeyDown,
    };
}
