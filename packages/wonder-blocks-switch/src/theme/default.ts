import {border, sizing} from "@khanacademy/wonder-blocks-tokens";

export default {
    root: {
        border: {
            radius: {
                default: border.radius.radius_120,
                hover: border.radius.radius_120,
                press: border.radius.radius_120,
            },
        },
        sizing: {
            height: sizing.size_240,
            width: sizing.size_400,
        },
    },
    slider: {
        sizing: {
            height: sizing.size_200,
            width: sizing.size_200,
        },
        position: {
            top: sizing.size_020,
            left: sizing.size_020,
        },
        transform: {
            default: `translateX(${sizing.size_160})`,
            transition: "transform 0.15s ease-in-out",
        },
    },
    icon: {
        position: {
            top: sizing.size_040,
            left: sizing.size_040,
        },
        transform: {
            default: `translateX(${sizing.size_160})`,
            transition: "transform 0.15s ease-in-out",
        },
    },
};
