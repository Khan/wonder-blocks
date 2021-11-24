// @flow
import {icons} from "@khanacademy/wonder-blocks-icon";

export default {
    children: {
        description: "Text to appear on the button.",
        type: {required: true},
    },
    icon: {
        description: "An icon, displayed to the left of the title.",
        type: {required: false},
        control: {type: "select"},
        options: (Object.keys(icons): Array<string>),
        mapping: icons,
        table: {
            category: "Layout",
            type: {summary: "IconAsset"},
        },
    },
    spinner: {
        description: "If true, replaces the contents with a spinner.",
        control: {type: "boolean"},
        table: {
            category: "Layout",
            type: {
                summary: "boolean",
                detail: "Setting this prop to `true` will disable the button.",
            },
        },
    },
    color: {
        description: "The color of the button, either blue or red.",
        options: ["default", "destructive"],
        control: {type: "radio"},
        table: {
            category: "Theming",
            type: {
                summary: `"default" | "destructive"`,
            },
        },
    },
    kind: {
        description:
            "The kind of the button, either primary, secondary, or tertiary.",
        options: ["primary", "secondary", "tertiary"],
        control: {type: "select"},
        table: {
            type: {summary: "primary | secondary | tertiary"},
            defaultValue: {
                detail: `
                - Primary buttons have background colors.\n- Secondary buttons have a border and no background color.\n- Tertiary buttons have no background or border.
                `,
            },
        },
    },
    light: {
        description: "Whether the button is on a dark/colored background.",
        control: {type: "boolean"},
        table: {
            category: "Theming",
            type: {
                summary: "boolean",
                detail: "Sets primary button background color to white, and secondary and tertiary button title to color.",
            },
        },
    },
    size: {
        description: "The size of the button.",
        options: ["small", "medium", "xlarge"],
        control: {type: "select"},
        table: {
            category: "Layout",
            defaultValue: {
                detail: `"medium" = height: 40; "small" = height: 32; "xlarge" = height: 60;`,
            },
            type: {
                summary: `"medium" | "small" | "xlarge"`,
            },
        },
    },
    disabled: {
        description: "Whether the button is disabled.",
        table: {
            type: {
                summary: "boolean",
            },
        },
    },
    id: {
        description: "An optional id attribute.",
        control: {type: "text"},
        table: {
            type: {
                summary: "string",
            },
        },
    },
    testId: {
        description: "Test ID used for e2e testing.",
        control: {type: "text"},
        table: {
            type: {
                summary: "string",
            },
        },
    },

    tabIndex: {
        description: "Set the tabindex attribute on the rendered element.",
        control: {type: "number", min: -1},
        table: {
            type: {
                summary: "number",
            },
        },
    },
    style: {
        description: "Optional custom styles.",
        table: {
            category: "Layout",
            type: {
                summary: "StyleType",
            },
        },
    },
    className: {
        description: "Adds CSS classes to the Button.",
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
        description: `Function to call when button is clicked.
        This callback should be used for things like marking BigBingo conversions. It should NOT be used to redirect to a different URL or to prevent navigation via e.preventDefault(). The event passed to this handler will have its preventDefault() and stopPropagation() methods stubbed out.
        `,
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
        description: `Whether to avoid using client-side navigation. If the URL passed to href is local to the client-side, e.g. /math/algebra/eval-exprs, then it tries to use react-router-dom's Link component which handles the client-side navigation. You can set "skipClientNav" to true avoid using client-side nav entirely.`,
        control: {type: "boolean"},
        table: {
            category: "Navigation",
            type: {
                summary: "Note",
                detail: "All URLs containing a protocol are considered external, e.g. https://khanacademy.org/math/algebra/eval-exprs will trigger a full page reload.",
            },
        },
    },
    rel: {
        description: `Specifies the type of relationship between the current document and the linked document. Should only be used when "href" is specified. This defaults to "noopener noreferrer" when target="_blank", but can be overridden by setting this prop to something else.`,
        control: {type: "text"},
        table: {
            category: "Navigation",
            type: {
                summary: "string",
            },
        },
    },
    target: {
        description: `A target destination window for a link to open in. Should only be used
        * when "href" is specified.`,
        control: {type: "text"},
        table: {
            category: "Navigation",
            type: {
                summary: "string",
            },
        },
    },
    href: {
        description: "URL to navigate to.",
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
        description: `Run async code before navigating. If the promise returned rejects then navigation will not occur. If both safeWithNav and beforeNav are provided, beforeNav will be run first and safeWithNav will only be run if beforeNav does not reject.`,
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
};
