export default {
    clearAriaLabel: {
        description: `ARIA label for the clear button. Defaults to "Clear search".`,
        type: {name: "string", required: false},
        table: {
            type: {
                summary: "string",
            },
            category: "Accessibility",
        },
        control: {
            type: "text",
        },
    },
    id: {
        description: `The unique identifier for the input. If one is not
            provided, a unique id will be generated.`,
        type: {name: "string", required: false},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    value: {
        description: "The text input value.",
        type: {name: "string", required: true},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {type: "text"},
    },
    name: {
        description: `The name for the input control. This is submitted along
            with the form data.`,
        type: {name: "string", required: false},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    placeholder: {
        description: `Provide hints or examples of what to enter.
            This shows up as a grayed out text in the field before
            a value is entered.`,
        type: {name: "string", required: false},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    autoFocus: {
        description: "Whether this field should autofocus on page load.",
        type: {name: "boolean", required: false},
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: "false",
            },
        },
        control: {
            type: "boolean",
        },
    },
    disabled: {
        description: `Makes a read-only input field that cannot be focused.
            Defaults to false.`,
        type: {name: "boolean", required: false},
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: "false",
            },
        },
        control: {
            type: "boolean",
        },
    },
    light: {
        description:
            "Change the default focus ring color to fit a dark background.",
        type: {name: "boolean", required: false},
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: "false",
            },
        },
        control: {
            type: "boolean",
        },
    },
    style: {
        description: "Custom styles for the main wrapper.",
        table: {
            type: {
                summary: "Style",
            },
            defaultValue: {
                summary: "StyleType",
            },
        },
        control: {
            type: "select",
            options: ["box", "underline"],
        },
    },
    testId: {
        description: "Test ID used for e2e testing.",
        type: {name: "string", required: false},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    onChange: {
        description: "Called when the value has changed.",
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onClick: {
        description: `Handler that is triggered when this component is clicked.
            For example, use this to adjust focus in parent component.`,
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onKeyDown: {
        description: "Called when a key is pressed.",
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onFocus: {
        description: "Called when the element has been focused.",
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onBlur: {
        description: "Called when the element has been blurred.",
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
};
