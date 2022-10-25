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
        options: ["info", "success", "warning", "critical"],
        table: {
            type: {summary: `"info" | "success" | "warning" | "critical"`},
            defaultValue: {summary: `"info"`},
        },
        type: {required: false},
    },
    layout: {
        control: {type: "select"},
        options: ["floating", "full-width"],
        table: {
            type: {summary: `"floating" | "full-width"`},
        },
        type: {required: true},
    },
    text: {
        control: {type: "text"},
        table: {type: {summary: "string | React.Node"}},
        type: {required: true},
    },
    actions: {
        control: {type: "select"},
        options: actionsMappings,
        table: {
            type: {
                summary: "Array<ActionTrigger>",
                detail: "type ActionTrigger = {|\n\ttitle: string,\n\tonClick?: () => void,\n\thref?: string,\n\tariaLabel?: string,\n|}",
            },
        },
    },
    onDismiss: {
        control: {type: "select"},
        options: dismissMappings,
        table: {required: false},
    },
    dismissAriaLabel: {
        control: {type: "text"},
        defaultValue: "Dismiss banner.",
        table: {
            type: {summary: "string"},
            defaultValue: {summary: `"Dismiss banner."`},
        },
        type: {required: false},
    },
};
