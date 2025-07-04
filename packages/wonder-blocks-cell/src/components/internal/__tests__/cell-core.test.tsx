import * as React from "react";
import {render, screen} from "@testing-library/react";

import CellCore from "../cell-core";

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

    it("should add an anchor if href is set", () => {
        // Arrange

        // Act
        render(
            <CellCore href="/math">
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.getByRole("link")).toHaveAttribute("href", "/math");
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

    it("should allow passing a role", () => {
        // Arrange

        // Act
        render(
            <CellCore onClick={jest.fn()} role="menuitem">
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(
            screen.getByRole("menuitem", {name: "cell core content"}),
        ).toBeInTheDocument();
    });

    describe("aria-checked", () => {
        it("should add aria-checked if aria-checked is set and it is a link", () => {
            // Arrange

            // Act
            const {container} = render(
                <CellCore aria-checked={true} href="#">
                    <div>cell core content</div>
                </CellCore>,
            );

            // Assert
            // Verify that the root element has the aria-current attribute
            // eslint-disable-next-line testing-library/no-node-access
            expect(container.firstChild).toHaveAttribute(
                "aria-checked",
                "true",
            );
        });

        it("should add aria-checked if aria-checked is set and it has an onClick handler", () => {
            // Arrange

            // Act
            const {container} = render(
                <CellCore aria-checked={true} onClick={jest.fn()}>
                    <div>cell core content</div>
                </CellCore>,
            );

            // Assert
            // Verify that the root element has the aria-current attribute
            // eslint-disable-next-line testing-library/no-node-access
            expect(container.firstChild).toHaveAttribute(
                "aria-checked",
                "true",
            );
        });

        it("should not add aria-checked if it is not clickable", () => {
            // Arrange

            // Act
            const {container} = render(
                <CellCore aria-checked={true}>
                    <div>cell core content</div>
                </CellCore>,
            );

            // Assert
            // Verify that the root element has the aria-current attribute
            // eslint-disable-next-line testing-library/no-node-access
            expect(container.firstChild).not.toHaveAttribute("aria-checked");
        });
    });
});
