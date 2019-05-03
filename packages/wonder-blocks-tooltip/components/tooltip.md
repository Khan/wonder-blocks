### Text anchor & text tooltip & placement right

```js
const React = require("react");

<Tooltip content="This is a text tooltip on the right" placement="right">
    Some text
</Tooltip>
```

### Complex anchor & title tooltip & placement default (top)

In this example, we're no longer forcing the anchor root to be focusable, since the text input can take focus. However, that needs a custom accessibility implementation too (for that, we should use `UniqueIDProvider`, but we'll cheat here and just give our own identifier).

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");

<Tooltip
    id="my-a11y-tooltip"
    forceAnchorFocusivity={false}
    title="This tooltip has a title"
    content="I'm at the top!"
>
    <View>
        Some text
        <input aria-describedby="my-a11y-tooltip" />
    </View>
</Tooltip>
```

### Substring anchor in scrollable parent & placement bottom
In this example, we have the anchor in a scrollable parent. Notice how, when the anchor is focused but scrolled out of bounds, the tooltip disappears.

```js
const {StyleSheet} = require("aphrodite");
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Body} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    scrollbox: {
        height: 100,
        overflow: "auto",
        border: "1px solid black",
        margin: 10,
    },
    hostbox: {
        minHeight: "200vh",
    },
});

<View>
    <View style={styles.scrollbox}>
        <View style={styles.hostbox}>
            <Body>
                This is a big long piece of text with a
                <Tooltip content="This tooltip will disappear when scrolled out of bounds" placement="bottom">
                    [tooltip]
                </Tooltip>
                <span> </span>in the middle.
            </Body>
        </View>
    </View>
</View>
```

### Tooltip in a modal & placement left
This checks that the tooltip works how we want inside a modal. Click the button to take a look.

```js
const {StyleSheet} = require("aphrodite");
const React = require("react");
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {OnePaneDialog, ModalLauncher} = require("@khanacademy/wonder-blocks-modal");
const Button = require("@khanacademy/wonder-blocks-button").default;

const styles = StyleSheet.create({
    scrollbox: {
        height: 100,
        overflow: "auto",
        border: "1px solid black",
        margin: 10,
    },
    hostbox: {
        minHeight: "200vh",
    },
    modalbox: {
        height: "200vh",
    },
});

const scrollyContent = (
     <View style={styles.scrollbox}>
        <View style={styles.hostbox}>
            <Tooltip content="I'm on the left!" placement="left">
                tooltip
            </Tooltip>
        </View>
     </View>
);

const modalContent = (
    <View style={styles.modalbox}>
        {scrollyContent}
    </View>
);

const modal = (
    <OnePaneDialog
        title="My modal"
        footer="Still my modal"
        content={modalContent} />
);

<ModalLauncher modal={modal}>
    {({openModal}) => <Button onClick={openModal}>Click here!</Button>}
</ModalLauncher>
```

### Tooltips side-by-side

```js
const {StyleSheet} = require("aphrodite");
const React = require("react");

const {View} = require("@khanacademy/wonder-blocks-core");
const {LabelSmall} = require("@khanacademy/wonder-blocks-typography");

const styles = StyleSheet.create({
    "block": {
        border: "solid 1px steelblue",
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    }
});

<View>
    <LabelSmall>Here, we can see that the first tooltip shown has an initial delay before it appears, as does the last tooltip shown, yet when moving between tooltipped items, the transition from one to another is instantaneous.</LabelSmall>

    <View style={{flexDirection: "row"}}>
        <Tooltip content="Tooltip A" placement="bottom">
            <View style={styles.block}>A</View>
        </Tooltip>
        <Tooltip content="Tooltip B" placement="bottom">
            <View style={styles.block}>B</View>
        </Tooltip>
        <Tooltip content="Tooltip C" placement="bottom">
            <View style={styles.block}>C</View>
        </Tooltip>
        <Tooltip content="Tooltip D" placement="bottom">
            <View style={styles.block}>D</View>
        </Tooltip>
    </View>
</View>
```

### Tooltips on buttons

```js
const {StyleSheet} = require("aphrodite");

const Button = require("@khanacademy/wonder-blocks-button").default;
const IconButton = require("@khanacademy/wonder-blocks-icon-button").default;
const {icons} = require("@khanacademy/wonder-blocks-icon");
const {View} = require("@khanacademy/wonder-blocks-core");
const {Strut} = require("@khanacademy/wonder-blocks-layout");

const styles = {
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
};

<View style={styles.container}>
    <Tooltip content="I'm a little tooltip">
        <Button>Click me!</Button>
    </Tooltip>
    <Strut size={16} />
    <Tooltip content="Short and stout">
        <IconButton
            icon={icons.search}
            aria-label="search"
            onClick={(e) => console.log("hello")}
        />
    </Tooltip>
</View>
```
