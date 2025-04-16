import {mergeTheme} from "@khanacademy/wonder-blocks-theming";

import defaultTheme from "./default";
import {semanticColor} from "./semantic/semantic-color-thunderblocks";

export default mergeTheme(defaultTheme, {
    semanticColor,
});
