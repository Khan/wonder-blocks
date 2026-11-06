/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render} from "@testing-library/react";

import Toolbar from "../toolbar";

describe("data-wb-component", () => {
    it("should set the Toolbar name on the root element", () => {
        // Arrange
        const {container} = render(<Toolbar title="Title" />);

        // Act
        // NOTE: The root element doesn't expose a role or a test id.
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Toolbar");
    });
});
