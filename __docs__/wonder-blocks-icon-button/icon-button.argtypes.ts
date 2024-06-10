import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    color: {
        control: {
            type: "select",
        },
        description: "Color of the icon button.",
        options: ["default", "destructive"],
        table: {
            type: {
                summary: `"default" | "destructive"`,
            },
            defaultValue: {
                summary: `"default"`,
            },
        },
    },
    disabled: {
        control: {
            type: "boolean",
        },
        description: "Whether the icon button is disabled.",
    },
    icon: {
        control: {
            type: "select",
        },
        description: "A Phosphor icon asset (imported as a static SVG file).",
        options: IconMappings,
    },
    kind: {
        control: {
            type: "select",
        },
        description: "The kind of the icon button.",
        options: ["primary", "secondary", "tertiary"],
        table: {
            type: {
                summary: `"primary" | "secondary" | "tertiary"`,
            },
            defaultValue: {
                summary: `"primary"`,
            },
        },
    },
    size: {
        control: {
            type: "select",
        },
        description: "The size of the icon button.",
        options: ["xsmall", "small", "medium", "large"],
        table: {
            type: {
                summary: `"xsmall" | "small" | "medium" | "large"`,
            },
            defaultValue: {
                summary: `"medium"`,
            },
        },
    },
    "aria-label": {
        description:
            "The description of this component for the screenreader to read.",
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
};
