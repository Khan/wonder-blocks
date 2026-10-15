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
        description:
            "An accessible name for the view. Since the view becomes focusable while its content overflows, give it a name that describes its content.",
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
        description:
            "The id of an element that labels the view (an alternative to `aria-label`).",
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
