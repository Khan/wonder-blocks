/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import * as React from "react";
import {render} from "@testing-library/react";

import View from "../view";

describe("View", () => {
    it("Should set the tag to be section", () => {
        // Arrange, Act
        const view = <View tag="section" />;
        const {container} = render(view);

        const section = container.querySelector("section");

        // Assert
        expect(section).toBeInTheDocument();
    });

    it("Should set the tag to be article", () => {
        // Arrange, Act
        const view = <View tag="article" />;
        const {container} = render(view);

        const article = container.querySelector("article");

        // Assert
        expect(article).toBeInTheDocument();
    });

    it("Should set the tag to be aside", () => {
        // Arrange, Act
        const view = <View tag="aside" />;
        const {container} = render(view);

        const aside = container.querySelector("aside");

        // Assert
        expect(aside).toBeInTheDocument();
    });

    it("Should set the tag to be nav", () => {
        // Arrange, Act
        const view = <View tag="nav" />;
        const {container} = render(view);

        const nav = container.querySelector("nav");

        // Assert
        expect(nav).toBeInTheDocument();
    });

    it("Should set the tag to be main", () => {
        // Arrange, Act
        const view = <View tag="main" />;
        const {container} = render(view);

        const main = container.querySelector("main");

        // Assert
        expect(main).toBeInTheDocument();
    });

    it("Should set the tag to be div", () => {
        // Arrange, Act
        const view = <View />;
        const {container} = render(view);

        const div = container.querySelector("div");

        // Assert
        expect(div).toBeInTheDocument();
    });
});
