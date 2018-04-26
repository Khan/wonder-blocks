Modals. These are WIP. TODO(mdr): Finish building, and write more thorough docs.

## Two-column layout

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const TwoColumnModal = require("./components/two-column-modal.js").default;

const styles = StyleSheet.create({
    example: {
        // Checkerboard background
        backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",

        padding: 32,
    },

    title: {
        marginBottom: 16,
    },
});

<View style={styles.example}>
    <TwoColumnModal
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
            </View>
        }
    />
</View>;
```

## Modal launcher

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const ModalLauncher = require("./components/modal-launcher.js").default;
const TwoColumnModal = require("./components/two-column-modal.js").default;

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
