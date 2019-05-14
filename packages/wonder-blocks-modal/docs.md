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

### WAI-ARIA Roles
- The element that serves as the **dialog container** has `aria-role` defined as `dialog`.
- The dialog has a value set for the `aria-labelledby` property that refers to a **visible dialog title**.

## Wrapping Dialogs

Often you'll want to define a new `Dialog` component by wrapping an existing
`Dialog` component (e.g. `OnePaneDialog`). These wrapped components will also
work with `ModalLauncher` in the same way the default ones do.

```js
const React = require("react");

const {Title} = require("@khanacademy/wonder-blocks-typography");
const {View} = require("@khanacademy/wonder-blocks-core");
const Button = require("@khanacademy/wonder-blocks-button").default;

class ModalWrapper extends React.Component {
    render() {
        return <OnePaneDialog
            title="Single-line title"
            content={
                <View>
                    <Title>Hello, world</Title>
                </View>
            }
            footer={
                <Button onClick={this.props.onClose}>
                    Close Modal
                </Button>
            }
        />
    }
}

<View style={{flexDirection: "row"}}>
    <ModalLauncher
        onClose={() => window.alert("you closed the modal")}
        modal={({closeModal}) => <ModalWrapper onClose={closeModal}/>}
    >
        {({openModal}) => <Button onClick={openModal}>Open Modal</Button>}
    </ModalLauncher>
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
