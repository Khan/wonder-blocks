
### Custom opener attached to Dropdown

A Dropdown allows various elements to be used as dropdown menus. In this example we use the IconButton to open a Dropown of items to select from. A custom dropdown can be implemented by nesting a function which takes in a state parameter and returns your custom opener component inside a Dropdown.

```js
const {ActionItem, OptionItem, SeparatorItem} = require("@khanacademy/wonder-blocks-dropdown");
const {View} = require("@khanacademy/wonder-blocks-core");
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {StyleSheet} = require("aphrodite");

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
const {ActionItem, SeparatorItem} = require("@khanacademy/wonder-blocks-dropdown");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");
const {Title} = require("@khanacademy/wonder-blocks-typography");
const Color = require("@khanacademy/wonder-blocks-color").default;
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
const {ActionItem, OptionItem, SeparatorItem} = require("@khanacademy/wonder-blocks-dropdown");
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");
const {HeadingSmall} = require("@khanacademy/wonder-blocks-typography");
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

