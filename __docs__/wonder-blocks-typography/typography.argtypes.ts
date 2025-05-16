export default {
    children: {
        control: {type: "text"},
        description: "Text to appear with the specified typography styles.",
        table: {type: {summary: "React.Node"}},
    },
    style: {
        control: {type: "object"},
        description: "Optional custom styles.",
        table: {type: {summary: "StyleType"}},
    },
    testId: {
        control: {type: "text"},
        description: "Test ID used for e2e testing.",
        table: {type: {summary: "string"}},
    },
    id: {
        control: {type: "text"},
        description: "Unique identifier.",
        table: {type: {summary: "string"}},
    },
    tag: {
        control: {type: "text"},
        description:
            "The underlying HTML tag to render (e.g. `h1`, `h2`, `label`, etc.). Please use this to ensure that the typography is hierarchically correct.",
        table: {type: {summary: "string"}},
    },
    size: {
        control: {type: "radio"},
        description:
            "A sizing scale token to match available sizes for the theme font.",
        table: {type: {summary: "string"}},
    },
    weight: {
        control: {type: "radio"},
        description:
            "A token to match available font weights for the theme font.",
        table: {type: {summary: "string"}},
    },
};
