import {sizing} from "./primitive/sizing";
import {semanticColor} from "./semantic/semantic-color";
import {border} from "./primitive/border";

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
    semanticColor,
    sizing,
};
