import {mergeTheme} from "@khanacademy/wonder-blocks-theming";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import defaultTheme from "./default";

export default mergeTheme(defaultTheme, {
    input: {
        layout: {
            withError: {
                // The right padding of the input when there is an error. This
                // accounts for the error icon and the dismiss button in
                // TextFields for the TB theme
                paddingInlineEnd: sizing.size_560,
            },
        },
    },
    dismissButton: {
        layout: {
            withError: {
                // The right position of the dismiss button. This accounts for
                // the error icon in TextFields for the TB theme
                insetInlineEnd: sizing.size_320,
            },
        },
    },
});
