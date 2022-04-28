// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import * as Portal from "../portal.js";

describe("Portal.adapter", () => {
    it("should render a portal root element", () => {
        // Arrange
        const children = <div>CHILDREN!</div>;
        const portalId = "portal-test-id";

        // Act
        render(Portal.adapter(children, portalId));

        // Assert
        expect(screen.getByTestId(portalId)).toBeInTheDocument();
    });

    it("should render the children correctly", () => {
        // Arrange
        const portalId = "portal-test-id";
        const children = <div>CHILDREN!</div>;

        // Act
        render(Portal.adapter(children, portalId));

        // Assert
        expect(screen.getByText("CHILDREN!")).toBeInTheDocument();
    });
});
