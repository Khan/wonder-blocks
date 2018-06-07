**Example:**

A row inside of a grid containing a FixedWidthCell and a FlexCell. The FixedWidthCell remains at a given size regardless of the viewport size and the FlexCell constantly re-adjusts as the browser is re-sized.

```jsx
const Color = require("wonder-blocks-color").default;
const {MediaLayout} = require("wonder-blocks-core");
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
			<FixedWidthCell style={styles.cell} width={200}>
				<Text>FixedWidthCell (200px)</Text>
			</FixedWidthCell>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
			</FlexCell>
		</Row>
	</MediaLayout>
</View>;
```
