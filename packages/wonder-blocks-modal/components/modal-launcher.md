Once the modal is launched, tab focus wraps inside the modal content. Pressing Tab at the end of the modal will focus the modal's first element, and pressing Shift-Tab at the start of the modal will focus the modal's last element.

```js
const {StyleSheet, css} = require("aphrodite");
const {addStyle, View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body, LabelSmall} = require("@khanacademy/wonder-blocks-typography");
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

    aboveStyles: {
        background: "url(/modal-above.png)",
        width: 874,
        height: 551,
        position: "absolute",
        top: -260,
        left: -420
    },

    belowStyles: {
        background: "url(/modal-below.png)",
        width: 868,
        height: 521,
        position: "absolute",
        top: -420,
        left: -581
    },
});

const StyledContainer = addStyle("div");

const onePaneDialog = ({closeModal}) => (
    <OnePaneDialog
        title="Title"
        subtitle="You're reading the subtitle!"
        above={<StyledContainer style={styles.aboveStyles} />}
        below={<StyledContainer style={styles.belowStyles} />}
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

## Triggering programmatically

Sometimes you'll want to trigger a modal programmatically.  This can be done
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
