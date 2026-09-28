import type {ArgTypes} from "@storybook/react-vite";

import AriaArgTypes from "../wonder-blocks-core/aria.argtypes";

export default {
    ...AriaArgTypes,
    id: {
        control: {type: "text"},
        description: "The unique identifier for the accordion.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    children: {
        control: {type: undefined},
        description: `The AccordionSection components to
            display within this Accordion.`,
        table: {
            type: {
                summary:
                    "Array<React.ReactElement<React.ComponentProps<typeof AccordionSection>>>",
            },
        },
        type: {
            name: "other",
            required: true,
            value: "React.ReactElement | string",
        },
    },
    initialExpandedIndex: {
        control: {type: "number"},
        description: `The index of the AccordionSection that should be expanded
            when the Accordion is first rendered. If not specified, no
            AccordionSections will be expanded when the Accordion is first
            rendered. This is only read on the first render, so use
            \`expandedIndices\` instead if you need to control the expanded
            state after that. Cannot be used with \`expandedIndices\`.`,
        table: {
            category: "State",
            type: {summary: "number"},
        },
        type: {name: "number", required: false},
    },
    expandedIndices: {
        control: {type: "object"},
        description: `The indices of the AccordionSections that are currently
            expanded. Passing this prop puts the Accordion into controlled
            mode: the parent owns the expanded state, and the Accordion only
            reports changes via \`onToggle\`. Cannot be used with
            \`initialExpandedIndex\`.`,
        table: {
            category: "State",
            type: {summary: "ReadonlyArray<number>"},
        },
        type: {name: "other", required: false, value: "ReadonlyArray<number>"},
    },
    onToggle: {
        control: {type: undefined},
        description: `Called when a section is toggled. It is passed the index
            of the section that was toggled, along with the indices of every
            section that is expanded as a result of the toggle. In controlled
            mode, the second argument is the value that should be passed back
            in as \`expandedIndices\`.`,
        table: {
            category: "Events",
            type: {
                summary:
                    "(toggledIndex: number, allExpandedIndices: Array<number>) => unknown",
            },
        },
        type: {name: "function", required: false},
    },
    allowMultipleExpanded: {
        control: {type: "boolean"},
        description: `Whether multiple AccordionSections can be expanded at the
            same time. If not specified, multiple AccordionSections can be
            expanded at a time.`,
        table: {
            category: "State",
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
        type: {name: "boolean", required: false},
    },
    caretPosition: {
        control: {type: "select"},
        description: `Whether to put the caret at the start (the left side in
            left-to-right languages) or end (the right side in right-to-left
            languages) of the header block in this section. Defaults to "end".`,
        defaultValue: "end",
        table: {
            category: "Visual style",
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
            category: "Visual style",
            defaultValue: {summary: "rounded"},
            type: {summary: '"square" | "rounded" | "rounded-per-section"'},
        },
        type: {
            name: "enum",
            value: ["square", "rounded", "rounded-per-section"],
            required: false,
        },
    },
    animated: {
        control: {type: "boolean"},
        description: `Whether to include animation on the header. This should
            be false if the user has \`prefers-reduced-motion\` opted in.
            Defaults to false.`,
        defaultValue: false,
        table: {
            category: "Visual style",
            defaultValue: {summary: "false"},
            type: {summary: "boolean"},
        },
        type: {name: "boolean", required: false},
    },
    style: {
        control: {type: "object"},
        description: "Custom styles for the overall accordion container.",
        table: {
            category: "Visual style",
            type: {summary: "StyleType"},
        },
        type: {name: "other", required: false, value: "StyleType"},
    },
} satisfies ArgTypes;
