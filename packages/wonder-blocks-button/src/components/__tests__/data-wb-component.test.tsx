import * as React from "react";
import {render, screen} from "@testing-library/react";

import Button from "../button";
import {ActivityButton} from "../activity-button";

describe("data-wb-component", () => {
    it.each([
        ["Button", <Button key="1">Label</Button>],
        ["ActivityButton", <ActivityButton key="2">Label</ActivityButton>],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        render(element);

        // Act
        const root = screen.getByRole("button");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });

    it("should set the Button name on the root element when rendered as a link", () => {
        // Arrange
        render(<Button href="/foo">Label</Button>);

        // Act
        const root = screen.getByRole("link");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Button");
    });

    it("should not overwrite the testId", () => {
        // Arrange
        render(<Button testId="custom-id">Label</Button>);

        // Act
        const root = screen.getByRole("button");

        // Assert
        expect(root).toHaveAttribute("data-testid", "custom-id");
    });
});
