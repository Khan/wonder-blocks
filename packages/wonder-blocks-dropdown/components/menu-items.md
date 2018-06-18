Dropdown menus. Dropdown menus may contain actions or involve the selection of
one item or multiple items.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={[styles.row]}>
    <SelectItem
        onToggle={(s) => console.log(s)}
        label={"Test"}
        selected={true}
        value={"Test"}
        variant={"check"}
    />
    <SelectItem
        onToggle={(s) => console.log(s)}
        label={"Articles"}
        selected={false}
        value={"Articles"}
        variant={"check"}
        disabled={true}
    />
    <SelectItem
        onToggle={(s) => console.log(s)}
        label={"Sophie student"}
        selected={true}
        value={"Sophie student"}
        variant={"checkbox"}
        disabled={false}
    />
</View>
```
