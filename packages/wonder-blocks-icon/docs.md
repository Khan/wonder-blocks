Icon is a collection of SVGs that are to be used for all of the most common icons in an application.

Below you will find a table of all available Wonder Blocks icons. Note that for some icons we use different SVG paths at different sizes.

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
    <thead>
        <tr>
            <th className={css(styles.tableBorder)}></th>
            {headings.map(heading => <th
                className={css(styles.tableBorder)}
                key={heading}>{heading}
            </th>)}
        </tr>
    </thead>
    <tbody>
        {Object.keys(icons).map(iconName => (
            <tr key={iconName}>
                <td className={css(styles.nameCell, styles.tableBorder)}>
                    {iconName}
                </td>
                {headings.map(size => {
                    if (icons[iconName][size]) {
                        return <td
                            className={css(styles.iconCell, styles.tableBorder)}
                            key={size}
                        >
                            <Icon icon={icons[iconName]} size={size} />
                        </td>;
                    }
                    return <td
                        className={css(styles.emptyCell, styles.tableBorder)}
                        key={size}
                    />;
                })}
            </tr>
        ))}
    </tbody>
</table>

```
