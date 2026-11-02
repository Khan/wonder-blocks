/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render} from "@testing-library/react";

import CircularSpinner from "../circular-spinner";

describe("data-wb-component", () => {
    it("should set the CircularSpinner name on the root element", () => {
        // Arrange
        const {container} = render(<CircularSpinner />);

        // Act
        // NOTE: The root element doesn't expose a role or a test id (the
        // test id is applied to the svg).
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "CircularSpinner");
    });
});
