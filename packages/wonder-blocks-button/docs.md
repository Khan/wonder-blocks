**WARNING: Client-side navigation is not yet implemented!**

A `Button` is a clickable button element consisting of a [`ClickableBehavior`]
(#clickablebehavior) surrounding a `ButtonCore`. `ClickableBehavior` handles
interactions and state changes. `ButtonCore` is a stateless component which
displays the different states the `Button` can take.

Blue ButtonCores:
```js
const Color = require("wonder-blocks-color").default;
const ButtonCore = require("./components/button-core.js").default;

const {blue, red, white, offWhite} = Color;

const handlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

const defaultProps = {
    kind: "primary",
    size: "default",
    color: blue,
    light: false,
    hovered: false,
    focused: false,
    pressed: false,
    disabled: false,
};

<table style={{background: offWhite, textAlign: "center"}}>
    <thead>
        <tr>
            <th />
            <th style={{width: 100}}>Default</th>
            <th style={{width: 100}}>
                Hovered/<br />Focused
            </th>
            <th style={{width: 100}}>
                Active/<br />Pressed
            </th>
            <th style={{width: 100}}>Disabled</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Primary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Secondary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Tertiary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
    </tbody>
</table>
```

Blue ButtonCores, Light:
```js
const Color = require("wonder-blocks-color").default;
const ButtonCore = require("./components/button-core.js").default;

const {blue, darkBlue, white, offWhite} = Color;

const handlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

const defaultProps = {
    kind: "primary",
    size: "default",
    color: blue,
    light: true,
    hovered: false,
    focused: false,
    pressed: false,
    disabled: false,
};

<table style={{background: darkBlue, color: white, textAlign: "center"}}>
    <thead>
        <tr>
            <th />
            <th style={{width: 100}}>Default</th>
            <th style={{width: 100}}>
                Hovered/<br />Focused
            </th>
            <th style={{width: 100}}>
                Active/<br />Pressed
            </th>
            <th style={{width: 100}}>Disabled</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Primary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Secondary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Tertiary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
    </tbody>
</table>
```

Red ButtonCores:
```js
const Color = require("wonder-blocks-color").default;
const ButtonCore = require("./components/button-core.js").default;

const {blue, red, white, offWhite} = Color;

const handlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

const defaultProps = {
    kind: "primary",
    size: "default",
    color: red,
    light: false,
    hovered: false,
    focused: false,
    pressed: false,
    disabled: false,
};

<table style={{background: offWhite, textAlign: "center"}}>
    <thead>
        <tr>
            <th />
            <th style={{width: 100}}>Default</th>
            <th style={{width: 100}}>
                Hovered/<br />Focused
            </th>
            <th style={{width: 100}}>
                Active/<br />Pressed
            </th>
            <th style={{width: 100}}>Disabled</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Primary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Secondary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Tertiary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
    </tbody>
</table>
```

Red ButtonCores, Light:
```js
const Color = require("wonder-blocks-color").default;
const ButtonCore = require("./components/button-core.js").default;

const {blue, red, white, offWhite} = Color;

const handlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

const defaultProps = {
    kind: "primary",
    size: "default",
    color: red,
    light: true,
    hovered: false,
    focused: false,
    pressed: false,
    disabled: false,
};

<table style={{background: red, color: white, textAlign: "center"}}>
    <thead>
        <tr>
            <th />
            <th style={{width: 100}}>Default</th>
            <th style={{width: 100}}>
                Hovered/<br />Focused
            </th>
            <th style={{width: 100}}>
                Active/<br />Pressed
            </th>
            <th style={{width: 100}}>Disabled</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Primary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Secondary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Tertiary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
    </tbody>
</table>
```

Blue ButtonCores, Small:
```js
const Color = require("wonder-blocks-color").default;
const ButtonCore = require("./components/button-core.js").default;

const {blue, red, white, offWhite} = Color;

const handlers = {
    onClick: () => void 0,
    onMouseEnter: () => void 0,
    onMouseLeave: () => void 0,
    onMouseDown: () => void 0,
    onMouseUp: () => void 0,
    onTouchStart: () => void 0,
    onTouchEnd: () => void 0,
    onTouchCancel: () => void 0,
    onKeyDown: () => void 0,
    onKeyUp: () => void 0,
    onBlur: () => void 0,
};

const defaultProps = {
    kind: "primary",
    size: "small",
    color: blue,
    light: false,
    hovered: false,
    focused: false,
    pressed: false,
    disabled: false,
};

<table style={{background: offWhite, textAlign: "center"}}>
    <thead>
        <tr>
            <th />
            <th style={{width: 100}}>Default</th>
            <th style={{width: 100}}>
                Hovered/<br />Focused
            </th>
            <th style={{width: 100}}>
                Active/<br />Pressed
            </th>
            <th style={{width: 100}}>Disabled</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Primary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Secondary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="secondary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
        <tr style={{height: 60, verticalAlign: "middle"}}>
            <th>Tertiary</th>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    hovered={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    pressed={true}
                >
                    Label
                </ButtonCore>
            </td>
            <td>
                <ButtonCore
                    {...defaultProps}
                    {...handlers}
                    kind="tertiary"
                    disabled={true}
                >
                    Label
                </ButtonCore>
            </td>
        </tr>
    </tbody>
</table>
```
