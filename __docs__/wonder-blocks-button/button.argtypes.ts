import type {ArgTypes} from "@storybook/react";

import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

export default {
    children: {
        type: {name: "string", required: true},
    },
    startIcon: {
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        table: {
            category: "Layout",
            type: {summary: "PhosphorIconAsset"},
        },
    },
    endIcon: {
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        table: {
            category: "Layout",
            type: {summary: "PhosphorIconAsset"},
        },
    },
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
    className: {
        control: {type: "text"},
        table: {
            category: "Layout",
            type: {
                summary: "string",
            },
        },
    },
    /**
     * Events
     */
    onClick: {
        action: "clicked",
        table: {
            category: "Events",
            type: {
                summary: "(e: SyntheticEvent<>) => mixed",
                detail: `onClick is optional if href is present, but must be defined if
                    * href is not`,
            },
        },
    },
    /**
     * Navigation
     */
    skipClientNav: {
        control: {type: "boolean"},
        table: {
            category: "Navigation",
        },
    },
    rel: {
        control: {type: "text"},
        table: {
            category: "Navigation",
        },
    },
    target: {
        control: {type: "text"},
        table: {
            category: "Navigation",
        },
    },
    href: {
        control: {type: "text"},
        table: {
            category: "Navigation",
            type: {
                summary: "string",
                detail: "URL is required when we use `safeWithNav`",
            },
        },
    },
    beforeNav: {
        table: {
            category: "Navigation",
            type: {
                summary: "() => Promise<mixed>",
            },
        },
    },
    safeWithNav: {
        table: {
            category: "Navigation",
            type: {
                summary: "() => Promise<mixed>",
            },
        },
    },
    /**
     * Accessibility
     */
    ariaLabel: {
        name: "aria-label",
        description: "A label for the button.",
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
                detail: `aria-label should be used when spinner={true} to let people using screen readers that the action taken by clicking the button will take some time to complete.`,
            },
        },
    },
} satisfies ArgTypes;
