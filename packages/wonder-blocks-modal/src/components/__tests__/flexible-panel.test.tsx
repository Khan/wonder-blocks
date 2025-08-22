import * as React from "react";
import {render, screen} from "@testing-library/react";

import FlexiblePanel from "../flexible-panel";
import theme from "../../theme";

describe("FlexiblePanel", () => {
    it("renders close button on the right side in LTR mode", () => {
        // Arrange
        render(
            <FlexiblePanel
                content={<div>Test content</div>}
                closeButtonVisible={true}
                testId="test-panel"
            />,
        );

        // Act
        const closeButton = screen.getByTestId("test-panel-close");

        // Assert
        expect(closeButton).toHaveStyle({
            right: theme.closeButton.layout.gapRight,
            left: "unset",
        });
    });

    it("renders close button on the left side in RTL mode", () => {
        // Arrange
        render(
            <div dir="rtl">
                <FlexiblePanel
                    content={<div>Test content</div>}
                    closeButtonVisible={true}
                    testId="test-panel"
                />
            </div>,
        );

        // Act
        const closeButton = screen.getByTestId("test-panel-close");

        // Assert
        expect(closeButton).toHaveStyle({
            left: theme.closeButton.layout.gapRight,
            right: "unset",
        });
    });

    it("updates close button position when writing mode changes", async () => {
        // Arrange
        render(
            <div data-testid="parent" dir="ltr">
                <FlexiblePanel
                    content={<div>Test content</div>}
                    closeButtonVisible={true}
                    testId="test-panel"
                />
            </div>,
        );

        const closeButton = screen.getByTestId("test-panel-close");
        const parentDiv = screen.getByTestId("parent");

        // Initial LTR state
        expect(closeButton).toHaveStyle({
            right: theme.closeButton.layout.gapRight,
            left: "unset",
        });

        // Act - Change to RTL
        parentDiv.setAttribute("dir", "rtl");

        // Assert - Button should move to left side
        expect(closeButton).toHaveStyle({
            left: theme.closeButton.layout.gapRight,
            right: "unset",
        });

        // Act - Change back to LTR
        parentDiv.setAttribute("dir", "ltr");

        // Assert - Button should move back to right side
        expect(closeButton).toHaveStyle({
            right: theme.closeButton.layout.gapRight,
            left: "unset",
        });
    });

    it("responds to writing mode changes in ancestor elements", () => {
        // Arrange
        render(
            <div data-testid="grandparent">
                <div data-testid="parent">
                    <FlexiblePanel
                        content={<div>Test content</div>}
                        closeButtonVisible={true}
                        testId="test-panel"
                    />
                </div>
            </div>,
        );

        const closeButton = screen.getByTestId("test-panel-close");
        const grandparent = screen.getByTestId("grandparent");

        // Initial LTR state
        expect(closeButton).toHaveStyle({
            right: theme.closeButton.layout.gapRight,
            left: "unset",
        });

        // Act - Set RTL on grandparent
        grandparent.setAttribute("dir", "rtl");

        // Assert - Button should move to left side
        expect(closeButton).toHaveStyle({
            left: theme.closeButton.layout.gapRight,
            right: "unset",
        });
    });

    it("handles removal of dir attribute", () => {
        // Arrange
        render(
            <div data-testid="parent" dir="rtl">
                <FlexiblePanel
                    content={<div>Test content</div>}
                    closeButtonVisible={true}
                    testId="test-panel"
                />
            </div>,
        );

        const closeButton = screen.getByTestId("test-panel-close");
        const parentDiv = screen.getByTestId("parent");

        // Initial RTL state
        expect(closeButton).toHaveStyle({
            left: theme.closeButton.layout.gapRight,
            right: "unset",
        });

        // Act - Remove dir attribute
        parentDiv.removeAttribute("dir");

        // Assert - Should default to LTR
        expect(closeButton).toHaveStyle({
            right: theme.closeButton.layout.gapRight,
            left: "unset",
        });
    });
});
