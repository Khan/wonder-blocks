The `TooltipTail` renders the tail, including appropriate padding from the anchor location and corners of the tooltip bubble (so as not to crash the bubble corners).

Each example is shown next to a bar that indicates the padding either side of the tail and the tail width itself. The bar also indicates how far away from the anchor element the tail will render.

### Placement top

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Spring} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    guideContainer: {
        flexDirection: "row",
        height: Spacing.xxxSmall,
    },
    padding: {
        backgroundColor: "bisque",
        width: Spacing.xSmall,
    },
    tail: {
        backgroundColor: "green",
        width: Spacing.large,
    },
});

<View>
    <TooltipTail placement="top" />
    <View style={styles.guideContainer}>
        <View key="padleft" style={styles.padding} />
        <View key="tail" style={styles.tail} />
        <View key="padright" style={styles.padding} />
        <Spring key="spring" />
    </View>
</View>
```

### Placement right

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Spring} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    exampleContainer: {
        flexDirection: "row",
    },
    guideContainer: {
        width: Spacing.xxxSmall,
    },
    padding: {
        backgroundColor: "bisque",
        height: Spacing.xSmall,
    },
    tail: {
        backgroundColor: "green",
        height: Spacing.large,
    },
});

<View style={styles.exampleContainer}>
    <View style={styles.guideContainer}>
        <View key="padleft" style={styles.padding} />
        <View key="tail" style={styles.tail} />
        <View key="padright" style={styles.padding} />
        <Spring key="spring" />
    </View>
    <TooltipTail placement="right" />
</View>
```

### Placement bottom

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Spring} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    guideContainer: {
        flexDirection: "row",
        height: Spacing.xxxSmall,
    },
    padding: {
        backgroundColor: "bisque",
        width: Spacing.xSmall,
    },
    tail: {
        backgroundColor: "green",
        width: Spacing.large,
    },
});

<View>
    <View style={styles.guideContainer}>
        <View key="padleft" style={styles.padding} />
        <View key="tail" style={styles.tail} />
        <View key="padright" style={styles.padding} />
        <Spring key="spring" />
    </View>
    <TooltipTail placement="bottom" />
</View>
```

### Placement left

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Spring} = require("@khanacademy/wonder-blocks-layout");
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;

const styles = StyleSheet.create({
    exampleContainer: {
        flexDirection: "row",
    },
    guideContainer: {
        width: Spacing.xxxSmall,
    },
    padding: {
        backgroundColor: "bisque",
        height: Spacing.xSmall,
    },
    tail: {
        backgroundColor: "green",
        height: Spacing.large,
    },
});

<View style={styles.exampleContainer}>
    <TooltipTail placement="left" />
    <View style={styles.guideContainer}>
        <View key="padleft" style={styles.padding} />
        <View key="tail" style={styles.tail} />
        <View key="padright" style={styles.padding} />
        <Spring key="spring" />
    </View>
</View>
```