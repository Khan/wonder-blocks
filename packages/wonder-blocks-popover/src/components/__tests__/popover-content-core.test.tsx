import * as React from "react";
import {act, render, screen} from "@testing-library/react";

import PopoverContentCore from "../popover-content-core";

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
 * Returns the scroll container that wraps the content element.
 */
const getScrollContainer = () =>
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByTestId("content").parentElement as HTMLElement;

describe("PopoverContentCore", () => {
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

    it("should not make the scroll container focusable when it doesn't overflow", () => {
        // Arrange
        render(
            <PopoverContentCore testId="content">
                <span>Some content</span>
            </PopoverContentCore>,
        );
        const scrollContainer = getScrollContainer();
        mockOverflow(scrollContainer, false);

        // Act
        triggerResize();

        // Assert
        expect(scrollContainer).not.toHaveAttribute("tabindex");
    });

    it("should make the scroll container focusable when it overflows", () => {
        // Arrange
        render(
            <PopoverContentCore testId="content">
                <span>Some content</span>
            </PopoverContentCore>,
        );
        const scrollContainer = getScrollContainer();
        mockOverflow(scrollContainer, true);

        // Act
        triggerResize();

        // Assert
        expect(scrollContainer).toHaveAttribute("tabindex", "0");
    });

    it("should make the scroll container not focusable when it stops overflowing", () => {
        // Arrange
        render(
            <PopoverContentCore testId="content">
                <span>Some content</span>
            </PopoverContentCore>,
        );
        const scrollContainer = getScrollContainer();
        mockOverflow(scrollContainer, true);
        triggerResize();
        mockOverflow(scrollContainer, false);

        // Act
        triggerResize();

        // Assert
        expect(scrollContainer).not.toHaveAttribute("tabindex");
    });

    it("should render the close button inside of the scroll container", () => {
        // Arrange
        render(
            <PopoverContentCore testId="content" closeButtonVisible={true}>
                <span>Some content</span>
            </PopoverContentCore>,
        );

        // Act
        const closeButton = screen.getByRole("button");

        // Assert
        expect(getScrollContainer()).toContainElement(closeButton);
    });

    it("should forward the ref to the content element", () => {
        // Arrange
        const ref = React.createRef<HTMLElement>();

        // Act
        render(
            <PopoverContentCore testId="content" ref={ref}>
                <span>Some content</span>
            </PopoverContentCore>,
        );

        // Assert
        expect(ref.current).toBe(screen.getByTestId("content"));
    });
});
