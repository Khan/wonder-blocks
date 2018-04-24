**Example:**

A row inside of a grid containing 3 FlexCells. The two Gutters are inserted automatically between the three FlexCells.

```jsx
const Color = require("wonder-blocks-color").default;
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
	background: {
		background: Color.offBlack,
	},

	cell: {
		height: 100,
		padding: 5,
		background: Color.gold,
	},
});

<View style={styles.background}>
	<Grid>
		<Row>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
		</Row>
	</Grid>
</View>;
```
