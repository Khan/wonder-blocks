```js
const {StyleSheet} = require("aphrodite");
const {Text} = require("@khanacademy/wonder-blocks-core");

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
    <View style={[
        styles.container,
        {backgroundColor: "goldenrod", padding: 4},
    ]}>
        Even with an array and inline styles!
    </View>
</View>
```

Other props can be passed through `View` or `Text`, as if they were normal tags.

```js
const {Text} = require("@khanacademy/wonder-blocks-core");

<View>
    <View onClick={() => alert("Clicked!")}>
        Click me!
    </View>

    <Text aria-hidden="true">
        This text is hidden from screen readers.
    </Text>
</View>
```
