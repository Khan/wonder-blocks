import {sizing} from "@khanacademy/wonder-blocks-tokens";
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

export const viewportRemsForSize = (size: IconSize): string =>
    ({
        small: sizing.size_160,
        medium: sizing.size_240,
        large: sizing.size_480,
        xlarge: sizing.size_960,
    })[size];
