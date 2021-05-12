This example demonstrates `<Spring/>`'s expansion
```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    This should
    <Spring />
    expand.
</View>
```

`<Spring/>` can have a style
```js
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    spring: {
        backgroundColor: Color.darkBlue,
        marginLeft: Spacing.xxxSmall_4,
        marginRight: Spacing.xxxSmall_4,
    },
});

<View style={styles.row}>
    Welcome to
    <Spring style={styles.spring} />
    Khan Academy.
</View>
```