A Dropdown allows various elements to be used as dropdown menus. In this example we use the IconButton to open a Dropown of items to select from.

```js
const React = require("react");
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
        label="Settings (onClick)"
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
];

<Dropdown
    disabled={false}
    menuText="Betsy Appleseed"
    testId="teacher-menu"
    menuItems={dropdownItems}
>
    {(openDropdown) => (
        <IconButton
            icon={icons.caretDown}
            aria-label="search"
        />
    )}
</Dropdown>
```

In this example we use a Title component with a Dropdown. You can define custom styles that will take place on different mouse events that ClickableBehavior supports.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {StyleSheet} = require("aphrodite");
const {Title} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    focused: {
        border: "solid 2px blue"
    },
    hovered: {
        background:"#89c8f9"
    },
    pressed: {
        background:"#42f4a1"
    }
});


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
        label="Settings (onClick)"
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
];

<View>
    <Dropdown
        testId="teacher-menu"
        menuItems={dropdownItems}
    >
        {(openDropdown, state) => (
            <Title
                style={[
                    state.focused && styles.focused,
                    state.hovered && styles.hovered,
                    state.pressed && styles.pressed,
                ]}
            >
            Hello, World!
            </Title>
        )}
    </Dropdown>
</View>;
```


