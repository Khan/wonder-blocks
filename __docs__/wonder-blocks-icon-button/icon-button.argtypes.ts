import {icons} from "@khanacademy/wonder-blocks-icon";

export default {
    color: {
        control: {
            type: "select",
        },
        description: "Color of the icon button.",
        options: ["default", "destructive"],
        table: {
            type: {
                summary: `"default" | "destructive"`,
            },
            defaultValue: {
                summary: `"default"`,
            },
        },
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
        table: {
            type: {
                summary: `"primary" | "secondary" | "tertiary"`,
            },
            defaultValue: {
                summary: `"primary"`,
            },
        },
    },
    size: {
        control: {
            type: "select",
        },
        description: "The size of the icon button.",
        options: ["xsmall", "small", "medium"],
        table: {
            type: {
                summary: `"xsmall" | "small" | "medium"`,
            },
            defaultValue: {
                summary: `"medium"`,
            },
        },
    },
};
