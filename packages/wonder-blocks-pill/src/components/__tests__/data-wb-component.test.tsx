import * as React from "react";
import {render, screen} from "@testing-library/react";

import Pill from "../pill";

describe("data-wb-component", () => {
    it.each([
        ["static", undefined],
        ["clickable", () => {}],
    ])("should set the Pill name on the root element (%s)", (_, onClick) => {
        // Arrange
        render(
            <Pill testId="root" onClick={onClick}>
                Pill
            </Pill>,
        );

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Pill");
    });
});
