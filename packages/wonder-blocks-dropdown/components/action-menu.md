The action menu is used for items that trigger actions, such as navigating to
a different page or opening a modal.

### Basic, right-aligned action menu

This menu shows different type of possible items in this type of menu:

1. leads to a different page (the profile)
2. leads to the teacher dashboard
3. has an onClick callback, which could be used for conversion logging
4. is a disabled item
5. is a separator
6. leads to the logout link

This menu is also right-aligned.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    wrapper: {
        width: "100%",
    }
});
<View style={styles.row}>
    <View style={styles.wrapper}>
        <ActionMenu
            alignment="right"
            menuText="Betsy Appleseed"
        >
            <ActionItem label="Profile" href="http://khanacademy.org/profile" />
            <ActionItem label="Teacher dashboard" href="http://khanacademy.org/coach/dashboard" />
            <ActionItem label="Settings (onClick)" onClick={() => console.log("user clicked on settings")} />
            <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} />
            <SeparatorItem />
            <ActionItem label="Log out" href="http://khanacademy.org/logout" />
        </ActionMenu>
    </View>
</View>
```

### Hybrid menu of action items and option items

The following menu demonstrates a hybrid menu with both action items and items
that can toggle to change the state of the application. The user of this menu
must keep track of the state of the selected items.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

class HybridMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["homework"],
        };
    }

    handleChange(update) {
        this.setState({
            selectedValues: update,
        });
    }

    render() {
        return <ActionMenu
            menuText="Assignments"
            onChange={(selectedValues) => this.handleChange(selectedValues)}
            selectedValues={this.state.selectedValues}
        >
            <ActionItem label="Create..." onClick={() => console.log("create action")} />
            <ActionItem label="Edit..." disabled={true} onClick={() => console.log("edit action")} />
            <ActionItem label="Delete" disabled={true} onClick={() => console.log("delete action")} />
            <SeparatorItem />
            <OptionItem label="Show homework assignments" value="homework"
                onClick={(state) => console.log(`Show homework assignments ${(!state).toString()}`)} />
            <OptionItem label="Show in-class assignments" value="in-class"
                onClick={(state) => console.log(`Show in-class assignments ${(!state).toString()}`)} />
        </ActionMenu>
    }
}

<View style={styles.row}>
    <HybridMenu />
</View>
```
