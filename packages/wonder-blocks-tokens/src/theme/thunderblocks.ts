import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default";
import {semanticColor} from "./semantic/semantic-color-thunderblocks";
import {font} from "./semantic/internal/primitive-font-thunderblocks";
import {boxShadow} from "./semantic/box-shadow";

export default mergeTheme(defaultTheme, {
    // We need to pass semanticColor to have access to the correct shadow
    // colors defined in the TB theme.
    boxShadow: boxShadow(semanticColor),
    semanticColor,
    font,
});
