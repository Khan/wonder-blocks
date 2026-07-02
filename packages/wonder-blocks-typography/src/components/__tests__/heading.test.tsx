import * as React from "react";
import {render, screen} from "@testing-library/react";

import Heading from "../heading";

describe("Heading", () => {
    test("defaults to an h2 element", () => {
        // Arrange
        render(<Heading>This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H2");
    });

    test("accepts a tag prop for an h1-h6 heading", () => {
        // Arrange
        render(<Heading tag="h1">This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H1");
    });

    test("defaults to h1 for size=xxlarge", () => {
        // Arrange
        render(<Heading size="xxlarge">This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H1");
    });

    test("defaults to h2 for size=xlarge", () => {
        // Arrange
        render(<Heading size="xlarge">This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H2");
    });

    test("defaults to h3 for size=large", () => {
        // Arrange
        render(<Heading size="large">This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H3");
    });

    test("defaults to h4 for size=medium", () => {
        // Arrange
        render(<Heading size="medium">This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H4");
    });

    test("defaults to h4 for size=small", () => {
        // Arrange
        render(<Heading size="small">This is a Heading</Heading>);

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H4");
    });

    test("uses the tag prop over a default size", () => {
        // Arrange
        render(
            <Heading size="xlarge" tag="h4">
                This is a Heading
            </Heading>,
        );

        // Act
        const heading = screen.getByRole("heading");

        // Assert
        expect(heading.tagName).toBe("H4");
    });
});
