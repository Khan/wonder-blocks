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

    it("should pass an style to the top node", () => {
        // Arrange

        // Act
        render(
            <CellCore onClick={jest.fn()} rootStyle={{color: "blue"}}>
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        expect(screen.getByRole("button")).toHaveStyle("color: blue");
    });

    it("should pass an style to the content container", () => {
        // Arrange

        // Act
        render(
            <CellCore
                onClick={jest.fn()}
                contentStyle={{alignSelf: "flex-start"}}
            >
                <div>cell core content</div>
            </CellCore>,
        );

        // Assert
        const elem = screen.getByText("cell core content");
        // eslint-disable-next-line testing-library/no-node-access
        expect(elem.parentElement).toHaveStyle("align-self: flex-start");
    });
});
