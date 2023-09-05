import {icons} from "@khanacademy/wonder-blocks-icon";

export default {
    color: {
        control: {
            type: "select",
        },
        description: "Color of the icon button.",
        options: ["default", "destructive"],
    },
    disabled: {
        control: {
            type: "boolean",
        },
        description: "Whether the icon button is disabled.",
    },
    icon: {
        control: {
            type: "select",
        },
        description: "Icon to use.",
        options: icons,
    },
    kind: {
        control: {
            type: "select",
        },
        description: "The kind of the icon button.",
        options: ["primary", "secondary", "tertiary"],
    },
    size: {
        control: {
            type: "select",
        },
        description: "The size of the icon button.",
        options: ["xsmall", "small", "medium"],
    },
};
