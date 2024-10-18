import type {InputType} from "@storybook/csf";

export default {
    id: {
        description: `An optional unique identifier for the TextField.
        If no id is specified, a unique id will be auto-generated.`,
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

    label: {
        description: "Provide a label for the TextField.",
        type: {name: "string", required: true},
        table: {
            type: {
                summary: "React.Node",
            },
        },
        control: {
            type: "text",
        },
    },

    description: {
        description: "Provide a description for the TextField.",
        table: {
            type: {
                summary: "React.Node",
            },
        },
        control: {
            type: "text",
        },
    },

    value: {
        description: "The input value.",
        type: {name: "string", required: true},
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },

    autoComplete: {
        description: "Specifies if the TextField allows autocomplete.",
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

    name: {
        description: "Provide a name for the TextField.",
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },

    disabled: {
        description: `Whether the input should be disabled. Defaults to false.
            If the disabled prop is set to \`true\`, LabeledTextField will have disabled
            styling and will not be interactable.`,
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
            "Change the field’s sub-components to fit a dark background.",
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
            type: "boolean",
        },
    },

    readOnly: {
        description: "Specifies if the TextField is read-only.",
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
            type: undefined,
        },
    },

    /**
     * Accessibility
     */
    ariaDescribedby: {
        description:
            "Identifies the element or elements that describes this text field.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string | Array<string>",
            },
        },
        control: {
            type: "text",
        },
    },

    /**
     * Number-specific props
     */
    min: {
        description: "The minimum value for a number input.",
        table: {
            category: "Number",
            type: {
                summary: "number",
            },
        },
        control: {
            type: "number",
        },
    },
    max: {
        description: "The maximum value for a number input.",
        table: {
            category: "Number",
            type: {
                summary: "number",
            },
        },
        control: {
            type: "number",
        },
    },
    step: {
        description: "The step value for a number input.",
        table: {
            category: "Number",
            type: {
                summary: "number",
            },
        },
        control: {
            type: "number",
        },
    },

    /**
     * Events
     */
    onValidate: {
        description: "Called when the TextField input is validated.",
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
        type: {
            name: "other",
            value: "(newValue: string) => mixed",
            required: true,
        },
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
} satisfies Record<string, InputType>;
