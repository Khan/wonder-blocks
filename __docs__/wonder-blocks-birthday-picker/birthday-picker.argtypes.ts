import type {ArgTypes} from "@storybook/react-vite";

const argTypes: ArgTypes = {
    labels: {
        control: {type: "object"},
        table: {
            type: {
                summary: "Labels",
                detail: `{
    // Label for displaying a validation error.
    errorMessage: string;
    // Label for the month placeholder.
    month: string;
    // Label for the year placeholder.
    year: string;
    // Label for the day placeholder.
    day: string;
}`,
            },
        },
    },
    onChange: {
        action: "onChanged",
        table: {
            category: "Events",
        },
    },
    style: {
        description: `Additional styles applied to the root element of the
            component.`,
        table: {
            type: {
                summary: "StyleType",
            },
        },
    },
    dropdownStyle: {
        description: "Additional styles applied to the dropdowns.",
        table: {
            type: {
                summary: "StyleType",
            },
        },
    },
};

export default argTypes;
