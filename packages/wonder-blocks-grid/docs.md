The Grid system is a collection of building-block primitives which you can use to construct a predictable layout that works across viewports. A grid will have a number of "columns" in it and individual Cells can span and align to those columns, creating a consistent layout. All of the grid components are meant to be used somewhere within a [MediaLayout](#medialayout) component. [MediaLayout](#medialayout) is designed to be used as a high-level component, holding large portions of the page (likely the entire contents).

It's sometimes easiest to just see an example of how it works, like in the following demo. Try resizing your browser and see how to layout changes based on the width of the viewport (some columns will change in size, some will disappear entirely).

```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View, Text} = require("@khanacademy/wonder-blocks-core");
const {Layout} = require("@khanacademy/wonder-blocks-layout");
const {StyleSheet} = require("aphrodite");

const styleSheets = {
    all: StyleSheet.create({
        background: {
            background: Color.offBlack,
        },

        cell: {
            height: 150,
            padding: 5,
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

<Layout styleSheets={styleSheets}>
    {({styles}) => <View style={styles.background}>
        <Row>
			<FlexCell style={styles.cell}>
				<Text>FlexCell</Text>
				<br />
				<br />
				<Text>⇠ Margin</Text>
				<br />
				<View style={{textAlign: "right"}}>
					<Text>Gutter ⇢</Text>
				</View>
			</FlexCell>
			<FixedWidthCell style={styles.cell} width={100}>
				<Text>FixedWidthCell (100px)</Text>
				<br />
				<br />
				<View style={{textAlign: "center"}}>
					<Text>⇠ Gutters ⇢</Text>
				</View>
			</FixedWidthCell>
			<Cell largeCols={2} style={styles.cell}>
				<Text>Cell (2 columns wide)</Text>
				<br />
				<br />
				<View style={{textAlign: "center"}}>
					<Text>⇠ Gutters ⇢</Text>
				</View>
			</Cell>
			<Cell smallCols={1} mediumCols={3} largeCols={5} style={styles.cell}>
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
    </View>}
</Layout>;
```

Grids are built using the following components:

* [MediaLayout](#medialayout): A MediaLayout wraps all parts of a grid and tracks the browser viewport, toggling the layout of the grid based on viewport width changes. A MediaLayout will likely hold almost the entire contents of the page. Rows can be direct children or distant descendants.
* [Row](#row): A Row holds all of the Cells that make up the contents of the grid. A row also provides the margins on the sides and inserts the gutter spacing in-between the cells. Typically this component will hold a mixture of [Cell](#cell), [FlexCell](#flexcell), and [FixedWidthCells](#fixedwidthcell), but it can also include any elements that could fit in a [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).
* [Cell](#cell): A Cell is a form of [FixedWidthCell](#fixedwidthcell) whose width is set based on the width of the specified columns at the current grid size. You will specify the number of columns that you want this component to span at each grid size. This component should only be used as a child of a [Row](#row).
* [FlexCell](#flexcell): A flexibly-sized Cell that fills the available space after fixed-width cells have been positioned. A Row with one FlexCell will take up the entire width, two FlexCells will always take up 50/50, and so on.

Additionally, there are the following available components which will likely be used less-frequently:

* [FixedWidthCell](#fixedwidthcell): A Cell whose width is specified using CSS dimensions (such as pixels, %, or other). WARNING: This should only be used only when the grid columns are explicitly not being used. This will almost certainly not align to the grid and may cause other cells to also not align.
* [Gutter](#gutter): A Gutter is a form of [FixedWidthCell](#fixedwidthcell) whose width is set based on the size of grid currently being displayed. Used for spacing out cells from each other. The gutter itself doesn't hold any content, it just spaces it out. Gutters are inserted automatically inside of a [Row](#row) in-between Cells. You may only need to use Gutters if you're manually building your own sub-grid, or some-such (this should be relatively rare).

Currently Grid sizes are defined entirely by the [MediaLayout](#medialayout) component are available at the following sizes (with their columns, gutter size, and margin sizes changing based on the size):

 * `MEDIA_DEFAULT_SPEC` (the default)
 * `MEDIA_INTERNAL_SPEC` (for internal tools)
 * `MEDIA_MODAL_SPEC` (for all modal dialogs)

See the [MediaLayout](#medialayout) component for more details. The layout breakpoints allow for a great level of flexibility in the design, constantly adjusting to the size of the viewport and working across mobile, tablet, and desktop devices. An example of this can be seen in this site mock-up:

```jsx
const Color = require("@khanacademy/wonder-blocks-color").default;
const {View, Text} = require("@khanacademy/wonder-blocks-core");

<View style={{background: Color.offWhite}}>
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
        mediaQuery="medium"
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
        mediaQuery="large"
        style={{
            background: Color.white,
            height: 71,
            borderBottom: `1px solid ${Color.offBlack8}`,
        }}
    >
        <Cell cols={3}>Possible mastery points</Cell>
        <View>Beginner / Points to Apprentice</View>
    </Row>
    <Row mediaQuery="mdOrSmaller" style={{height: 50}}>
        <FlexCell>Skill Summary</FlexCell>
    </Row>
    <Row
        mediaQuery="mdOrSmaller"
        style={{
            background: Color.white,
            height: 90,
            borderTop: `1px solid ${Color.offBlack8}`,
            borderBottom: `1px solid ${Color.offBlack8}`,
        }}
    >
        <FlexCell>Intro to Geometry Angles Quiz 1: 10 questions Polygons</FlexCell>
    </Row>
    <Row mediaQuery="large" style={{padding: "17px 0"}}>
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
        <FlexCell>
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
        </FlexCell>
    </Row>
    <Row
        mediaQuery="mdOrSmaller"
        style={{
            marginTop: 16,
            background: Color.white,
            height: 360,
            padding: 24,
            borderTop: `1px solid ${Color.offBlack8}`,
            borderBottom: `1px solid ${Color.offBlack8}`,
        }}
    >
        <FlexCell>Intro to geometry</FlexCell>
    </Row>
    <Row
        mediaQuery="mdOrSmaller"
        style={{
            marginTop: 16,
            background: Color.white,
            height: 360,
            padding: 24,
            borderTop: `1px solid ${Color.offBlack8}`,
            borderBottom: `1px solid ${Color.offBlack8}`,
        }}
    >
        <FlexCell>Angles</FlexCell>
    </Row>
</View>;
```
