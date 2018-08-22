There are three `kind`s of buttons: `"primary"` (default), `"secondary"`, and
`"tertiary"`:
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
    >
        Primary
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="secondary"
    >
        Secondary
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="tertiary"
    >
        Tertiary
    </Button>
</View>
```

Buttons have a `color` that is either `"default"` (the default, as shown
above) or `"destructive"` (as can seen below):
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        color="destructive"
    >
        Primary
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="secondary"
        color="destructive"
    >
        Secondary
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
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
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        disabled={true}
    >
        Primary
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="secondary"
        disabled={true}
    >
        Secondary
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="tertiary"
        disabled={true}
    >
        Tertiary
    </Button>
</View>
```

Buttons on a `darkBlue` background should set `light` to `true`.
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
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        light={true}
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
    >
        Primary
    </Button>
    <Button
        light={true}
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="secondary"
    >
        Secondary
    </Button>
    <Button
        light={true}
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="tertiary"
    >
        Tertiary
    </Button>
    <Button
        light={true}
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        disabled={true}
    >
        Primary
    </Button>
    <Button
        light={true}
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="secondary"
        disabled={true}
    >
        Secondary
    </Button>
    <Button
        light={true}
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
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
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        size="small"
    >
        Label
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="secondary"
        size="small"
    >
        Label
    </Button>
    <Button
        style={styles.button}
        onClick={(e) => window.alert("Hello, world!")}
        kind="tertiary"
        size="small"
    >
        Label
    </Button>
</View>
```

Buttons can have an `href` or an `onClick` handler or both.

Being able to use both is necessary to support marking conversions in A/B
tests.  There is however no built-in facility for doing A/B testing in
`wonder-blocks` itself.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button
        href="#button-1"
        style={styles.button}
    >
        href
    </Button>
    <Button
        kind="secondary"
        onClick={(e) => window.alert("Hello, world!")}
        style={styles.button}
    >
        onClick
    </Button>
    <Button
        kind="tertiary"
        href="#button-1"
        onClick={(e) => window.alert("Hello, world!")}
        style={styles.button}
    >
        both
    </Button>
</View>
```

Buttons do client-side navigation by default, if React Router exists:
```jsx
const {StyleSheet} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {MemoryRouter, Route, Switch} = require("react-router-dom");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        marginRight: 10,
    }
});

// NOTE: In actual code you would use BrowserRouter instead
<MemoryRouter>
    <View style={styles.row}>
        <Button href="/foo" style={styles.button}>
            Uses Client-side Nav
        </Button>
        <Button  href="/foo" style={styles.button} skipClientNav>
            Avoids Client-side Nav
        </Button>
        <Switch>
            <Route path="/foo">
                <View id="foo">Hello, world!</View>
            </Route>
        </Switch>
    </View>
</MemoryRouter>
```

Buttons can show a `spinner`.  This is useful when indicating to a user that
their input has been recognized but that the operation will take some time.
While the `spinner` property is set to `true` the button is disabled.

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        marginRight: 10,
    }
});

<View style={styles.row}>
    <Button spinner={true} style={styles.button}>
        Click me!
    </Button>
    <Button spinner={true} size="small" style={styles.button}>
        Click me!
    </Button>
</View>
```

Buttons can have a `style` props which supports width, position, margin,
and flex styles.

### Best Practices

In vertical layouts, buttons will stretch horizontally to fill the available
space.  This is probably not what you want unless you're on a very narrow
screen.

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");

<View>
    <Button>
        Label
    </Button>
</View>
```

This can be corrected by applying appropriate flex styles to the container.

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

Layouts often specify a specific width of button. When implementing such
designs use `minWidth` instead of `width`. `minWidth` allows the button
to resize to fit the content whereas `width` does not. This is important
for international sites since sometimes strings for UI elements can be much
longer in other languages. Both of the buttons below have a "natural" width
of 144px. The one on the right is wider but it accommodates the full string
instead of wrapping it. Note that if the parent container of the button doesn't
have enough room to accommodate the width of the button, the text will truncate.
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
    button: {
        marginRight: 10,
        minWidth: 144,
    },
});

<View style={styles.row}>
    <Button
        style={styles.button}
        kind="secondary"
    >
        label
    </Button>
    <Button
        style={styles.button}
    >
        label in a different language
    </Button>
</View>
```

Only one button in a layout should be `primary`.
```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
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

When an action is going to take a while, show a spinner during that time.

```jsx
const {View} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    button: {
        marginRight: 10,
    },
});

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            waiting: false,
        }
    }

    componentWillUnmount() {
        this.timeout.clear();
    }

    handleClick() {
        this.setState({waiting: true});
        this.timeout = setTimeout(() => {
            this.setState({waiting: false});
        }, 2000);
    }

    render() {
        return <View style={styles.row}>
            <Button
                spinner={this.state.waiting}
                onClick={() => this.handleClick()}
            >
                Click me!
            </Button>
        </View>
    }
}

<Example />
```