import * as React from "react";
import {render, screen} from "@testing-library/react";

import BirthdayPicker from "../birthday-picker";

describe("data-wb-component", () => {
    it("should set the BirthdayPicker name on the root element", () => {
        // Arrange
        render(<BirthdayPicker onChange={() => {}} />);

        // Act
        const root = screen.getByTestId("birthday-picker");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "BirthdayPicker");
    });
});
