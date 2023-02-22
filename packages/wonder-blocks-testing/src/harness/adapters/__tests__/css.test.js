// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import * as Css from "../css";

describe("Css.adapter", () => {
    it("should throw if the config is invalid", () => {
        // Arrange
        const badConfig: any = 42;

        // Act
        const underTest = () => Css.adapter("CHILDREN", badConfig);

        // Assert
        expect(underTest).toThrowErrorMatchingInlineSnapshot(
            `"Invalid config: 42"`,
        );
    });

    it("should render the children", () => {
        // Arrange
        const children = <div data-test-id="children">CHILDREN!</div>;

        // Act
        render(Css.adapter(children, "test"));
        const result = screen.getByTestId("children");

        // Assert
        expect(result).toBeInTheDocument();
    });

    it("should render a container element", () => {
        // Arrange
        const children = <div data-test-id="children">CHILDREN!</div>;

        // Act
        render(Css.adapter(children, "test"));
        const result = screen.getByTestId("css-adapter-container");

        // Assert
        expect(result).toBeInTheDocument();
    });

    it("should render children as a child of the container element", () => {
        // Arrange
        const children = <div data-test-id="children">CHILDREN!</div>;

        // Act
        render(Css.adapter(children, "test"));
        const renderedContainer = screen.getByTestId("css-adapter-container");
        const renderedChildren = screen.getByTestId("children");

        // Assert
        expect(renderedContainer).toContainElement(renderedChildren);
    });

    it.each`
        config                                                              | expectation
        ${"class1"}                                                         | ${"class1"}
        ${["class1", "class2"]}                                             | ${"class1 class2"}
        ${{classes: ["class1", "class2"], style: {backgroundColor: "red"}}} | ${"class1 class2"}
    `(
        "should apply the given class names from $config to the container element",
        ({config, expectation}) => {
            // Arrange
            const children = <div data-test-id="children">CHILDREN!</div>;

            // Act
            render(Css.adapter(children, config));
            const result = screen.getByTestId("css-adapter-container");

            // Assert
            expect(result).toHaveClass(expectation);
        },
    );

    it.each`
        config                                            | expectation
        ${{backgroundColor: "red"}}                       | ${{backgroundColor: "red"}}
        ${{style: {backgroundColor: "red"}, classes: []}} | ${{backgroundColor: "red"}}
    `(
        "should apply the given styles from $config to the container element",
        ({config, expectation}) => {
            // Arrange
            const children = <div data-test-id="children">CHILDREN!</div>;

            // Act
            render(Css.adapter(children, config));
            const result = screen.getByTestId("css-adapter-container");

            // Assert
            expect(result).toHaveStyle(expectation);
        },
    );
});
