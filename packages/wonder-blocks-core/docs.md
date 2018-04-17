`wonder-blocks-core` provides building blocks for other `wonder-blocks` 
components.  These components, `View` and `Text` can also be used on their 
own.

`View` roughly maps to `div` and `Text` roughly maps to `span`.

```js
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: "plum",
    },
    text: {
        fontFamily: "sans-serif",
        fontSize: 24,
    },
});

<View style={styles.container}>
    <Text style={styles.text}>
        Hello, world!
    </Text>
</View>
```