import type {ArgTypes} from "@storybook/react";

export default {
    children: {
        control: {type: "text"},
        description:
            "The content to display inside the card. Can be any React element or multiple elements.",
        table: {
            type: {summary: "React.ReactNode"},
        },
        type: {name: "other", value: "React.ReactNode", required: true},
    },
    showDismissButton: {
        control: {type: "boolean"},
        description:
            "Whether to display a dismiss/close button in the top-right corner of the card. When true, users can close the card.",
        defaultValue: false,
        table: {
            type: {summary: "boolean"},
            defaultValue: {summary: "false"},
        },
        type: {name: "boolean", required: false},
    },
    dismissButtonLabel: {
        control: {type: "text"},
        description:
            "Custom aria-label for the dismiss button to improve accessibility. If not provided, defaults to 'Close'.",
        table: {
            type: {summary: "string"},
            defaultValue: {summary: '"Close"'},
            category: "Accessibility",
        },
        type: {name: "string", required: false},
    },
    onDismiss: {
        action: "dismissed",
        description:
            "Callback function called when the dismiss button is clicked. Receives the click event as a parameter.",
        table: {
            type: {summary: "(e?: React.SyntheticEvent) => void"},
            category: "Events",
        },
        type: {name: "function", required: false},
    },
    styles: {
        control: false,
        description:
            "Custom styles to apply to the card. Supports styling the root element and dismiss button separately.",
        table: {
            type: {
                summary: "{ root?: StyleType; dismissButton?: StyleType; }",
            },
            category: "Styling",
        },
    },
} satisfies ArgTypes;
