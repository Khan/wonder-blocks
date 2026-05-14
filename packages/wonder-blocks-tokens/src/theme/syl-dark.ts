import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import thunderblocksTheme from "./thunderblocks";
import {semanticColor} from "./semantic/semantic-color-syl-dark";
import {font} from "./semantic/internal/primitive-font-syl-dark";
import {boxShadow} from "./semantic/box-shadow";

export default mergeTheme(thunderblocksTheme, {
    // We need to pass semanticColor to have access to the correct shadow
    // colors defined in the SYL Dark theme.
    boxShadow: boxShadow(semanticColor),
    semanticColor,
    font,
});
