**Example:**

A few rows inside of a grid containing 1, 2, and then 3 FlexCells. Note how they distribute evenly and always take up the available space while still respecting gutters and margins.

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
		padding: 5,
		background: Color.gold,
	},
});

<View style={styles.background}>
	<MediaLayout>
		<Row>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
		</Row>
		<Row>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
		</Row>
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
	</MediaLayout>
</View>;
```
