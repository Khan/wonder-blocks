/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import * as React from "react";
import {render} from "@testing-library/react";

import View from "../view";

describe("View", () => {
    it("Should set the tag to be section", () => {
        // Arrage, Act
        const view = <View tag="section" />;
        const {container} = render(view);

        const section = container.querySelector("section");

        // Assert
        expect(container).toMatchSnapshot();
        expect(section).toBeDefined();
    });

    it("Should set the tag to be article", () => {
        // Arrage, Act
        const view = <View tag="article" />;
        const {container} = render(view);

        const article = container.querySelector("article");

        // Assert
        expect(container).toMatchSnapshot();
        expect(article).toBeDefined();
    });

    it("Should set the tag to be aside", () => {
        // Arrage, Act
        const view = <View tag="aside" />;
        const {container} = render(view);

        const aside = container.querySelector("aside");

        // Assert
        expect(container).toMatchSnapshot();
        expect(aside).toBeDefined();
    });

    it("Should set the tag to be nav", () => {
        // Arrage, Act
        const view = <View tag="nav" />;
        const {container} = render(view);

        const nav = container.querySelector("nav");

        // Assert
        expect(container).toMatchSnapshot();
        expect(nav).toBeDefined();
    });

    it("Should set the tag to be main", () => {
        // Arrage, Act
        const view = <View tag="main" />;
        const {container} = render(view);

        const main = container.querySelector("main");

        // Assert
        expect(container).toMatchSnapshot();
        expect(main).toBeDefined();
    });

    it("Should set the tag to be div", () => {
        // Arrage, Act
        const view = <View />;
        const {container} = render(view);

        const div = container.querySelector("div");

        // Assert
        expect(container).toMatchSnapshot();
        expect(div).toBeDefined();
    });
});
