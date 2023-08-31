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
    style: {
        control: {type: "object"},
        description: "Custom styles for the overall accordion container.",
        table: {
            type: {summary: "StyleType"},
        },
        type: {name: "StyleType", required: false},
    },
};
