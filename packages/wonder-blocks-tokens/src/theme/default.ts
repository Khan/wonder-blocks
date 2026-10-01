import {toCssTree} from "../util/animation-utils";
import {sizing} from "./primitive/sizing";
import {font} from "./primitive/font";
import {semanticColor} from "./semantic/semantic-color";
import {border} from "./primitive/border";
import {boxShadow} from "./semantic/box-shadow";
import {animation} from "./semantic/animation";

/**
 * NOTE: All the tokens included in this `theme` file will be automatically
 * mapped to CSS vars and included in
 * @khanacademy/wonder-blocks-tokens/styles.css.
 *
 * The css vars transformation is done in the `generate-css-variables.ts`
 * script. Used by `pnpm run dev` in the `@khanacademy/wonder-blocks-tokens`
 * package.
 */
export default {
    border,
    // We need to pass semanticColor to boxShadow to have access to the
    // correct shadow colors.
    boxShadow: boxShadow(semanticColor),
    font,
    // The raw animation tree (ms numbers + cubic-bézier arrays) is formatted
    // into CSS strings so it can flow through the CSS variable pipeline. The
    // JS-friendly raw form is exported separately as `animationValue`.
    animation: toCssTree(animation),
    semanticColor,
    sizing,
};
