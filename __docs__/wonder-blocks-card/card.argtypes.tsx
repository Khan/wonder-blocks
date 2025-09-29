import type {ArgTypes} from "@storybook/react";

export default {
    children: {
        control: {type: "text"},
        table: {
            type: {summary: "React.ReactNode"},
        },
        type: {name: "other", value: "React.ReactNode", required: true},
    },
    backgroundColorStyle: {
        control: {type: "select"},
        options: ["base-subtle", "base-default"],
        defaultValue: "base-default",
        table: {
            type: {summary: '"base-subtle" | "base-default"'},
            defaultValue: {summary: '"base-default"'},
            category: "Styling",
        },
        type: {
            name: "enum",
            value: ["base-subtle", "base-default"],
            required: false,
        },
    },
    borderRadiusStyle: {
        control: {type: "select"},
        options: ["small", "medium"],
        defaultValue: "small",
        table: {
            type: {summary: '"small" | "medium"'},
            defaultValue: {summary: '"small"'},
            category: "Styling",
        },
        type: {name: "enum", value: ["small", "medium"], required: false},
    },
    paddingSize: {
        control: {type: "select"},
        options: ["none", "small", "medium"],
        defaultValue: "small",
        table: {
            type: {summary: '"none" | "small" | "medium"'},
            defaultValue: {summary: '"small"'},
            category: "Styling",
        },
        type: {
            name: "enum",
            value: ["none", "small", "medium"],
            required: false,
        },
    },
    tag: {
        control: {type: "select"},
        options: ["div", "section", "figure", "article"],
        defaultValue: "div",
        table: {
            type: {summary: "keyof JSX.IntrinsicElements"},
            defaultValue: {summary: '"div"'},
            category: "Structure",
        },
        type: {
            name: "enum",
            value: ["div", "section", "figure", "article"],
            required: false,
        },
    },
    labels: {
        control: {type: "object"},
        table: {
            type: {
                summary:
                    "{ cardAriaLabel?: string; dismissButtonAriaLabel?: string; }",
            },
            category: "Accessibility",
        },
        type: {
            name: "object",
            value: {
                cardAriaLabel: {name: "string", required: false},
                dismissButtonAriaLabel: {name: "string", required: false},
            },
            required: false,
        },
    },
    onDismiss: {
        action: "dismissed",
        table: {
            type: {summary: "(e?: React.SyntheticEvent) => void"},
            category: "Events",
        },
        type: {name: "function", required: false},
    },
    testId: {
        control: {type: "text"},
        table: {
            type: {summary: "string"},
            category: "Testing",
        },
        type: {name: "string", required: false},
    },
    inert: {
        control: {type: "boolean"},
        defaultValue: false,
        table: {
            type: {summary: "boolean"},
            defaultValue: {summary: "false"},
            category: "Accessibility",
        },
        type: {name: "boolean", required: false},
    },
    styles: {
        control: false,
        table: {
            type: {
                summary: "{ root?: StyleType; dismissButton?: StyleType; }",
            },
            category: "Styling",
        },
    },
} satisfies ArgTypes;
