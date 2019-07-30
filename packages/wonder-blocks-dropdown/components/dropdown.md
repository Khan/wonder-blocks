
### Custom opener attached to Dropdown

A Dropdown allows various elements to be used as dropdown menus. In this example we use the IconButton to open a Dropown of items to select from. A custom dropdown can be implemented by nesting a function which takes in a state parameter and returns your custom opener component inside a Dropdown.

```js
import {Dropdown, ActionItem, OptionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import IconButton from "@khanacademy/wonder-blocks-icon-button";
import {icons} from "@khanacademy/wonder-blocks-icon";

const dropdownItems = [
    <ActionItem
        label="Profile"
        href="http://khanacademy.org/profile"
        testId="profile"
    />,
    <ActionItem
        label="Teacher dashboard"
        href="http://khanacademy.org/coach/dashboard"
        testId="dashboard"
    />,
    <ActionItem
        label="Settings"
        onClick={() => console.log("user clicked on settings")}
        testId="settings"
    />,
    <ActionItem
        label="Help"
        disabled={true}
        onClick={() => console.log("this item is disabled...")}
        testId="help"
    />,
    <ActionItem
        label="Feedback"
        disabled={true}
        href="/feedback"
        testId="feedback"
    />,
    <SeparatorItem />,
    <ActionItem
        label="Log out"
        href="http://khanacademy.org/logout"
        testId="logout"
    />,
    <OptionItem
        label="Show homework assignments" value="homework"
        onClick={() => console.log(`Show homework assignments toggled`)}
    />,
    <OptionItem
        label="Show in-class assignments" value="in-class"
        onClick={() => console.log(`Show in-class assignments toggled`)}
    />
];

<Dropdown
    disabled={false}
    menuText="Betsy Appleseed"
    testId="teacher-menu"
    menuItems={dropdownItems}
>
    {eventState => (
        <IconButton
            icon={icons.caretDown}
            aria-label="search"
        />
    )}
</Dropdown>
```
### Typography based openers

In this example we use a Title component with a Dropdown. You can define custom styles that will take place on different mouse events that ClickableBehavior supports.

```js
import {Dropdown, ActionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {Title} from "@khanacademy/wonder-blocks-typography";
import Color from "@khanacademy/wonder-blocks-color";
import {StyleSheet} from "aphrodite";

// Custom styles for mouse events can be defined like so
const styles = StyleSheet.create({
    focused: {
        border: "none",
    },
    hovered: {
        textDecoration: "underline",
    },
    pressed: {
        color: Color.teal,
    },
    cursor: {
        cursor: "pointer",
        outline: "none",
    }
});

const dropdownItems = [
    <ActionItem label="Change password" />,
    <ActionItem label="Manage email" />,
    <ActionItem label="Set up 2FA" />,
    <ActionItem label="Get Help" />,
    <SeparatorItem />,
    <ActionItem label="Log out" />,
];

<View>
    <Dropdown
        testId="teacher-menu"
        menuItems={dropdownItems}
    >
        {eventState => (
            <Title
                style={[
                    styles.cursor,
                    eventState.focused && styles.focused,
                    eventState.hovered && styles.hovered,
                    eventState.pressed && styles.pressed,
                ]}
            >
            Settings ⌄
            </Title>
        )}
    </Dropdown>
</View>;
```

### Mixture of Items in Dropdown

The Dropdown can also be used to attach more complex Dropdowns to custom openers, in this example we have a Dropdown containing ActionItems and OptionItems attached to a HeadingSmall component. The `selectionType` prop can be set to either "single" or "multi" to change the behavior of selecting OptionItems.

```js
import {Dropdown, ActionItem, OptionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    focused: {
        border: "none",
    },
    hovered: {
        textDecoration: "underline",
    },
    cursor: {
        cursor: "pointer",
        outline: "none",
    }
});

class MixedDropdownExample extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedValues: ["kumail"],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(update) {
        this.setState({
            selectedValues: update,
        });
    }

    render() {
        const dropdownItems = [
            <ActionItem label="Add new +" />,
            <SeparatorItem />,
            <OptionItem label="Alex" value="alex" />,
            <OptionItem label="Cathy" value="cathy" />,
            <OptionItem label="Kumail" value="kumail" />,
            <OptionItem label="Salman" value="salman" />,
            <OptionItem label="Yan" value="yan" />,
            <OptionItem label="Yash" value="yash" />,
        ];

        return (
            <Dropdown
                selectionType={"single"}
                menuItems={dropdownItems}
                onChange={this.handleChange}
                selectedValues={this.state.selectedValues}
            >
                {(eventState) => (
                    <HeadingSmall
                        style={[
                            styles.cursor,
                            eventState.focused && styles.focused,
                            eventState.hovered && styles.hovered,
                        ]}
                    >
                        Manage students
                    </HeadingSmall>
                )}
            </Dropdown>
        );
    }
}

<View>
    <MixedDropdownExample />
</View>
```

### Example: Opening a dropdown programmatically

Sometimes you'll want to trigger a dropdown programmatically. This can be done by
setting a value to the `opened` prop (`true` or `false`). In this situation the `Dropdown` is a
controlled component. The parent is responsible for managing the opening/closing
of the dropdown when using this prop.

This means that you'll also have to update `opened` to the value triggered by
the `onToggle` prop.

```js
import {Dropdown, ActionItem, OptionItem, SeparatorItem} from "@khanacademy/wonder-blocks-dropdown";
import Button from "@khanacademy/wonder-blocks-button";
import Clickable from "@khanacademy/wonder-blocks-clickable";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {StyleSheet} from "aphrodite";

const styles = StyleSheet.create({
    focused: {
        border: "none",
    },
    hovered: {
        textDecoration: "underline",
    },
    cursor: {
        cursor: "pointer",
        outline: "none",
    },
    row: {
        flexDirection: "row",
    }
});

class ControlledDropdownExample extends React.Component {
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
        const dropdownItems = [
            <ActionItem
                label="Add new +"
                onClick={() => console.log("Add new clicked...")}
            />,
            <SeparatorItem />,
            <OptionItem label="Alex" value="alex" />,
            <OptionItem label="Cathy" value="cathy" />,
            <OptionItem label="Kumail" value="kumail" />,
            <OptionItem label="Salman" value="salman" />,
            <OptionItem label="Yan" value="yan" />,
            <OptionItem label="Yash" value="yash" />,
        ];

        return (
            <View style={styles.row}>
                <Dropdown
                    selectionType={"single"}
                    menuItems={dropdownItems}
                    onChange={this.handleChange}
                    onToggle={this.handleToggleMenu}
                    opened={this.state.opened}
                    selectedValues={this.state.selectedValues}
                >
                    {(eventState) => (
                        <HeadingSmall
                            style={[
                                styles.cursor,
                                eventState.focused && styles.focused,
                                eventState.hovered && styles.hovered,
                            ]}
                        >
                            Open custom dropdown
                        </HeadingSmall>
                    )}
                </Dropdown>
                <Strut size={Spacing.medium} />
                <Button onClick={() => this.handleToggleMenu(true)}>
                    Open dropdown programatically
                </Button>
            </View>
        );
    }
}

<ControlledDropdownExample />
```