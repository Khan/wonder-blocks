### Text anchor & text tooltip & placement right

```js
const React = require("react");

<Tooltip content={"I'm on the right!"} placement="right">
    Some text
</Tooltip>
```

### Complex anchor & text tooltip & placement default (top)

In this example, we're no longer forcing the anchor root to be focusable, since the text input can take focus.

```js
const React = require("react");
const {View} = require("@khanacademy/wonder-blocks-core");

<Tooltip forceAnchorFocusivity={false} content={"I'm at the top!"}>
    <View>
        Some text
        <input />
    </View>
</Tooltip>
```

### Substring anchor in scrollable parent & placement bottom

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
                <Tooltip content={"I'm on the bottom!"} placement={"bottom"}>
                    [tooltip]
                </Tooltip>
                <span> </span>in the middle.
            </Body>
        </View>
    </View>
</View>
```

### Tooltip in a modal & placement left

```js
const {StyleSheet} = require("aphrodite");
const React = require("react");
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {StandardModal, ModalLauncher} = require("@khanacademy/wonder-blocks-modal");

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
            <Tooltip content={"I'm on the left!"} placement="left">
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
    <StandardModal
        title="My modal"
        footer="Still my modal"
        content={modalContent} />
);

<ModalLauncher modal={modal}>
    {({openModal}) => <button onClick={openModal}>Click here!</button>}
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
        <Tooltip content={"Tooltip A"} placement="bottom">
            <View style={styles.block}>A</View>
        </Tooltip>
        <Tooltip content={"Tooltip B"} placement="bottom">
            <View style={styles.block}>B</View>
        </Tooltip>
        <Tooltip content={"Tooltip C"} placement="bottom">
            <View style={styles.block}>C</View>
        </Tooltip>
        <Tooltip content={"Tooltip D"} placement="bottom">
            <View style={styles.block}>D</View>
        </Tooltip>
    </View>
</View>
```