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
        marginRight: 10,
    }
});

<View style={[styles.row]}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
        style={[styles.sideMargins]}
    />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="secondary"
        onClick={(e) => console.log("hello")}
        style={[styles.sideMargins]}
    />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="tertiary"
        onClick={(e) => console.log("hello")}
        style={[styles.sideMargins]}
    />
</View>

```
