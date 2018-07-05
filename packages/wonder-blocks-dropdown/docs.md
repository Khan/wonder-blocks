Temporary views of ActionItem, SelectItem, and SeparatorItem. Will be replaced
by higher-level menu components when they are merged.

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
        height: 8,
    },
    sepContainer: {
        width: 200,
        height: 10,
    },
});
<View style={[styles.darkBackgroundWrapper]}>
    <View style={[styles.row]}>
        <ActionItem label={"Go to KA"} href={"https://khanacademy.org"} />
        <View style={[styles.strutLike]} />
        <ActionItem label={"Disabled"} disabled={true} href={"https://khanacademy.org"} />
        <View style={[styles.strutLike]} />
        <ActionItem label={"Calls an onClick"} onClick={() => console.log("Action item clicked")} />
        <View style={[styles.strutLike]} />
        <ActionItem label={"Indented"} onClick={() => console.log("Intended item clicked")} />
    </View>

    <View style={[styles.strutLike]} />

    <View style={[styles.row]}>
        <SelectItem label={"Item 1"} selected={true} value={"1"} variant={"check"} onToggle={(v, s) => console.log(`would now be ${s.toString()}`)} />
        <View style={[styles.strutLike]} />
        <SelectItem label={"Item 2"} selected={false} value={"2"} variant={"check"} onToggle={(v, s) => console.log(`would now be ${s.toString()}`)} />
        <View style={[styles.strutLike]} />
        <SelectItem label={"Item 3"} selected={true} value={"3"} variant={"checkbox"} onToggle={(v, s) => console.log(`would now be ${s.toString()}`)} />
        <View style={[styles.strutLike]} />
        <SelectItem label={"Item 4"} selected={false} value={"4"} variant={"checkbox"} onToggle={(v, s) => console.log(`would now be ${s.toString()}`)} />
        <View style={[styles.strutLike]} />
        <SelectItem label={"Item 5"} selected={false} disabled={true} value={"5"} variant={"checkbox"} onToggle={(v, l, s) => console.log(`would now be ${s.toString()}`)} />
    </View>
</View>

```
