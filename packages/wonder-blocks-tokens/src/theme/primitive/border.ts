import {remToPx, sizing} from "./sizing";

export const border = {
    /**
     * Corner radius values for borders.
     *
     * NOTE: We use fixed values for the corner radius instead of using the
     * regular `spacing` tokens to ensure that the corner radius is consistent
     * across different root font sizes.
     */
    radius: {
        radius_0: remToPx(sizing.size_0),
        radius_040: remToPx(sizing.size_040),
        radius_080: remToPx(sizing.size_080),
        radius_120: remToPx(sizing.size_120),
        radius_full: "50%",
    },
    width: {
        none: remToPx(sizing.size_0),
        thin: remToPx(sizing.size_010),
        medium: remToPx(sizing.size_020),
        thick: remToPx(sizing.size_040),
    },
};
