import {CSS_VAR_PREFIX} from "../util/constants";
import {mapValuesToCssVars} from "../internal/map-values-to-css-vars";
import {graphicsPalette} from "../theme/semantic/internal/primitive-color-thunderblocks";

/**
 * The graphics palette, as CSS variable references.
 *
 * The variables are defined once on `:root` (see `generate-css-variables.ts`)
 * and not per theme, so these colors don't change based on the theme.
 *
 * NOTE: The palette is mapped here instead of being added to the default theme
 * (`theme/default.ts`), even though that's how the other tokens become CSS
 * variables. Every token in a theme file is written out again in each theme's
 * selector in `vars.css`, so the palette's variables would be repeated once
 * per theme with the same values. Keeping it out of the theme files also means
 * a theme can't override the palette by accident.
 */
export default mapValuesToCssVars(
    graphicsPalette,
    `${CSS_VAR_PREFIX}graphicsPalette-`,
);
