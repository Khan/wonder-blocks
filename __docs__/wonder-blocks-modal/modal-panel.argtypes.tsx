import {ArgTypes} from "@storybook/react";

const argTypes: ArgTypes = {
    content: {
        control: {type: null},
        description: `The main contents of the ModalPanel. All other parts of
            the panel are positioned around it.`,
        table: {
            category: "Layout",
            type: {summary: "React.Node"},
        },
        type: {
            name: "other",
            value: "React.Node",
            required: true,
        },
    },
    header: {
        control: {type: null},
        description: "The modal header to show at the top of the panel.",
        table: {
            category: "Layout",
            type: {summary: "React.Node"},
        },
    },
    footer: {
        control: {type: null},
        description: "A footer to show beneath the contents.",
        table: {
            category: "Layout",
            type: {summary: "React.Node"},
        },
    },
    closeButtonVisible: {
        control: {type: "boolean"},
        description: `When true, the close button is shown; otherwise, the
            close button is not shown.`,
        table: {
            category: "Layout",
            defaultValue: true,
            type: {summary: "boolean"},
        },
    },
    light: {
        control: {type: "boolean"},
        description: `Whether to display the "light" version of this component
            instead, for  use when the item is used on a dark background.`,
        table: {
            category: "Styling",
            defaultValue: true,
            type: {summary: "boolean"},
        },
    },
    scrollOverflow: {
        control: {type: "boolean"},
        description: `Should the contents of the panel become scrollable should
            they become too tall?`,
        table: {
            category: "Styling",
            defaultValue: true,
            type: {summary: "boolean"},
        },
    },
    style: {
        control: {type: "object"},
        description: "Any optional styling to apply to the panel.",
        table: {
            category: "Styling",
            type: {summary: "StyleType"},
        },
    },
    testId: {
        control: {type: "text"},
        description:
            `Test ID used for e2e testing.\n\n` +
            `Normally, this \`testId\` comes from the \`testId\` prop defined
            in the Dialog variant (e.g. OnePaneDialog).`,
        table: {
            category: "Other",
            type: {summary: "string"},
        },
    },
    onClose: {
        control: {type: null},
        description:
            `Called when the close button is clicked.\n\n` +
            `If you're using \`ModalLauncher\`, you should not use this prop!
            Instead, to listen for when the modal closes, add an \`onClose\`
            handler to the \`ModalLauncher\`. Doing so will throw an error.`,
        table: {
            category: "Other",
            type: {
                summary: "() => unknown",
            },
        },
    },
};

export default argTypes;
