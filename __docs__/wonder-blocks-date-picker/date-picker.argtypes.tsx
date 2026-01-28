import type {ArgTypes} from "@storybook/react-vite";

export default {
    locale: {
        control: {type: "object"},
        table: {
            category: "Localization",
        },
    },
    dateFormat: {
        control: {type: "select"},
        options: [
            undefined,
            "L",
            "LL",
            "MM/DD/YYYY",
            "MMMM D, YYYY",
            "YYYY-MM-DD",
        ],
        table: {
            category: "Localization",
        },
    },
    disabled: {
        control: {type: "boolean"},
        table: {
            category: "State",
        },
    },
    closeOnSelect: {
        control: {type: "boolean"},
        table: {
            category: "Behavior",
        },
    },
    keepInvalidText: {
        control: {type: "boolean"},
        table: {
            category: "Behavior",
        },
    },
    minDate: {
        control: {type: "object"},
        table: {
            category: "Validation",
        },
    },
    maxDate: {
        control: {type: "object"},
        table: {
            category: "Validation",
        },
    },
    selectedDate: {
        control: {type: "object"},
        table: {
            category: "State",
        },
    },
    placeholder: {
        control: {type: "text"},
        table: {
            category: "Content",
        },
    },
    inputAriaLabel: {
        control: {type: "text"},
        table: {
            category: "Accessibility",
        },
    },
    style: {
        control: {type: "object"},
        table: {
            category: "Layout",
        },
    },
    updateDate: {
        table: {
            category: "Events",
        },
    },
    footer: {
        control: false,
        table: {
            category: "Content",
        },
    },
    id: {
        control: {type: "text"},
        table: {
            category: "Accessibility",
        },
    },
} satisfies ArgTypes;
