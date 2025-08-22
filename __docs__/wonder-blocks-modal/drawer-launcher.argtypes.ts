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
                    "ModalElement | (({|closeModal: () => void, styles?: DrawerDialogStyles|}) => ModalElement)",
            },
        },
        type: {
            name: "other",
            value: "ModalElement | (({|closeModal: () => void, styles?: DrawerDialogStyles|}) => ModalElement)",
            required: true,
        },
    },

    styles: {
        control: {type: undefined},
        table: {
            type: {summary: "{container?: StyleType}"},
        },
        description: "Optional styles for the DrawerLauncher container",
    },

    timingDuration: {
        control: {type: "number"},
        defaultValue: 400,
        table: {
            defaultValue: {summary: "400"},
            type: {summary: "number"},
        },
        description: "Duration in milliseconds for slide-in animation",
    },

    animated: {
        control: {type: "boolean"},
        defaultValue: true,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
        description: "Whether to include animation (false for reduced-motion)",
    },

    backdropDismissEnabled: {
        control: {type: "boolean"},
        defaultValue: true,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
        description: "Enables backdrop click to dismiss the modal",
    },

    initialFocusId: {
        control: {type: "text"},
        table: {
            type: {summary: "string"},
        },
        description: "ID of element to focus when dialog opens",
    },

    closedFocusId: {
        control: {type: "text"},
        table: {type: {summary: "string"}},
        description: "ID of element to focus when dialog closes",
    },

    testId: {
        control: {type: "text"},
        table: {type: {summary: "string"}},
        description: "Test ID for e2e testing (set on DrawerBackdrop)",
    },

    // Controlled Mode Props (mutually exclusive with children)
    opened: {
        control: {type: "boolean"},
        table: {
            category: "Controlled Mode",
            type: {summary: "boolean"},
        },
        description:
            "Controls modal visibility. Requires onClose. Forbids children.",
    },

    onClose: {
        table: {
            category:
                "Controlled Mode (required) / Uncontrolled Mode (optional)",
            type: {summary: "() => unknown"},
        },
        description:
            "Called when modal needs to close. Required in controlled mode.",
    },

    // Uncontrolled Mode Props (mutually exclusive with opened)
    children: {
        control: {type: undefined},
        table: {
            category: "Uncontrolled Mode",
            type: {summary: "({openModal: () => unknown}) => React.ReactNode"},
        },
        description:
            "Render prop providing openModal function. Required in uncontrolled mode. Forbids opened.",
    },
} satisfies ArgTypes;
