// @flow
import * as React from "react";
import {render, screen} from "@testing-library/react";

import CellCore from "../cell-core.js";

describe("CellCore", () => {
    it("should render the CellCore component", () => {
        // Arrange

        // Act
        render(
            <CellCore>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.getByText("cell core content")).toBeInTheDocument();
    });

    it("should NOT add a button by default", () => {
        // Arrange

        // Act
        render(
            <CellCore>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should add a button if onClick is set", () => {
        // Arrange

        // Act
        render(
            <CellCore onClick={jest.fn()}>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should add aria-label to the button", () => {
        // Arrange

        // Act
        render(
            <CellCore onClick={jest.fn()} aria-label="some description">
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "some description"}),
        ).toBeInTheDocument();
    });

    it("should add aria-disabled if disabled is set", () => {
        // Arrange

        // Act
        render(
            <CellCore onClick={jest.fn()} disabled={true}>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("should add aria-current if active is set", () => {
        // Arrange

        // Act
        const {container} = render(
            <CellCore active={true}>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        // Verify that the root element has the aria-current attribute
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.firstChild).toHaveAttribute("aria-current", "true");
    });
});
