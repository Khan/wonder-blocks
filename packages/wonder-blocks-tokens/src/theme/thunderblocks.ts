import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default";
import {semanticColor} from "./semantic/semantic-color-thunderblocks";
import {font} from "./semantic/internal/primitive-font-thunderblocks";

export default mergeTheme(defaultTheme, {
    semanticColor,
    font,
});
