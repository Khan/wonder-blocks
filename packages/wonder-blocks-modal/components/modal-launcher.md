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
        flexDirection: "row",
    },

    button: {
        marginRight: 10,
    },

    title: {
        marginBottom: 16,
    },

    modalContent: {
        margin: "0 auto",
        maxWidth: 544,
    },

    buttonContainer: {
        marginTop: 24,
        flexDirection: "row",
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
        footer={<Button onClick={closeModal}>Close modal</Button>}
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
            <View style={styles.buttonContainer}>
                <Button
                    kind="secondary"
                    onClick={closeModal}
                    style={styles.button}
                >
                    Go back
                </Button>
                <Button
                    onClick={() => alert("Just kidding, no-op!")}
                    style={styles.button}
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
            <View style={styles.buttonContainer}>
                <Button
                    kind="secondary"
                    onClick={closeModal}
                    style={styles.button}
                >
                    Go back
                </Button>
                <Button
                    onClick={() => alert("Just kidding, no-op!")}
                    style={styles.button}
                >
                    Log in
                </Button>
            </View>
        </View>
    }
    footer={<Button>Sample Button</Button>}
/>;

<View style={styles.example}>
    <ModalLauncher modal={standardModal}>
        {({openModal}) => <Button onClick={openModal} style={styles.button}>Standard modal</Button>}
    </ModalLauncher>
    <ModalLauncher modal={twoColumnModal}>
        {({openModal}) => <Button onClick={openModal} style={styles.button}>Two-column modal</Button>}
    </ModalLauncher>
    <ModalLauncher modal={oneColumnModal}>
        {({openModal}) => <Button onClick={openModal} style={styles.button}>One-column modal</Button>}
    </ModalLauncher>
</View>;
```
