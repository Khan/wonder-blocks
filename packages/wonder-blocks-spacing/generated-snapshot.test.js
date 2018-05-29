// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests
// edit packages/wonder-blocks-spacing/docs.md and run `npm run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

describe("wonder-blocks-spacing", () => {
    it("example 1", () => {
        const Spacing = require("./index.js").default;

        const example = (
            <div>
                {Object.keys(Spacing).map((spaceName, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: Spacing.xxSmall,
                        }}
                    >
                        <div
                            style={{
                                width: 250,
                                paddingRight: Spacing.xSmall,
                                textAlign: "right",
                            }}
                        >
                            {spaceName}: {Spacing[spaceName]}px
                        </div>
                        <div
                            style={{
                                width: Spacing.xxxLarge,
                                marginRight: Spacing.xSmall,
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "black",
                                    width: Spacing[spaceName],
                                    height: Spacing.xxxSmall,
                                }}
                            />
                        </div>
                        <div
                            style={{
                                backgroundColor: "black",
                                width: Spacing.xxxSmall,
                                height: Spacing[spaceName],
                            }}
                        />
                    </div>
                ))}
            </div>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
