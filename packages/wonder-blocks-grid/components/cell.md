**Example:**

A row inside of a grid containing many Cells. Each cell has a column width of 1 and will display at different sizes of the viewport (always matching the number of available columns).

```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View, Text, MediaLayout} = require("@khanacademy/wonder-blocks-core");
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
	background: {
		background: Color.offBlack,
	},

	cell: {
		height: 100,
		padding: "5px 0",
	},

	small: {
		background: Color.blue,
	},

	medium: {
		background: Color.green,
	},

	large: {
		background: Color.gold,
	},
});

// TODO(jeresig): Replace with <Layout/>
//const cellStyles = [styles.cell, (mediaSize) => styles[mediaSize]];
const cellStyles = [styles.cell, styles.large];

<View style={styles.background}>
	<MediaLayout>
		<Row>
			<Cell cols={1} style={cellStyles}>
				1
			</Cell>
			<Cell cols={1} style={cellStyles}>
				1
			</Cell>
			<Cell cols={1} style={cellStyles}>
				1
			</Cell>
			<Cell cols={1} style={cellStyles}>
				1
			</Cell>
			<Cell mediumCols={1} largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell mediumCols={1} largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell mediumCols={1} largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell mediumCols={1} largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell largeCols={1} style={cellStyles}>
				1
			</Cell>
			<Cell largeCols={1} style={cellStyles}>
				1
			</Cell>
		</Row>
	</MediaLayout>
</View>;
```
