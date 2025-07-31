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

    style: {
        control: {type: "object"},
        table: {type: {summary: "StyleType"}},
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
    },

    "aria-labelledby": {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },

    "aria-describedby": {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },
} satisfies ArgTypes;
