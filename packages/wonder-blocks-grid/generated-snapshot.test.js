// @flow
// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests
// edit packages/wonder-blocks-grid/docs.md and run `npm run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";
import Cell from "./components/cell.js";
import FixedWidthCell from "./components/fixed-width-cell.js";
import FlexCell from "./components/flex-cell.js";
import Grid from "./components/grid.js";
import Gutter from "./components/gutter.js";
import Row from "./components/row.js";

describe("wonder-blocks-grid", () => {
    it("example 1", () => {
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

        const example = (
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
                        <Cell
                            smallCols={1}
                            mediumCols={3}
                            largeCols={5}
                            style={cellStyles}
                        >
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
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const Color = require("wonder-blocks-color").default;
        const {View, Text} = require("wonder-blocks-core");

        const example = (
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
                        <Cell style={{color: Color.white}}>
                            Geometry foundations
                        </Cell>
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
                        <Cell>
                            Intro to Geometry Angles Quiz 1: 10 questions
                            Polygons
                        </Cell>
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
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
