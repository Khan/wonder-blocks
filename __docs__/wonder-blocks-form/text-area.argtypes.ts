export default {
    /**
     * General
     */
    autoComplete: {
        table: {
            type: {
                summary: `"on" | "off"`,
            },
        },
    },
    wrap: {
        table: {
            type: {
                summary: `"hard" | "soft" | "off"`,
            },
        },
    },
    required: {
        table: {
            type: {
                summary: `boolean | string`,
            },
        },
        control: {
            type: "text",
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
    className: {
        table: {
            category: "Visual style",
        },
    },
    rootStyle: {
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

    /**
     * Events
     */
    onValidate: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },

    onChange: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },

    onKeyDown: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },

    onKeyUp: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },

    onFocus: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },

    onBlur: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },

    onClick: {
        table: {
            category: "Events",
        },
        control: {
            type: "null",
        },
    },
};
