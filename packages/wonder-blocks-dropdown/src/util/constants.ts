import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {ITEM_HEIGHT} from "../theme/default";

export const selectDropdownStyle = {
    marginBlock: sizing.size_080,
} as const;

// Filterable dropdown has minimum dimensions requested from Design.
// Note that these can be overridden by the provided style if needed.
export const filterableDropdownStyle = {
    minHeight: 100,
} as const;

// The default item height. Defined in the theme, which also exposes it to CSS
// as `--wb-c-dropdown-item-sizing-height`.
export const DROPDOWN_ITEM_HEIGHT = ITEM_HEIGHT;

/**
 * Maximum visible items inside the dropdown list. Based on the defined height
 * that we're using, this is the maximum number of items that can fit into the
 * visible portion of the dropdown's listbox.
 */
export const MAX_VISIBLE_ITEMS = 9;

export const SEPARATOR_ITEM_HEIGHT = 9;
