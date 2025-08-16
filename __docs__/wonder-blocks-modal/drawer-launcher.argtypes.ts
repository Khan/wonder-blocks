import type {ArgTypes} from "@storybook/react";

export default {
    alignment: {
        control: "radio",
        options: ["inlineStart", "inlineEnd", "blockEnd"],
        description: "Position of the drawer (supports RTL)",
    },
    modal: {
        control: {type: undefined},
        table: {
            type: {
                summary:
                    "ModalElement | (({|closeModal: () => void|}) => ModalElement)",
            },
        },
        type: {
            name: "other",
            value: "ModalElement | (({|closeModal: () => void|}) => ModalElement)",
            required: true,
        },
    },

    backdropDismissEnabled: {
        control: {type: "boolean"},
        defaultValue: "true",
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
    },

    initialFocusId: {
        control: {type: "text"},
        table: {
            type: {summary: "string"},
        },
    },

    closedFocusId: {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },

    testId: {
        control: {type: "text"},
        table: {type: {summary: "string"}},
    },

    opened: {
        control: {type: "boolean"},
        table: {
            category: "Controlled",
            type: {summary: "boolean"},
        },
    },

    onClose: {
        table: {
            category: "Controlled",
            type: {summary: "() => mixed"},
        },
    },
} satisfies ArgTypes;
