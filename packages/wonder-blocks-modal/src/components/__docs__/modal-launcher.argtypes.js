// @flow

export default {
    modal: {
        control: {type: null},
        description: `The modal to render. The modal will be rendered inside
            of a container whose parent is document.body. This allows us to
            use ModalLauncher within menus and other components that clip
            their content. If the modal needs to close itself by some other
            means than tapping the backdrop or the default close button a
            render callback can be passed. The closeModal function provided
            to this callback can be called to close the modal.
            **Note**: Don't call \`closeModal\` while rendering! It should
            be used to respond to user intearction, like \`onClick\`.`,
        table: {
            type: {
                summary:
                    "ModalElement | (({|closeModal: () => void|}) => ModalElement)",
            },
        },
        type: {required: true},
    },
    onClose: {
        description: `If the parent needs to be notified when the modal is
            closed, use this prop. You probably want to use this instead of
            \`onClose\` on the modals themselves, since this will capture a
            more complete set of close events.`,
        table: {type: {summary: "() => mixed"}},
    },
    backdropDismissEnabled: {
        control: {type: "boolean"},
        defaultValue: "true",
        description: "Enables the backdrop to dismiss the modal on click/tap.",
        table: {
            defaultValue: {summary: "true"},
            type: {summary: "boolean"},
        },
    },
    initialFocusId: {
        control: {type: "text"},
        description: `The selector for the element that will be focused
            when the dialog shows. When not set, the first tabbable element
            within the dialog will be used.`,
        table: {
            type: {summary: "string"},
        },
    },
    closedFocusId: {
        control: {type: "text"},
        description: `The selector for the element that will be focused
            after the dialog closes. When not set, the last element focused
            outside the modal will be used if it exists.`,
        table: {type: {summary: "string"}},
    },
    testId: {
        control: {type: "text"},
        description:
            "Test ID used for e2e testing. It's set on the ModalBackdrop",
        table: {type: {summary: "string"}},
    },
    opened: {
        control: {type: "boolean"},
        description: `Renders the modal when true, renders nothing when false.
            Using this prop makes the component behave as a controlled
            component. The parent is responsible for managing the
            opening/closing of the modal when using this prop.  \`onClose\`
            should always be used and \`children\` should never be used with
            this prop.  Not doing so will result in an error being thrown.`,
        table: {
            category: "Controlled",
            type: {summary: "boolean"},
        },
    },
};
