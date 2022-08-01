// @flow

export default {
    children: {
        description:
            "Text to appear on the link. It can be a plain text or Typography element.",
        type: {required: true},
    },
    href: {
        description: "URL to navigate to.",
        type: {required: true},
    },
    id: {
        description: "An optional id attribute.",
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
    },
};
