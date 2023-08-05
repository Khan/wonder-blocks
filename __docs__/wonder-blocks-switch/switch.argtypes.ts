export default {
    ariaLabel: {
        description: "A label for the switch.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
                detail: "If a visible label is not provided, aria-label should be used to describe the purpose of the switch.",
            },
        },
    },
    checked: {
        description: "Whether this compoonent is checked.",
        control: {
            type: "boolean",
        },
    },
    disabled: {
        description: "Whether the switch is disabled. Defaults to `false`.",
        control: {
            type: "boolean",
        },
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    id: {
        description: "The unique identifier for the switch.",
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
    label: {
        description: "Optional label text on the right of the switch.",
        control: {
            type: "string",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
    onChange: {
        description: "Function to call when the switch is clicked.",
        table: {
            type: {
                summary: "(newCheckedState: boolean) => unknown",
            },
        },
    },
    testId: {
        description: "Optional test ID used for e2e testing.",
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
};
