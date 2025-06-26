import {sizing} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    input: {
        layout: {
            withError: {
                // The right padding of the input when there is an error
                paddingInlineEnd: sizing.size_400,
            },
        },
    },
    dismissButton: {
        layout: {
            withError: {
                // The right position of the dismiss button
                insetInlineEnd: sizing.size_040,
            },
        },
    },
};

export default theme;
