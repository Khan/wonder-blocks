The `TooltipAnchor` component creates an accessible anchor point on the given content so that the tooltip bubble can be positioned and displayed appropriately.

### Simple case on just text

```jsx
const {View,Text} = require("@khanacademy/wonder-blocks-core");
const id = "tooltipanchor-justtext-status";

let haveRef;
let active;

function updateStatus() {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    if (!haveRef) {
        el.textContent = "No anchor reference";
    } else {
        el.textContent = active ? "Anchor is active" : "Anchor is inactive";
    }
}

function anchorRef(e) {
    haveRef = !!e;
    updateStatus();
}

function onStateChanged(a) {
    active = a;
    updateStatus();
}

<View>
    <Text style={{marginBottom: 8, backgroundColor: "lightgray"}} id={id}>No anchor</Text>
    <TooltipAnchor anchorRef={anchorRef} onStateChanged={onStateChanged}>
        This is a string without any other elements
    </TooltipAnchor>
</View>
```

### Simple case with non-interactive content in element

```jsx
const {View,Text} = require("@khanacademy/wonder-blocks-core");
const id = "tooltipanchor-textelement-status";

let haveRef;
let active;

function updateStatus() {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    if (!haveRef) {
        el.textContent = "No anchor reference";
    } else {
        el.textContent = active ? "Anchor is active" : "Anchor is inactive";
    }
}

function anchorRef(e) {
    haveRef = !!e;
    updateStatus();
}

function onStateChanged(a) {
    active = a;
    updateStatus();
}

<View>
    <Text style={{marginBottom: 8, backgroundColor: "lightgray"}} id={id}>No anchor</Text>
    <TooltipAnchor anchorRef={anchorRef} onStateChanged={onStateChanged}>
        <Text>Something we want to anchor</Text>
    </TooltipAnchor>
</View>
```

### Simple Case with interactive content

```js
const {View,Text} = require("@khanacademy/wonder-blocks-core");

const id = "tooltipanchor-interactive-status";

let haveRef;
let active;

function updateStatus() {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    if (!haveRef) {
        el.textContent = "No anchor reference";
    } else {
        el.textContent = active ? "Anchor is active" : "Anchor is inactive";
    }
}

function anchorRef(e) {
    haveRef = !!e;
    updateStatus();
}

function onStateChanged(a) {
    active = a;
    updateStatus();
}

<View>
    <Text style={{marginBottom: 8, backgroundColor: "lightgray"}} id={id}>Anchor is inactive</Text>
    <TooltipAnchor anchorRef={anchorRef} onStateChanged={onStateChanged}>
        <a href="#tooltip"><Text>Another thing</Text></a>
    </TooltipAnchor>
</View>
```

### Embedded in a sentence

```jsx
const {View,Text} = require("@khanacademy/wonder-blocks-core");

const id = "tooltipanchor-embedded-status";

let haveRef;
let active;

function updateStatus() {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    if (!haveRef) {
        el.textContent = "No anchor reference";
    } else {
        el.textContent = active ? "Anchor is active" : "Anchor is inactive";
    }
}

function anchorRef(e) {
    haveRef = !!e;
    updateStatus();
}

function onStateChanged(a) {
    active = a;
    updateStatus();
}

<View>
    <Text style={{marginBottom: 8, backgroundColor: "lightgray"}} id={id}>Anchor is inactive</Text>
    <Text>Some text with this <TooltipAnchor anchorRef={anchorRef} onStateChanged={onStateChanged}><Text  style={{border: "solid 1px red"}}>anchor</Text></TooltipAnchor> in the middle</Text>
</View>
```

### Complex content with interactive elements

```jsx
const {View, Text} = require("@khanacademy/wonder-blocks-core");

const id = "tooltipanchor-complex-status";

let haveRef;
let active;

function updateStatus() {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    if (!haveRef) {
        el.textContent = "No anchor reference";
    } else {
        el.textContent = active ? "Anchor is active" : "Anchor is inactive";
    }
}

function anchorRef(e) {
    haveRef = !!e;
    updateStatus();
}

function onStateChanged(a) {
    active = a;
    updateStatus();
}

<View>
    <Text style={{marginBottom: 8, backgroundColor: "lightgray"}} id={id}>Anchor is inactive</Text>
    <TooltipAnchor anchorRef={anchorRef} onStateChanged={onStateChanged}>
        <View>
            <Text>Some rich content with a focusable component.</Text>
            <Text>We want the tooltip to show when the input is focused but not require the whole content to be focusable.</Text>
            <input type="text" />
        </View>
    </TooltipAnchor>
</View>
```

### Complex content with interactive elements and no forced focus

```jsx
const {View, Text} = require("@khanacademy/wonder-blocks-core");

const id = "tooltipanchor-nofocusivity-status";

let haveRef;
let active;

function updateStatus() {
    const el = document.getElementById(id);
    if (!el) {
        return;
    }
    if (!haveRef) {
        el.textContent = "No anchor reference";
    } else {
        el.textContent = active ? "Anchor is active" : "Anchor is inactive";
    }
}

function anchorRef(e) {
    haveRef = !!e;
    updateStatus();
}

function onStateChanged(a) {
    active = a;
    updateStatus();
}

<View>
    <Text style={{marginBottom: 8, backgroundColor: "lightgray"}} id={id}>Anchor is inactive</Text>
    <TooltipAnchor forceAnchorFocusivity={false} anchorRef={anchorRef} onStateChanged={onStateChanged}>
        <View>
            <Text>Some rich content with a focusable component.</Text>
            <Text>We want the tooltip to show when the input is focused but not require the whole content to be focusable.</Text>
            <input type="text" />
        </View>
    </TooltipAnchor>
</View>
```