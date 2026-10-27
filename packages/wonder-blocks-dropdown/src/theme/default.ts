import {
    border,
    boxShadow,
    font,
    sizing,
} from "@khanacademy/wonder-blocks-tokens";

/**
 * The height of a dropdown item, in px. `DROPDOWN_ITEM_HEIGHT`
 * (util/constants.ts) re-exports it for the JS that measures rows (the
 * virtualized list and the popper's max-height padding), and `item.sizing`
 * below turns it into the `--wb-c-dropdown-item-sizing-height` CSS variable,
 * so the two can't drift apart.
 *
 * Defined here rather than in util/constants.ts because the token build loads
 * this file on its own, and util/constants.ts pulls in the item components.
 */
export const ITEM_HEIGHT = 40;

export default {
    listbox: {
        border: {
            radius: border.radius.radius_040,
        },
        layout: {
            padding: {
                inline: sizing.size_0,
                block: sizing.size_040,
            },
        },
        shadow: {
            default: boxShadow.mid,
        },
    },
    opener: {
        border: {
            width: {
                error: border.width.thin,
            },
            radius: {
                rest: border.radius.radius_040,
            },
        },
        layout: {
            padding: {
                // used by combobox
                inline: sizing.size_160,
                // used by select-opener
                inlineStart: sizing.size_160,
                inlineEnd: sizing.size_120,
            },
        },
    },
    item: {
        border: {
            radius: {
                default: border.radius.radius_040,
                press: border.radius.radius_040,
            },
        },
        layout: {
            padding: {
                block: sizing.size_100,
                inlineStart: sizing.size_080,
                inlineEnd: sizing.size_160,
            },
        },
        font: {
            weight: font.weight.regular,
        },
        sizing: {
            height: `${ITEM_HEIGHT}px`,
        },
    },
};
