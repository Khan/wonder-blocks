import * as React from "react";
import {render, screen} from "@testing-library/react";

import Text from "../../components/text";
import View from "../../components/view";
import {getWBComponentProps, WB_COMPONENT_ATTRIBUTE} from "../wb-component";

import type {WBComponentProps} from "../wb-component";

describe("getWBComponentProps", () => {
    it("should use the component name when no name is passed down", () => {
        // Arrange
        const props = {};

        // Act
        const result = getWBComponentProps("Button", props);

        // Assert
        expect(result).toEqual({"data-wb-component": "Button"});
    });

    it("should use the component name when props are not provided", () => {
        // Arrange
        const name = "Button";

        // Act
        const result = getWBComponentProps(name);

        // Assert
        expect(result).toEqual({"data-wb-component": "Button"});
    });

    it("should use the name passed down by an outer component", () => {
        // Arrange
        const props = {"data-wb-component": "Heading"};

        // Act
        const result = getWBComponentProps("Text", props);

        // Assert
        expect(result).toEqual({"data-wb-component": "Heading"});
    });

    it("should use the component name when the passed down name is empty", () => {
        // Arrange
        const props = {"data-wb-component": ""};

        // Act
        const result = getWBComponentProps("Text", props);

        // Assert
        expect(result).toEqual({"data-wb-component": "Text"});
    });

    it("should use the data-wb-component attribute name", () => {
        // Arrange
        const expectedAttribute = "data-wb-component";

        // Act
        const result = WB_COMPONENT_ATTRIBUTE;

        // Assert
        expect(result).toBe(expectedAttribute);
    });
});

describe("data-wb-component", () => {
    it.each([
        ["View", View],
        ["Text", Text],
    ])("should set the attribute on %s", (name, Component) => {
        // Arrange
        render(<Component testId="root" />);

        // Act
        const element = screen.getByTestId("root");

        // Assert
        expect(element).toHaveAttribute("data-wb-component", name);
    });

    it.each([
        ["View", View],
        ["Text", Text],
    ])(
        "should let an outer component override the attribute on %s",
        (_, Component) => {
            // Arrange
            render(<Component testId="root" data-wb-component="Outer" />);

            // Act
            const element = screen.getByTestId("root");

            // Assert
            expect(element).toHaveAttribute("data-wb-component", "Outer");
        },
    );

    describe("composition", () => {
        // A component that renders another public component (View) as its
        // root element, and passes its own name down.
        const Outer = (props: WBComponentProps) => (
            <View testId="outer" {...getWBComponentProps("Outer", props)}>
                <View testId="nested" />
            </View>
        );

        // A component that renders `Outer` as its root element.
        const Outermost = () => <Outer {...getWBComponentProps("Outermost")} />;

        it("should use the outer component name on a shared element", () => {
            // Arrange
            render(<Outer />);

            // Act
            const element = screen.getByTestId("outer");

            // Assert
            expect(element).toHaveAttribute("data-wb-component", "Outer");
        });

        it("should use the outermost component name on a shared element", () => {
            // Arrange
            render(<Outermost />);

            // Act
            const element = screen.getByTestId("outer");

            // Assert
            expect(element).toHaveAttribute("data-wb-component", "Outermost");
        });

        it("should keep the name of nested components on their own elements", () => {
            // Arrange
            render(<Outermost />);

            // Act
            const element = screen.getByTestId("nested");

            // Assert
            expect(element).toHaveAttribute("data-wb-component", "View");
        });

        it("should not overwrite the testId", () => {
            // Arrange
            render(<Outermost />);

            // Act
            const element = screen.getByTestId("outer");

            // Assert
            expect(element).toHaveAttribute("data-testid", "outer");
        });
    });
});
