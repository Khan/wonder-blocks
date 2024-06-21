import * as React from "react";
import {render} from "@testing-library/react";

import View from "../view";

describe("View", () => {
    it("Should set the tag to be section", () => {
        // Arrage, Act
        const view = <View tag="section" />;
        const {container} = render(view);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("Should set the tag to be section", () => {
        // Arrage, Act
        const view = <View tag="section" />;
        const {container} = render(view);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("Should set the tag to be article", () => {
        // Arrage, Act
        const view = <View tag="article" />;
        const {container} = render(view);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("Should set the tag to be aside", () => {
        // Arrage, Act
        const view = <View tag="aside" />;
        const {container} = render(view);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("Should set the tag to be nav", () => {
        // Arrage, Act
        const view = <View tag="nav" />;
        const {container} = render(view);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("Should set the tag to be div", () => {
        // Arrage, Act
        const view = <View />;
        const {container} = render(view);

        // Assert
        expect(container).toMatchSnapshot();
    });
});
