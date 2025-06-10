import {border, sizing, spacing} from "@khanacademy/wonder-blocks-tokens";

export default {
    inputWrapper: {
        padding: `${spacing.medium_16}px`,
        margin: `calc(-${spacing.medium_16}px)`,
    },
    checkbox: {
        border: {
            radius: {
                default: border.radius.radius_040,
            },
            width: {
                default: border.width.thin,
            },
        },
        sizing: {
            height: sizing.size_240,
            width: sizing.size_240,
        },
    },
    radio: {
        border: {
            width: {
                default: border.width.thin,
            },
        },
        sizing: {
            height: sizing.size_240,
            width: sizing.size_240,
        },
    },
};
