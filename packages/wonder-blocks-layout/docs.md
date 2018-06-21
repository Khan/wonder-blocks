`Spring` and `Strut` are two components that can make certain layouts easier to implement.
`Spring` is infinitely compressible and expands to fill available space while `Strut`
is uncompressible and occupies a fixed amount of space specified by its `size` prop.

```js
const {StyleSheet} = require("aphrodite");
const {View, addStyle} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color").default;
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
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
