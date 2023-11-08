export default {
    id: {
        control: {type: "text"},
        description: "The unique identifier for the accordion section.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    children: {
        control: {type: "text"},
        description: `The contents to display within this section's
            expanded panel. If a string is passed in, it will automatically
            be given Body typography from Wonder Blocks Typography.`,
        table: {
            type: {
                summary: `ReactElement | string`,
            },
        },
        type: {name: "ReactElement | string", required: true},
    },
    header: {
        control: {type: "text"},
        description: `The header for this section. If a string is passed in,
            it will automatically be given Body typography from Wonder Blocks
            Typography.`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "ReactElement | string", required: true},
    },
    caretPosition: {
        control: {type: "select"},
        description: `Whether to put the caret at the start or end of the
            header block in this section. "start" means it’s on the left of a
            left-to-right language (and on the right of a right-to-left
            language), and "end" means it’s on the right of a left-to-right
            language (and on the left of a right-to-left language).
            Defaults to "end".`,
        defaultValue: "end",
        table: {
            defaultValue: {summary: "end"},
            type: {summary: '"start" | "end"'},
        },
        type: {
            name: "enum",
            value: ["start", "end"],
            required: false,
        },
    },
    cornerKind: {
        control: {type: "select"},
        description: `The preset styles for the corners of this accordion.
            \`square\` - corners have no border radius.
            \`rounded\` - the overall container's corners are rounded.
            \`rounded-per-section\` - each section's corners are rounded, and
            there is white space between each section.`,
        defaultValue: "rounded",
        table: {
            defaultValue: {summary: "rounded"},
            type: {summary: '"square" | "rounded" | "rounded-per-section"'},
        },
        type: {
            name: "enum",
            value: ["square", "rounded", "rounded-per-section"],
            required: false,
        },
    },
    collapsible: {
        control: {type: "boolean"},
        description: `Whether the section is collapsible or not. If false,
            the header will not be clickable, and the section will always
            be expanded. Defaults to true.`,
        defaultValue: true,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
    },
    expanded: {
        control: {type: "boolean"},
        description: `Whether this section should be expanded on initial load.
            Defaults to false.`,
        table: {
            defaultValue: {summary: "false"},
            type: {summary: "boolean"},
        },
    },
    animated: {
        control: {type: "boolean"},
        description: `Whether to include animation on the header. This should
            be false if the user has \`prefers-reduced-motion\` opted in.
            Defaults to false.`,
        table: {
            defaultValue: {summary: "false"},
            type: {summary: "boolean"},
        },
    },
    onToggle: {
        control: {type: null},
        description: "Called when the header is clicked.",
        table: {
            type: {summary: "(newExpandedState: boolean) => unknown"},
        },
    },
    style: {
        control: {type: "object"},
        description:
            "Custom styles for the overall accordion section container.",
        table: {
            type: {summary: "StyleType"},
        },
        type: {name: "StyleType", required: false},
    },
    headerStyle: {
        control: {type: "object"},
        description: "Custom styles for the header.",
        table: {
            type: {summary: "StyleType"},
        },
        type: {name: "StyleType", required: false},
    },
    tag: {
        control: {type: "text"},
        description: `The semantic tag for this clickable header (e.g. "h1",
            "h2", etc.) Please use this to ensure that the header is
            hierarchically correct.`,
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
    headerTestId: {
        control: {type: "text"},
        description: `The test ID used to locate this component's
            clickable header in automated tests.`,
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
};
