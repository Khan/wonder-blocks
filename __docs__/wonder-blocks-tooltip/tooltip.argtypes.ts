import {color} from "@khanacademy/wonder-blocks-tokens";

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
        options: Object.keys(color) as Array<string>,
    },
    autoUpdate: {
        description:
            "Whether the tooltip should automatically update its position when the anchor element changes size or position.",
        control: {
            type: "boolean",
        },
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    opened: {
        description:
            `Whether the tooltip is currently open.\n\n` +
            `Using this prop makes the component behave as a controlled
            component. The parent is responsible for managing the
            opening/closing of the tooltip when using this prop.`,
        control: {
            type: "boolean",
        },
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    viewportPadding: {
        description:
            `If \`rootBoundary\` is \`viewport\`, this padding value is ` +
            `used to provide spacing between the popper and the viewport.` +
            `If not provided, default spacing is applied.`,
        control: {
            type: "number",
        },
    },
};
