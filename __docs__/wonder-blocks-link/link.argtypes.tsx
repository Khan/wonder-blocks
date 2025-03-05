import * as React from "react";

import type {ArgTypes} from "@storybook/react";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {IconMappings} from "../wonder-blocks-icon/phosphor-icon.argtypes";

const iconsMap: Record<string, React.ReactElement<typeof PhosphorIcon>> = {};

Object.entries(IconMappings).forEach(([iconLabel, iconValue]) => {
    iconsMap[iconLabel] = <PhosphorIcon icon={iconValue} />;
});

export default {
    children: {
        control: {type: "text"},
        description:
            "Text to appear on the link. It can be a plain text or Typography element.",
        table: {type: {summary: "string | React.Element<Typography>"}},
        type: {name: "string", required: true},
    },

    endIcon: {
        control: {type: "select", labels: {null: "none"}},
        description: `Icon to appear after the link label. If
        \`target="_blank"\` and an \`endIcon\` is passed in, \`endIcon\` will
        override the default \`externalIcon\`.`,
        options: [null, ...Object.keys(iconsMap)],
        mapping: iconsMap,
        table: {
            category: "Icons",
            type: {summary: "PhosphorIcon"},
        },
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

    light: {
        control: {type: "boolean"},
        description: "Whether the button is on a dark/colored background.",
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
            defaultValue: {summary: "0"},
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

    startIcon: {
        control: {type: "select", labels: {null: "none"}},
        description: "Icon to appear before the link label.",
        options: [null, ...Object.keys(iconsMap)],
        mapping: iconsMap,
        table: {
            category: "Icons",
            type: {summary: "PhosphorIcon"},
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

    title: {
        control: {type: "text"},
        description: "An optional title attribute.",
        table: {type: {summary: "string"}},
        type: {name: "string", required: false},
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
} satisfies ArgTypes;
