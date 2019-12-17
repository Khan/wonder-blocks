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
import {ActionMenu, ActionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

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
        <ActionItem label="Feedback" disabled={true} href="/feedback" testId="feedback" />
        <SeparatorItem />
        <ActionItem label="Log out" href="http://khanacademy.org/logout" testId="logout" />
    </ActionMenu>
</View>
```

### Truncated opener

The text in the menu opener should be truncated with ellipsis at the end
and the down caret should be the same size as it is for the other examples.

```js
import {ActionMenu, ActionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";
import {Spring} from "@khanacademy/wonder-blocks-layout";

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
import {ActionMenu, ActionItem, OptionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

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
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {ActionMenu} from "@khanacademy/wonder-blocks-dropdown";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
});

<View style={styles.row}>
    <ActionMenu menuText="Empty" />
</View>
```

### ActionMenu with custom dropdown style

This example shows how we can add custom dropdownStyle to the action menu.

```js
import {ActionMenu, ActionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    dropdown: {
        maxHeight: 200,
    },
});

<View style={styles.row}>
    <ActionMenu
        menuText="Betsy Appleseed"
        testId="teacher-menu"
        dropdownStyle={styles.dropdown}
    >
        <ActionItem label="Profile" href="http://khanacademy.org/profile" testId="profile" />
        <ActionItem label="Teacher dashboard" href="http://khanacademy.org/coach/dashboard" testId="dashboard" />
        <ActionItem label="Settings (onClick)" onClick={() => console.log("user clicked on settings")} testId="settings" />
        <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} testId="help" />
        <ActionItem label="Feedback" disabled={true} href="/feedback" testId="feedback" />
        <SeparatorItem />
        <ActionItem label="Log out" href="http://khanacademy.org/logout" testId="logout" />
    </ActionMenu>
</View>
```

### Example: Opening an ActionMenu programmatically

Sometimes you'll want to trigger a dropdown programmatically. This can be done by
setting a value to the `opened` prop (`true` or `false`). In this situation the `ActionMenu` is a
controlled component. The parent is responsible for managing the opening/closing
of the dropdown when using this prop.

This means that you'll also have to update `opened` to the value triggered by
the `onToggle` prop.

```js
import {ActionItem, OptionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    }
});

class ControlledActionMenuExample extends React.Component {
    constructor() {
        super();
        this.state = {
            opened: false,
            selectedValues: ["kumail"],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
    }

    handleChange(update) {
        this.setState({
            selectedValues: update,
        });
    }

    handleToggleMenu(opened) {
        this.setState({
            opened,
        });
    }

    render() {
        return (
            <View style={styles.row}>
                <ActionMenu
                    menuText="Betsy Appleseed"
                    onChange={this.handleChange}
                    onToggle={(opened) => {
                        console.log('toggle called!!!! ', opened);
                        this.handleToggleMenu(opened);
                    }}
                    opened={this.state.opened}
                    selectedValues={this.state.selectedValues}
                >
                    <ActionItem label="Add new +" />
                    <SeparatorItem />
                    <OptionItem label="Alex" value="alex" />
                    <OptionItem label="Cathy" value="cathy" />
                    <OptionItem label="Kumail" value="kumail" />
                    <OptionItem label="Salman" value="salman" />
                    <OptionItem label="Yan" value="yan" />
                    <OptionItem label="Yash" value="yash" />
                </ActionMenu>
                <Strut size={Spacing.medium} />
                <Button onClick={() => this.handleToggleMenu(true)}>
                    Open ActionMenu programatically
                </Button>
            </View>
        );
    }
}

<ControlledActionMenuExample />
```

### Example: ActionMenu with custom opener

In case you need to use a custom opener, you can use the `opener` property to
achieve this. In this example, the `opener` prop accepts a function with the
`eventState` argument that lets you customize the style for different states,
such as `pressed`, `hovered` and `focused`.

**Note:** If you need to use a custom ID for testing the opener, make sure to
pass the `testId` prop inside the opener component/element.

```js
import {ActionMenu, ActionItem, OptionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    focused: {
        backgroundColor: Color.purple,
        color: Color.white,
    },
    hovered: {
        textDecoration: "underline",
        color: Color.teal,
    },
    pressed: {
        color: Color.blue,
    },
});

<ActionMenu
    disabled={false}
    menuText="Betsy Appleseed"
    opener={(eventState) => (
        <LabelMedium
            onClick={()=>{console.log('custom click!!!!!')}}
            testId="teacher-menu-custom-opener"
            style={[
                eventState.focused && styles.focused,
                eventState.hovered && styles.hovered,
                eventState.pressed && styles.pressed
            ]}
        >
            This is a label
        </LabelMedium>
    )}
>
    <ActionItem label="Profile" href="http://khanacademy.org/profile" testId="profile" />
    <ActionItem label="Settings" onClick={() => console.log("user clicked on settings")} testId="settings" />
    <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} testId="help" />
    <SeparatorItem />
    <ActionItem label="Log out" href="http://khanacademy.org/logout" testId="logout" />
    <OptionItem
        label="Show homework assignments" value="homework"
        onClick={() => console.log(`Show homework assignments toggled`)}
    />
    <OptionItem
        label="Show in-class assignments" value="in-class"
        onClick={() => console.log(`Show in-class assignments toggled`)}
    />
</ActionMenu>
```
