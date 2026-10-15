import * as React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";

import ScrollableView from "../scrollable-view";

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
        "--wb-scrollable-view-fade-top-opacity",
    ),
    bottom: element.style.getPropertyValue(
        "--wb-scrollable-view-fade-bottom-opacity",
    ),
});

describe("ScrollableView", () => {
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
            <ScrollableView>
                <span>Some content</span>
            </ScrollableView>,
        );

        // Act
        const content = screen.getByText("Some content");

        // Assert
        expect(content).toBeInTheDocument();
    });

    it("should not be focusable when the content doesn't overflow", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, false);

        // Act
        triggerResize();

        // Assert
        expect(scrollableView).not.toHaveAttribute("tabindex");
    });

    it("should be focusable when the content overflows", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, true);

        // Act
        triggerResize();

        // Assert
        expect(scrollableView).toHaveAttribute("tabindex", "0");
    });

    it("should stop being focusable when the content stops overflowing", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, true);
        triggerResize();
        mockOverflow(scrollableView, false);

        // Act
        triggerResize();

        // Assert
        expect(scrollableView).not.toHaveAttribute("tabindex");
    });

    it("should hide both fades when the content doesn't overflow", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, false);

        // Act
        triggerResize();

        // Assert
        expect(getFadeOpacities(scrollableView)).toEqual({
            top: "0",
            bottom: "0",
        });
    });

    it("should only show the bottom fade when scrolled to the top", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, true);

        // Act
        triggerResize();

        // Assert
        expect(getFadeOpacities(scrollableView)).toEqual({
            top: "0",
            bottom: "1",
        });
    });

    it("should show both fades when scrolled to the middle", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, true);
        triggerResize();
        jest.spyOn(scrollableView, "scrollTop", "get").mockReturnValue(50);

        // Act
        fireEvent.scroll(scrollableView);

        // Assert
        expect(getFadeOpacities(scrollableView)).toEqual({
            top: "1",
            bottom: "1",
        });
    });

    it("should only show the top fade when scrolled to the bottom", () => {
        // Arrange
        render(
            <ScrollableView testId="scrollable-view">
                <span>Some content</span>
            </ScrollableView>,
        );
        const scrollableView = screen.getByTestId("scrollable-view");
        mockOverflow(scrollableView, true);
        triggerResize();
        jest.spyOn(scrollableView, "scrollTop", "get").mockReturnValue(100);

        // Act
        fireEvent.scroll(scrollableView);

        // Assert
        expect(getFadeOpacities(scrollableView)).toEqual({
            top: "1",
            bottom: "0",
        });
    });
    it("should forward the ref to the scrollable element", () => {
        // Arrange
        const ref = React.createRef<HTMLElement>();

        // Act
        render(
            <ScrollableView testId="scrollable-view" ref={ref}>
                <span>Some content</span>
            </ScrollableView>,
        );

        // Assert
        expect(ref.current).toBe(screen.getByTestId("scrollable-view"));
    });

    it("should apply the ARIA props to the scrollable element", () => {
        // Arrange
        render(
            <ScrollableView aria-label="Terms and conditions">
                <span>Some content</span>
            </ScrollableView>,
        );

        // Act
        const scrollableView = screen.getByLabelText("Terms and conditions");

        // Assert
        expect(scrollableView).toContainElement(
            screen.getByText("Some content"),
        );
    });
    it("should be exposed as a region when it's labeled", () => {
        // Arrange
        render(
            <ScrollableView aria-label="Terms and conditions">
                <span>Some content</span>
            </ScrollableView>,
        );

        // Act
        const region = screen.getByRole("region", {
            name: "Terms and conditions",
        });

        // Assert
        expect(region).toBeInTheDocument();
    });

    it("should not be exposed as a region when it isn't labeled", () => {
        // Arrange
        render(
            <ScrollableView>
                <span>Some content</span>
            </ScrollableView>,
        );

        // Act
        const region = screen.queryByRole("region");

        // Assert
        expect(region).not.toBeInTheDocument();
    });
});
