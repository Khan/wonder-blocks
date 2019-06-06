import React from "react";
import renderer from "react-test-renderer";

import View from "./view.js";

describe("View", () => {
    it("Should set the tag to be section", () => {
        // Arrage, Act
        const view = <View tag="section" />;
        const tree = renderer.create(view).toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });
});
