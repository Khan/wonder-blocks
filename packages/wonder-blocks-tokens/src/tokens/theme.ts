import {CSS_VAR_PREFIX} from "../util/constants";
import {mapValuesToCssVars} from "../internal/map-values-to-css-vars";
import themeDefault from "../theme/default";

export default mapValuesToCssVars(themeDefault, CSS_VAR_PREFIX);
