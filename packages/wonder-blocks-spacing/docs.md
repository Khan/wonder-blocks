Spacing is a collection of names assigned to specific dimensions. These are used frequently when laying out Wonder Blocks components (such as with the Grid). You can use these sizes directly by importing the `wonder-blocks-spacing` package and accessing the named property like so: `Spacing.xxSmall_6`.

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "./src/index.js";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.xxSmall_6,
    },
});

<View>
    {Object.keys(Spacing).map((spaceName, idx) => (
        <View
            key={idx}
            style={styles.row}
        >
            <View style={{
                width: 250,
                textAlign: "right",
            }}>
                {spaceName}: {Spacing[spaceName]}px
            </View>
            <View style={{width: Spacing.xSmall_8}}/>
            <View
                style={{
                    width: Spacing.xxxLarge_64,
                }}>
                <View
                    style={{
                        backgroundColor: "black",
                        width: Spacing[spaceName],
                        height: Spacing.xxxSmall_4,
                    }}
                />
            </View>
            <View style={{width: Spacing.xSmall_8}}/>
            <View
                style={{
                    backgroundColor: "black",
                    width: Spacing.xxxSmall_4,
                    height: Spacing[spaceName],
                }}
            />
        </View>
    ))}
</View>
```
