/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render, screen} from "@testing-library/react";

import ScrollableView from "../scrollable-view";
import Spring from "../spring";
import Strut from "../strut";

describe("data-wb-component", () => {
    it("should set the ScrollableView name on the root element", () => {
        // Arrange
        render(<ScrollableView testId="root">Content</ScrollableView>);

        // Act
        const root = screen.getByTestId("root");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "ScrollableView");
    });

    it.each([
        // eslint-disable-next-line import/no-deprecated
        ["Strut", <Strut key="1" size={8} />],
        ["Spring", <Spring key="2" />],
    ])("should set the %s name on the root element", (name, element) => {
        // Arrange
        const {container} = render(element);

        // Act
        // NOTE: These elements are hidden and don't expose a test id.
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", name);
    });
});
