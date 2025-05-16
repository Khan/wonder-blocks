import {IconButtonSize} from "./icon-button.types";

/**
 * A function that returns the size of the touch target in pixels for a given icon button size.
 */
export const targetPixelsForSize = (size: IconButtonSize): number =>
    ({xsmall: 24, small: 32, medium: 40, large: 48})[size];
