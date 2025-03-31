import type {ArgTypes} from "@storybook/react";

export default {
    tabs: {
        table: {
            type: {
                summary: "Array<TabItem>",
                detail: "type TabItem = {|\n\tid: string,\n\tlabel: React.ReactNode,\n\tpanel: React.ReactNode\n|}",
            },
        },
    },
    "aria-label": {
        description:
            "If there is no visible label for the tabs, set aria-label to a label describing the tabs. Note: Either aria-label or aria-labelledby should be provided.",
        table: {
            type: {
                summary: "string",
            },
            category: "Accessibility",
        },
    },
    "aria-labelledby": {
        description:
            "If the tabs have a visible label, set aria-labelledby to a value that refers to the labelling element. Note: Either aria-label or aria-labelledby should be provided.",
        table: {
            type: {
                summary: "string",
            },
            category: "Accessibility",
        },
    },
} satisfies ArgTypes;
