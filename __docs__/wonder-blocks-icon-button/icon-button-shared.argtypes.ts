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
        // NOTE: We need to specify the options explicitly here because
        // we are using union types in the Props type.
        options: ["primary", "secondary", "tertiary"],
        table: {
            defaultValue: {
                summary: `"primary"`,
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
