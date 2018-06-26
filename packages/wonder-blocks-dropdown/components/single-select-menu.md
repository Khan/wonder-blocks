### Single select menu. Regular and light versions.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 10,
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
    <SingleSelectMenu
        items={[
            {
                type: "select",
                label: "Banana wrapped in a peel ",
                selected: false,
                value: "banana"
            },
            {
                type: "select",
                label: "Apple",
                selected: false,
                value: "apple"
            },
            {
                type: "select",
                label: "Grape",
                selected: false,
                value: "grape"
            },
        ]}
        light={false}
        onChange={(s) => console.log(s)}
        placeholder={"Choose a juice"}
        style={{
            width: 170,
            maxWidth: 170,
        }}
    />

    <View style={[styles.strutLike]} />

    <View style={[styles.darkBackgroundWrapper]}>
        <SingleSelectMenu
            items={[
                {
                    type: "select",
                    label: "Banana juice!!!",
                    selected: false,
                    value: "banana"
                },
                {
                    type: "select",
                    label: "Apple juice!!!",
                    selected: false,
                    value: "apple"
                },
                {
                    type: "select",
                    label: "Grape juice!!!",
                    selected: false,
                    value: "grape"
                },
            ]}
            light={true}
            onChange={(s) => console.log(s)}
            placeholder={"Choose a fruit"}
        />
    </View>

</View>

```
### Disabled single select menu

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});
<View style={[styles.row]}>
    <SingleSelectMenu
        items={[
            {
                type: "select",
                label: "Banana",
                selected: false,
                value: "banana"
            },
            {
                type: "select",
                label: "Apple",
                selected: false,
                value: "apple"
            },
            {
                type: "select",
                label: "Grape",
                selected: false,
                value: "grape"
            },
        ]}
        disabled={true}
        light={false}
        onChange={(s) => console.log(s)}
        placeholder={"Choose a fruit"}
    />
</View>

```
