export default {
    id: {
        control: {type: "text"},
        description: "The unique identifier for the accordion.",
        table: {
            type: {summary: "string"},
        },
        type: {name: "string", required: false},
    },
    children: {
        control: {type: null},
        description: `The AccordionSection components to
            display within this Accordion.`,
        table: {
            type: {
                summary: `Array<React.ReactElement<React.ComponentProps<typeof AccordionSection>>>`,
            },
        },
    },
    title: {
        control: {type: "text"},
        description: `The title for this section. If a string is passed in,
            it will automatically be given Body typography from Wonder Blocks
            Typography.`,
        table: {
            type: {summary: "string"},
        },
    },
    caretPosition: {
        control: {type: "select"},
        description: `Whether to put the caret at the start (the left side in
            left-to-right languages) or end (the right side in right-to-left
            languages) of the title block in this section. Defaults to "end".`,
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
    initialIsOpen: {
        control: {type: "boolean"},
        description: `Whether this section should be open on initial load.
            Defaults to false.`,
        table: {
            defaultValue: {summary: "false"},
            type: {summary: "boolean"},
        },
    },
    style: {
        control: {type: "object"},
        description: "Custom styles for the overall accordion container.",
        table: {
            type: {summary: "StyleType"},
        },
        type: {name: "StyleType", required: false},
    },
};
