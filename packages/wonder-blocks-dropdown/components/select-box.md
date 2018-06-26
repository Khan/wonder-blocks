### Example: Regular and light select box versions
These select boxes also have specified widths.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    darkBackgroundWrapper: {
        background: "black",
        padding: 10,
    },
    strutLike: {
        width: 8,
    }
});
<View style={[styles.row]}>
    <SelectBox
        isPlaceholder={false}
        onClick={() => console.log("regular selectbox selected")}
        style={{width: 200}}
    >
        Regular selectbox
    </SelectBox>
    <View style={[styles.strutLike]} />
    <View style={[styles.darkBackgroundWrapper]}>
        <SelectBox
            light={true}
            isPlaceholder={false}
            onClick={() => console.log("light selectbox selected")}
            style={{width: 150}}
        >
            Light version
        </SelectBox>
    </View>
</View>;
```

### Example: Selectbox with a placeholder
Caret color will be fixed with incorporation of Icon element.
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
    <SelectBox isPlaceholder={true} onClick={() => console.log("Selected")}>
        Placeholder
    </SelectBox>
</View>;
```

### Example: Disabled select box
Caret color will be fixed with incorporation of Icon element.
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
