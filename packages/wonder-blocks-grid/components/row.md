**Example:**

A row inside of a grid containing two [Cells](#cell). The row has some styling
applied giving it a white background, a gold border, and some vertical padding.
Note that the margins and gutter have been inserted automatically.

```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
    background: {
        background: Color.offBlack,
    },

    row: {
        padding: "16px 0",
        border: `1px solid ${Color.gold}`,
        background: Color.white,
    },

    cell: {
        height: 100,
        padding: 5,
        background: Color.gold,
    },
});

<View style={styles.background}>
    <Row style={styles.row}>
        <Cell smallCols={2} mediumCols={4} largeCols={6} style={styles.cell}>
            <Text>Cell</Text>
        </Cell>
        <Cell smallCols={2} mediumCols={4} largeCols={6} style={styles.cell}>
            <Text>Cell</Text>
        </Cell>
    </Row>
</View>;
```
