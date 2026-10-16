import type {ArgTypes} from "@storybook/react-vite";

import AriaArgTypes from "../wonder-blocks-core/aria.argtypes";

export default {
    ...AriaArgTypes,
    children: {
        control: false,
    },
    style: {
        control: false,
        table: {
            category: "Visual style",
        },
    },
    "aria-label": {
        control: {
            type: "text",
        },
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
    "aria-labelledby": {
        control: {
            type: "text",
        },
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
    testId: {
        control: {
            type: "text",
        },
        table: {
            type: {
                summary: "string",
            },
        },
    },
} satisfies ArgTypes;
