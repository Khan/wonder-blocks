The action menu is used for items that trigger actions, such as navigating to
a different page or opening a modal.

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
<View style={[styles.row]}>
    <View style={[styles.wrapper]}>
        <ActionMenu
            items={[
                {
                    type: "action",
                    label: "Profile",
                    href: "http://khanacademy.org/profile",
                },
                {
                    type: "action",
                    label: "Teacher dashboard",
                    href: "http://khanacademy.org/coach/dashboard",
                },
                {
                    type: "action",
                    label: "Settings (onClick)",
                    onClick: () => console.log("user clicked on settings")
                },
                {
                    type: "action",
                    disabled: true,
                    label: "Help",
                    onClick: () => console.log("help")
                },
                {
                    type: "separator"
                },
                {
                    type: "action",
                    label: "Log out",
                    href: "http://khanacademy.org/logout",
                }
            ]}
            menuText="Betsy Appleseed"
            alignment="right"
        />
    </View>
</View>
```

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
            items={[
                {
                    type: "action",
                    label: "Create...",
                    onClick: () => console.log("create action")
                },
                {
                    type: "action",
                    label: "Edit...",
                    disabled: true,
                    onClick: () => console.log("edit action")
                },
                {
                    type: "action",
                    label: "Delete",
                    disabled: true,
                    onClick: () => console.log("delete action")
                },
                {
                    type: "separator"
                },
                {
                    type: "select",
                    label: "Show homework assignments",
                    onClick: (state) => console.log(`Show homework assignments ${(!state).toString()}`),
                    value: "homework"
                },
                {
                    type: "select",
                    label: "Show in-class assignments",
                    onClick: (state) => console.log(`Show in-class assignments ${(!state).toString()}`),
                    value: "in-class"
                },

            ]}
            menuText="Assignments"
            onChange={(selectedValues) => this.handleChange(selectedValues)}
            selectedValues={this.state.selectedValues}
        />
    }
}

<View style={[styles.row]}>
    <HybridMenu />
</View>
```
