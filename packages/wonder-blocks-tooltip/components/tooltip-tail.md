The `TooltipTail` renders the tail, including appropriate padding from the anchor location and corners of the tooltip bubble (so as space out the bubble corners).

Each example is shown next to a bar that indicates the padding either side of the tail and the tail width itself. The bar also indicates how far away from the anchor element the tail will render.

### Placement top

```jsx
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {Spring} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
