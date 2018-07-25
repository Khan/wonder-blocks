The checkbox has various styles for clickable states. Here are sets of default checkboxes, checkboxes in an error state, and disabled checkboxes.
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    marginRight: {
        marginRight: 16,
    }
});

const handleChanged = (checked) => console.log(`clicked on checkbox with checked=${checked.toString()}`);

<View style={[styles.row]}>
    <Checkbox error={false} checked={false} style={[styles.marginRight]} onChange={checked => handleChanged(checked)} />
    <Checkbox error={false} checked={true} style={[styles.marginRight]} onChange={checked => handleChanged(checked)} />
    <Checkbox error={true} checked={false} style={[styles.marginRight]} onChange={checked => handleChanged(checked)} />
    <Checkbox error={true} checked={true} style={[styles.marginRight]} onChange={checked => handleChanged(checked)} />
    <Checkbox disabled={true} checked={false} style={[styles.marginRight]} onChange={checked => handleChanged(checked)} />
    <Checkbox disabled={true} checked={true} style={[styles.marginRight]} onChange={checked => handleChanged(checked)} />
</View>
```
