import {remToPx} from "../../util";
import {sizing} from "./sizing";

const SIZE_20_PX = remToPx(sizing.size_020);
const SIZE_40_PX = remToPx(sizing.size_040);
const SIZE_80_PX = remToPx(sizing.size_080);
const SIZE_160_PX = remToPx(sizing.size_160);

export const elevation = {
    /**
     * Elevation values for box shadows.
     *
     * NOTE: We use fixed values for the box shadows instead of using the
     * regular `sizing` tokens to ensure that the shadows are consistent across
     * different root font sizes.
     */
    low: `${sizing.size_0} ${SIZE_20_PX} ${SIZE_20_PX} ${sizing.size_0}`,
    medium: `${sizing.size_0} ${SIZE_40_PX} ${SIZE_80_PX} ${sizing.size_0}`,
    high: `${sizing.size_0} ${SIZE_80_PX} ${SIZE_160_PX} ${sizing.size_0}`,
};
