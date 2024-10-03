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
    error: {
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
    light: {
        table: {
            category: "Visual style",
        },
    },
};
