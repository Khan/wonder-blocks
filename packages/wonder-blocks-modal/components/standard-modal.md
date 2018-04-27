### Example: Short content

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const StandardModal = require("./standard-modal.js").default;

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
        padding: 32,

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    modalContent: {
        margin: "0 auto",
        marginTop: 40,
        marginBottom: 40,
        paddingLeft: 32,
        paddingRight: 32,
        maxWidth: 544,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <StandardModal
            title="Title"
            content={
                <View style={styles.modalContent}>
                    <Body tag="p">
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                </View>
            }
            footer={<View>
                {/* TODO(mdr): Use Wonder Blocks button. */}
                <button type="button">Button (no-op)</button>
            </View>}
        />
    </View>
</View>;
```

### Example: Long content (overflows)

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const StandardModal = require("./standard-modal.js").default;

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
        padding: 32,

        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },

    modalContent: {
        margin: "0 auto",
        marginTop: 40,
        marginBottom: 40,
        paddingLeft: 32,
        paddingRight: 32,
        maxWidth: 544,
    },
});

<View style={styles.previewSizer}>
    <View style={styles.modalPositioner}>
        <StandardModal
            title="Title"
            subtitle="Wow, look at all this content!"
            content={
                <View style={styles.modalContent}>
                    <Body tag="p">
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."}
                    </Body>
                    <Body tag="p">
                        {"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    </Body>
                    <Body tag="p">
                        {"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                    </Body>
                </View>
            }
            footer={<View>
                {/* TODO(mdr): Use Wonder Blocks button. */}
                <button type="button">Button (no-op)</button>
            </View>}
        />
    </View>
</View>;
```
