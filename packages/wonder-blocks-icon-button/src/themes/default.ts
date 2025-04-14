import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    color: semanticColor.action,

    border: {
        offset: {
            primary: border.width.medium,
            secondary: -border.width.medium,
            tertiary: -border.width.medium,
        },
        width: {
            primary: {
                default: border.width.none,
                hover: border.width.medium,
                press: border.width.medium,
            },
            secondary: {
                default: border.width.thin,
                hover: border.width.medium,
                press: border.width.medium,
            },
            tertiary: {
                default: border.width.none,
                hover: border.width.medium,
                press: border.width.medium,
            },
        },
        radius: {
            default: border.radius.radius_040,
        },
    },
};

export default theme;
