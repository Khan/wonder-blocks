#### Example: Default PopoverContent

Default popover variant that displays text-only.

```jsx
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

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

#### Example: Emphasized PopoverContent with custom actions (text-only)

Text-only variant with added emphasis.

```jsx
import {StyleSheet} from "aphrodite";
import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Spacing from "@khanacademy/wonder-blocks-spacing";

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
                <Strut size={Spacing.medium} />
                <Button light={true} kind="primary">Next</Button>
            </View>
        }
    />
</View>
```

#### Example: PopoverContent with icon

Decorate the popover with an illustrated icon. You need to pass an `icon` prop
with the following constraints:

- string: The URL of the icon asset
- `<img>` or `<svg>`: Make sure to define a width

```jsx
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <PopoverContent
        title="Title"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
        icon={<img src="/logo.svg" width="100%" alt="icon popover" />}
    />
</View>
```

#### Example: PopoverContent with illustration

Call attention to the popover using a full-bleed illustration.

```jsx
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";

const styles = StyleSheet.create({
    example: {
        alignItems: "center",
    }
});

<View style={styles.example}>
    <PopoverContent
        title="Title"
        content="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo."
        image={<img src="/illustration.svg" width={288} height={200} />}
        closeButtonVisible
    />
</View>
```