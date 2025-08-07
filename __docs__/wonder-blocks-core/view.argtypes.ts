import type {ArgTypes} from "@storybook/react";

export default {
    children: {
        description: "The content of the `View` element.",
        type: {name: "other", value: "React.ReactNode", required: true},
    },

    tag: {
        description: "The HTML tag to render.",
        control: {
            type: "select",
            options: ["div", "article", "aside", "nav", "section"],
        },
    },

    dir: {
        description: "The text direction for the element.",
        control: {
            type: "select",
            options: ["ltr", "rtl", "auto"],
        },
        table: {
            type: {
                summary: '"ltr" | "rtl" | "auto"',
            },
        },
    },

    id: {
        description: "An optional id attribute.",
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },

    style: {
        description: "Optional custom styles.",
        control: {type: "object"},
        table: {
            type: {
                summary: "StyleType",
            },
        },
    },

    tabIndex: {
        description: "Set the tabindex attribute on the rendered element.",
        control: {type: "number", min: -1},
        table: {
            type: {
                summary: "number",
            },
        },
    },

    testId: {
        description:
            "Test ID used for e2e testing. This sets the `data-testid` attribute on the rendered element.",
        control: {type: "text"},
        table: {
            type: {
                summary: "string",
            },
        },
    },
} satisfies ArgTypes;
