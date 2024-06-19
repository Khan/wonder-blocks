import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";

import DropdownPopper from "../dropdown-popper";
import {maxHeightModifier} from "../../util/popper-max-height-modifier";

describe("DropdownPopper", () => {
    it("renders the children if valid props are passed in", () => {
        // Arrange
        const referenceElement = document.createElement("button");

        // Act
        render(
            <DropdownPopper referenceElement={referenceElement}>
                {() => (
                    <div data-testid="dropdown-container">
                        dropdown container
                    </div>
                )}
            </DropdownPopper>,
        );

        // Assert
        expect(screen.getByTestId("dropdown-container")).toBeInTheDocument();
    });

    it("renders the dropdown aligned to the right", () => {
        // Arrange
        const referenceElement = document.createElement("button");

        // Act
        render(
            <DropdownPopper
                referenceElement={referenceElement}
                alignment="right"
            >
                {() => (
                    <div data-testid="dropdown-container">
                        dropdown container
                    </div>
                )}
            </DropdownPopper>,
        );

        // Assert
        expect(screen.getByTestId("dropdown-popper")).toHaveAttribute(
            "data-placement",
            "bottom-end",
        );
    });

    it("applies a max-height style", async () => {
        // Arrange
        const referenceElement = document.createElement("button");
        jest.spyOn(maxHeightModifier, "fn").mockImplementation(({state}) => {
            state.styles.popper = {
                ...state.styles.popper,
                maxHeight: "500px",
            };
        });

        // Act
        render(
            <DropdownPopper referenceElement={referenceElement}>
                {() => (
                    <div data-testid="dropdown-container">
                        dropdown container
                    </div>
                )}
            </DropdownPopper>,
        );

        // Assert
        await waitFor(() =>
            expect(screen.getByTestId("dropdown-popper")).toHaveStyle(
                "max-height: 500px",
            ),
        );
    });
});
