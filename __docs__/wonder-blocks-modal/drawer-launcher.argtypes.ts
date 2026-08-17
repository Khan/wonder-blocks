import type {ArgTypes} from "@storybook/react-vite";

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
            type: {summary: "{container?: StyleType; backdrop?: StyleType}"},
        },
        description:
            "Optional styles for the launcher's container and its backdrop overlay. `backdrop` is applied last, so it overrides the backdrop's own styles, including its opacity animation.",
    },

    timingDuration: {
        control: {type: "number"},
        table: {
            defaultValue: {summary: "300ms enter / 150ms exit"},
            type: {summary: "number"},
        },
        description:
            "Duration in milliseconds for the slide animations, overriding both phases. Also coordinates focus timing.",
    },

    easing: {
        control: {type: "object"},
        table: {
            defaultValue: {
                summary:
                    "cubic-bezier(0.05, 0.7, 0.1, 1) enter / cubic-bezier(0.3, 0, 0.8, 0.15) exit",
            },
            type: {summary: "{enter?: string; exit?: string}"},
        },
        description:
            "Per-phase easing for the panel's slide. Either phase can be omitted to keep its default curve; the backdrop's fade stays linear.",
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
