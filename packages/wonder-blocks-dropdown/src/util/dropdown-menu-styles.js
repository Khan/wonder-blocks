// @flow
import {StyleSheet} from "aphrodite";

import type {StyleType} from "@khanacademy/wonder-blocks-core";

import {
    DROPDOWN_ITEM_HEIGHT,
    MAX_VISIBLE_ITEMS,
    SEARCH_ITEM_HEIGHT,
    SEPARATOR_ITEM_HEIGHT,
} from "./constants.js";

import SeparatorItem from "../components/separator-item.js";
import SearchTextInput from "../components/search-text-input.js";

import type {DropdownItem} from "./types.js";

/**
 * The list height that is automatically calculated depending on the
 * component's type of each item (e.g. Separator, Option, Search, etc)
 *
 * @param {Array<DropdownItem>} items - The list of items to calculate the height
 * @param {number} initialHeight - The initial height of the list
 *
 * @returns {number} The list height
 */
export function getDropdownMenuHeight(
    items: Array<DropdownItem>,
    initialHeight: number = 0,
): number {
    // calculate using the first 10 items on the array as we want to display
    // this number of elements in the visible area
    return items.slice(0, MAX_VISIBLE_ITEMS).reduce((sum, item) => {
        if (SeparatorItem.isClassOf(item.component)) {
            return sum + SEPARATOR_ITEM_HEIGHT;
        } else if (SearchTextInput.isClassOf(item.component)) {
            // search text input height
            return sum + SEARCH_ITEM_HEIGHT;
        } else {
            return sum + DROPDOWN_ITEM_HEIGHT;
        }
    }, initialHeight);
}

/**
 * Wraps the dynamic styles in an Aphrodite style sheet so we can properly apply
 * the styles to a merged stylesheet (instead of inlining the styles).
 *
 * @param {StyleType} customStyles - The custom styles to apply to the dropdown
 * menu.
 * @returns The Aphrodite stylesheet for the dropdown menu.
 */
export function generateDropdownMenuStyles(
    minWidth: number,
    maxHeight: number,
): StyleType {
    const styles = StyleSheet.create({
        dropdownMenu: {
            minWidth,
            maxHeight,
        },
    });

    return styles.dropdownMenu;
}
