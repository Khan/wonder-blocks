import type {ArgTypes} from "@storybook/react";

export default {
    title: {
        control: {type: "text"},
        description: `The main heading of the modal, for labeling the dialog.
            If string content, an ID will be generated for the heading for aria-labelledby on the dialog.
            If a node, an ID will be applied to a DIV wrapping the node.
            Required unless using aria-label or aria-labelledby.`,
        table: {type: {summary: "React.ReactNode | string"}},
    },

    content: {
        control: {type: undefined},
        description: `The content of the modal. Can be either a React node or a render function
            that receives the title as a slot. Using the render function allows you to control
            where the title appears in your content layout.`,
        table: {
            type: {
                summary:
                    "React.ReactNode | ((slots: {title: React.ReactNode}) => React.ReactNode)",
            },
        },
        type: {
            name: "other",
            value: "React.ReactNode | ((slots: {title: React.ReactNode}) => React.ReactNode)",
            required: true,
        },
    },

    backgroundStyles: {
        control: {type: "object"},
        description: `The background styles for the modal panel.
            Supports backgroundColor, backgroundImage, backgroundRepeat,
            backgroundPosition, backgroundSize, and objectFit.
            Defaults to semanticColor.surface.primary background color.`,
        table: {
            type: {
                summary: "BackgroundStyles",
                detail: `{
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundRepeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y";
    backgroundPosition?: string;
    backgroundSize?: string;
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}`,
            },
        },
    },

    footer: {
        control: {type: undefined},
        description: `The content of the modal's footer. A great place for buttons!
            Content is right-aligned by default. To control alignment yourself,
            provide a container element with 100% width.`,
        table: {type: {summary: "React.ReactNode"}},
    },

    onClose: {
        description: `Called when the close button is clicked.
            If you're using \`ModalLauncher\`, you probably shouldn't use this
            prop! Instead, to listen for when the modal closes, add an
            \`onClose\` handler to the \`ModalLauncher\`.  Doing so will
            result in a console.warn().`,
        table: {type: {summary: "() => unknown"}},
    },

    closeButtonVisible: {
        control: {type: "boolean"},
        defaultValue: true,
        description: `When true, the close button is shown; otherwise,
            the close button is not shown.`,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
    },

    above: {
        control: {type: undefined},
        description: `When set, provides a component that can render
            content above the top of the modal; when not set, no additional
            content is shown above the modal.`,
        table: {type: {summary: "React.ReactNode"}},
    },

    below: {
        control: {type: undefined},
        description: `When set, provides a component that will render
            content below the bottom of the modal; when not set, no additional
            content is shown below the modal.
            NOTE: Devs can customize this content by rendering the component
            assigned to this prop with custom styles, such as by wrapping it in a View.`,
        table: {type: {summary: "React.ReactNode"}},
    },

    role: {
        control: {type: "select"},
        defaultValue: "dialog",
        description: `When set, overrides the default role value. Default
            role is "dialog". Roles other than dialog and alertdialog aren't
            appropriate for this component.`,
        options: ["dialog", "alertdialog"],
        table: {
            defaultValue: {summary: "dialog"},
            type: {summary: `"dialog" | "alertdialog"`},
        },
    },

    style: {
        control: {type: "object"},
        description: "Optional custom styles.",
        table: {type: {summary: "StyleType"}},
    },

    testId: {
        control: {type: "text"},
        description: `Test ID used for e2e testing.
            This ID will be passed down to the Dialog.`,
        table: {type: {summary: "string"}},
    },

    titleId: {
        control: {type: "text"},
        description: `An optional id parameter for the main heading. If one is
            not provided, an ID will be generated.`,
        table: {type: {summary: "string"}},
    },

    "aria-label": {
        control: {type: "text"},
        description: `The accessible name of the modal.
            This is useful when there is no main heading in the dialog.
            Cannot be used with title or aria-labelledby.`,
        table: {type: {summary: "string"}},
    },

    "aria-labelledby": {
        control: {type: "text"},
        description: `The ID reference for labeling the dialog.
            Cannot be used with title or aria-label.`,
        table: {type: {summary: "string"}},
    },

    "aria-describedby": {
        control: {type: "text"},
        description:
            "The ID of the content describing this dialog, if applicable.",
        table: {type: {summary: "string"}},
    },
} satisfies ArgTypes;
