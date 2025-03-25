import type {ArgTypes} from "@storybook/react";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    actionType: {
        control: {
            type: "select",
        },
        table: {
            defaultValue: {
                summary: `"progressive"`,
            },
        },
    },
    disabled: {
        control: {
            type: "boolean",
        },
    },
    icon: {
        control: {
            type: "select",
        },
        options: IconMappings as any,
    },
    kind: {
        control: {
            type: "select",
        },
        table: {
            defaultValue: {
                summary: `"primary"`,
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
} satisfies ArgTypes;
