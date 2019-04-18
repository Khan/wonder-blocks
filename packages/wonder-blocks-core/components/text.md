**WARNING:** `Text` is meant for for use as a building block within typography
components only, rather than direct use.  Please use the typography components 
from `@khanacademy/wonder-blocks-typography` for all text.  The `font-weight` 
and `font-style` of these components can be customized using the `style` prop.
If you need to create type styles that are different sizes and/or font families 
than those in `@khanacademy/wonder-block-typography` please create custom type
components that wrap `Text`.

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
<View>
    <View onClick={() => alert("Clicked!")}>
        Click me!
    </View>

    <Text aria-hidden="true">
        This text is hidden from screen readers.
    </Text>
</View>
```

Both `View` and `Text` support a `testId` prop.

```js
<View>
    <View testId="foo">Foo</View>
    <Text testId="bar">Bar</Text>
</View>
```
