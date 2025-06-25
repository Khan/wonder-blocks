import {border, semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";

const theme = {
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
    endAccessory: {
        layout: {
            display: "none",
            paddingInlineStart: sizing.size_0,
        },
        sizing: {
            width: sizing.size_0,
        },
    },
};

export default theme;
