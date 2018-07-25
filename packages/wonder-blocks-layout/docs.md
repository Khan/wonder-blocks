`Spring` and `Strut` are two components that can make certain layouts easier to implement.
`Spring` is infinitely compressible and expands to fill available space while `Strut`
is uncompressible and occupies a fixed amount of space specified by its `size` prop.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const Color = require("@khanacademy/wonder-blocks-color").default;
const Spacing = require("@khanacademy/wonder-blocks-spacing").default;
const Button = require("@khanacademy/wonder-blocks-button").default;
const {Spring, Strut} = require("./index.js");

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        border: `solid 1px ${Color.offBlack50}`,
    },
    button: {
        width: 100,
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
