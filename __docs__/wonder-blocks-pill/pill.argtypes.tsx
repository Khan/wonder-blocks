export default {
    id: {
        control: {type: "text"},
        description: "The unique identifier for the pill.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    children: {
        control: {type: "text"},
        description: "Text to appear on the pill.",
        table: {
            type: {summary: "string | React.ReactElement<Typography>"},
        },
        type: {name: "string", required: true},
    },
    kind: {
        control: {type: "select"},
        description: "Kind of pill.",
        defaultValue: "neutral",
        table: {
            type: {
                summary: `"neutral" | "accent | "info" | "success" |
                    "warning" | "critical"`,
            },
            defaultValue: {summary: "neutral"},
        },
        type: {
            name: "enum",
            value: [
                "neutral",
                "accent",
                "info",
                "success",
                "warning",
                "critical",
            ],
            required: false,
        },
    },
    size: {
        control: {type: "select"},
        description: `Size of pill. A small pill has more of a classic “badge”
            look and fully fits within a line of body text inline,
            whereas a large pill contains normal body font size.`,
        defaultValue: "small",
        table: {
            type: {summary: `"small" | "large"`},
            defaultValue: {summary: "small"},
        },
        type: {
            name: "enum",
            value: ["small", "large"],
            required: false,
        },
    },
    role: {
        control: {type: "text"},
        description: `The role the pill should have depending on its behavior.
            For example, if the pill is used as a tab in a tabbed panel, set
            its role to "tab".`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    onClick: {
        description: "Called when the pill is clicked.",
        table: {
            type: {summary: "() => unknown"},
        },
        type: {name: "function", required: false},
    },
    style: {
        control: {type: "object"},
        description: "Custom styles to add to this pill component.",
        table: {
            type: {summary: "StyleType"},
        },
        type: {name: "object", required: false},
    },
    testId: {
        control: {type: "text"},
        description: "Optional test ID for e2e testing.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
};
