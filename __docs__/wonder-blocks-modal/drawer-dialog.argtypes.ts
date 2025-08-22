import type {ArgTypes} from "@storybook/react";

export default {
    // Accessibility props (discriminated union)
    title: {
        control: {type: "text"},
        table: {
            category: "Accessibility (one required)",
            type: {summary: "string | ReactElement"},
        },
    },
    "aria-label": {
        control: {type: "text"},
        table: {
            category: "Accessibility (one required)",
            type: {summary: "string"},
        },
    },
    "aria-labelledby": {
        control: {type: "text"},
        table: {
            category: "Accessibility (one required)",
            type: {summary: "string"},
        },
    },
    titleId: {
        control: {type: "text"},
        table: {
            type: {summary: "string"},
        },
    },

    // Core props
    content: {
        control: {type: undefined},
        table: {
            type: {
                summary:
                    "ReactElement | (({title: ReactElement}) => ReactElement)",
            },
        },
    },

    // Interaction props
    onClose: {
        table: {
            type: {summary: "() => unknown"},
        },
        description:
            "Called when close button clicked. Prefer DrawerLauncher onClose instead.",
    },
    closeButtonVisible: {
        control: {type: "boolean"},
        table: {
            type: {summary: "boolean"},
        },
    },

    // Styling and customization
    role: {
        control: "radio",
        options: ["dialog", "alertdialog"],
        defaultValue: "dialog",
        table: {
            defaultValue: {summary: "dialog"},
            type: {summary: "dialog | alertdialog"},
        },
    },
    styles: {
        control: {type: undefined},
        table: {
            type: {summary: "DrawerDialogStyles"},
        },
    },

    // Testing
    testId: {
        control: {type: "text"},
        table: {
            type: {summary: "string"},
        },
    },
    "aria-describedby": {
        control: {type: "text"},
        table: {
            type: {summary: "string"},
        },
    },
} satisfies ArgTypes;
