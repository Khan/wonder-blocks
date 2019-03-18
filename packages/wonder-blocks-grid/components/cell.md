**Example:**

A row inside of a grid containing many Cells. Each cell has a column width of 1 and will display at different sizes of the viewport (always matching the number of available columns).

```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");
const {StyleSheet} = require("aphrodite");

const styleSheets = {
    all: StyleSheet.create({
        background: {
            background: Color.offBlack,
        },

        cell: {
            height: 100,
            padding: "5px 0",
        },
    }),
    small: StyleSheet.create({
        cell: {
            background: Color.blue,
        },
    }),
    medium: StyleSheet.create({
        cell: {
            background: Color.green,
        },
    }),
    large: StyleSheet.create({
        cell: {
            background: Color.gold,
        },
    }),
};

<MediaLayout styleSheets={styleSheets}>
    {({styles}) => <View style={styles.background}>
        <Row>
            <Cell cols={1} style={styles.cell}>1</Cell>
            <Cell cols={1} style={styles.cell}>1</Cell>
            <Cell cols={1} style={styles.cell}>1</Cell>
            <Cell cols={1} style={styles.cell}>1</Cell>
            <Cell mediumCols={1} largeCols={1} style={styles.cell}>1</Cell>
            <Cell mediumCols={1} largeCols={1} style={styles.cell}>1</Cell>
            <Cell mediumCols={1} largeCols={1} style={styles.cell}>1</Cell>
            <Cell mediumCols={1} largeCols={1} style={styles.cell}>1</Cell>
            <Cell largeCols={1} style={styles.cell}>1</Cell>
            <Cell largeCols={1} style={styles.cell}>1</Cell>
            <Cell largeCols={1} style={styles.cell}>1</Cell>
            <Cell largeCols={1} style={styles.cell}>1</Cell>
        </Row>
    </View>}
</MediaLayout>;
```