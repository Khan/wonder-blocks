// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-progress-spinner
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import CircularSpinner from "./components/circular-spinner.js";

describe("wonder-blocks-progress-spinner", () => {
    it("example 1", () => {
        const {CircularSpinner} = require("./index.js");

        const example = <CircularSpinner />;
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {StyleSheet} = require("aphrodite");
        const {Text, View} = require("@khanacademy/wonder-blocks-core");
        const Color = require("@khanacademy/wonder-blocks-color").default;

        const styles = StyleSheet.create({
            contents: {
                flexDirection: "row",
            },
            dark: {
                background: Color.darkBlue,
                color: Color.white,
            },
            block: {
                width: 154,
                height: 154,
                marginRight: 16,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            },
            inline: {
                display: "inline",
            },
        });

        const example = (
            <View>
                <View style={styles.contents}>
                    <View style={styles.block}>
                        <CircularSpinner size="large" />
                        <Text>size: large (96px)</Text>
                    </View>
                    <View style={styles.block}>
                        <CircularSpinner size="medium" />
                        <Text>size: medium (48px)</Text>
                    </View>
                    <View style={styles.block}>
                        <CircularSpinner size="small" />
                        <Text>size: small (24px)</Text>
                    </View>
                    <View style={styles.block}>
                        <CircularSpinner size="xsmall" />
                        <Text>size: xsmall (16px)</Text>
                    </View>
                </View>

                <View style={[styles.contents, styles.dark]}>
                    <View style={styles.block}>
                        <CircularSpinner size="large" light />
                        <Text>light, size: large (96px)</Text>
                    </View>
                    <View style={styles.block}>
                        <CircularSpinner size="medium" light />
                        <Text>light, size: medium (48px)</Text>
                    </View>
                    <View style={styles.block}>
                        <CircularSpinner size="small" light />
                        <Text>light, size: small (24px)</Text>
                    </View>
                    <View style={styles.block}>
                        <CircularSpinner size="xsmall" light />
                        <Text>light, size: xsmall (16px)</Text>
                    </View>
                </View>

                <View>
                    <Text>
                        Inline inside
                        <CircularSpinner
                            size="xsmall"
                            style={styles.inline}
                        />{" "}
                        some text.
                    </Text>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
