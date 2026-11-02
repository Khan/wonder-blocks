import * as React from "react";
import {render, screen} from "@testing-library/react";

import Banner from "../banner";

describe("data-wb-component", () => {
    it("should set the Banner name on the root element", () => {
        // Arrange
        render(<Banner text="Text" testId="root" />);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Banner");
    });
});
