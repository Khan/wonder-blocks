Primary, secondary, and tertiary IconButton examples:
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {Strut} = require("@khanacademy/wonder-blocks-layout");

<View style={{flexDirection: "row"}}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
    />
    <Strut size={16} />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="secondary"
        onClick={(e) => console.log("hello")}
    />
    <Strut size={16} />
    <IconButton
        icon={icons.search}
        aria-label="search"
        kind="tertiary"
        href="/search"
    />
    <Strut size={16} />
    <IconButton
        disabled={true}
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
    />
    <Strut size={16} />
    <IconButton
        disabled={true}
        icon={icons.search}
        aria-label="search"
        href="/search"
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

A disabled IconButton shouldn't interfer with one that isn't.
Hover over the left edge of the disabled IconButton, the left
IconButton should switch to its hovered state.

NOTE: In practice IconButtons should be spaced further apart.
```js
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        padding: 10,
    },
});

<View style={[styles.row]}>
    <IconButton
        icon={icons.search}
        aria-label="search"
        onClick={(e) => console.log("hello")}
    />
    <IconButton
        disabled={true}
        icon={icons.search}
        aria-label="search"
    />
</View>
```
