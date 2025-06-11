import {border} from "@khanacademy/wonder-blocks-tokens";

export default {
    inputWrapper: {
        padding: "0px",
        margin: "0px",
    },
    checkbox: {
        border: {
            radius: {
                default: "3px",
            },
            width: {
                default: border.width.thin,
            },
        },
    },
    radio: {
        border: {
            radius: {
                default: border.radius.radius_full,
            },
            width: {
                default: border.width.thin,
            },
        },
    },
};
