import {border} from "@khanacademy/wonder-blocks-tokens";

const theme = {
    border: {
        offset: {
            primary: border.width.medium,
            secondary: `calc(-1 * ${border.width.medium})`,
            tertiary: `calc(-1 * ${border.width.medium})`,
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
