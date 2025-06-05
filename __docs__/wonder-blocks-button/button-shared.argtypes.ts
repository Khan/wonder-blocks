import {ArgTypes} from "@storybook/react-vite";
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
            // NOTE: We use `Icon` instead of `ReactElement` because we want to
            // encourage the use of `Icon` components for custom icons.
            type: {summary: "PhosphorIconAsset | Icon"},
        },
    },
    endIcon: {
        options: Object.keys(IconMappings),
        mapping: IconMappings,
        table: {
            category: "Layout",
            // NOTE: We use `Icon` instead of `ReactElement` because we want to
            // encourage the use of `Icon` components for custom icons.
            type: {summary: "PhosphorIconAsset | Icon"},
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
    onMouseDown: {
        action: "onMouseDown",
        table: {
            category: "Events",
            type: {
                summary: "(e: React.MouseEvent) => unknown",
            },
        },
    },
    onMouseUp: {
        action: "onMouseUp",
        table: {
            category: "Events",
            type: {
                summary: "(e: React.MouseEvent) => unknown",
            },
        },
    },
    onMouseEnter: {
        action: "onMouseEnter",
        table: {
            category: "Events",
            type: {
                summary: "(e: React.MouseEvent) => unknown",
            },
        },
    },
    onMouseLeave: {
        action: "onMouseLeave",
        table: {
            category: "Events",
            type: {
                summary: "(e: React.MouseEvent) => unknown",
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
