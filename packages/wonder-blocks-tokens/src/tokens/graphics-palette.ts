import {CSS_VAR_PREFIX} from "../util/constants";
import {mapValuesToCssVars} from "../internal/map-values-to-css-vars";
import {graphicsPalette} from "../theme/semantic/internal/primitive-color-thunderblocks";

/**
 * The graphics palette, as CSS variable references.
 *
 * The variables are defined once on `:root` (see `generate-css-variables.ts`)
 * and not per theme, so these colors don't change based on the theme.
 */
export default mapValuesToCssVars(
    graphicsPalette,
    `${CSS_VAR_PREFIX}graphicsPalette-`,
);
