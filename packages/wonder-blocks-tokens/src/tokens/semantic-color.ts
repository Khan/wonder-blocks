import {CSS_VAR_COLOR_PREFIX} from "../constants";
import {mapValuesToCssVars} from "../internal/map-values-to-css-vars";
import tokens from "../theme/color/default";

export const semanticColor = mapValuesToCssVars(tokens, CSS_VAR_COLOR_PREFIX);
