import type {IconSize} from "@khanacademy/wonder-blocks-icon";

/**
 * A simple function that tells us how many viewport pixels each icon button size
 * corresponds to.
 */
export const viewportPixelsForSize = (size: IconSize): number =>
    ({
        xsmall: 24,
        small: 32,
        medium: 40,
        large: 60,
        xlarge: 108,
    }[size]);
