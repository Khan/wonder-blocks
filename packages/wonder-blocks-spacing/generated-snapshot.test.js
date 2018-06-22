// @flow
// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-spacing
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");

describe("wonder-blocks-spacing", () => {
    it("example 1", () => {
        const {StyleSheet} = require("aphrodite");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Spacing = require("./index.js").default;

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                alignItems: "center",
                marginBottom: Spacing.xxSmall,
            },
        });

        const example = (
            <View>
                {Object.keys(Spacing).map((spaceName, idx) => (
                    <View key={idx} style={styles.row}>
                        <View
                            style={{
                                width: 250,
                                textAlign: "right",
                            }}
                        >
                            {spaceName}: {Spacing[spaceName]}px
                        </View>
                        <View style={{width: Spacing.xSmall}} />
                        <View
                            style={{
                                width: Spacing.xxxLarge,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "black",
                                    width: Spacing[spaceName],
                                    height: Spacing.xxxSmall,
                                }}
                            />
                        </View>
                        <View style={{width: Spacing.xSmall}} />
                        <View
                            style={{
                                backgroundColor: "black",
                                width: Spacing.xxxSmall,
                                height: Spacing[spaceName],
                            }}
                        />
                    </View>
                ))}
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
