```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const ModalLauncher = require("./modal-launcher.js").default;
const TwoColumnModal = require("./two-column-modal.js").default;

const styles = StyleSheet.create({
    example: {
        padding: 32,
        textAlign: "center",
    },

    title: {
        marginBottom: 16,
    },
});

const modal = ({closeModal}) => <TwoColumnModal
    leftContent={
        <View>
            <Title style={styles.title}>Left column</Title>
            <Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
            </Body>
        </View>
    }
    rightContent={
        <View>
            <Title style={styles.title}>Right column</Title>
            <Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.
            </Body>
            {/* TODO(mdr): Use Wonder Blocks Button. */}
            <button
                onClick={closeModal}
                style={{marginTop: 16}}
            >
                Close modal
            </button>
        </View>
    }
/>;

// TODO(mdr): Use Wonder Blocks Button.
<View style={styles.example}>
    <ModalLauncher modal={modal}>
        {({openModal}) => <button onClick={openModal}>Learn more!</button>}
    </ModalLauncher>
</View>;
```
