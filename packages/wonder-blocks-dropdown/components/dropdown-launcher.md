Dropdown launcher


```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {StyleSheet} = require("aphrodite");

const dropItems = () => {
    return (
    <DropdownItems>
        <ActionItem label="Profile" href="http://khanacademy.org/profile" testId="profile" />
        <ActionItem label="Teacher dashboard" href="http://khanacademy.org/coach/dashboard" testId="dashboard" />
        <ActionItem label="Settings (onClick)" onClick={() => console.log("user clicked on settings")} testId="settings" />
        <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} testId="help" />
        <ActionItem label="Feedback" disabled={true} href="/feedback" testId="feedback" />
        <SeparatorItem />
        <ActionItem label="Log out" href="http://khanacademy.org/logout" testId="logout" />
    </DropdownItems>
    )
}

<View>
    <DropdownLauncher
        menuText="Betsy Appleseed"
        testId="teacher-menu"
        menuItems={[<ActionItem label="Profile" href="http://khanacademy.org/profile" testId="profile" />,
        <ActionItem label="Teacher dashboard" href="http://khanacademy.org/coach/dashboard" testId="dashboard" />,
        <ActionItem label="Settings (onClick)" onClick={() => console.log("user clicked on settings")} testId="settings" />,
        <ActionItem label="Help" disabled={true} onClick={() => console.log("this item is disabled...")} testId="help" />,
        <ActionItem label="Feedback" disabled={true} href="/feedback" testId="feedback" />,
        <SeparatorItem />,
        <ActionItem label="Log out" href="http://khanacademy.org/logout" testId="logout" />]}
    >
        {
            (openDropdown) => {
                //debugger;
                console.log(openDropdown);
                return (<IconButton
                        onClick={openDropdown.openDropdown}
                        icon={icons.search}
                        aria-label="search"
                />)}

        }
    </DropdownLauncher>
</View>
```