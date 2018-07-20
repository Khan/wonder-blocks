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

Here are all the checkbox state and style combinations.
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet, css} = require("aphrodite");

const styles = StyleSheet.create({
    cell: {
        padding: 10,
    },
    checkbox: {
        marginLeft: 5,
        marginRight: 5,
    },
});

const states = ["default", "error", "disabled"];
const clickableStates = ["default", "hovered", "pressed"];
const checkedStates = [false, true];

<table>
    <thead>
        <tr>
            <th></th>
            <th colSpan="2">Default</th>
            <th colSpan="2">Hover/focus</th>
            <th colSpan="2">Active/press</th>
        </tr>
    </thead>
    <tbody>
        {states.map(state => (
            <tr key={state}>
                <td>{state}</td>
                {clickableStates.map(clickableState => {
                    const checkboxes = checkedStates.map(checked =>{
                        return <td key={`${clickableState}-${checked}`} className={css(styles.cell)}>
                            <CheckboxCore
                                checked={checked}
                                disabled={state === "disabled"}
                                error={state === "error"}
                                hovered={clickableState === "hovered"}
                                pressed={clickableState === "pressed"}
                                style={[styles.checkbox]}
                            />
                        </td>;}
                    )
                    return checkboxes;
                    }
                )}
            </tr>
        ))}
    </tbody>
</table>
```
