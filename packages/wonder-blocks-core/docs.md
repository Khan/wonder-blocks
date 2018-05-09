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
// This should actually be `import {addStyle} from "wonder-blocks-core"`
const {addStyle} = require("./util/add-style.js");
const {StyleSheet} = require("aphrodite");

const StyledInput = addStyle("input");

const styles = StyleSheet.create({
    input: {
        backgroundColor: "pink",
        fontSize: 30,
    },
});

<StyledInput style={styles.input} type="text" placeholder="hello, world"/>;
```
