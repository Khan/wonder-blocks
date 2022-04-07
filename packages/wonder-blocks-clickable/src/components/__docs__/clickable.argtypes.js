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
    className: {
        description: "Adds CSS classes to the Clickable.",
        control: {
            type: "text",
        },
    },
    disabled: {
        description: "Disables or enables the child; defaults to false",
        type: {
            required: true,
        },
        table: {
            type: {
                summary: "boolean",
            },
        },
        control: {
            type: "boolean",
        },
    },
};
