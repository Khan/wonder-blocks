**Example:**

A row inside of a MediaLayout containing one [FlexCells](#flexcell). The FlexCell displays details about the current size and columns in the MediaLayout (resize the browser to see it change).

```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {StyleSheet} = require("aphrodite");

const styles = StyleSheet.create({
	background: {
		background: Color.offBlack,
	},

	cell: {
		height: 100,
		padding: 5,
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

const cellStyles = [styles.cell, (size) => styles[size]];

<View style={styles.background}>
	<MediaLayout>
		<Row>
			<FlexCell style={cellStyles}>
				{({totalColumns, mediaSize}) => (
					<Text>
						Layout Size: {mediaSize} Total Columns: {totalColumns}
					</Text>
				)}
			</FlexCell>
		</Row>
	</MediaLayout>
</View>;
```
