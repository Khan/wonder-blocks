import type {ArgTypes} from "@storybook/react-vite";

export default {
    content: {
        control: {type: "text"},
        table: {
            type: {
                summary: "React.ReactNode",
            },
        },
    },
    placement: {
        control: {type: "select"},
        options: [
            "top",
            "top-start",
            "top-end",
            "right",
            "right-start",
            "right-end",
            "bottom",
            "bottom-start",
            "bottom-end",
            "left",
            "left-start",
            "left-end",
        ],
        table: {
            type: {
                summary: "Placement",
            },
            defaultValue: {
                summary: "top",
            },
        },
    },
    open: {
        control: {type: "boolean"},
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: "false",
            },
        },
    },
    children: {
        control: {type: "text"},
        table: {
            type: {
                summary: "React.ReactElement",
            },
        },
    },
} satisfies ArgTypes;
