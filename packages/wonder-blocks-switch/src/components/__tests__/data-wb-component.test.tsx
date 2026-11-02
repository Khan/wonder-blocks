import * as React from "react";
import {render, screen} from "@testing-library/react";

import Switch from "../switch";

describe("data-wb-component", () => {
    it("should set the Switch name on the root element", () => {
        // Arrange
        render(
            <Switch
                checked={false}
                onChange={() => {}}
                aria-label="Switch"
                testId="root"
            />,
        );

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Switch");
    });
});
