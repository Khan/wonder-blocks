// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-grid
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import Cell from "./components/cell.js";
import Gutter from "./components/gutter.js";
import Row from "./components/row.js";

describe("wonder-blocks-grid", () => {
    it("example 1", () => {
        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {LabelMedium} = require("@khanacademy/wonder-blocks-typography");
        const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");
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

        const example = (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View style={styles.background}>
                        <Row>
                            <Cell
                                smallCols={2}
                                mediumCols={3}
                                largeCols={4}
                                style={styles.cell}
                            >
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
                                            <View style={{textAlign: "right"}}>
                                                <LabelMedium>
                                                    Gutter ⇢
                                                </LabelMedium>
                                            </View>
                                            <br />
                                            <View style={{textAlign: "left"}}>
                                                <LabelMedium>
                                                    Margin ⇢
                                                </LabelMedium>
                                            </View>
                                        </View>
                                    );
                                }}
                            </Cell>
                            <Cell
                                mediumCols={2}
                                largeCols={3}
                                style={styles.cell}
                            >
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
                                            <View style={{textAlign: "center"}}>
                                                <LabelMedium>
                                                    ⇠ Gutters ⇢
                                                </LabelMedium>
                                            </View>
                                        </View>
                                    );
                                }}
                            </Cell>
                            <Cell
                                smallCols={2}
                                mediumCols={3}
                                largeCols={5}
                                style={styles.cell}
                            >
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
                                                <LabelMedium>
                                                    Margin ⇢
                                                </LabelMedium>
                                            </View>
                                        </View>
                                    );
                                }}
                            </Cell>
                        </Row>
                    </View>
                )}
            </MediaLayout>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {View, Text} = require("@khanacademy/wonder-blocks-core");

        const example = (
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
                    <Cell style={{color: Color.white}}>
                        Geometry foundations
                    </Cell>
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
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {View, Text} = require("@khanacademy/wonder-blocks-core");
        const {MediaLayout} = require("@khanacademy/wonder-blocks-layout");
        const {StyleSheet} = require("aphrodite");

        const styleSheets = {
            all: StyleSheet.create({
                background: {
                    background: Color.offBlack,
                },

                cell: {
                    height: 100,
                    padding: "5px 0",
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

        const example = (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <View style={styles.background}>
                        <Row>
                            <Cell cols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell cols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell cols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell cols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell
                                mediumCols={1}
                                largeCols={1}
                                style={styles.cell}
                            >
                                1
                            </Cell>
                            <Cell
                                mediumCols={1}
                                largeCols={1}
                                style={styles.cell}
                            >
                                1
                            </Cell>
                            <Cell
                                mediumCols={1}
                                largeCols={1}
                                style={styles.cell}
                            >
                                1
                            </Cell>
                            <Cell
                                mediumCols={1}
                                largeCols={1}
                                style={styles.cell}
                            >
                                1
                            </Cell>
                            <Cell largeCols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell largeCols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell largeCols={1} style={styles.cell}>
                                1
                            </Cell>
                            <Cell largeCols={1} style={styles.cell}>
                                1
                            </Cell>
                        </Row>
                    </View>
                )}
            </MediaLayout>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {View, Text} = require("@khanacademy/wonder-blocks-core");
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

        const example = (
            <View style={styles.background}>
                <Row style={styles.row}>
                    <Cell
                        smallCols={2}
                        mediumCols={4}
                        largeCols={6}
                        style={styles.cell}
                    >
                        <Text>Cell</Text>
                    </Cell>
                    <Cell
                        smallCols={2}
                        mediumCols={4}
                        largeCols={6}
                        style={styles.cell}
                    >
                        <Text>Cell</Text>
                    </Cell>
                </Row>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {Body} = require("@khanacademy/wonder-blocks-typography");
        const {View, Text} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            view: {
                background: Color.offBlack,
                height: "200px",
            },

            row: {
                padding: "16px 0",
                border: `1px solid ${Color.gold}`,
                background: Color.white,
            },

            cell: {
                background: Color.gold,
                height: "100%",
                overflowY: "auto",
                padding: 5,
            },
        });

        const example = (
            <View style={styles.view}>
                <Row style={styles.row}>
                    <Cell
                        smallCols={2}
                        mediumCols={4}
                        largeCols={4}
                        style={styles.cell}
                    >
                        <Text>Sidebar</Text>
                        <ul>
                            <li>Chapter 1: Loomings</li>
                            <li>Chapter 2: The Carpet-Bag</li>
                            <li>Chapter 3: The Spouter-Inn</li>
                            <li>Chapter 4: The Counterpane</li>
                            <li>Chapter 5: Breakfast</li>
                            <li>Chapter 6: The Street</li>
                        </ul>
                    </Cell>
                    <Cell
                        smallCols={2}
                        mediumCols={4}
                        largeCols={8}
                        style={styles.cell}
                    >
                        <Body tag="p">
                            Call me Ishmael. Some years ago- never mind how long
                            precisely- having little or no money in my purse,
                            and nothing particular to interest me on shore, I
                            thought I would sail about a little and see the
                            watery part of the world. It is a way I have of
                            driving off the spleen and regulating the
                            circulation. Whenever I find myself growing grim
                            about the mouth; whenever it is a damp, drizzly
                            November in my soul; whenever I find myself
                            involuntarily pausing before coffin warehouses, and
                            bringing up the rear of every funeral I meet; and
                            especially whenever my hypos get such an upper hand
                            of me, that it requires a strong moral principle to
                            prevent me from deliberately stepping into the
                            street, and methodically knocking people's hats off-
                            then, I account it high time to get to sea as soon
                            as I can. This is my substitute for pistol and ball.
                            With a philosophical flourish Cato throws himself
                            upon his sword; I quietly take to the ship. There is
                            nothing surprising in this. If they but knew it,
                            almost all men in their degree, some time or other,
                            cherish very nearly the same feelings towards the
                            ocean with me.
                        </Body>

                        <Body tag="p">
                            There now is your insular city of the Manhattoes,
                            belted round by wharves as Indian isles by coral
                            reefs- commerce surrounds it with her surf. Right
                            and left, the streets take you waterward. Its
                            extreme downtown is the battery, where that noble
                            mole is washed by waves, and cooled by breezes,
                            which a few hours previous were out of sight of
                            land. Look at the crowds of water-gazers there.
                        </Body>
                    </Cell>
                </Row>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
