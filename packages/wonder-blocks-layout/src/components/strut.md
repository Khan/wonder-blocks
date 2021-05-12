These example demonstrates `<Strut/>`'s incompressibility.
```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <View style={styles.row}>
        This should
        <Strut size={16}/>
        not wrap.
    </View>
</View>
```

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <View style={styles.row}>
        No
        <Strut size={16}/>
        overlap!
    </View>
    <View style={styles.row}>
        No
        <Strut size={16}/>
        overlap!
    </View>
</View>
```

`<Strut/>` can have a style
```js
import {StyleSheet} from "aphrodite";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    strut: {
        alignSelf: "center",
        backgroundColor: Color.darkBlue,
        marginLeft: Spacing.xxxSmall_4,
        marginRight: Spacing.xxxSmall_4,
        height: "6px",
    },
});

<View style={styles.row}>
    strut
    <Strut size={16} style={styles.strut}/>
    has
    <Strut size={16} style={styles.strut}/>
    style
</View>
```