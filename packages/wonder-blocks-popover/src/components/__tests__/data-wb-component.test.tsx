/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import Popover from "../popover";
import PopoverContent from "../popover-content";
import PopoverContentCore from "../popover-content-core";
import PopoverContext from "../popover-context";

describe("data-wb-component", () => {
    it("should set the Popover name on the popover element", async () => {
        // Arrange
        render(
            <Popover
                opened={true}
                testId="popover"
                content={<PopoverContent title="Title" content="Content" />}
            >
                <button>Anchor</button>
            </Popover>,
        );

        // Act
        const popover = await screen.findByTestId("popover");

        // Assert
        expect(popover).toHaveAttribute("data-wb-component", "Popover");
    });

    it("should not set the name on the anchor", () => {
        // Arrange
        render(
            <Popover
                content={<PopoverContent title="Title" content="Content" />}
            >
                <button>Anchor</button>
            </Popover>,
        );

        // Act
        const anchor = screen.getByRole("button", {name: "Anchor"});

        // Assert
        expect(anchor).not.toHaveAttribute("data-wb-component");
    });

    it.each([
        [
            "PopoverContent",
            <PopoverContext.Provider
                key="1"
                value={{close: () => {}, placement: "top"}}
            >
                <PopoverContent title="Title" content="Content" />
            </PopoverContext.Provider>,
        ],
        [
            "PopoverContentCore",
            <PopoverContentCore key="2">Content</PopoverContentCore>,
        ],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        const {container} = render(element);

        // Act
        // NOTE: The root element doesn't expose a role or a test id (the
        // test id is applied to an inner element).
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
