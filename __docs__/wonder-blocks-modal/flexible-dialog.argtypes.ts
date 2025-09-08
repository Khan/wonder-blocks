import type {ArgTypes} from "@storybook/react";

export default {
    title: {
        control: {type: "text"},
        table: {type: {summary: "React.ReactNode | string"}},
    },

    content: {
        control: {type: undefined},
        table: {
            type: {
                summary:
                    "React.ReactNode | ((slots: {title: React.ReactNode}) => React.ReactNode)",
            },
        },
        type: {
            name: "other",
            value: "React.ReactNode | ((slots: {title: React.ReactNode}) => React.ReactNode)",
            required: true,
        },
    },
    footer: {
        control: {type: undefined},
        table: {
            type: {
                summary: "React.ReactNode",
            },
        },
        type: {
            name: "other",
            value: "React.ReactNode",
            required: false,
        },
    },

    onClose: {
        table: {type: {summary: "() => unknown"}},
    },

    closeButtonVisible: {
        control: {type: "boolean"},
        defaultValue: true,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
    },

    role: {
        control: {type: "select"},
        defaultValue: "dialog",
        options: ["dialog", "alertdialog"],
        table: {
            defaultValue: {summary: "dialog"},
            type: {summary: `"dialog" | "alertdialog"`},
        },
    },
    styles: {
        control: {type: undefined},
        table: {
            type: {
                summary:
                    "{root?: StyleType, dialog?: StyleType, panel?: StyleType, content?: StyleType, closeButton?: StyleType, footer?: StyleType}",
            },
        },
    },
    testId: {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },

    titleId: {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },

    "aria-label": {
        control: {type: "text"},
        table: {type: {summary: "string"}},
        description:
            "An accessible name for the dialog if there is no main heading.",
    },

    "aria-labelledby": {
        control: {type: "text"},
        table: {type: {summary: "string"}},
        description:
            "An ID reference of the main heading element to create the dialog's accessible name.",
    },

    "aria-describedby": {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },
} satisfies ArgTypes;
