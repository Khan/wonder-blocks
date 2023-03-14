import type {InputType} from "@storybook/csf";

export default {
    children: {
        control: {type: "text"},
        description:
            "Text to appear on the link. It can be a plain text or Typography element.",
        table: {type: {summary: "string | React.Element<Typography>"}},
        type: {name: "string", required: true},
    },

    href: {
        control: {type: "text"},
        description: "URL to navigate to.",
        table: {type: {summary: "string"}},
        type: {name: "string", required: true},
    },

    id: {
        control: {type: "text"},
        description: "An optional id attribute.",
        table: {type: {summary: "string"}},
        type: {name: "string", required: false},
    },

    inline: {
        control: {type: "boolean"},
        description: `Indicates that this link is used within a body of text.
            This styles the link with an underline to distinguish it
            from surrounding text.`,
        table: {type: {summary: "boolean"}},
        type: {name: "boolean", required: false},
    },

    kind: {
        control: {type: "select"},
        description:
            "Kind of Link. Note: Secondary light Links are not supported.",
        options: ["primary", "secondary"],
        table: {
            type: {summary: `"primary" | "secondary"`},
        },
        type: {name: "enum", value: ["primary", "secondary"], required: false},
    },

    light: {
        control: {type: "boolean"},
        description: "Whether the button is on a dark/colored background.",
        table: {
            type: {summary: "boolean"},
        },
    },

    visitable: {
        control: {type: "boolean"},
        description:
            "Whether the link should change color once it's visited. Secondary or primary (light) links are not allowed to be visitable.",
        table: {
            type: {summary: "boolean"},
        },
    },

    rel: {
        control: {type: "text"},
        description: `Specifies the type of relationship between the current
            document and the linked document. Should only be used when
            \`href\` is specified. This defaults to "noopener noreferrer"
            when \`target="_blank"\`, but can be overridden by setting this
            prop to something else.`,
        table: {
            type: {summary: "string"},
        },
    },

    tabIndex: {
        control: {type: "number"},
        description: "Set the tabindex attribute on the rendered element.",
        table: {
            defaultValue: {summary: 0},
            type: {summary: "number"},
        },
    },

    target: {
        control: {type: "text"},
        description: `A target destination window for a link to open in.
            We only support "_blank" which opens the URL in a new tab.`,
        table: {
            type: {summary: "string"},
        },
    },

    testId: {
        control: {type: "text"},
        description: "Test ID used for e2e testing.",
        table: {
            type: {summary: "string"},
        },
    },

    style: {
        control: {type: "object"},
        description: "custom styles.",
        table: {type: {summary: "StyleType"}},
    },

    className: {
        control: {type: "text"},
        description: "Adds CSS classes to the Link.",
        table: {type: {summary: "string"}},
    },

    beforeNav: {
        description: `Run async code before navigating to the URL passed to
            \`href\`. If the promise returned rejects then navigation will not
            occur. If both safeWithNav and beforeNav are provided, beforeNav
            will be run first and safeWithNav will only be run if beforeNav
            does not reject.`,
        table: {
            category: "Navigation",
            type: {summary: "() => Promise<mixed>"},
        },
    },

    safeWithNav: {
        description: `Run async code in the background while client-side
        navigating. If the browser does a full page load navigation, the
        callback promise must be settled before the navigation will occur.
        Errors are ignored so that navigation is guaranteed to succeed.`,
        table: {
            category: "Navigation",
            type: {summary: "() => Promise<mixed>"},
        },
    },

    skipClientNav: {
        control: {type: "boolean"},
        description: `Whether to avoid using client-side navigation.
            If the URL passed to href is local to the client-side, e.g.
            /math/algebra/eval-exprs, then it tries to use react-router-dom's
            Link component which handles the client-side navigation. You can set
            \`skipClientNav\` to true avoid using client-side nav entirely.`,
        table: {
            category: "Navigation",
            type: {summary: "boolean"},
        },
    },

    onClick: {
        description: `Function to call when button is clicked.
        This should NOT be used to redirect to a different URL or to
        prevent navigation via e.preventDefault(). The event passed to this
        handler will have its preventDefault() and stopPropagation() methods
        stubbed out.`,
        table: {
            category: "Events",
            type: {summary: "(e: SyntheticEvent<>) => mixed"},
        },
    },

    onKeyDown: {
        description: `Respond to raw "keydown" event.`,
        table: {
            category: "Events",
            type: {summary: "(e: SyntheticKeyboardEvent<>) => mixed"},
        },
    },

    onKeyUp: {
        description: `Respond to raw "keyup" event.`,
        table: {
            category: "Events",
            type: {summary: "(e: SyntheticKeyboardEvent<>) => mixed"},
        },
    },
} satisfies Record<string, InputType>;
