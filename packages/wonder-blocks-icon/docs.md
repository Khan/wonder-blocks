A minimal `Icon` usage:

```jsx
const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");

<Icon icon={icons.search} size="small" />
```

A table of Wonder Blocks icons. Note that for some icons we use different
SVG paths at different sizes.

```jsx
const {StyleSheet, css} = require("aphrodite");
const {View} = require("@khanacademy/wonder-blocks-core");
const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");

const headings = ["small", "medium"];

const styles = StyleSheet.create({
    emptyCell: {
        background: "#EEE",
    },
    nameCell: {
        fontFamily: "monospace",
        textAlign: "right",
        paddingRight: 4,
    },
    iconCell: {
        minWidth: 75,
        textAlign: "center",
        padding: 4,
    },
    tableBorder: {
        border: "1px #DDD solid",
    },
});

<table className={css(styles.table)} style={{borderCollapse: "collapse"}}>
    <tr>
        <th className={css(styles.tableBorder)}></th>
        {headings.map(heading => <th
            className={css(styles.tableBorder)}
            key={heading}>{heading}
        </th>)}
    </tr>
    {Object.keys(icons).map(iconName => (
        <tr key={iconName}>
            <td className={css(styles.nameCell, styles.tableBorder)}>
                {iconName}
            </td>
            {headings.map(size => {
                if (icons[iconName][size]) {
                    return <td
                        className={css(styles.iconCell, styles.tableBorder)}
                    >
                        <Icon icon={icons[iconName]} size={size} />
                    </td>;
                }
                return <td
                    className={css(styles.emptyCell, styles.tableBorder)}
                />;
            })}
        </tr>
    ))}
</table>

```

While we don't currently have assets for sizes larger than `medium`, we can
still render any icon at any size in a pinch:

```jsx

const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");

<div>
    {["small", "medium", "large", "xlarge"].map(size =>
        <Icon key={size} size={size} icon={icons.search} />
    )}
</div>
```

Icons have `display: inline-block` by default:

```jsx

const {default: Icon, icons} = require("@khanacademy/wonder-blocks-icon");
const Color = require("@khanacademy/wonder-blocks-color").default;

<div>
    Here is an icon inline:
    <Icon
        size="small"
        icon={icons.info}
        color={Color.red}
        style={{margin: 2}}
    />
    It has color, too.
</div>

```