### Example: Regular and placeholder select box versions
These select boxes also have specified widths.
TODO(sophie): Caret color on the placeholder box will be fixed with incorporation of Icon element.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {Strut} = require("@khanacademy/wonder-blocks-layout");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});
<View style={[styles.row]}>
    <SelectBox
        isPlaceholder={false}
        onClick={() => console.log("regular selectbox selected")}
        style={{width: 200}}
    >
        Regular selectbox
    </SelectBox>
    <Strut size={8} />
    <SelectBox
        isPlaceholder={true}
        onClick={() => console.log("Selected")}
        style={{width: 150}}
    >
        Placeholder
    </SelectBox>
</View>;
```

### Example: Select box on a dark background
This one does not have a specified width.

```js
const Color = require("@khanacademy/wonder-blocks-color");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

console.log(Color);
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    darkBackgroundWrapper: {
        backgroundColor: Color.default.darkBlue,
        padding: 10,
    },
});
<View style={[styles.row]}>
    <View style={[styles.darkBackgroundWrapper]}>
        <SelectBox
            light={true}
            isPlaceholder={false}
            onClick={() => console.log("light selectbox selected")}
        >
            Light version
        </SelectBox>
    </View>
</View>;
```

### Example: Disabled select box
TODO(sophie): Caret color will be fixed with incorporation of Icon element.
This one does not have a specified width.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});
<View style={[styles.row]}>
    <SelectBox disabled={true} onClick={() => console.log("error error!!")}>
        Disabled
    </SelectBox>
</View>;
```
