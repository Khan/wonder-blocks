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

    it("Should set the tag to be section", () => {
        // Arrage, Act
        const view = <View tag="section" />;
        const tree = renderer.create(view).toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });

    it("Should set the tag to be article", () => {
        // Arrage, Act
        const view = <View tag="article" />;
        const tree = renderer.create(view).toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });

    it("Should set the tag to be aside", () => {
        // Arrage, Act
        const view = <View tag="aside" />;
        const tree = renderer.create(view).toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });

    it("Should set the tag to be nav", () => {
        // Arrage, Act
        const view = <View tag="nav" />;
        const tree = renderer.create(view).toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });

    it("Should set the tag to be div", () => {
        // Arrage, Act
        const view = <View />;
        const tree = renderer.create(view).toJSON();

        // Assert
        expect(tree).toMatchSnapshot();
    });
});
