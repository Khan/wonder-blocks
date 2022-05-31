// @flow

export default {
    id: {
        description: "The unique identifier for the input.",
        type: {required: true},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    type: {
        description:
            "Determines the type of input. Defaults to text. This may change the appearance or type of characters allowed.",
        table: {
            type: {
                summary: `"text" | "password" | "email" | "number" | "tel"`,
            },
            defaultValue: {
                summary: "text",
            },
        },
        options: ["text", "password", "email", "number", "tel"],
        control: {
            type: "select",
        },
    },
    value: {
        description: "The input value.",
        type: {required: true},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {type: "text"},
    },
    autoComplete: {
        description: "Specifies if the input field allows autocomplete.",
        table: {
            type: {
                summary: "string",
                detail: `There is a large number of options, including "on", "off", "username", "current-password", and many others.`,
            },
        },
        control: {
            type: "text",
        },
    },
    disabled: {
        description: "Makes a read-only input field that cannot be focused.",
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
    required: {
        description:
            "Whether this field is required to to continue, or the error message to render if this field is left blank. Pass in a message instead of `true` if possible.",
        table: {
            type: {
                summary: "boolean | string",
                detail: "The string will not be used if a `validate` prop is passed in.",
            },
        },
        control: {
            type: "null",
        },
    },
    placeholder: {
        description: "Provide hints or examples of what to enter.",
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    readOnly: {
        description: "Specifies if the input field is read-only.",
        table: {
            type: {
                summary: "boolean",
            },
        },
        control: {
            type: "boolean",
        },
    },
    style: {
        description: "Custom styles for the input.",
        table: {
            type: {
                summary: "StyleType",
            },
        },
    },
    testId: {
        description: "Optional test ID for e2e testing.",
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    validate: {
        description:
            "Provide a validation for the input value. Return a string error message or null | void for a valid input.",
        table: {
            type: {
                summary: "(value: string) => ?string",
            },
        },
        control: {
            type: "null",
        },
    },

    /**
     * Events
     */
    onValidate: {
        description: "Called right after the TextField input is validated.",
        table: {
            category: "Events",
            type: {
                summary: "(errorMessage: ?string) => mixed",
            },
        },
    },
    onChange: {
        description:
            "Called when the value has changed. Use this in conjunction with the `value` prop to update the string rendered in the input field.",
        type: {required: true},
        table: {
            category: "Events",
            type: {
                summary: "(newValue: string) => mixed",
            },
        },
    },
    onKeyDown: {
        action: "keyDown",
        description: "Called when a key is pressed.",
        table: {
            category: "Events",
            type: {
                summary:
                    "(event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed",
            },
        },
    },
    onFocus: {
        action: "focus",
        description: "Called when the element has been focused.",
        table: {
            category: "Events",
            type: {
                summary:
                    "(event: SyntheticFocusEvent<HTMLInputElement>) => mixed",
            },
        },
    },
    onBlur: {
        action: "blur",
        description: "Called when the element has been blurred.",
        table: {
            category: "Events",
            type: {
                summary:
                    "(event: SyntheticFocusEvent<HTMLInputElement>) => mixed",
            },
        },
    },
};
