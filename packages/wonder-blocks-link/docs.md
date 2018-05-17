**WARNING: Link is not finished, do not use!**

A `Link` is a clickable link element consisting of a [`ClickableBehavior`]
(#clickable-behavior) surrounding a `LinkCore`. `ClickableBehavior` handles
interactions and state changes. `LinkCore` is a stateless component which
displays the different states the `Link` can take.

LinkCores:
```js
const Color = require("wonder-blocks-color").default;
const LinkCore = require("./components/link-core.js").default;

const {offWhite} = Color;

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

<table style={{background: offWhite}}>
    <tbody>
        <tr>
            <th>Default</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Hover/Focus</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={true}
                        focused={false}
                        pressed={false}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Active/Press</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={true}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
    </tbody>
</table>
```

LinkCores, visited (only defined for not-light Primary LinkCores):
```js
const Color = require("wonder-blocks-color").default;
const LinkCore = require("./components/link-core.js").default;

const {offWhite} = Color;

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

<table style={{background: offWhite}}>
    <tbody>
        <tr>
            <th>Default</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="#"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Hover/Focus</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={true}
                        focused={false}
                        pressed={false}
                        href="#"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Active/Press</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={true}
                        href="#"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
    </tbody>
</table>
```

LinkCores, Secondary:
```js
const Color = require("wonder-blocks-color").default;
const LinkCore = require("./components/link-core.js").default;

const {offWhite, offBlack64} = Color;

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

<table style={{background: offWhite, color: offBlack64}}>
    <tbody>
        <tr>
            <th>Default</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="secondary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Hover/Focus</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="secondary"
                        light={false}
                        hovered={true}
                        focused={false}
                        pressed={false}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Active/Press</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="secondary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={true}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
    </tbody>
</table>
```

LinkCores, Light:
```js
const Color = require("wonder-blocks-color").default;
const LinkCore = require("./components/link-core.js").default;

const {white64, darkBlue} = Color;

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

<table style={{background: darkBlue, color: white64}}>
    <tbody>
        <tr>
            <th>Default</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={true}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="#nonexistent-link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Hover/Focus</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={true}
                        hovered={true}
                        focused={false}
                        pressed={false}
                        href="#link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Active/Press</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={true}
                        hovered={false}
                        focused={false}
                        pressed={true}
                        href="#link"
                        {...handlers}
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
    </tbody>
</table>
```
