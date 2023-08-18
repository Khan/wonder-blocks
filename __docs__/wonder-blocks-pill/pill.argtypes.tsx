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
            type: {summary: "string | Link"},
        },
        type: {name: "string", required: true},
    },
    kind: {
        control: {type: "select"},
        description: "Kind of pill.",
        defaultValue: "neutral",
        table: {
            type: {summary: `"neutral" | "accent"`},
            defaultValue: {summary: "neutral"},
        },
        type: {
            name: "enum",
            value: ["neutral", "accent"],
            required: false,
        },
    },
    size: {
        control: {type: "select"},
        description: `Size of pill. Small has more of a classic “badge”
            look and fits inline, whereas large has normal body font size
            and is not meant to be inline.`,
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
