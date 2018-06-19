Dropdown menus. Dropdown menus may contain actions or involve the selection of
one item or multiple items.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {Strut} = require("@khanacademy/wonder-blocks-spacing");
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
    }
});

<View style={[styles.row]}>
    <ActionMenu
        items={[
            {
                label: "Action 1",
                onClick: () => console.log("Trigger action 1")
            },
            {
                label: "Action 2",
                disabled: true,
                onClick: () => console.log("Trigger action 2")
            },
        ]}
        menuText={"Action menu"}
    />
    <Strut size={8} />

    <SelectBox
        light={false}
        isPlaceholder={false}
        onClick={() => console.log("hi")}
    >
        Selecting
    </SelectBox>
    <Strut size={8} />
    <View style={[styles.darkBackgroundWrapper]}>
        <SelectBox
            light={true}
            isPlaceholder={true}
            onClick={() => console.log("hi")}
        >
            Selecting
        </SelectBox>
    </View>
    <Strut size={8} />
    <SelectBox disabled={true} onClick={() => console.log("error error!!")}>
        Selecting
    </SelectBox>
    <Strut size={8} />

    <MultiSelectMenu
        displaySelectShortcuts={true}
        items={[
            {
                label: "Anesu",
                selected: false,
                value: "anesu"
            },
            {
                label: "Jennie",
                selected: true,
                value: "jennie"
            },
            {
                label: "Mary",
                selected: true,
                value: "mary"
            },
            {
                label: "Sophie",
                selected: false,
                value: "sophie"
            },
        ]}
        onChange={(s) => console.log(s)}
        selectItemType={"interns"}
    />
    <Strut size={8} />

    <SingleSelectMenu
        placeholder={"Choose a fruit"}
        items={[
            {
                label: "Banana",
                selected: false,
                value: "banana"
            },
            {
                label: "Apple",
                selected: false,
                value: "apple"
            },
            {
                label: "Grape",
                selected: false,
                value: "grape"
            },
        ]}
        onChange={(s) => console.log(s)}
    />

</View>
```
