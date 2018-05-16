**WARNING: Link is not finished, do not use!**

A `Link` is a clickable link element consisting of a `ClickableBehavior` surrounding a `LinkCore`. `ClickableBehavior` handles interactions and state changes. `LinkCore` is a stateless component which displays the different states the `Link` can take.

LinkCores:
```js
const Color = require("wonder-blocks-color").default;
const LinkCore = require("./components/link-core.js").default;

const {offWhite} = Color;

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
                        href="#link"
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
                        href="#link"
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Visited</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="https://khanacademy.org"
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
                        href="#link"
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
                        href="#link"
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Visited</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="secondary"
                        light={false}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="https://khanacademy.org"
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
                    >
                        Label
                    </LinkCore>,
                    dolor sit amet, consectetur adipiscing elit.
                </p>
            </td>
        </tr>
        <tr>
            <th>Visited</th>
            <td>
                <p>
                    Lorem ipsum <LinkCore
                        kind="primary"
                        light={true}
                        hovered={false}
                        focused={false}
                        pressed={false}
                        href="#link"
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

### Usage
TODO(yejia)
