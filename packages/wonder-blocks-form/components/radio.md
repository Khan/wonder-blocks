The radio button has various styles for clickable states. Here are sets of default radio buttons, radio buttons in an error state, and disabled radio buttons.
```js
import {View} from "@khanacademy/wonder-blocks-core";
import {Radio} from "@khanacademy/wonder-blocks-form";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    marginRight: {
        marginRight: 16,
    }
});

const handleChange = (checked) => console.log(`clicked on radio, will be checked=${checked.toString()}`);

<View style={styles.row}>
    <Radio error={false} checked={false} style={styles.marginRight} onChange={handleChange} />
    <Radio error={false} checked={true} style={styles.marginRight} onChange={handleChange} />
    <Radio error={true} checked={false} style={styles.marginRight} onChange={handleChange} />
    <Radio error={true} checked={true} style={styles.marginRight} onChange={handleChange} />
    <Radio disabled={true} checked={false} style={styles.marginRight} onChange={handleChange} />
    <Radio disabled={true} checked={true} style={styles.marginRight} onChange={handleChange} />
</View>
```
