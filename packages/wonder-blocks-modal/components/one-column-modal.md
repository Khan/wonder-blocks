**One-Column, with footer:**

A one-column modal dialog with a footer on the contents. The contents expand to fill the container and it continues to grow in size. There is no minimum height to the modal.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const OneColumnModal = require("./one-column-modal.js").default;

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

const content = <View>
    <Title style={styles.title}>Contents</Title>
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
</View>;

const footer = <View>
    {/* TODO(jeresig): Use Wonder Blocks button. */}
    <button type="button">Button (no-op)</button>
</View>;

<View style={styles.example}>
    <OneColumnModal
        content={content}
        footer={footer}
        onClickCloseButton={() => alert("This would close the modal.")}
    />
</View>;
```

**One-Column, no footer:**

A one-column modal dialog with no footer on the contents. The contents expand to fill the container and it continues to grow in size. There is no minimum height to the modal.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const {Title, Body} = require("wonder-blocks-typography");
const OneColumnModal = require("./one-column-modal.js").default;

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

const content = <View>
    <Title style={styles.title}>Contents</Title>
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
</View>;

<View style={styles.example}>
    <OneColumnModal
        content={content}
        onClickCloseButton={() => alert("This would close the modal.")}
    />
</View>;
```
