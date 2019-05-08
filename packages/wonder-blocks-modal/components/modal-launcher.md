Once the modal is launched, tab focus wraps inside the modal content. Pressing Tab at the end of the modal will focus the modal's first element, and pressing Shift-Tab at the start of the modal will focus the modal's last element.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;

const styles = StyleSheet.create({
    example: {
        padding: 32,
        alignItems: "center",
    },

    title: {
        marginBottom: 16,
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

### Disabling backdrop dismission

By default, `ModalLauncher` allows you to close the modal by clicking on the overlay/backdrop window. Somethimes you might need to disable it, and to to this, you can set `backgropDismissEnabled` to `false`.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;

const styles = StyleSheet.create({
    example: {
        padding: 32,
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

### Triggering programmatically

Sometimes you'll want to trigger a modal programmatically. This can be done
by rendering `ModalLauncher` without any children and instead setting its
`opened` prop to `true`.  In this situation `ModalLauncher` is a uncontrolled
component which means you'll also have to update `opened` to `false` in
response to the `onClose` callback being triggered.

```js
const React = require("react");

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
