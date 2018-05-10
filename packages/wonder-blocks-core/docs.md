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

Other props can be passed through `View` or `Text`, as if they were normal tags.

```js
<View>
    <View onClick={() => alert("Clicked!")}>
        Click me!
    </View>

    <Text aria-hidden>
        This text is hidden from screen readers.
    </Text>
</View>
```

There's also an HOC that adds the same style prop to existing 
components.

```js
const {addStyle} = require("./index.js");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    // default style for all instances of StyledInput
    input: {
        fontSize: 30,
    },
    // style for a particular instance of StyledInput
    pink: {
        backgroundColor: "pink",
    },
});

const StyledInput = addStyle("input", styles.input);

<StyledInput style={styles.pink} type="text" placeholder="hello, world"/>;
```
