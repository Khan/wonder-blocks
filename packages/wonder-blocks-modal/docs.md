Looking for docs for StandardModal, OneColumnModal, or TwoColumnModal click [here](https://deploy-preview-389--wonder-blocks.netlify.com/#modal)

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
const React = require("react");
const {StyleSheet} = require("aphrodite");

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
const React = require("react");
const {StyleSheet} = require("aphrodite");

const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;

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
