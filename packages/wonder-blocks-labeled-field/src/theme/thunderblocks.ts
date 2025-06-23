import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    errorIcon: {
        layout: {
            // Error icon is hidden in TB because it is shown in the field instead
            display: "none",
        },
    },
});
