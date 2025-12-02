import type {ArgTypes} from "@storybook/react-vite";

const placements = [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
];

export default {
    content: {
        control: {type: "text"},
        table: {
            type: {
                summary: "React.ReactNode",
            },
        },
    },
    placement: {
        control: {type: "select"},
        mapping: Object.keys(placements),
        options: placements,
        table: {
            type: {
                summary: "Placement",
            },
            defaultValue: {
                summary: "top",
            },
        },
    },
    open: {
        control: {type: "boolean"},
        table: {
            type: {
                summary: "boolean",
            },
            defaultValue: {
                summary: "false",
            },
        },
    },
    children: {
        control: {type: "text"},
        table: {
            type: {
                summary: "React.ReactElement",
            },
        },
    },
    focusManagerEnabled: {
        description:
            `Whether to enable the focus manager to manage the focus of the floating element.\n\n` +
            `When enabled, the focus will continue flowing from the reference element to the floating element and back to the reference element when the floating element is closed.` +
            `This should be enabled in most cases, but it can be disabled if you want to handle the focus manually or use it in a non-interactive context (e.g. tooltips).`,
        control: {type: "boolean"},
        table: {
            type: {summary: "boolean"},
            defaultValue: {summary: "true"},
        },
    },
    initialFocusRef: {
        description:
            `The element that will receive focus when the floating element is opened.\n\n` +
            `This is useful when you want to set the initial focus to an element inside the floating element when it is opened.` +
            `If not provided, the first focusable element inside the floating element will receive focus when it is opened.`,
        control: {type: "object"},
        table: {
            type: {summary: "React.RefObject<HTMLElement>"},
            defaultValue: {summary: "undefined"},
        },
    },
} satisfies ArgTypes;
