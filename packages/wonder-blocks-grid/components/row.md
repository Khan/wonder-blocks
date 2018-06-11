**Example:**

A row inside of a grid containing two [FlexCells](#flexcell). The row has some styling applied giving it a white background, a gold border, and some vertical padding. Note that the margins and gutter have been inserted automatically.

```jsx
const Color = require("wonder-blocks-color").default;
const {MediaLayout} = require("wonder-blocks-core");
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
	<MediaLayout>
		<Row style={styles.row}>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
		</Row>
	</MediaLayout>
</View>;
```
