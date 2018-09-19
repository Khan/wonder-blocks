Primary, secondary, and tertiary IconButton examples:
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 16,
    }
});

<View style={[styles.row]}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
        style={styles.sideMargins}
    />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="secondary"
        onClick={(e) => console.log("hello")}
        style={styles.sideMargins}
    />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="tertiary"
        onClick={(e) => console.log("hello")}
        style={styles.sideMargins}
    />
    <IconButton
        disabled={true}
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
        style={styles.sideMargins}
    />
</View>
```

An IconButton on a dark background. Only the primary kind is allowed.
```js
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        backgroundColor: Color.darkBlue,
        padding: 10,
    },
});

<View style={[styles.row]}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        light={true}
        onClick={(e) => console.log("hello")}
    />
</View>
```
