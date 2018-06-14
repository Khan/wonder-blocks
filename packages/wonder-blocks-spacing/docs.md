Spacing is a collection of simple names assigned to specific dimensions. These are used frequently when laying out Wonder Blocks components (such as with the Grid). You can use these sizes directly by importing the `wonder-blocks-spacing` package and accessing the named property like so: `Spacing.xxSmall`.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const Spacing = require("./index.js").default;
const {Strut} = require("./index.js");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Spacing.xxSmall,
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
            <Strut size={Spacing.xSmall}/>
            <View style={{width: Spacing.xxxLarge}}>
                <View
                    style={{
                        backgroundColor: "black",
                        width: Spacing[spaceName],
                        height: Spacing.xxxSmall,
                    }}
                />
            </View>
            <Strut size={Spacing.xSmall}/>
            <View
                style={{
                    backgroundColor: "black",
                    width: Spacing.xxxSmall,
                    height: Spacing[spaceName],
                }}
            />
        </View>
    ))}
</View>
```

## Spring & Strut

`Spring` and `Strut` are two components that can make certain layouts easier to implement.
`Spring` is infinitely compressible and expands to fill available space while `Strut`
is uncompressible and occupies a fixed amount of space specified by its `size` prop.

```js
const {StyleSheet} = require("aphrodite");
const {View, addStyle} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color").default;
const Spacing = require("./index.js").default;
const {Spring, Strut} = require("./index.js");

// TODO(kevinb): replace with wonder-blocks-button once yarn workspaces land
const Button = addStyle("button");

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        border: `solid 1px ${Color.offBlack50}`,
    },
    button: {
        fontSize: 24,
        width: 100,
        borderRadius: 4,
        border: "none",
        height: 40,
    },
});

<View style={styles.container}>
    <Button style={styles.button}>A</Button>
    <Strut size={Spacing.small}/>
    <Button style={styles.button}>B</Button>
    <Strut size={Spacing.small}/>
    <Button style={styles.button}>C</Button>
    <Spring/>
    <Button style={styles.button}>Cancel</Button>
    <Strut size={Spacing.small}/>
    <Button style={styles.button}>Accept</Button>
</View>
```
