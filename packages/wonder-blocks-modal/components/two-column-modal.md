**Two-Columns, No Footer:**

A two-column modal dialog, with no footer. The height will be a ratio of the window height and the contents will expand to fill the space. If the contents become too large then it'll become scrollable.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const Color = require("wonder-blocks-color").default;
const {Title, Body} = require("wonder-blocks-typography");
const {Row, FlexCell} = require("wonder-blocks-grid");
const TwoColumnModal = require("./two-column-modal.js").default;

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

const contents = <View>
    <Title style={styles.title}>Contents</Title>
    <Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur.
    </Body>
</View>;

const sidebar = <View>
    <Title style={styles.title}>Sidebar</Title>
    <Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris.
    </Body>
</View>;

<View style={styles.example}>
    <TwoColumnModal
        contents={contents}
        sidebar={sidebar}
        onClickCloseButton={() => alert("This would close the modal.")}
    />
</View>;
```

**Two-Columns, with Footer:**

A two-column modal dialog with a footer on the contents. On overflow the contents will scroll beneath the toolbar.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const Color = require("wonder-blocks-color").default;
const {Title, Body} = require("wonder-blocks-typography");
const {Row, FlexCell} = require("wonder-blocks-grid");
const TwoColumnModal = require("./two-column-modal.js").default;

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

const contents = <View>
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
</View>;

const sidebar = <View>
    <Title style={styles.title}>Sidebar</Title>
    <Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris.
    </Body>
</View>;

const footer = <View>
    {/* TODO(jeresig): Use Wonder Blocks button. */}
    <button type="button">Button (no-op)</button>
</View>;

<View style={styles.example}>
    <TwoColumnModal
        contents={contents}
        footer={footer}
        sidebar={sidebar}
        onClickCloseButton={() => alert("This would close the modal.")}
    />
</View>;
```

**Two-Columns, with footer, small sidebar:**

A two-column modal dialog with a footer on the contents. On overflow the contents will scroll beneath the toolbar. Additionally, the sidebar is very small (only a single column).

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const Color = require("wonder-blocks-color").default;
const {Title, Body} = require("wonder-blocks-typography");
const {Row, FlexCell} = require("wonder-blocks-grid");
const TwoColumnModal = require("./two-column-modal.js").default;

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

const contents = <View>
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

const sidebar = <View></View>;

const footer = <View>
    {/* TODO(jeresig): Use Wonder Blocks button. */}
    <button type="button">Button (no-op)</button>
</View>;

<View style={styles.example}>
    <TwoColumnModal
        contents={contents}
        footer={footer}
        smallSidebar
        sidebar={sidebar}
        onClickCloseButton={() => alert("This would close the modal.")}
    />
</View>;
```

**One-Column, with footer:**

A one-column modal dialog with a footer on the contents. The contents expand to fill the container and it continues to grow in size. There is no minimum height to the modal.

```js
const {StyleSheet, css} = require("aphrodite");
const {View} = require("wonder-blocks-core");
const Color = require("wonder-blocks-color").default;
const {Title, Body} = require("wonder-blocks-typography");
const {Row, FlexCell} = require("wonder-blocks-grid");
const TwoColumnModal = require("./two-column-modal.js").default;

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

const contents = <View>
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
    <TwoColumnModal
        contents={contents}
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
const Color = require("wonder-blocks-color").default;
const {Title, Body} = require("wonder-blocks-typography");
const {Row, FlexCell} = require("wonder-blocks-grid");
const TwoColumnModal = require("./two-column-modal.js").default;

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

const contents = <View>
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
    <TwoColumnModal
        contents={contents}
        onClickCloseButton={() => alert("This would close the modal.")}
    />
</View>;
```
