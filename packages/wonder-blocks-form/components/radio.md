The radio button has various styles for clickable states. Here are sets of default radio buttons, radio buttons in an error state, and disabled radio buttons.
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

const handleChanged = (checked) => console.log(`clicked on radio, will be checked=${checked.toString()}`);
const groupName = "group";

<View style={[styles.row]}>
    <Radio error={false} checked={false} style={[styles.marginRight]} groupName={groupName} onChange={checked => handleChanged(checked)} />
    <Radio error={false} checked={true} style={[styles.marginRight]} groupName={groupName} onChange={checked => handleChanged(checked)} />
    <Radio error={true} checked={false} style={[styles.marginRight]} groupName={groupName} onChange={checked => handleChanged(checked)} />
    <Radio error={true} checked={true} style={[styles.marginRight]} groupName={groupName} onChange={checked => handleChanged(checked)} />
    <Radio disabled={true} checked={false} style={[styles.marginRight]} groupName={groupName} onChange={checked => handleChanged(checked)} />
    <Radio disabled={true} checked={true} style={[styles.marginRight]} groupName={groupName} onChange={checked => handleChanged(checked)} />
</View>
```
