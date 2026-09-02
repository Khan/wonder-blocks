import type {ArgTypes} from "@storybook/react-vite";
import iconButtonSharedArgtypes from "./icon-button-shared.argtypes";

export default {
    ...iconButtonSharedArgtypes,
    "aria-label": {
        control: {
            type: "text",
        },
        type: {
            name: "string",
            required: true,
        },
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
            },
        },
    },
    size: {
        control: {
            type: "select",
        },
        table: {
            defaultValue: {
                summary: `"medium"`,
            },
        },
    },
} satisfies ArgTypes;
