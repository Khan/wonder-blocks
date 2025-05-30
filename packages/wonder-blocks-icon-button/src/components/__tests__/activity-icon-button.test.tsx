import * as React from "react";
import {render, screen} from "@testing-library/react";

import magnifyingGlassIcon from "@phosphor-icons/core/regular/magnifying-glass.svg";

import {ActivityIconButton} from "../activity-icon-button";

/**
 * Tests specific to the `ActivityIconButton` component.
 *
 * For shared tests, see `icon-button-types.test.tsx`.
 */
describe("ActivityIconButton", () => {
    it("should use label to describe the button contents", async () => {
        // Arrange
        render(
            <ActivityIconButton
                label="Search"
                icon={magnifyingGlassIcon}
                onClick={() => {}}
            />,
        );

        // Act
        const button = screen.getByRole("button", {name: "Search"});

        // Assert
        expect(button).toBeInTheDocument();
    });
});
