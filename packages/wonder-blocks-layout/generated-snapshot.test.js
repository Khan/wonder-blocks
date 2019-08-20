// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-layout
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Button from "@khanacademy/wonder-blocks-button";
import {Spring, Strut, MediaLayout} from "@khanacademy/wonder-blocks-layout";

describe("wonder-blocks-layout", () => {
    it("example 1", () => {
        const styles = StyleSheet.create({
            container: {
                flexDirection: "row",
                border: `solid 1px ${Color.offBlack50}`,
            },
            button: {
                width: 100,
            },
        });
        const example = (
            <View style={styles.container}>
                <Button style={styles.button}>A</Button>
                <Strut size={Spacing.small} />
                <Button style={styles.button}>B</Button>
                <Strut size={Spacing.small} />
                <Button style={styles.button}>C</Button>
                <Spring />
                <Button style={styles.button}>Cancel</Button>
                <Strut size={Spacing.small} />
                <Button style={styles.button}>Accept</Button>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 2", () => {
        const styleSheets = {
            large: StyleSheet.create({
                test: {
                    backgroundColor: Color.darkBlue,
                    color: Color.white,
                },
            }),
            medium: StyleSheet.create({
                test: {
                    backgroundColor: Color.blue,
                    color: Color.white,
                },
            }),
            small: StyleSheet.create({
                test: {
                    backgroundColor: Color.lightBlue,
                    color: Color.white,
                },
            }),
        };
        const example = (
            <MediaLayout styleSheets={styleSheets}>
                {({mediaSize, mediaSpec, styles}) => {
                    return <View style={styles.test}>Hello, world!</View>;
                }}
            </MediaLayout>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 3", () => {
        const styleSheets = {
            all: StyleSheet.create({
                // use shared styles for all sizes
                test: {
                    color: Color.white,
                    padding: Spacing.medium,
                },
            }),
            large: StyleSheet.create({
                // override the `padding` prop` here
                test: {
                    backgroundColor: Color.darkBlue,
                    padding: Spacing.xxLarge,
                },
            }),
            medium: StyleSheet.create({
                test: {
                    backgroundColor: Color.blue,
                },
            }),
            small: StyleSheet.create({
                test: {
                    backgroundColor: Color.lightBlue,
                },
            }),
        };
        const example = (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => {
                    return <View style={styles.test}>Hello, world!</View>;
                }}
            </MediaLayout>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 4", () => {
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={styles.row}>
                <View style={styles.row}>
                    This should
                    <Strut size={16} />
                    not wrap.
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 5", () => {
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={styles.row}>
                <View style={styles.row}>
                    No
                    <Strut size={16} />
                    overlap!
                </View>
                <View style={styles.row}>
                    No
                    <Strut size={16} />
                    overlap!
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
