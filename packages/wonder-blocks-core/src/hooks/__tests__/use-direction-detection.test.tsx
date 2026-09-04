import {renderHook} from "@testing-library/react";

import {useDirectionDetection} from "../use-direction-detection";

describe("useDirectionDetection", () => {
    let mockElement: HTMLDivElement;

    beforeEach(() => {
        // Create a mock element for testing
        mockElement = document.createElement("div");
    });

    afterEach(() => {
        // Reset document dir attribute
        document.documentElement.removeAttribute("dir");
    });

    it("should return default direction when element ref is null", () => {
        // Arrange
        const ref = {current: null};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("ltr");
    });

    it("should return custom default direction when element ref is null", () => {
        // Arrange
        const ref = {current: null};

        // Act
        const {result} = renderHook(() =>
            useDirectionDetection(ref, {defaultDirection: "rtl"}),
        );

        // Assert
        expect(result.current).toBe("rtl");
    });

    it("should detect rtl direction from element's dir attribute", () => {
        // Arrange
        mockElement.setAttribute("dir", "rtl");
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("rtl");
    });

    it("should detect ltr direction from element's dir attribute", () => {
        // Arrange
        mockElement.setAttribute("dir", "ltr");
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("ltr");
    });

    it("should detect direction from parent element when element has no dir attribute", () => {
        // Arrange
        const parentElement = document.createElement("div");
        parentElement.setAttribute("dir", "rtl");
        parentElement.appendChild(mockElement);
        document.body.appendChild(parentElement);

        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("rtl");

        // Cleanup
        document.body.removeChild(parentElement);
    });

    it("should fall back to document element direction", () => {
        // Arrange
        document.documentElement.setAttribute("dir", "rtl");
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("rtl");
    });

    it("should fall back to document body direction when documentElement has no dir", () => {
        // Arrange
        document.body.setAttribute("dir", "rtl");
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("rtl");

        // Cleanup
        document.body.removeAttribute("dir");
    });

    it("should prioritize documentElement dir over body dir", () => {
        // Arrange
        document.documentElement.setAttribute("dir", "ltr");
        document.body.setAttribute("dir", "rtl");
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("ltr");

        // Cleanup
        document.body.removeAttribute("dir");
    });

    it("should fall back to default direction when no dir attribute is found", () => {
        // Arrange
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("ltr");
    });

    it("should treat non-rtl dir values as ltr", () => {
        // Arrange
        mockElement.setAttribute("dir", "auto");
        const ref = {current: mockElement};

        // Act
        const {result} = renderHook(() => useDirectionDetection(ref));

        // Assert
        expect(result.current).toBe("ltr");
    });

    it("should update direction when the ref's element changes", () => {
        // Arrange
        const rtlElement = document.createElement("div");
        rtlElement.setAttribute("dir", "rtl");
        const {result, rerender} = renderHook(
            ({element}) => useDirectionDetection({current: element}),
            {initialProps: {element: mockElement as HTMLElement | null}},
        );

        // Act
        rerender({element: rtlElement});

        // Assert
        expect(result.current).toBe("rtl");
    });
});
