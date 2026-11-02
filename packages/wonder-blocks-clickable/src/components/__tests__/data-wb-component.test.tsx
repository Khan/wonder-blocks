import * as React from "react";
import {render, screen} from "@testing-library/react";

import Clickable from "../clickable";

describe("data-wb-component", () => {
    it.each([
        ["button", undefined, "button"],
        ["link", "/foo", "link"],
    ] as const)(
        "should set the Clickable name on the root element (%s)",
        (_, href, role) => {
            // Arrange
            render(
                <Clickable href={href} onClick={() => {}}>
                    {() => "Label"}
                </Clickable>,
            );

            // Act
            const root = screen.getByRole(role);

            // Assert
            expect(root).toHaveAttribute("data-wb-component", "Clickable");
        },
    );

    it("should use the name passed down by an outer component", () => {
        // Arrange
        render(
            <Clickable onClick={() => {}} data-wb-component="Outer">
                {() => "Label"}
            </Clickable>,
        );

        // Act
        const root = screen.getByRole("button");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Outer");
    });
});
