import {border, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    choice: {
        inputWrapper: {
            layout: {
                padding: sizing.size_0,
                margin: sizing.size_0,
            },
        },
    },
    field: {
        border: {
            radius: border.radius.radius_040,
            width: {
                error: border.width.thin,
                // No additional border is added for the press state
                press: border.width.none,
            },
        },
        sizing: {
            height: sizing.size_400,
        },
        layout: {
            paddingBlock: sizing.size_100,
            paddingInline: sizing.size_160,
        },
    },
};
