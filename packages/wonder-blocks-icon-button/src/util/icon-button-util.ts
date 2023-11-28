import {IconSize} from "@khanacademy/wonder-blocks-icon";
import {IconButtonSize} from "../components/icon-button";

/**
 * A function that returns the icon size for a given icon button size.
 */
export const iconSizeForButtonSize = (size: IconButtonSize): IconSize => {
    switch (size) {
        case "xsmall":
            return IconSize.small;
        case "small":
        case "medium":
            return IconSize.medium;
    }
};

/**
 * A function that returns the size of the touch target in pixels for a given icon button size.
 */
export const targetPixelsForSize = (size: IconButtonSize): number =>
    ({xsmall: 24, small: 32, medium: 40}[size]);
