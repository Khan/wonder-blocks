import {act, renderHook} from "@testing-library/react";

import {useIsOverflowing} from "../use-is-overflowing";

/**
 * Creates an element whose scroll and client heights are mocked so it looks
 * like its content overflows (or not).
 */
const createElement = ({
    overflowing,
    children = [],
}: {
    overflowing: boolean;
    children?: Array<HTMLElement>;
}) => {
    const element = document.createElement("div");
    element.append(...children);
    mockOverflow(element, overflowing);
    return element;
};

const mockOverflow = (element: HTMLElement, overflowing: boolean) => {
    jest.spyOn(element, "clientHeight", "get").mockReturnValue(100);
    jest.spyOn(element, "scrollHeight", "get").mockReturnValue(
        overflowing ? 200 : 100,
    );
};

describe("useIsOverflowing", () => {
    let resizeCallback: ResizeObserverCallback | undefined;
    const observe = jest.fn();
    const disconnect = jest.fn();

    beforeEach(() => {
        resizeCallback = undefined;
        observe.mockClear();
        disconnect.mockClear();
        window.ResizeObserver = jest.fn().mockImplementation((callback) => {
            resizeCallback = callback;
            return {observe, unobserve: jest.fn(), disconnect};
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

    it("should return false before any resize is observed", () => {
        // Arrange
        const ref = {current: createElement({overflowing: true})};

        // Act
        const {result} = renderHook(() => useIsOverflowing(ref));

        // Assert
        expect(result.current).toBe(false);
    });

    it("should return true when the content overflows", () => {
        // Arrange
        const ref = {current: createElement({overflowing: true})};
        const {result} = renderHook(() => useIsOverflowing(ref));

        // Act
        triggerResize();

        // Assert
        expect(result.current).toBe(true);
    });

    it("should return false when the content doesn't overflow", () => {
        // Arrange
        const ref = {current: createElement({overflowing: false})};
        const {result} = renderHook(() => useIsOverflowing(ref));

        // Act
        triggerResize();

        // Assert
        expect(result.current).toBe(false);
    });

    it("should return false when the content stops overflowing", () => {
        // Arrange
        const element = createElement({overflowing: true});
        const ref = {current: element};
        const {result} = renderHook(() => useIsOverflowing(ref));
        triggerResize();
        mockOverflow(element, false);

        // Act
        triggerResize();

        // Assert
        expect(result.current).toBe(false);
    });

    it("should observe the element and its children", () => {
        // Arrange
        const firstChild = document.createElement("span");
        const secondChild = document.createElement("span");
        const element = createElement({
            overflowing: false,
            children: [firstChild, secondChild],
        });
        const ref = {current: element};

        // Act
        renderHook(() => useIsOverflowing(ref));

        // Assert
        expect(observe.mock.calls).toEqual([
            [element],
            [firstChild],
            [secondChild],
        ]);
    });

    it("should disconnect the observer on unmount", () => {
        // Arrange
        const ref = {current: createElement({overflowing: false})};
        const {unmount} = renderHook(() => useIsOverflowing(ref));

        // Act
        unmount();

        // Assert
        expect(disconnect).toHaveBeenCalled();
    });

    it("should return false when the ref is not attached", () => {
        // Arrange
        const ref = {current: null};

        // Act
        const {result} = renderHook(() => useIsOverflowing(ref));

        // Assert
        expect(result.current).toBe(false);
    });

    it("should return false when ResizeObserver is not available", () => {
        // Arrange
        // @ts-expect-error: simulating an environment without ResizeObserver
        delete window.ResizeObserver;
        const ref = {current: createElement({overflowing: true})};

        // Act
        const {result} = renderHook(() => useIsOverflowing(ref));

        // Assert
        expect(result.current).toBe(false);
    });
});
