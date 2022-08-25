// @flow

export default {
    content: {
        control: {type: null},
        description: `The content of the modal, appearing between the
            titlebar and footer.`,
        table: {type: {summary: "React.Node"}},
        type: {required: true},
    },
    title: {
        control: {type: "text"},
        description: "The title of the modal, appearing in the titlebar.",
        table: {type: {summary: "string"}},
        type: {required: true},
    },
    footer: {
        control: {type: null},
        description: `The content of the modal's footer.
            A great place for buttons! Content is right-aligned by default.
            To control alignment yourself, provide a container element
            with 100% width.`,
        table: {type: {summary: "React.Node"}},
    },
    breadcrumbs: {
        control: {type: null},
        description: `Adds a breadcrumb-trail, appearing in the ModalHeader,
            above the title.`,
        table: {type: {summary: "React.Element<Breadcrumbs>"}},
    },
    subtitle: {
        control: {type: "text"},
        description: `The subtitle of the modal, appearing in the titlebar,
            below the title.`,
        table: {type: {summary: "string"}},
    },
    onClose: {
        description: `Called when the button is clicked.
            If you're using \`ModalLauncher\`, you probably shouldn't use this
            prop! Instead, to listen for when the modal closes, add an
            \`onClose\` handler to the \`ModalLauncher\`.  Doing so will
            result in a console.warn().`,
        table: {type: {summary: "() => mixed"}},
    },
    closeButtonVisible: {
        control: {type: "boolean"},
        defaultValue: "true",
        description: `When true, the close button is shown; otherwise,
            the close button is not shown.`,
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
    },
    above: {
        control: {type: null},
        description: `When set, provides a component that can render
            content above the top of the modal; when not set, no additional
            content is shown above the modal. This prop is passed down to
            the ModalDialog.`,
        table: {type: {summary: "React.Node"}},
    },
    below: {
        control: {type: null},
        description: `When set, provides a component that will render
            content below the bottom of the modal; when not set, no additional
            content is shown below the modal. This prop is passed down to
            the ModalDialog. NOTE: Devs can customize this content by
            rendering the component assigned to this prop with custom styles,
            such as by wrapping it in a View.`,
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
        description: `An optional id parameter for the title. If one is
            not provided, a unique id will be generated.`,
        table: {type: {summary: "string"}},
    },
};
