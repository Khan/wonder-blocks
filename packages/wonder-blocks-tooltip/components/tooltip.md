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
const React = require("react");
const {View, Text} = require("@khanacademy/wonder-blocks-core");

<div>
    <div style={{height: 100, overflow: "auto", border: "1px solid", margin: 10,}}>
        <div style={{height: "200vh"}}>
            <Text>This is a big long piece of text with a </Text>
            <Tooltip content={"I'm on the bottom!"} placement={"bottom"}>
                <Text style={{color: "red"}}>tooltip</Text>
            </Tooltip>
            <Text> in the middle.</Text>
        </div>
    </div>
</div>
```

### Tooltip in a modal & placement left

```js
const React = require("react");
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {StandardModal, ModalLauncher} = require("@khanacademy/wonder-blocks-modal");

const scrollyContent = (
     <div style={{height: 100, overflow: "auto", border: "1px solid", margin: 10,}}>
        <div style={{height: "200vh"}}>
            <Tooltip content={"I'm on the left!"} placement="left">
                <Text style={{color: "red"}}>tooltip</Text>
            </Tooltip>
        </div>
     </div>
);

const modalContent = (
    <div style={{height: "200vh"}}>
        {scrollyContent}
    </div>
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
