import {remToPx} from "../../util";
import {sizing} from "./sizing";
import {semanticColor} from "../semantic/semantic-color";

type SemanticColor = typeof semanticColor;

const SIZE_20_PX = remToPx(sizing.size_020);
const SIZE_40_PX = remToPx(sizing.size_040);
const SIZE_80_PX = remToPx(sizing.size_080);
const SIZE_160_PX = remToPx(sizing.size_160);

/**
 * Elevation and color values for box shadows.
 *
 * NOTE: We use fixed values for the box shadows instead of using the regular
 * `sizing` tokens to ensure that the shadows are consistent across different
 * root font sizes.
 */
export function boxShadow(semanticColor: SemanticColor) {
    return {
        low: `0 ${SIZE_20_PX} ${SIZE_20_PX} 0 ${semanticColor.core.shadow.transparent.low}`,
        mid: `0 ${SIZE_40_PX} ${SIZE_80_PX} 0 ${semanticColor.core.shadow.transparent.mid}`,
        high: `0 ${SIZE_80_PX} ${SIZE_160_PX} 0 ${semanticColor.core.shadow.transparent.high}`,
    };
}
