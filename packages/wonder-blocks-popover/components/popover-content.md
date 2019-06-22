### Example: Default popover

Default popover variant that displays text-only.

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <PopoverContent
        closeButtonVisible
        title="Title"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
    />
</View>
```

### Example: Emphasized popover with custom actions (text-only)

Text-only variant with added emphasis.

```jsx
const {StyleSheet} = require("aphrodite");
const Button = require("@khanacademy/wonder-blocks-button").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {Strut} = require("@khanacademy/wonder-blocks-layout");

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    }
});

<View style={styles.example}>
    <PopoverContent
        title="Title"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
        emphasized
        actions={
            <View style={styles.row}>
                <Button light={true} kind="secondary">Previous</Button>
                <Strut size={16} />
                <Button light={true} kind="primary">Next</Button>
            </View>
        }
    />
</View>
```

### Example: Icon Popover

Decorate the popover with an illustrated icon.

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <PopoverContent
        title="Title"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
        icon="/logo.svg"
    />
</View>
```

### Example: Illustration Popover

Call attention to the popover using a full-bleed illustration.

```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <PopoverContent
        title="Title"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
        image="/illustration.svg"
        closeButtonVisible
    />
</View>
```