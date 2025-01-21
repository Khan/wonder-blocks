import {ArgTypes} from "@storybook/react";

const argTypes: ArgTypes = {
    alignment: {
        control: {type: "select"},
        defaultValue: "info",
        description: `Whether this dropdown should be left-aligned or
            right-aligned with the opener component.`,
        options: ["left", "right"],
        table: {
            category: "Layout",
            type: {summary: `"left" | "right"`},
            defaultValue: {summary: `"left"`},
        },
        type: {
            name: "enum",
            value: ["left", "right"],
            required: false,
        },
    },

    disabled: {
        defaultValue: false,
        description: `Whether the dropdown is disabled. A disabled dropdown may
            not be opened and does not support interaction.`,
        table: {
            category: "States",
            defaultValue: {summary: "false"},
        },
    },

    error: {
        description: `Whether this component is in an error state. Use this for
            errors that are triggered by something external to the component
            (example: an error after form submission).`,
        table: {
            category: "States",
            defaultValue: {summary: "false"},
        },
    },

    required: {
        description: `Whether this field is required to to continue, or the
            error message to render if the select is left blank. Pass in a
            message instead of "true" if possible.`,
        table: {
            category: "States",
            type: {
                summary: "boolean | string",
            },
        },
        control: {
            type: undefined,
        },
    },

    validate: {
        description: `Provide a validation for the selected value. Return a
            string error message or null | void for a valid input.
            \n Use this for errors that are shown to the user while they are
            filling out a form.`,
        table: {
            category: "States",
            type: {
                summary: "(value: string) => ?string",
            },
        },
    },

    onValidate: {
        description: "Called right after the field is validated.",
        table: {
            category: "Events",
            type: {
                summary: "(errorMessage: ?string) => mixed",
            },
        },
    },

    isFilterable: {
        description: `When this is true, the dropdown body shows a search text
            input top. The items will be filtered by the input. Selected items
            will be moved to the top when the dropdown is re-opened.`,
        table: {
            category: "States",
        },
    },

    opened: {
        control: "boolean",
        description:
            "Can be used to override the state of the ActionMenu by parent elements",
        table: {
            category: "States",
        },
    },

    onToggle: {
        description: `In controlled mode, use this prop in case the parent
            needs to be notified when the menu opens/closes.`,
        table: {
            category: "Events",
            type: {summary: "(opened: boolean) => unknown"},
        },
    },

    onChange: {
        description: `Callback for when the selection changes. Parameter is an
            updated array of selected values.`,
        table: {
            category: "Events",
            type: {summary: "(selectedValues: Array<string>) => unknown"},
        },
    },

    dropdownStyle: {
        control: {type: "object"},
        description:
            `Optional custom styles applied to the dropdown container.
            This is useful for setting a custom width or a custom height.\n\n` +
            `**NOTE:** we don't recommend setting a custom height, as the
            dropdown should be able to grow to fit its contents.`,
        table: {
            category: "Styling",
            type: {summary: "StyleType"},
        },
    },

    style: {
        control: {type: "object"},
        description: "Optional styling to add to the opener component wrapper.",
        table: {
            category: "Styling",
            type: {summary: "StyleType"},
        },
    },

    className: {
        control: {type: "text"},
        description: "Adds CSS classes to the opener component wrapper.",
        table: {
            category: "Styling",
            type: {summary: "string"},
        },
    },

    id: {
        control: {type: "text"},
        description: `Unique identifier attached to the field control. If used,
            we need to guarantee that the ID is unique within everything
            rendered on a page. If one is not provided, one is auto-generated.
            Used to match \`<label>\` with \`<button>\` elements for
            screenreaders.`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },

    dropdownId: {
        control: {type: "text"},
        description: `Unique identifier attached to the dropdown. If used,
            we need to guarantee that the ID is unique within everything
            rendered on a page. If one is not provided, one is auto-generated.
            It is used for the opener's \`aria-controls\` attribute for
            screenreaders.`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },

    testId: {
        control: {type: "text"},
        description:
            "The test ID used to locate this component in automated tests.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
};

export default argTypes;
