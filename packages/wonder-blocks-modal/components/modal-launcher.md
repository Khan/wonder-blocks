Once the modal is launched, tab focus wraps inside the modal content. Pressing Tab at the end of the modal will focus the modal's first element, and pressing Shift-Tab at the start of the modal will focus the modal's last element.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const ModalLauncher = require("./modal-launcher.js").default;
const TwoColumnModal = require("./two-column-modal.js").default;
const OneColumnModal = require("./one-column-modal.js").default;

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
            // TODO(mdr): Use Wonder Blocks Button.
            <button onClick={closeModal}>
                Close modal
            </button>
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
                {/* TODO(mdr): Use Wonder Blocks Button. */}
                <button
                    onClick={closeModal}
                    style={{marginTop: 16}}
                >
                    Go back
                </button>
                <button
                    onClick={() => alert("Just kidding, no-op!")}
                    style={{marginTop: 16}}
                >
                    Log in
                </button>
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
                {/* TODO(mdr): Use Wonder Blocks Button. */}
                <button
                    onClick={closeModal}
                    style={{marginTop: 16}}
                >
                    Go back
                </button>
                <button
                    onClick={() => alert("Just kidding, no-op!")}
                    style={{marginTop: 16}}
                >
                    Log in
                </button>
            </View>
        </View>
    }
/>;

// TODO(mdr): Use Wonder Blocks Button.
<View style={styles.example}>
    <ModalLauncher modal={standardModal}>
        {({openModal}) => <button onClick={openModal}>Standard modal</button>}
    </ModalLauncher>
    <ModalLauncher modal={twoColumnModal}>
        {({openModal}) => <button onClick={openModal}>Two-column modal</button>}
    </ModalLauncher>
    <ModalLauncher modal={oneColumnModal}>
        {({openModal}) => <button onClick={openModal}>One-column modal</button>}
    </ModalLauncher>
</View>;
```
