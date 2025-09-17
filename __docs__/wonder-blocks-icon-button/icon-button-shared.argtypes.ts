import type {ArgTypes} from "@storybook/react-vite";
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
        table: {
            type: {
                // NOTE: We document `Icon` instead of `ReactElement` because we want to
                // encourage the use of `Icon` components for custom icons.
                summary: "PhosphorIconAsset | Icon",
            },
        },
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
