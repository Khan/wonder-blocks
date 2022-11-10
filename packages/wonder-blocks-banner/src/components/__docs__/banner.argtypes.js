// @flow
const actionsMappings = {
    none: null,
    buttons: [
        {title: "Button 1", onClick: () => {}},
        {title: "Button 2", onClick: () => {}},
    ],
    links: [
        {title: "Link 1", href: "/"},
        {title: "Link 2", href: "/"},
    ],
    buttonAndLink: [
        {title: "Button", onClick: () => {}},
        {title: "Link", href: "/"},
    ],
    linkAndButton: [
        {title: "Link", href: "/"},
        {title: "Button", onClick: () => {}},
    ],
};

const dismissMappings = {
    none: null,
    "log on click": () => {
        // eslint-disable-next-line no-console
        console.log("Dimiss button clicked!");
    },
};

export default {
    kind: {
        control: {type: "select"},
        defaultValue: "info",
        description: "Determines the color and icon of the banner.",
        options: ["info", "success", "warning", "critical"],
        table: {
            type: {summary: `"info" | "success" | "warning" | "critical"`},
            defaultValue: {summary: `"info"`},
        },
        type: {required: false},
    },
    layout: {
        control: {type: "select"},
        description: "Determines the edge style of the Banner.",
        options: ["floating", "full-width"],
        table: {
            type: {summary: `"floating" | "full-width"`},
        },
        type: {required: true},
    },
    text: {
        control: {type: "text"},
        description:
            "Text on the banner (LabelSmall) or a node if you want something different.",
        table: {type: {summary: "string | React.Node"}},
        type: {required: true},
    },
    actions: {
        control: {type: "select"},
        description: `Links or tertiary Buttons that appear to the right of the
            text.\n\nThe ActionTrigger must have either an onClick or an href
            field, or both.`,
        options: actionsMappings,
        table: {
            type: {
                summary: "Array<ActionTrigger>",
                detail: "type ActionTrigger = {|\n\ttitle: string,\n\tonClick: () => void | href: string,\n\tariaLabel?: string,\n|}",
            },
        },
    },
    onDismiss: {
        control: {type: "select"},
        description:
            "If present, dismiss button is on right side. If not, no button appears.",
        options: dismissMappings,
        table: {required: false},
    },
    dismissAriaLabel: {
        control: {type: "text"},
        description:
            "The accessible label for the dismiss button. Please pass in a translated string.",
        defaultValue: "Dismiss banner.",
        table: {
            type: {summary: "string"},
            defaultValue: {summary: `"Dismiss banner."`},
        },
        type: {required: false},
    },
    "aria-label": {
        control: {type: "text"},
        description:
            "Accessible label for the banner. This is read out before the other contents of the banner.",
        table: {
            type: {summary: "string"},
        },
        type: {required: false},
    },
};
