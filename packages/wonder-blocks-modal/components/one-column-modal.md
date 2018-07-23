```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");

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

    title: {
        marginBottom: 16,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OneColumnModal
            content={
                <View>
                    <Title style={styles.title}>Title</Title>
                    <Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est.
                    </Body>
                </View>
            }
            onClickCloseButton={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```

This example shows that `OneColumnModal` works with content and footer elements
that aren't block level elements.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Title, Body} = require("@khanacademy/wonder-blocks-typography");
const Button = require("@khanacademy/wonder-blocks-button").default;

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

    title: {
        marginBottom: 16,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <OneColumnModal
            content={<span>Foo</span>}
            footer={<button>Bar</button>}
            onClickCloseButton={() => alert("This would close the modal.")}
        />
    </View>
</View>;
```
