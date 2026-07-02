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
    readOnlyMessage: {
        table: {
            type: {
                summary: "string | ReactNode",
            },
        },
    },
    additionalHelperMessage: {
        table: {
            type: {
                summary: "string | ReactNode",
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
