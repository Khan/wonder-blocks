export default {
    placement: {
        description:
            "Where the tooltip should appear in relation to the anchor element. Defaults to `top`.",
        control: {
            type: "select",
            options: ["top", "bottom", "right", "left"],
        },
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
    },
    backgroundColor: {
        description: "Optional background color for the tooltip content.",
    },
};
