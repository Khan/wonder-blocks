import * as React from "react";
import {render, screen} from "@testing-library/react";

import ModalDialog from "../modal-dialog";

describe("ModalDialog", () => {
    it("should render its contents", () => {
        // Arrange

        // Act
        render(
            <ModalDialog aria-labelledby="123">
                <h1 id="123">A modal</h1>
                <p>The contents</p>
            </ModalDialog>,
        );

        // Assert
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("should announce the dialog if aria-labelledby is set", () => {
        // Arrange

        // Act
        render(
            <ModalDialog aria-labelledby="dialog-title">
                <h1 id="dialog-title">A modal</h1>
                <p>The contents</p>
            </ModalDialog>,
        );

        // Assert
        expect(
            screen.getByRole("dialog", {name: "A modal"}),
        ).toBeInTheDocument();
    });

    it("should announce the dialog's contents if aria-describedby is set", () => {
        // Arrange

        // Act
        render(
            <ModalDialog
                aria-labelledby="dialog-title"
                aria-describedby="dialog-body"
            >
                <h1 id="dialog-title">A modal</h1>
                <p id="dialog-body">The contents</p>
            </ModalDialog>,
        );

        // Assert
        expect(
            screen.getByRole("dialog", {description: "The contents"}),
        ).toBeInTheDocument();
    });

    it("adds testId to the dialog element", () => {
        // Arrange

        // Act
        render(
            <ModalDialog aria-labelledby="dialog-title" testId="test-id">
                <h1 id="dialog-title">A modal</h1>
            </ModalDialog>,
        );

        // Assert
        expect(screen.getByTestId("test-id")).toBeInTheDocument();
    });

    it("forwards the ref to the dialog element", () => {
        // Arrange
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        // Act
        render(
            <ModalDialog ref={ref} aria-labelledby="dialog-title">
                <h1 id="dialog-title">A modal</h1>
            </ModalDialog>,
        );

        // Assert
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
