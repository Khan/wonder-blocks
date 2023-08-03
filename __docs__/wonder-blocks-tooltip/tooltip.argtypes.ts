import Color from "@khanacademy/wonder-blocks-color";

export default {
    placement: {
        description:
            "Where the tooltip should appear in relation to the anchor element. Defaults to `top`.",
        control: {
            type: "select",
        },
        options: ["top", "bottom", "right", "left"],
    },
    title: {
        description: "Optional title for the tooltip content.",
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
    contentStyle: {
        description:
            "Optional subset of CSS styles for the tooltip content. Currently supports `color` and `padding`.",
        control: {
            type: "object",
        },
        table: {
            type: {
                summary: "ContentStyle",
                detail: "Only supports color and padding styles.",
            },
        },
    },
    backgroundColor: {
        description: "Optional background color for the tooltip content.",
        control: {
            type: "select",
        },
        options: Object.keys(Color) as Array<string>,
    },
};
