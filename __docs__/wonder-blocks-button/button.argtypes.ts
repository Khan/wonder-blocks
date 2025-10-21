import type {ArgTypes} from "@storybook/react-vite";

import buttonSharedArgtypes from "./button-shared.argtypes";

export default {
    ...buttonSharedArgtypes,
    spinner: {
        control: {type: "boolean"},
        table: {
            category: "Layout",
        },
    },
    size: {
        control: {type: "select"},
        table: {
            category: "Layout",
            type: {
                summary: `"medium" | "small" | "large"`,
            },
        },
    },
    style: {
        table: {
            category: "Layout",
            type: {
                summary: "StyleType",
            },
        },
    },
    labelStyle: {
        table: {
            category: "Layout",
            type: {
                summary: "StyleType",
            },
        },
    },
} satisfies ArgTypes;
