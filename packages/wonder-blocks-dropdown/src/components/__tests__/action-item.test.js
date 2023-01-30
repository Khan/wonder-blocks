// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import ActionItem from "../action-item.js";

describe("ActionItem", () => {
    it("should render with disabled styles", () => {
        // Arrange

        // Act
        render(<ActionItem href="/foo" label="Example" disabled={true} />);

        // Assert
        expect(screen.getByRole("menuitem")).toBeDisabled();
    });

    it("should render an anchor if there's no router", () => {
        // Arrange

        // Act
        render(<ActionItem href="/foo" label="Example" />);

        // Assert
        // eslint-disable-next-line testing-library/no-node-access
        expect(document.querySelectorAll("a")).toHaveLength(1);
    });

    it("should set the lang attribute if it's passed down", () => {
        // Arrange

        // Act
        render(<ActionItem label="Español" lang="es" />);

        // Assert
        expect(screen.getByText("Español")).toHaveAttribute("lang", "es");
    });
});
