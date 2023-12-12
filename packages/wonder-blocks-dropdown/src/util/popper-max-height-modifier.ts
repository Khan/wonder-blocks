/**
 * NOTE: This modifier is adapted from the PopperJS source code. We don't use
 * the original modifier because it is not exported as part of the public API.
 *
 * @see
 * https://github.com/atomiks/popper.js/blob/master/src/modifiers/maxSize.js
 */

import {detectOverflow, ModifierArguments} from "@popperjs/core";
import {Modifier} from "react-popper";
import {DROPDOWN_ITEM_HEIGHT} from "./constants";

type MaxHeightOptions = {
    /**
     * The offset of the popper relative to its reference.
     */
    padding?: number;
};

function modifyMaxHeight({
    state,
    options,
}: ModifierArguments<MaxHeightOptions>): void {
    // Calculates the available space for the popper based on the placement
    // relative to the viewport.
    const overflow = detectOverflow(state, options);
    const {y} = state.modifiersData.preventOverflow || {x: 0, y: 0};
    const {height} = state.rects.popper;
    const [basePlacement] = state.placement.split("-");

    const heightProp = basePlacement === "top" ? "top" : "bottom";

    const maxHeight = height - overflow[heightProp] - y;

    // Apply the maxHeight to the popper element
    state.styles.popper = {
        ...state.styles.popper,
        maxHeight: `${maxHeight}px`,
        // Also propagate the maxHeight to its children via CSS variables.
        // This is useful for adding scrollbars to the dropdown list.
        ["--popper-max-height" as any]: `${maxHeight}px`,
    };
}

type MaxHeightModifier = Modifier<"maxHeight", MaxHeightOptions>;

export const maxHeightModifier: MaxHeightModifier = {
    name: "maxHeight",
    enabled: true,
    phase: "main",
    options: {
        // Default padding to 40px to account for the input's height.
        padding: DROPDOWN_ITEM_HEIGHT,
    },
    requiresIfExists: ["offset", "preventOverflow", "flip"],
    fn: modifyMaxHeight,
};
