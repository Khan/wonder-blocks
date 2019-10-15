The Grid system is a collection of building-block primitives which you can use to construct a predictable layout that works across viewports. A grid will have a number of "columns" in it and individual Cells can span and align to those columns, creating a consistent layout. All of the grid components are meant to be used somewhere within a [MediaLayout](#medialayout) component. [MediaLayout](#medialayout) is designed to be used as a high-level component, holding large portions of the page (likely the entire contents).

It's sometimes easiest to see an example of how it works, like in the following demo. Try resizing your browser and see how to layout changes based on the width of the viewport (some columns will change in size, some will disappear entirely).

```jsx
import {Cell, Row} from "@khanacademy/wonder-blocks-grid";
import Color from "@khanacademy/wonder-blocks-color";
import {View} from "@khanacademy/wonder-blocks-core";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import {StyleSheet} from "aphrodite";

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

<MediaLayout styleSheets={styleSheets}>
    {({styles}) => <View style={styles.background}>
        <Row>
            <Cell smallCols={2} mediumCols={3} largeCols={4} style={styles.cell}>
                {({cols}) => {
                    return <View>
                        <LabelMedium>
                            Cell ({cols === 1
                                ? "1 column"
                                : `${cols} columns`}{" "}
                            wide)
                        </LabelMedium>
                        <br />
                        <br />
                        <View style={{textAlign: "right"}}>
                            <LabelMedium>Gutter ⇢</LabelMedium>
                        </View>
                        <br />
                        <View style={{textAlign: "left"}}>
                            <LabelMedium>Margin ⇢</LabelMedium>
                        </View>
                    </View>;
                }}
            </Cell>
            <Cell mediumCols={2} largeCols={3} style={styles.cell}>
                {({cols}) => {
                    return <View>
                        <LabelMedium>
                            Cell ({cols === 1
                                ? "1 column"
                                : `${cols} columns`}{" "}
                            wide)
                        </LabelMedium>
                        <br />
                        <br />
                        <View style={{textAlign: "center"}}>
                            <LabelMedium>⇠ Gutters ⇢</LabelMedium>
                        </View>
                    </View>;
                }}
			</Cell>
			<Cell smallCols={2} mediumCols={3} largeCols={5} style={styles.cell}>
				{({cols}) => {
					return (
						<View>
							<LabelMedium>
								Cell ({cols === 1
									? "1 column"
									: `${cols} columns`}{" "}
								wide)
							</LabelMedium>
							<br />
							<br />
							<LabelMedium>⇠ Gutter</LabelMedium>
							<br />
							<View style={{textAlign: "right"}}>
								<LabelMedium>Margin ⇢</LabelMedium>
							</View>
						</View>
					);
				}}
			</Cell>
        </Row>
    </View>}
</MediaLayout>;
```

Grids are built using the following components:

* [MediaLayout](#medialayout): A MediaLayout wraps all parts of a grid and tracks the browser viewport, toggling the layout of the grid based on viewport width changes. A MediaLayout will likely hold almost the entire contents of the page. Rows can be direct children or distant descendants.
* [Row](#row): A Row holds all of the Cells that make up the contents of the grid. A row also provides the margins on the sides and inserts the gutter spacing in-between the cells. Typically this component will hold a [Cell](#cell), but it can also include any elements that could fit in a [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).  When the entire row is taken up by a single cell, the `Cell` can be omitted.
* [Cell](#cell): A Cell is a container whose width is set based on the width of the specified columns at the current grid size. You will specify the number of columns that you want this component to span at each grid size. This component should only be used as a child of a [Row](#row).

Currently Grid sizes are defined entirely by the [MediaLayout](#medialayout) component are available at the following sizes (with their columns, gutter size, and margin sizes changing based on the size):

 * `MEDIA_DEFAULT_SPEC` (the default)
 * `MEDIA_INTERNAL_SPEC` (for internal tools)
 * `MEDIA_MODAL_SPEC` (for all modal dialogs)

See the [MediaLayout](#medialayout) component for more details. The layout breakpoints allow for a great level of flexibility in the design, constantly adjusting to the size of the viewport and working across mobile, tablet, and desktop devices. An example of this can be seen in this site mock-up:

```jsx
import {Cell, Row} from "@khanacademy/wonder-blocks-grid";
import Color from "@khanacademy/wonder-blocks-color";
import {View, Text} from "@khanacademy/wonder-blocks-core";

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
        <Cell
            smallCols={4}
            mediumCols={6}
            largeCols={10}
            style={{
                background: Color.offBlack8,
            }}
        >
            Beginner / Points to Apprentice
        </Cell>
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
        <Cell smallCols={4} mediumCols={8} largeCols={12}>
            Skill Summary
        </Cell>
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
        <Cell smallCols={4} mediumCols={8} largeCols={12}>
            Intro to Geometry Angles Quiz 1: 10 questions Polygons
        </Cell>
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
        <Cell smallCols={1} mediumCols={5} largeCols={9}>
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
        mediaQuery="mdOrSmaller"
        style={{
            marginTop: 16,
            background: Color.white,
            height: 360,
            borderTop: `1px solid ${Color.offBlack8}`,
            borderBottom: `1px solid ${Color.offBlack8}`,
        }}
    >
        Intro to geometry
    </Row>
    <Row
        mediaQuery="mdOrSmaller"
        style={{
            marginTop: 16,
            background: Color.white,
            height: 360,
            borderTop: `1px solid ${Color.offBlack8}`,
            borderBottom: `1px solid ${Color.offBlack8}`,
        }}
    >
        Angles
    </Row>
</View>;
```
