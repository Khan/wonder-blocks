export default {
    label: {
        table: {
            type: {
                summary: "string | ReactNode",
            },
        },
    },
    description: {
        table: {
            type: {
                summary: "string | ReactNode",
            },
        },
    },
    errorMessage: {
        table: {
            type: {
                summary: "string | ReactNode",
            },
        },
    },
    required: {
        table: {
            type: {
                summary: "string | boolean",
            },
        },
    },
    field: {
        table: {
            type: {
                summary: "ReactNode",
            },
        },
    },
    /**
     * Visual Style
     */
    styles: {
        table: {
            type: {
                summary:
                    "{ root?: StyleType; label?: StyleType; description?: StyleType; error?: StyleType }",
            },
            category: "Visual style",
        },
        control: {
            type: "null",
        },
    },
};
