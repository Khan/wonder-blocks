Once the modal is launched, tab focus wraps inside the modal content. Pressing Tab at the end of the modal will focus the modal's first element, and pressing Shift-Tab at the start of the modal will focus the modal's last element.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
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
});

const standardModal = ({closeModal}) => (
    <StandardModal
        title="Title"
        subtitle="You're reading the subtitle!"
        content={
            <View style={styles.modalContent}>
                <Body tag="p">
                    {
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                    }
                </Body>
                <Body tag="p">
                    {
                        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    }
                </Body>
                <Body tag="p">
                    {
                        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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

const twoColumnModal = ({closeModal}) => <TwoColumnModal
    sidebar={
        <View>
            <Title style={styles.title}>Sidebar</Title>
            <Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
            </Body>
        </View>
    }
    content={
        <View>
            <Title style={styles.title}>Contents</Title>
            <View>
                <label>
                    <LabelSmall>Username:</LabelSmall>
                    <input type="text" />
                </label>
            </View>
            <View>
                <label>
                    <LabelSmall>Password:</LabelSmall>
                    <input type="password" />
                </label>
            </View>
            <View>
                <Button
                    onClick={closeModal}
                    style={{marginTop: 16}}
                >
                    Go back
                </Button>
                <Button
                    onClick={() => alert("Just kidding, no-op!")}
                    style={{marginTop: 16}}
                >
                    Log in
                </Button>
            </View>
        </View>
    }
/>;

const oneColumnModal = ({closeModal}) => <OneColumnModal
    content={
        <View>
            <Title style={styles.title}>Title</Title>
            <View>
                <label>
                    <LabelSmall>Username:</LabelSmall>
                    <input type="text" />
                </label>
            </View>
            <View>
                <label>
                    <LabelSmall>Password:</LabelSmall>
                    <input type="password" />
                </label>
            </View>
            <View>
                <Button
                    onClick={closeModal}
                    style={{marginTop: 16}}
                >
                    Go back
                </Button>
                <Button
                    onClick={() => alert("Just kidding, no-op!")}
                    style={{marginTop: 16}}
                >
                    Log in
                </Button>
            </View>
        </View>
    }
    footer={
        <View>
            <button>Sample Button</button>
        </View>
    }
/>;

<View style={styles.example}>
    <ModalLauncher modal={standardModal}>
        {({openModal}) => <Button onClick={openModal}>Standard modal</Button>}
    </ModalLauncher>
    <br/>
    <ModalLauncher modal={twoColumnModal}>
        {({openModal}) => <Button onClick={openModal}>Two-column modal</Button>}
    </ModalLauncher>
    <br/>
    <ModalLauncher modal={oneColumnModal}>
        {({openModal}) => <Button onClick={openModal}>One-column modal</Button>}
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
                key="clearFlags"
                onClose={() => this.handleClose()}
                opened={this.state.opened}
                modal={({closeModal}) => (
                    <OneColumnModal
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
