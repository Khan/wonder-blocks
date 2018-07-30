There are three `kind`s of buttons: `"primary"` (default), `"secondary"`, and
`"tertiary"`:
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
    >
        Primary
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="secondary"
    >
        Secondary
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
    >
        Tertiary
    </Button>
</View>
```

Buttons have a `color` that is either `"default"` (default) or `"destructive"`:
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        color="destructive"
    >
        Primary
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="secondary"
        color="destructive"
    >
        Secondary
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
        color="destructive"
    >
        Tertiary
    </Button>
</View>
```

Buttons can be `disabled`.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        disabled={true}
    >
        Primary
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="secondary"
        disabled={true}
    >
        Secondary
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
        disabled={true}
    >
        Tertiary
    </Button>
</View>
```

Buttons on a `darkBlue` background should be `light`.
```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        backgroundColor: Color.darkBlue,
        padding: 10,
    },
    sideMargins: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        light={true}
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
    >
        Primary
    </Button>
    <Button
        light={true}
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="secondary"
    >
        Secondary
    </Button>
    <Button
        light={true}
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
    >
        Tertiary
    </Button>
    <Button
        light={true}
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        disabled={true}
    >
        Primary
    </Button>
    <Button
        light={true}
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="secondary"
        disabled={true}
    >
        Secondary
    </Button>
    <Button
        light={true}
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
        disabled={true}
    >
        Tertiary
    </Button>
</View>
```

Buttons have a `size` that's either `"medium"` (default) or `"small"`.
```js
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        size="small"
    >
        Label
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="secondary"
        size="small"
    >
        Label
    </Button>
    <Button
        style={styles.sideMargins}
        onClick={(e) => console.log("Hello, world!")}
        kind="tertiary"
        size="small"
    >
        Label
    </Button>
</View>
```

Buttons can have an `href` or an `onClick` handler or both.

Being able to use both is necessary to support marking conversions in A/B tests.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    sideMargins: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        href="#button-1"
        style={styles.sideMargins}
    >
        href
    </Button>
    <Button
        onClick={(e) => console.log("Hello, world!")}
        style={styles.sideMargins}
    >
        onClick
    </Button>
    <Button
        href="#button-1"
        onClick={(e) => console.log("Hello, world!")}
        style={styles.sideMargins}
    >
        both
    </Button>
</View>
```

Buttons can have a `style` props which supports width, position, margin,
and flex styles:

TODO(kevinb): link to front matter section describing the `style` prop in
more detail.

### Best Practices

In vertical layouts, buttons will stretch horizontally to fill the available
space.  This is probably not what you want unless you're on a very narrow
screen.

TODO(kevinb): add section on media queries.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <Button>
        Label
    </Button>
</View>
```

This can be corrected by applying appropriate flex styles to the container.

TODO(kevinb): link to front matter section describing why we use flexbox for
everything.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    column: {
        alignItems: "flex-start",
    },
    row: {
        flexDirection: "row",
    },
    gap: {
        height: 16,
    },
    button: {
        marginRight: 10,
    },
});

<View>
    <View style={styles.row}>
        <Button>
            Button in a row
        </Button>
    </View>
    <View style={styles.gap} />
    <View style={styles.column}>
        <Button>
            Button in a column
        </Button>
    </View>
</View>
```

Layouts often specify a specific width of button.  When implementing such
designs use `minWidth` instead of `width`.  It prevents a button from
resizing to fit content.  This is important for international sites since
sometimes strings for UI elements can be much longer than their English
counterparts.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    gap: {
        height: 16,
    },
    goodButton: {
        marginRight: 10,
        width: 144,
    },
    badButton: {
        marginRight: 10,
        minWidth: 144,
    },
});

<View>
    <View style={styles.row}>
        <Button
            style={styles.goodButton}
            kind="secondary"
        >
            label
        </Button>
        <Button
            style={styles.goodButton}
        >
            label in a different language
        </Button>
    </View>
    <View style={styles.gap} />
    <View style={styles.row}>
        <Button
            style={styles.badButton}
            kind="secondary"
        >
            label
        </Button>
        <Button
            style={styles.badButton}
        >
            label in a different language
        </Button>
    </View>
</View>
```

Only one button in a layout should be `primary`.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    button: {
        marginRight: 10,
    },
});

<View>
    <View style={styles.row}>
        <Button
            style={styles.button}
            kind="tertiary"
        >
            Tertiary
        </Button>
        <Button
            style={styles.badButton}
        >
            Primary
        </Button>
    </View>
</View>
```
