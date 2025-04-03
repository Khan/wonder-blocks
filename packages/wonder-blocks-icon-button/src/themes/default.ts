import {border, semanticColor} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    color: semanticColor.action,

    border: {
        offset: {
            primary: border.width.thin,
            secondary: -border.width.thin,
            tertiary: -border.width.thin,
        },
        width: {
            primary: {
                default: border.width.none,
                hover: border.width.thin,
                press: border.width.thin,
            },
            secondary: {
                default: border.width.hairline,
                hover: border.width.thin,
                press: border.width.thin,
            },
            tertiary: {
                default: border.width.none,
                hover: border.width.thin,
                press: border.width.thin,
            },
        },
        radius: {
            default: border.radius.medium_4,
        },
    },
};

export default theme;
