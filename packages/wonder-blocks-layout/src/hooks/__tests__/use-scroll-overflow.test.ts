import {act, fireEvent, renderHook, waitFor} from "@testing-library/react";

import {useScrollOverflow} from "../use-scroll-overflow";

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

const mockOverflow = (element: HTMLElement, overflowing: boolean) =>
    mockHeights(element, {
        clientHeight: 100,
        scrollHeight: overflowing ? 200 : 100,
    });

const mockHeights = (
    element: HTMLElement,
    {clientHeight, scrollHeight}: {clientHeight: number; scrollHeight: number},
) => {
    jest.spyOn(element, "clientHeight", "get").mockReturnValue(clientHeight);
    jest.spyOn(element, "scrollHeight", "get").mockReturnValue(scrollHeight);
};

/**
 * Simulates the user scrolling the element to the given position.
 */
const scrollTo = (element: HTMLElement, scrollTop: number) => {
    jest.spyOn(element, "scrollTop", "get").mockReturnValue(scrollTop);
    fireEvent.scroll(element);
};

describe("useScrollOverflow", () => {
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

    it("should report the overflow right away, before any resize is observed", () => {
        // Arrange
        const ref = {current: createElement({overflowing: true})};

        // Act
        const {result} = renderHook(() => useScrollOverflow(ref.current));

        // Assert
        expect(result.current).toEqual({
            isOverflowingVertically: true,
            hasContentAbove: false,
            hasContentBelow: true,
        });
    });

    it("should report content below when the content overflows and is scrolled to the top", () => {
        // Arrange
        const ref = {current: createElement({overflowing: true})};
        const {result} = renderHook(() => useScrollOverflow(ref.current));

        // Act
        triggerResize();

        // Assert
        expect(result.current).toEqual({
            isOverflowingVertically: true,
            hasContentAbove: false,
            hasContentBelow: true,
        });
    });

    it("should report content above and below when scrolled to the middle", () => {
        // Arrange
        const element = createElement({overflowing: true});
        const ref = {current: element};
        const {result} = renderHook(() => useScrollOverflow(ref.current));
        triggerResize();

        // Act
        act(() => scrollTo(element, 50));

        // Assert
        expect(result.current).toEqual({
            isOverflowingVertically: true,
            hasContentAbove: true,
            hasContentBelow: true,
        });
    });

    it("should report content above when scrolled to the bottom", () => {
        // Arrange
        const element = createElement({overflowing: true});
        const ref = {current: element};
        const {result} = renderHook(() => useScrollOverflow(ref.current));
        triggerResize();

        // Act
        act(() => scrollTo(element, 100));

        // Assert
        expect(result.current).toEqual({
            isOverflowingVertically: true,
            hasContentAbove: true,
            hasContentBelow: false,
        });
    });

    it("should not report any overflow when the content doesn't overflow", () => {
        // Arrange
        const ref = {current: createElement({overflowing: false})};
        const {result} = renderHook(() => useScrollOverflow(ref.current));

        // Act
        triggerResize();

        // Assert
        expect(result.current).toEqual({
            isOverflowingVertically: false,
            hasContentAbove: false,
            hasContentBelow: false,
        });
    });

    it("should stop reporting overflow when the content stops overflowing", () => {
        // Arrange
        const element = createElement({overflowing: true});
        const ref = {current: element};
        const {result} = renderHook(() => useScrollOverflow(ref.current));
        triggerResize();
        mockOverflow(element, false);

        // Act
        triggerResize();

        // Assert
        expect(result.current.isOverflowingVertically).toBe(false);
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
        renderHook(() => useScrollOverflow(ref.current));

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
        const {unmount} = renderHook(() => useScrollOverflow(ref.current));

        // Act
        unmount();

        // Assert
        expect(disconnect).toHaveBeenCalled();
    });

    it("should stop listening to scroll events on unmount", () => {
        // Arrange
        const element = createElement({overflowing: true});
        const removeEventListenerSpy = jest.spyOn(
            element,
            "removeEventListener",
        );
        const ref = {current: element};
        const {unmount} = renderHook(() => useScrollOverflow(ref.current));

        // Act
        unmount();

        // Assert
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            "scroll",
            expect.any(Function),
        );
    });

    it("should not report any overflow when the ref is not attached", () => {
        // Arrange
        const ref = {current: null};

        // Act
        const {result} = renderHook(() => useScrollOverflow(ref.current));

        // Assert
        expect(result.current.isOverflowingVertically).toBe(false);
    });

    it("should not report any overflow when ResizeObserver is not available", () => {
        // Arrange
        // @ts-expect-error: simulating an environment without ResizeObserver
        delete window.ResizeObserver;
        const ref = {current: createElement({overflowing: true})};

        // Act
        const {result} = renderHook(() => useScrollOverflow(ref.current));

        // Assert
        expect(result.current.isOverflowingVertically).toBe(false);
    });
    it("should not treat a 1px difference (subpixel rounding) as overflow", () => {
        // Arrange
        const element = createElement({overflowing: false});
        mockHeights(element, {clientHeight: 100, scrollHeight: 101});

        // Act
        const {result} = renderHook(() => useScrollOverflow(element));

        // Assert
        expect(result.current.isOverflowingVertically).toBe(false);
    });

    it("should report overflow when children are added later", async () => {
        // Arrange
        const element = createElement({overflowing: false});
        const {result} = renderHook(() => useScrollOverflow(element));
        mockOverflow(element, true);

        // Act
        act(() => {
            element.append(document.createElement("span"));
        });

        // Assert
        await waitFor(() => {
            expect(result.current.isOverflowingVertically).toBe(true);
        });
    });

    it("should observe children that are added later", async () => {
        // Arrange
        const element = createElement({overflowing: false});
        renderHook(() => useScrollOverflow(element));
        const child = document.createElement("span");

        // Act
        act(() => {
            element.append(child);
        });

        // Assert
        await waitFor(() => {
            expect(observe).toHaveBeenCalledWith(child);
        });
    });

    it("should track the new element when the element changes", () => {
        // Arrange
        const first = createElement({overflowing: false});
        const second = createElement({overflowing: true});
        const {result, rerender} = renderHook(
            ({element}) => useScrollOverflow(element),
            {initialProps: {element: first}},
        );

        // Act
        rerender({element: second});

        // Assert
        expect(result.current.isOverflowingVertically).toBe(true);
    });
});
