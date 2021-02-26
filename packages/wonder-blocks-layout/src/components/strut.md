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
