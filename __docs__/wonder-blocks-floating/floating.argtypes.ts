export default {
    content: {
        control: {type: "text"},
        description: "The content to display in the floating element.",
        table: {
            type: {
                summary: "React.ReactNode",
            },
        },
    },
    placement: {
        control: {type: "select"},
        options: ["top", "right", "bottom", "left"],
        description:
            "The placement of the floating element relative to the reference element.",
        table: {
            type: {
                summary: "Placement",
            },
            defaultValue: {
                summary: "top",
            },
        },
    },
    defaultOpen: {
        control: {type: "boolean"},
        description: "Whether the floating element is open by default.",
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
        description:
            "The trigger element that the floating element will be positioned relative to.",
        table: {
            type: {
                summary: "React.ReactElement",
            },
        },
    },
};
