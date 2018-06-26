// @flow
// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-dropdown
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import SelectBox from "./components/select-box.js";

describe("wonder-blocks-dropdown", () => {
    it("example 1", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            darkBackgroundWrapper: {
                background: "black",
                padding: 10,
            },
            strutLike: {
                width: 8,
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    isPlaceholder={false}
                    onClick={() => console.log("regular selectbox selected")}
                >
                    Regular selectbox
                </SelectBox>
                <View style={[styles.strutLike]} />
                <View style={[styles.darkBackgroundWrapper]}>
                    <SelectBox
                        light={true}
                        isPlaceholder={false}
                        onClick={() => console.log("light selectbox selected")}
                    >
                        Light version
                    </SelectBox>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    isPlaceholder={true}
                    onClick={() => console.log("Selected")}
                >
                    Placeholder
                </SelectBox>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    disabled={true}
                    onClick={() => console.log("error error!!")}
                >
                    Disabled
                </SelectBox>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
