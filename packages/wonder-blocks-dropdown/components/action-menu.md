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
        justifyContent: "flex-end",
    },
});
<View style={styles.row}>
    <ActionMenu
        alignment="right"
        menuText="Betsy Appleseed"
        testId="teacher-menu"
    >
        <ActionItem label="Profile" href="http://khanacademy.org/profile" testId="profile" />
        <ActionItem label="Teacher dashboard" href="http://khanacademy.org/coach/dashboard" testId="dashboard" />
        <ActionItem label="Settings (onClick)" onClick={() => console.log("user clicked on settings")} testId="settings" />
        <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} testId="help" />
        <SeparatorItem />
        <ActionItem label="Log out" href="http://khanacademy.org/logout" testId="logout" />
    </ActionMenu>
</View>
```

### Truncated opener

The text in the menu opener should be truncated with ellipsis at the end
and the down caret should be the same size as it is for the other examples.

```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");
const {Spring} = require("@khanacademy/wonder-blocks-layout");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <Spring />
    <ActionMenu
        menuText="Betsy Appleseed"
        style={{width: 100}}
    >
        <ActionItem label="Profile" href="http://khanacademy.org/profile" />
        <ActionItem label="Teacher dashboard" href="http://khanacademy.org/coach/dashboard" />
        <ActionItem label="Settings (onClick)" onClick={() => console.log("user clicked on settings")} />
        <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} />
        <SeparatorItem />
        <ActionItem label="Log out" href="http://khanacademy.org/logout" />
    </ActionMenu>
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
            showHiddenOption: false,
        };
        // Styleguidist doesn't support arrow functions in class field properties
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(update) {
        this.setState({
            selectedValues: update,
            showHiddenOption: update.includes("in-class"),
        });
    }

    render() {
        const {showHiddenOption} = this.state;
        return <ActionMenu
            menuText="Assignments"
            onChange={this.handleChange}
            selectedValues={this.state.selectedValues}
        >
            <ActionItem label="Create..." onClick={() => console.log("create action")} />
            <ActionItem label="Edit..." disabled={true} onClick={() => console.log("edit action")} />
            <ActionItem label="Delete" disabled={true} onClick={() => console.log("delete action")} />
            {showHiddenOption && <ActionItem label="Hidden menu for class" disabled={!showHiddenOption} onClick={() => console.log("hidden menu is clicked!")} />}
            <SeparatorItem />
            <OptionItem label="Show homework assignments" value="homework"
                onClick={() => console.log(`Show homework assignments toggled`)} />
            <OptionItem label="Show in-class assignments" value="in-class"
                onClick={() => console.log(`Show in-class assignments toggled`)} />
        </ActionMenu>
    }
}

<View style={styles.row}>
    <HybridMenu />
</View>
```

### Empty menus are disabled automatically

```js
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <ActionMenu menuText="Empty" />
</View>
```
