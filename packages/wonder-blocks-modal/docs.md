Looking for docs for StandardModal, OneColumnModal, or TwoColumnModal click
[here](https://deploy-preview-389--wonder-blocks.netlify.com/#modal)

## Examples

### Example: Default modal

Once the modal is launched, tab focus wraps inside the modal content. Pressing Tab at the end of the modal will focus the modal's first element, and pressing Shift-Tab at the start of the modal will focus the modal's last element.

```js
const {StyleSheet} = require("aphrodite");

const {ModalLauncher, OnePaneDialog} = require("@khanacademy/wonder-blocks-modal");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    example: {
        padding: Spacing.xLarge,
        alignItems: "center",
    },

    title: {
        marginBottom: Spacing.medium,
    },

    modalContent: {
        margin: "0 auto",
        maxWidth: 544,
    },

    above: {
        background: "url(/modal-above.png)",
        width: 874,
        height: 551,
        position: "absolute",
        top: 40,
        left: -140
    },

    below: {
        background: "url(/modal-below.png)",
        width: 868,
        height: 521,
        position: "absolute",
        top: -100,
        left: -300
    },
});

const onePaneDialog = ({closeModal}) => (
    <OnePaneDialog
        title="Title"
        subtitle="You're reading the subtitle!"
        above={<View style={styles.above} />}
        below={<View style={styles.below} />}
        content={
            <View style={styles.modalContent}>
                <Body tag="p">
                    {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                    }
                </Body>
            </View>
        }
        footer={
            <Button onClick={closeModal}>
                Close modal
            </Button>
        }
    />
);

<View style={styles.example}>
    <ModalLauncher modal={onePaneDialog}>
        {({openModal}) => <Button onClick={openModal}>OnePaneDialog</Button>}
    </ModalLauncher>
</View>;
```

### Example: Disabling backdrop dismission

By default, `ModalLauncher` allows you to close the modal by clicking on the overlay/backdrop window. Somethimes you might need to disable it, and to to this, you can set `backgropDismissEnabled` to `false`.

```js
const {StyleSheet} = require("aphrodite");

const {ModalLauncher, OnePaneDialog} = require("@khanacademy/wonder-blocks-modal");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    example: {
        padding: Spacing.xLarge,
        alignItems: "center",
    },

    modalContent: {
        margin: "0 auto",
        maxWidth: 544,
    },
});

const exampleModal = ({closeModal}) => (
    <OnePaneDialog
        title="Backdrop dismission disabled"
        content={
            <View style={styles.modalContent}>
                <Body tag="p">
                    {
                        "This window won't be closed if you click/tap outside of the ModalPanel. To do that, you can still press `esc` or use the close button located on the top right."
                    }
                </Body>
            </View>
        }
    />
);

<View style={styles.example}>
    <ModalLauncher modal={exampleModal} backdropDismissEnabled={false}>
        {({openModal}) => <Button onClick={openModal}>Open modal</Button>}
    </ModalLauncher>
</View>
```

### Example: Triggering programmatically

Sometimes you'll want to trigger a modal programmatically. This can be done by
rendering `ModalLauncher` without any children and instead setting its `opened`
prop to `true`.  In this situation `ModalLauncher` is a controlled component
which means you'll also have to update `opened` to `false` in response to the
`onClose` callback being triggered.

```js
const {ModalLauncher, OnePaneDialog} = require("@khanacademy/wonder-blocks-modal");
const {Title} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {ActionMenu, ActionItem} = require("@khanacademy/wonder-blocks-dropdown");

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    handleOpen() {
        console.log('opening modal');
        this.setState({opened: true});
    }

    handleClose() {
        console.log('closing modal');
        this.setState({opened: false});
    }

    render() {
        return <View>
            <ActionMenu menuText="actions">
                <ActionItem
                    label="Open modal"
                    onClick={() => this.handleOpen()}
                />
            </ActionMenu>
            <ModalLauncher
                onClose={() => this.handleClose()}
                opened={this.state.opened}
                modal={({closeModal}) => (
                    <OnePaneDialog
                        title="Triggered from action menu"
                        content={
                            <View>
                                <Title>Hello, world</Title>
                            </View>
                        }
                        footer={
                            <Button onClick={closeModal}>
                                Close Modal
                            </Button>
                        }
                    />
                )}
            />
        </View>;
    }
}

<Example />
```

**Warning:** Do not wrap items in a dropdown in a `ModalLauncher`.  Instead, trigger
the modal programmatically by using the `ModalLauncher` as an uncontrolled component
as shown in the above example.

This is necessary because wrapping an item in `ModalLauncher` will result in the
modal disappearing as soon as the focus changes.  The reason is that the change in
focus results in the item that in the dropdown that was clicked to be blur which
closes the dropdown.  This results in all of its children to unmount including the
ModalLauncher which was wrapping the menu item.


## Accessibility

It should follow guidelines from [W3C](https://www.w3.org/TR/wai-aria-practices/#dialog_modal).

### Keyboard Interaction

When a dialog opens, focus moves to an element inside the dialog. See notes below regarding initial focus placement.

- Tab:
    - Moves focus to the next tabbable element inside the dialog.
    - If focus is on the last tabbable element inside the dialog, moves focus to the first tabbable element inside the dialog.
- Shift + Tab:
    - Moves focus to the previous tabbable element inside the dialog.
    - If focus is on the first tabbable element inside the dialog, moves focus to the last tabbable element inside the dialog.
- Escape: Closes the dialog.

#### Initial focus placement:
The initial focus placement depends on the following scenarios:

1. `initialFocusId` (default): `ModalLauncher` exposes this prop as a string. The dialog will try to find this element into the DOM. If it's found, focus is initially set on this element.
2. focusable elements: This is the second scenario, where the dialog tries to find the first ocurrence of possible focusable elements.
3. Dialog: If the first two conditions are not met, then focus is initially set to the Dialog element itself.

### Example: Set initial focus on a given element inside the modal

```js
const {StyleSheet} = require("aphrodite");

const {ModalLauncher, OnePaneDialog} = require("@khanacademy/wonder-blocks-modal");
const {Title} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    example: {
        padding: Spacing.xLarge,
        alignItems: "center",
    }
});

const modalInitialFocus = ({closeModal}) => (
    <OnePaneDialog
        title="Single-line title"
        content={
            <View>
                <View>
                    <label>Label</label>
                    <input type="text" />
                    <Strut size={Spacing.medium} />
                    <Button id="initial-focus">
                        Button to receive initial focus
                    </Button>
                </View>
            </View>
        }
        footer={
            <React.Fragment>
                <Button kind="tertiary" onClick={closeModal}>
                    Cancel
                </Button>
                <Strut size={Spacing.medium} />
                <Button>
                    Submit
                </Button>
            </React.Fragment>
        }
    />
);

<View style={styles.example}>
    <ModalLauncher
        onClose={() => window.alert("you closed the modal")}
        initialFocusId="initial-focus"
        modal={modalInitialFocus}
    >
        {({openModal}) => <Button onClick={openModal}>Open modal with initial focus</Button>}
    </ModalLauncher>
</View>
```

### WAI-ARIA Roles
- The element that serves as the **dialog container** has `aria-role` defined as `dialog`.
- The dialog has a value set for the `aria-labelledby` property that refers to a **visible dialog title**.

## Customization

### Example: Flexible dialogs

This example illustrates how we can easily update the Modal's contents by wrapping it into a new component/container. **Modal** is built in a way that provides great flexibility and makes it work with different variations and/or layouts (see Custom Two-Pane Dialog example).

```js
const {StyleSheet} = require("aphrodite");

const {ModalLauncher, OnePaneDialog} = require("@khanacademy/wonder-blocks-modal");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const {Body, LabelLarge} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    example: {
        padding: Spacing.xLarge,
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    footer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    }
});

class ExerciseModal extends React.Component {
    render() {
        const {current, handleNextButton, handlePrevButton, question, total} = this.props;

        return (
            <OnePaneDialog
                title="Exercises"
                content={
                    <View>
                        <Body>This is the current question: {question}</Body>
                    </View>
                }
                footer={
                    <View style={styles.footer}>
                        <LabelLarge>Step {current+1} of {total}</LabelLarge>
                        <View style={styles.row}>
                            <Button kind="tertiary" onClick={handlePrevButton}>Previous</Button>
                            <Strut size={16} />
                            <Button kind="primary" onClick={handleNextButton}>Next</Button>
                        </View>
                    </View>
                }
            />
        );
    }
}

class ExerciseContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentQuestion: 0
        };
    }

    handleNextButton() {
        this.setState({
            currentQuestion: Math.min(this.state.currentQuestion + 1, this.props.questions.length - 1),
        });
   };

    handlePrevButton() {
        this.setState({
            currentQuestion: Math.max(0, this.state.currentQuestion - 1),
        });
    }

    render() {
        return (
            <ModalLauncher
                onClose={() => console.log("you closed the modal")}
                modal={
                    <ExerciseModal
                        question={this.props.questions[this.state.currentQuestion]}
                        current={this.state.currentQuestion}
                        total={this.props.questions.length}
                        handlePrevButton={() => this.handlePrevButton()}
                        handleNextButton={() => this.handleNextButton()}
                    />
                }
            >
                {({openModal}) => <Button onClick={openModal}>Open flexible modal</Button>}
            </ModalLauncher>
        );
    }
}

<View style={styles.example}>
    <ExerciseContainer questions={["First question", "Second question", "Last question"]} />
</View>
```

### Example: Dialogs with custom styles

Sometimes you'll want to customize the styling of the **Dialog** .e.g., custom width or height.  You can pass in `style` which will customize the styling of the modal wrapper.
To use styling for different screen sizes, wrap your component with `MediaLayout` component.  Please see example code below for details.

```js
const {StyleSheet} = require("aphrodite");

const {OnePaneDialog} = require("@khanacademy/wonder-blocks-modal");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

const styles = StyleSheet.create({
    previewSizer: {
        height: 512,
    },

    modalPositioner: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

const styleSheets = {
    mdOrLarger: StyleSheet.create({
        customModal: {
            maxWidth: 300,
            maxHeight: 200,
        },

        below: {
            background: "url(/blue-blob.png)",
            backgroundSize: "cover",
            width: 294,
            height: 306,
            position: "absolute",
            top: 0,
            left: -60
        },

        above: {
            background: "url(/asteroid.png)",
            backgroundSize: "cover",
            width: 418,
            height: 260,
            position: "absolute",
            top: -10,
            left: -5
        },
    }),
};

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <MediaLayout styleSheets={styleSheets}>
            {({styles}) => (
                <OnePaneDialog
                    style={styles.customModal}
                    title="Single-line title"
                    content={
                        <View>
                            <Body>
                                Hello World!
                            </Body>
                        </View>
                    }
                    onClose={() => alert("This would close the modal.")}
                    below={<View style={styles.below} />}
                    above={<View style={styles.above} />}
                />
            )}
        </MediaLayout>
    </View>
</View>;
```
