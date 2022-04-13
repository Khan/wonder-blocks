export default {
    children: {
        description:
            "The child of Clickable must be a function which returns the component which should be made Clickable.  The function is passed an object with three boolean properties: hovered, focused, and pressed.",
        control: {
            type: "text",
        },
        type: {
            required: true,
        },
        table: {
            type: {
                summary: "(ClickableState) => React.Node",
            },
        },
    },
    id: {
        description: "An optional id attribute.",
        table: {
            type: {
                summary: "string",
            },
        },
        control: {
            type: "text",
        },
    },
    /**
     * States
     */
    light: {
        description:
            "Whether the Clickable is on a dark colored background. Sets the default focus ring color to white, instead of blue. Defaults to false.",
        defaultValue: false,
        type: {
            required: true,
        },
        table: {
            category: "States",
            type: {
                summary: "boolean",
            },
        },
    },
    disabled: {
        description: "Disables or enables the child; defaults to false",
        defaultValue: false,
        type: {
            required: true,
        },
        table: {
            category: "States",
            type: {
                summary: "boolean",
            },
        },
    },
    hideDefaultFocusRing: {
        description:
            "Don't show the default focus ring.  This should be used when implementing a custom focus ring within your own component that uses Clickable.",
        table: {
            category: "States",
            type: {
                summary: "boolean",
            },
        },
    },
    /**
     * Styling
     */
    className: {
        description: "Adds CSS classes to the Clickable.",
        control: {
            type: "text",
        },
        table: {
            category: "Styling",
        },
        type: {
            summary: "string",
        },
    },
    style: {
        description: "Optional custom styles.",
        table: {
            category: "Styling",
            type: {
                summary: "StyleType",
            },
        },
    },
    /**
     * Events
     */
    onClick: {
        description:
            "An onClick function which Clickable can execute when clicked.",
        table: {
            category: "Events",
            type: {
                summary: "(e: SyntheticEvent<>) => mixed",
                detail: "`onClick` is optional if `href` is present, but must be defined if `href` is not",
            },
        },
        action: "clicked",
    },
    onkeyDown: {
        description: "Respond to raw `keydown` event.",
        table: {
            category: "Events",
            type: {
                summary: "(e: SyntheticKeyboardEvent<>) => mixed",
            },
        },
    },
    onKeyUp: {
        description: "Respond to raw `keyup` event.",
        table: {
            category: "Events",
            type: {
                summary: "(e: SyntheticKeyboardEvent<>) => mixed",
            },
        },
    },
    /**
     * Navigation
     */
    skipClientNav: {
        description:
            "Avoids client-side routing in the presence of the `href` prop",
        defaultValue: false,
        control: {
            type: "boolean",
        },
        table: {
            category: "Navigation",
            type: {
                summary: "boolean",
            },
        },
    },
    rel: {
        description:
            'Specifies the type of relationship between the current document and the linked document. Should only be used when `href` is specified. This defaults to `noopener noreferrer` when `target="_blank"`, but can be overridden by setting this prop to something else.',
        control: {type: "text"},
        table: {
            category: "Navigation",
            type: {
                summary: "string",
            },
        },
    },
    target: {
        description:
            "A target destination window for a link to open in. Should only be used when `href` is specified.",
        control: {type: "text"},
        table: {
            category: "Navigation",
            type: {
                summary: "string",
            },
        },
    },
    href: {
        description:
            "Optional `href` which `Clickable` should direct to, uses client-side routing by default if react-router is present",
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
        description:
            "Run async code before navigating. If the promise returned rejects then navigation will not occur. If both `safeWithNav` and `beforeNav` are provided, `beforeNav` will be run first and `safeWithNav` will only be run if `beforeNav` does not reject.",
        table: {
            category: "Navigation",
            type: {
                summary: "() => Promise<mixed>",
            },
        },
    },
    safeWithNav: {
        description: `Run async code in the background while client-side navigating. If the browser does a full page load navigation, the callback promise must be settled before the navigation will occur. Errors are ignored so that navigation is guaranteed to succeed.`,
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
    "aria-label": {
        description: "A label for the clickable element.",
        control: {
            type: "text",
        },
        table: {
            category: "Accessibility",
            type: {
                summary: "string",
                detail: `aria-label should be used when using
                graphical elements to let people using screen readers the purpose of the
                clickable element.`,
            },
        },
    },
    role: {
        description:
            "The role of the component, can be a role of type `ClickableRole`",
        table: {
            category: "Accessibility",
            type: {
                summary: "ClickableRole",
                detail: `"button" | "link" | "checkbox" | "radio" | "listbox" | "option" | "menuitem" | "menu" | "tab"`,
            },
        },
    },
};
