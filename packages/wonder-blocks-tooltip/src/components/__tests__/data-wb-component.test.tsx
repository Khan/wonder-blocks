/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Tooltip from "../tooltip";
import TooltipContent from "../tooltip-content";
import TooltipTail from "../tooltip-tail";

describe("data-wb-component", () => {
    it("should set the Tooltip name on the tooltip bubble", async () => {
        // Arrange
        render(
            <Tooltip content="Content" opened={true}>
                <button>Anchor</button>
            </Tooltip>,
        );

        // Act
        const tooltip = await screen.findByRole("tooltip");

        // Assert
        expect(tooltip).toHaveAttribute("data-wb-component", "Tooltip");
    });

    it("should set the Tooltip name on the anchor it renders for text", () => {
        // Arrange
        render(<Tooltip content="Content">Anchor</Tooltip>);

        // Act
        const anchor = screen.getByText("Anchor");

        // Assert
        expect(anchor).toHaveAttribute("data-wb-component", "Tooltip");
    });

    it("should not set the name on a custom anchor", () => {
        // Arrange
        render(
            <Tooltip content="Content">
                <button>Anchor</button>
            </Tooltip>,
        );

        // Act
        const anchor = screen.getByRole("button", {name: "Anchor"});

        // Assert
        expect(anchor).not.toHaveAttribute("data-wb-component");
    });

    it("should set the TooltipContent name on the root element", () => {
        // Arrange
        render(<TooltipContent testId="root">Content</TooltipContent>);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "TooltipContent");
    });

    it("should set the TooltipTail name on the root element", () => {
        // Arrange
        const {container} = render(<TooltipTail placement="top" />);

        // Act
        // NOTE: The tail is hidden and doesn't expose a test id.
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "TooltipTail");
    });
});
