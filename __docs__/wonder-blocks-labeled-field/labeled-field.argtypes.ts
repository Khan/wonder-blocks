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
    style: {
        table: {
            type: {
                summary: "StyleType",
            },
            category: "Visual style",
        },
        control: {
            type: "null",
        },
    },
};
