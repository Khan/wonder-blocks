The Grid system is a collection of building-block primitives which you can use to construct a predictable layout that works across viewports. A grid will have a number of "columns" in it and individual Cells can span and align to those columns, creating a consistent layout. The [Grid](#grid-1) is designed to be used as a high-level component, holding large portions of the page (likely the entire contents).

It's sometimes easiest to just see an example of how it works, like in the following demo. Try resizing your browser and see how to layout changes based on the width of the viewport (some columns will change in size, some will disappear entirely).

```jsx
const Color = require("wonder-blocks-color").default;
const {View, Text} = require("wonder-blocks-core");
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
	<Grid>
		<Row>
			<FlexCell style={cellStyles}>
				<Text>FlexCell</Text>
				<br />
				<br />
				<Text>⇠ Margin</Text>
				<br />
				<View style={{textAlign: "right"}}>
					<Text>Gutter ⇢</Text>
				</View>
			</FlexCell>
			<FixedWidthCell style={cellStyles} width={100}>
				<Text>FixedWidthCell (100px)</Text>
				<br />
				<br />
				<View style={{textAlign: "center"}}>
					<Text>⇠ Gutters ⇢</Text>
				</View>
			</FixedWidthCell>
			<Cell largeCols={2} style={cellStyles}>
				<Text>Cell (2 columns wide)</Text>
				<br />
				<br />
				<View style={{textAlign: "center"}}>
					<Text>⇠ Gutters ⇢</Text>
				</View>
			</Cell>
			<Cell smallCols={1} mediumCols={3} largeCols={5} style={cellStyles}>
				{({cols}) => {
					return (
						<View>
							<Text>
								Cell ({cols === 1
									? "1 column"
									: `${cols} columns`}{" "}
								wide)
							</Text>
							<br />
							<br />
							<Text>⇠ Gutter</Text>
							<br />
							<View style={{textAlign: "right"}}>
								<Text>Margin ⇢</Text>
							</View>
						</View>
					);
				}}
			</Cell>
		</Row>
	</Grid>
</View>;
```

Grids are built using the following components:

* [Grid](#grid-1): A Grid wraps all parts of a grid and tracks the browser viewport, toggling the layout of the grid based on viewport width changes. A Grid will hold the [Row](#row) components used for rendering the grid.
* [Row](#row): A Row holds all of the Cells that make up the contents of the grid. A row also provides the margins on the sides and inserts the gutter spacing in-between the cells. Typically this component will hold a mixture of [Cell](#cell), [FlexCell](#flexcell), and [FixedWidthCells](#fixedwidthcell), but it can also include any elements that could fit in a [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).
* [Cell](#cell): A Cell is a form of [FixedWidthCell](#fixedwidthcell) whose width is set based on the width of the specified columns at the current grid size. You will specify the number of columns that you want this component to span at each grid size. This component should only be used as a child of a [Row](#row).
* [FlexCell](#grid-1): A flexibly-sized Cell that fills the available space after fixed-width cells have been positioned. A Row with one FlexCell will take up the entire width, two FlexCells will always take up 50/50, and so on.

Additionally, there are the following available components which will likely be used less-frequently:

* [FixedWidthCell](#fixedwidthcell): A Cell whose width is specified using CSS dimensions (such as pixels, %, or other). WARNING: This should only be used only when the grid columns are explicitly not being used. This will almost certainly not align to the grid and may cause other cells to also not align.
* [Gutter](#gutter): A Gutter is a form of [FixedWidthCell](#fixedwidthcell) whose width is set based on the size of grid currently being displayed. Used for spacing out cells from each other. The gutter itself doesn't hold any content, it just spaces it out. Gutters are inserted automatically inside of a [Row](#row) in-between Cells. You may only need to use Gutters if you're manually building your own sub-grid, or some-such (this should be relatively rare).

Currently Grids are available at the following sizes (with their columns, gutter size, and margin sizes changing based on the size):

**Default Grid Spec (`GRID_DEFAULT_SPEC`)**

| Size   | Columns | Gutter | Margin | Breakpoint                                                                                                                         |
| ------ | ------- | ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| small  | 4       | 16px   | 16px   | `max-width: 767px`                                                                                                                 |
| medium | 8       | 32px   | 24px   | `min-width: 768px and max-width: 1023px`                                                                                           |
| large  | 12      | 32px   | 24px   | `min-width: 1024px` (maximum content width: `1120px`, after which the margins will continue to expand and content remain centered) |

Additionally, the following grid size specs are also available:

**Internal Tools (`GRID_INTERNAL_SPEC`)**

| Size  | Columns | Gutter | Margin | Breakpoint                                   |
| ----- | ------- | ------ | ------ | -------------------------------------------- |
| large | 12      | 32px   | 16px   | `min-width: 1px` (No maximum content width.) |

**12-Column Modal (`GRID_MODAL_12_SPEC`)**

| Size  | Columns | Gutter | Margin | Breakpoint                                     |
| ----- | ------- | ------ | ------ | ---------------------------------------------- |
| small | 4       | 16px   | 16px   | `max-width: 767px`                             |
| large | 12      | 32px   | 64px   | `min-width: 768px` (No maximum content width.) |

**11-Column Modal (`GRID_MODAL_11_SPEC`)**

| Size  | Columns | Gutter | Margin | Breakpoint                                     |
| ----- | ------- | ------ | ------ | ---------------------------------------------- |
| small | 4       | 16px   | 16px   | `max-width: 767px`                             |
| large | 11      | 32px   | 64px   | `min-width: 768px` (No maximum content width.) |

**8-Column Modal (`GRID_MODAL_8_SPEC`)**

| Size  | Columns | Gutter | Margin | Breakpoint                                     |
| ----- | ------- | ------ | ------ | ---------------------------------------------- |
| small | 4       | 16px   | 16px   | `max-width: 767px`                             |
| large | 8       | 32px   | 64px   | `min-width: 768px` (No maximum content width.) |

These breakpoints allow for a great level of flexibility in the design, constantly adjusting to the size of the viewport and working across mobile, tablet, and desktop devices. An example of this can be seen in this site mock-up:

```jsx
const Color = require("wonder-blocks-color").default;
const {View, Text} = require("wonder-blocks-core");

<View style={{background: Color.offWhite}}>
	<Grid>
		<Row
			style={{
				background: Color.darkBlue,
				height: 64,
				borderBottom: `1px solid ${Color.white64}`,
			}}
		>
			<Cell style={{color: Color.white, textAlign: "center"}}>
				Khan Academy
			</Cell>
		</Row>
		<Row
			style={{
				background: Color.darkBlue,
				height: 136,
			}}
		>
			<Cell style={{color: Color.white}}>Geometry foundations</Cell>
		</Row>
		<Row
			medium
			style={{
				background: Color.white,
				height: 71,
				borderBottom: `1px solid ${Color.offBlack8}`,
				overflow: "scroll",
			}}
		>
			<Cell cols={2} style={{background: Color.offBlack8}}>
				Possible mastery points
			</Cell>
			<FixedWidthCell
				width={2000}
				style={{
					background: Color.offBlack8,
				}}
			>
				Beginner / Points to Apprentice
			</FixedWidthCell>
		</Row>
		<Row
			large
			style={{
				background: Color.white,
				height: 71,
				borderBottom: `1px solid ${Color.offBlack8}`,
			}}
		>
			<Cell cols={3}>Possible mastery points</Cell>
			<View>Beginner / Points to Apprentice</View>
		</Row>
		<Row small medium style={{height: 50}}>
			<Cell>Skill Summary</Cell>
		</Row>
		<Row
			small
			medium
			style={{
				background: Color.white,
				height: 90,
				borderTop: `1px solid ${Color.offBlack8}`,
				borderBottom: `1px solid ${Color.offBlack8}`,
			}}
		>
			<Cell>Intro to Geometry Angles Quiz 1: 10 questions Polygons</Cell>
		</Row>
		<Row large style={{padding: "17px 0"}}>
			<Cell cols={3}>
				Skill Summary
				<hr />
				Intro to Geometry
				<hr />
				Angles
				<hr />
				Quiz 1: 10 questions
				<hr />
				Polygons
			</Cell>
			<Cell>
				<View
					style={{
						background: Color.white,
						height: 360,
						padding: 24,
						border: `1px solid ${Color.offBlack8}`,
					}}
				>
					Intro to geometry
				</View>
				<View
					style={{
						marginTop: 16,
						background: Color.white,
						height: 360,
						padding: 24,
						border: `1px solid ${Color.offBlack8}`,
					}}
				>
					Angles
				</View>
			</Cell>
		</Row>
		<Row
			small
			medium
			style={{
				marginTop: 16,
				background: Color.white,
				height: 360,
				padding: 24,
				borderTop: `1px solid ${Color.offBlack8}`,
				borderBottom: `1px solid ${Color.offBlack8}`,
			}}
		>
			<Cell>Intro to geometry</Cell>
		</Row>
		<Row
			small
			medium
			style={{
				marginTop: 16,
				background: Color.white,
				height: 360,
				padding: 24,
				borderTop: `1px solid ${Color.offBlack8}`,
				borderBottom: `1px solid ${Color.offBlack8}`,
			}}
		>
			<Cell>Angles</Cell>
		</Row>
	</Grid>
</View>;
```
