import type {ArgTypes} from "@storybook/react-vite";

export default {
    children: {
        control: {type: "text"},
        table: {
            type: {summary: "React.ReactNode"},
        },
        type: {name: "other", value: "React.ReactNode", required: true},
    },
    background: {
        control: {
            type: "select",
            labels: {
                Image: "Image (import and pass as prop)",
            },
        },
        options: ["base-subtle", "base-default", "Image"],
        defaultValue: "base-default",
        description:
            "The background style of the card. Can be either a semantic color token or an imported image URL.",
        table: {
            type: {
                summary: '"base-subtle" | "base-default" | Image',
                detail: "Can be either:\n- Semantic color token: 'base-subtle' or 'base-default'\n- Imported image: import myImage from './my-image.svg' then use background={myImage}\nImages are displayed with background-size: cover",
            },
            defaultValue: {summary: '"base-default"'},
            category: "Styling",
        },
        type: {
            name: "union",
            value: [
                {name: "enum", value: ["base-subtle", "base-default"]},
                {name: "other", value: "Image"},
            ],
            required: false,
        },
    },
    borderRadius: {
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
    elevation: {
        control: {type: "select"},
        options: ["none", "low"],
        defaultValue: "none",
        table: {
            type: {summary: '"none" | "low"'},
            defaultValue: {summary: '"none"'},
            category: "Styling",
        },
        type: {name: "enum", value: ["none", "low"], required: false},
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
