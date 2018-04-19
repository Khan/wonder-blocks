**Example:**

A row inside of a grid containing one [FlexCells](#flexcell). The FlexCell displays details about the current size and columns in the grid (resize the browser to see it change).

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

		"@media (max-width: 767px)": {
			background: Color.blue,
		},

		"@media (min-width: 768px) and (max-width: 1023px)": {
			background: Color.green,
		},

		"@media (min-width: 1024px)": {
			background: Color.gold,
		},
	},
});

<View style={styles.background}>
	<Grid>
		<Row>
			<FlexCell style={styles.cell}>
				{({totalColumns, gridSize}) => (
					<Text>
						Grid Size: {gridSize} Total Columns: {totalColumns}
					</Text>
				)}
			</FlexCell>
		</Row>
	</Grid>
</View>;
```
