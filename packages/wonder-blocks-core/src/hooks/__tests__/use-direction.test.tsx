import {renderHook} from "@testing-library/react";

import {useDirection, useIsRtl} from "../use-direction";

describe("useDirection", () => {
    afterEach(() => {
        document.documentElement.removeAttribute("dir");
    });

    it("should return default direction when the ref is null", () => {
        // Arrange
        const ref = {current: null};

        // Act
        const {result} = renderHook(() => useDirection(ref));

        // Assert
        expect(result.current).toBe("ltr");
    });

    it("should detect rtl direction from the ref's element", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "rtl");
        const ref = {current: element};

        // Act
        const {result} = renderHook(() => useDirection(ref));

        // Assert
        expect(result.current).toBe("rtl");
    });

    it("should resolve document-level direction when no ref is passed", () => {
        // Arrange
        document.documentElement.setAttribute("dir", "rtl");

        // Act
        const {result} = renderHook(() => useDirection());

        // Assert
        expect(result.current).toBe("rtl");
    });

    it("should update direction when the ref's element changes between renders", () => {
        // Arrange
        const ltrElement = document.createElement("div");
        const rtlElement = document.createElement("div");
        rtlElement.setAttribute("dir", "rtl");
        const {result, rerender} = renderHook(
            ({element}) => useDirection({current: element}),
            {initialProps: {element: ltrElement as HTMLElement | null}},
        );

        // Act
        rerender({element: rtlElement});

        // Assert
        expect(result.current).toBe("rtl");
    });
});

describe("useIsRtl", () => {
    afterEach(() => {
        document.documentElement.removeAttribute("dir");
    });

    it("should return true when the resolved direction is rtl", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "rtl");
        const ref = {current: element};

        // Act
        const {result} = renderHook(() => useIsRtl(ref));

        // Assert
        expect(result.current).toBe(true);
    });

    it("should return false when the resolved direction is ltr", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "ltr");
        const ref = {current: element};

        // Act
        const {result} = renderHook(() => useIsRtl(ref));

        // Assert
        expect(result.current).toBe(false);
    });
});
