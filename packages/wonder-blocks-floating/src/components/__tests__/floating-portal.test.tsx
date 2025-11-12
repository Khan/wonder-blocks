import * as React from "react";
import {render, screen} from "@testing-library/react";

import {Portal} from "../floating-portal";

describe("Portal", () => {
    describe("rendering", () => {
        it("should render children directly when portal is false", () => {
            // Arrange
            render(
                <div data-testid="parent">
                    <Portal portal={false}>
                        <div data-testid="child">Child content</div>
                    </Portal>
                </div>,
            );

            // Act
            const parent = screen.getByTestId("parent");
            const child = screen.getByTestId("child");

            // Assert
            expect(parent).toContainElement(child);
        });

        it("should render children in a portal when portal is true", () => {
            // Arrange
            render(
                <div data-testid="parent">
                    <Portal portal={true}>
                        <div data-testid="child">Child content</div>
                    </Portal>
                </div>,
            );

            // Act
            const parent = screen.getByTestId("parent");
            const child = screen.getByTestId("child");

            // Assert
            // When using FloatingPortal, the child is rendered outside the
            // parent
            expect(parent).not.toContainElement(child);
        });
    });
});
