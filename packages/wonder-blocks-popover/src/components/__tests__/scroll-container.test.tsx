import * as React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";

import ScrollContainer from "../scroll-container";

/**
 * Mocks the element's scroll and client heights so it looks like its content
 * overflows (or not).
 */
const mockOverflow = (element: HTMLElement, overflowing: boolean) => {
    jest.spyOn(element, "clientHeight", "get").mockReturnValue(100);
    jest.spyOn(element, "scrollHeight", "get").mockReturnValue(
        overflowing ? 200 : 100,
    );
};

/**
 * Returns the opacity custom properties of both fades.
 */
const getFadeOpacities = (element: HTMLElement) => ({
    top: element.style.getPropertyValue(
        "--wb-scroll-container-fade-top-opacity",
    ),
    bottom: element.style.getPropertyValue(
        "--wb-scroll-container-fade-bottom-opacity",
    ),
});

describe("ScrollContainer", () => {
    let resizeCallback: ResizeObserverCallback | undefined;

    beforeEach(() => {
        resizeCallback = undefined;
        window.ResizeObserver = jest.fn().mockImplementation((callback) => {
            resizeCallback = callback;
            return {
                observe: jest.fn(),
                unobserve: jest.fn(),
                disconnect: jest.fn(),
            };
        });
    });

    afterEach(() => {
        // @ts-expect-error: ResizeObserver is not available in jsdom
        delete window.ResizeObserver;
    });

    /**
     * Simulates a resize of the observed elements.
     */
    const triggerResize = () => {
        act(() => {
            resizeCallback?.([], {} as ResizeObserver);
        });
    };

    it("should render its children", () => {
        // Arrange
        render(
            <ScrollContainer>
                <span>Some content</span>
            </ScrollContainer>,
        );

        // Act
        const content = screen.getByText("Some content");

        // Assert
        expect(content).toBeInTheDocument();
    });

    it("should not be focusable when the content doesn't overflow", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, false);

        // Act
        triggerResize();

        // Assert
        expect(scrollContainer).not.toHaveAttribute("tabindex");
    });

    it("should be focusable when the content overflows", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, true);

        // Act
        triggerResize();

        // Assert
        expect(scrollContainer).toHaveAttribute("tabindex", "0");
    });

    it("should stop being focusable when the content stops overflowing", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, true);
        triggerResize();
        mockOverflow(scrollContainer, false);

        // Act
        triggerResize();

        // Assert
        expect(scrollContainer).not.toHaveAttribute("tabindex");
    });

    it("should hide both fades when the content doesn't overflow", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, false);

        // Act
        triggerResize();

        // Assert
        expect(getFadeOpacities(scrollContainer)).toEqual({
            top: "0",
            bottom: "0",
        });
    });

    it("should only show the bottom fade when scrolled to the top", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, true);

        // Act
        triggerResize();

        // Assert
        expect(getFadeOpacities(scrollContainer)).toEqual({
            top: "0",
            bottom: "1",
        });
    });

    it("should show both fades when scrolled to the middle", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, true);
        triggerResize();
        jest.spyOn(scrollContainer, "scrollTop", "get").mockReturnValue(50);

        // Act
        fireEvent.scroll(scrollContainer);

        // Assert
        expect(getFadeOpacities(scrollContainer)).toEqual({
            top: "1",
            bottom: "1",
        });
    });

    it("should only show the top fade when scrolled to the bottom", () => {
        // Arrange
        render(
            <ScrollContainer testId="scroll-container">
                <span>Some content</span>
            </ScrollContainer>,
        );
        const scrollContainer = screen.getByTestId("scroll-container");
        mockOverflow(scrollContainer, true);
        triggerResize();
        jest.spyOn(scrollContainer, "scrollTop", "get").mockReturnValue(100);

        // Act
        fireEvent.scroll(scrollContainer);

        // Assert
        expect(getFadeOpacities(scrollContainer)).toEqual({
            top: "1",
            bottom: "0",
        });
    });
});
