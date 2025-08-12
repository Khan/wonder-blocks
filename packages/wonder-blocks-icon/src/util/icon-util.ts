import {IconSize} from "../types";

/**
 * A simple function that tells us how many viewport pixels each icon size
 * corresponds to.
 */
export const viewportPixelsForSize = (size: IconSize): number =>
    ({
        small: 16,
        medium: 24,
        large: 48,
        xlarge: 96,
    })[size];
