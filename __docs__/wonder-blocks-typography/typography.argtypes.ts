export default {
    children: {
        control: {type: "text"},
        description: "Text to appear with the specified typography styles.",
        table: {type: {summary: "React.Node"}},
        type: {required: false},
    },
    style: {
        control: {type: "object"},
        description: "Optional custom styles.",
        table: {type: {summary: "StyleType"}},
        type: {required: false},
    },
    testId: {
        control: {type: "text"},
        description: "Test ID used for e2e testing.",
        table: {type: {summary: "string"}},
        type: {required: false},
    },
    id: {
        control: {type: "text"},
        description: "Unique identifier.",
        table: {type: {summary: "string"}},
        type: {required: false},
    },
    tag: {
        control: {type: "text"},
        description:
            "The underyling HTML tag to render (e.g. `h1`, `h2`, etc.) Please use this to ensure that the header is hierarchically correct.",
        table: {type: {summary: "string"}},
        type: {required: false},
    },
};
