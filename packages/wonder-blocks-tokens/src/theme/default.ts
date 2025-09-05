import {sizing} from "./primitive/sizing";
import {font} from "./primitive/font";
import {semanticColor} from "./semantic/semantic-color";
import {border} from "./primitive/border";
import {elevation} from "./primitive/elevation";

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
    elevation,
    font,
    semanticColor,
    sizing,
};
