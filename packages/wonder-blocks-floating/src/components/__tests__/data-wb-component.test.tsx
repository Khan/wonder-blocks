import * as React from "react";
import {render, screen} from "@testing-library/react";

import Floating from "../floating";

describe("data-wb-component", () => {
    it("should set the Floating name on the floating element", async () => {
        // Arrange
        render(
            <Floating content="Content" open={true} testId="floating">
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        const floating = await screen.findByTestId("floating");

        // Assert
        expect(floating).toHaveAttribute("data-wb-component", "Floating");
    });

    it("should not set the name on the trigger", () => {
        // Arrange
        render(
            <Floating content="Content" open={false}>
                <button>Trigger</button>
            </Floating>,
        );

        // Act
        const trigger = screen.getByRole("button", {name: "Trigger"});

        // Assert
        expect(trigger).not.toHaveAttribute("data-wb-component");
    });
});
