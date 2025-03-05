import * as React from "react";
import {render, screen} from "@testing-library/react";
import {isFocusable} from "../util";

describe("isFocusable", () => {
    it("should mark a button as focusable", () => {
        // Arrange
        render(<button>Open popover</button>);

        // Act
        const result = isFocusable(screen.getByRole("button"));

        // Assert
        expect(result).toBe(true);
    });

    it("should mark a div as non-focusable", () => {
        // Arrange
        render(<div>placeholder</div>);

        // Act
        const result = isFocusable(screen.getByText("placeholder"));

        // Assert
        expect(result).toBe(false);
    });

    it("should mark a div with tabIndex greater than -1 as focusable", () => {
        // Arrange
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Explicitly testing this case
        render(<div tabIndex={0}>placeholder</div>);

        // Act
        const result = isFocusable(screen.getByText("placeholder"));

        // Assert
        expect(result).toBe(true);
    });
});
