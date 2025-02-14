export default {
    clearAriaLabel: {
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
        type: {name: "string", required: true},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {type: "text"},
    },
    name: {
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
        table: {
            type: {
                summary: "Style",
            },
            defaultValue: {
                summary: "StyleType",
            },
        },
        control: {
            type: "object",
        },
    },
    testId: {
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
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onClick: {
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onKeyDown: {
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onKeyUp: {
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onFocus: {
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
    onBlur: {
        table: {
            type: {
                summary: "function",
            },
            category: "Events",
        },
    },
};
