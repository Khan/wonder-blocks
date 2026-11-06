import * as React from "react";
import {render, screen} from "@testing-library/react";

import Link from "../link";

describe("data-wb-component", () => {
    it("should set the Link name on the root element", () => {
        // Arrange
        render(<Link href="/foo">Profile</Link>);

        // Act
        const root = screen.getByRole("link");

        // Assert
        expect(root).toHaveAttribute("data-wb-component", "Link");
    });
});
