import {ArgTypes} from "@storybook/react";

const argTypes: ArgTypes = {
    children: {
        control: {type: null},
        description: "The dialog content.",
        table: {
            type: {summary: "React.Node"},
        },
        type: {
            name: "other",
            value: "React.Node",
            required: true,
        },
    },
    above: {
        control: {type: null},
        description: `When set, provides a component that can render content
            above the top of the modal; when not set, no additional content is
            shown above the modal. This prop is passed down to the ModalDialog.`,
        table: {type: {summary: "React.Node"}},
    },
    below: {
        control: {type: null},
        description: `When set, provides a component that can render content
            below the bottom of the modal; when not set, no additional content is
            shown below the modal. This prop is passed down to the ModalDialog.`,
        table: {type: {summary: "React.Node"}},
    },
    role: {
        control: {type: "select"},
        defaultValue: "dialog",
        description: `When set, overrides the default role value. Default
            role is "dialog" Roles other than dialog and alertdialog aren't
            appropriate for this component`,
        options: ["dialog", "alertdialog"],
        table: {
            category: "Accessibility",
            defaultValue: {summary: "dialog"},
            type: {
                summary: `"dialog" | "alertdialog"`,
            },
        },
    },
    style: {
        control: {type: "object"},
        description: "Optional custom styles.",
        table: {type: {summary: "StyleType"}},
    },
    testId: {
        control: {type: "text"},
        description: `Test ID used for e2e testing.`,
        table: {type: {summary: "string"}},
    },
    "aria-labelledby": {
        control: {type: "text"},
        description: "The ID of the title labelling this dialog, if applicable",
        table: {
            category: "Accessibility",
            type: {summary: "string"},
        },
    },
    "aria-describedby": {
        control: {type: "text"},
        description:
            "The ID of the content describing this dialog, if applicable",
        table: {
            category: "Accessibility",
            type: {summary: "string"},
        },
    },
};

export default argTypes;
