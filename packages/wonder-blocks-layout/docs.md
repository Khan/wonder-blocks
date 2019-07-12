## Spring and Strut

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

## MediaLayout

`MediaLayout` is a container component takes in a `styleSheets` object whose keys are
media sizes.  I listens for changes to the current media size and passes the current
`mediaSize`, `mediaSpec`, and `styles` to `children` which is a render function taking
those three values as object.

Valid keys for the `styleSheets` object are (in order of precedence):
- `small`, `medium`, `large`
- `mdOrSmaller`, `mdOrLarger`
- `all`

`MediaLayout` will merge style rules from multiple styles that match the current media
query, e.g. `"(min-width: 1024px)"`.

The `mediaSpec` is an object with one or more of the following keys: `small`, `medium`,
or `large`.  Each value contains the following data:
- `query: string` e.g. "(min-width: 1024px)"
- `totalColumns: number`
- `gutterWidth: number`
- `marginWidth: number`
- `maxWidth: number`

By default, `MediaLayout` uses `MEDIA_DEFAULT_SPEC` but others can be specified using
`MediaLayoutContext.Provider`.  See media-layout-context.test.js for examples of how
to do this.

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");

const styleSheets = {
    large: StyleSheet.create({
        test: {
            backgroundColor: "blue",
        },
    }),
    medium: StyleSheet.create({
        test: {
            backgroundColor: "green",
        },
    }),
    small: StyleSheet.create({
        test: {
            backgroundColor: "orange",
        },
    }),
};

<MediaLayout styleSheets={styleSheets}>
    {({mediaSize, mediaSpec, styles}) => {
        return <View style={styles.test}>Hello, world!</View>;
    }}
</MediaLayout>
```
