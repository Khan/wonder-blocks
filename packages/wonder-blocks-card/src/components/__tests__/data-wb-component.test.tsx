import * as React from "react";
import {render, screen} from "@testing-library/react";

import Card from "../card";

describe("data-wb-component", () => {
    it("should set the Card name on the root element", () => {
        // Arrange
        render(<Card testId="root">Content</Card>);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Card");
    });
});
