// @flow

export default {
    children: {
        control: {type: "object"},
        description:
            "Text to appear on the link. It can be a plain text or Typography element.",
        table: {type: {summary: "string | React.Element<Typography>"}},
        type: {required: true},
    },
    href: {
        control: {type: "text"},
        description: "URL to navigate to.",
        table: {type: {summary: "string"}},
        type: {required: true},
    },
    id: {
        control: {type: "text"},
        description: "An optional id attribute.",
        table: {type: {summary: "string"}},
        type: {required: false},
    },
    kind: {
        control: {type: "select"},
        description:
            "Kind of Link. Note: Secondary light Links are not supported.",
        options: ["primary", "secondary"],
        table: {
            type: {summary: `"primary" | "secondary"`},
        },
        type: {required: false},
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
    testId: {
        control: {type: "text"},
        description: "Test ID used for e2e testing.",
        table: {
            type: {summary: "string"},
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
            type: {summary: "boolean"},
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
    safeWithNav: {
        description: `Run async code in the background while client-side
        navigating. If the browser does a full page load navigation, the
        callback promise must be settled before the navigation will occur.
        Errors are ignored so that navigation is guaranteed to succeed.`,
        table: {
            type: {summary: "() => Promise<mixed>"},
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
};
