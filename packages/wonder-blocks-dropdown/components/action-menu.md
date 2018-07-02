The action menu is mainly for items that trigger actions, such as navigating to
a different page or opening a modal.

TODO(sophie): Incorporate the down caret once Icon is merged.

The first menu demonstrates an action menu with a disabled item and other items
that navigate to a link. There is also a separator.

The second menu demonstrates a menu where the items only have onClick callbacks
and do not navigate to a different menu. The onClick property may be used for
purposes such as conversion logging.

The third menu is disabled.

The fourth menu is right-aligned.
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 170,
    },
    strutLike: {
        width: 8,
    }
});
<View style={[styles.row]}>
    <ActionMenu
        items={[
            {
                type: "action",
                label: "Go to Google",
                href: "https://google.com",
                onClick: () => console.log("Trigger action google")
            },
            {
                type: "action",
                label: "Go to KA",
                disabled: true,
                href: "https://khanacademy.org",
                onClick: () => console.log("Trigger action KA")
            },
            {
                type: "separator",
            },
            {
                type: "action",
                label: "Go to KA",
                disabled: false,
                href: "https://khanacademy.org",
                onClick: () => console.log("Trigger action KA")
            },
        ]}
        menuText={"Navigation menu"}
        containsSelectionOptions={true}
    />
    <View style={[styles.strutLike]} />
    <ActionMenu
        items={[
            {
                type: "action",
                label: "Log action 1",
                onClick: () => console.log("Action 1")
            },
            {
                type: "action",
                label: "Log action 2",
                onClick: () => console.log("Action 2")
            },
        ]}
        menuText={"Logging menu"}
    />
    <View style={[styles.strutLike]} />
    <ActionMenu
        items={[
            {
                type: "action",
                label: "Log action 1",
                onClick: () => console.log("Action 1")
            },
            {
                type: "action",
                label: "Log action 2",
                onClick: () => console.log("Action 2")
            },
        ]}
        disabled={true}
        menuText={"Disabled menu"}
    />
    <View style={[styles.strutLike]} />
    <ActionMenu
        items={[
            {
                type: "action",
                label: "Profile",
                onClick: () => console.log("profile")
            },
            {
                type: "action",
                label: "Teacher dashboard",
                onClick: () => console.log("dashboard")
            },
            {
                type: "action",
                label: "Settings",
                onClick: () => console.log("settings")
            },
            {
                type: "action",
                label: "Help",
                onClick: () => console.log("help")
            },
            {
                type: "separator"
            },
            {
                type: "action",
                label: "Log out",
                onClick: () => console.log("log out")
            }
        ]}
        menuText={"Betsy Appleseed"}
        alignment={"right"}
    />
</View>
```

The following menu demonstrates a hybrid menu with both action items and items
that can toggle to change the state of the application. The user of this menu
must keep track of the selected items.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 250,
    },
});

class HybridMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["homework"],
        };
    }

    handleChanges(update) {
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
                    onClick: (state) => console.log(`Show homework assignments ${state.toString()}`),
                    value: "homework"
                },
                {
                    type: "select",
                    label: "Show in-class assignments",
                    onClick: (state) => console.log(`Show in-class assignments ${state.toString()}`),
                    value: "in-class"
                },

            ]}
            menuText={"Assignments"}
            containsSelectionItems={true}
            onChange={(selectedValues) => this.handleChanges(selectedValues)}
            selectedValues={this.state.selectedValues}
        />
    }
}

<View style={[styles.row]}>
    <HybridMenu />
</View>
```
