/* eslint-disable testing-library/no-node-access, testing-library/no-container */
import * as React from "react";
import {render} from "@testing-library/react";

import SearchField from "../search-field";

describe("data-wb-component", () => {
    it("should set the SearchField name on the root element", () => {
        // Arrange
        const {container} = render(
            <SearchField value="" onChange={() => {}} aria-label="Search" />,
        );

        // Act
        // NOTE: The root element doesn't expose a role or a test id (the
        // test id is applied to the input).
        const root = container.firstChild;

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "SearchField");
    });
});
