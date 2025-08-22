import * as React from "react";
import {renderHook, render, act} from "@testing-library/react";

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

    it("should update direction when element ref changes", () => {
        // Arrange
        const newElement = document.createElement("div");
        newElement.setAttribute("dir", "rtl");
        document.body.appendChild(newElement);

        // Use a state-based approach that will trigger the effect
        const TestComponent = () => {
            const [element, setElement] = React.useState<HTMLElement | null>(
                mockElement,
            );
            const ref = {current: element};
            const direction = useDirectionDetection(ref);

            // Expose methods for testing
            React.useEffect(() => {
                (TestComponent as any).setElement = setElement;
                (TestComponent as any).direction = direction;
            }, [direction, setElement]);

            return null;
        };

        // Act & Assert
        render(<TestComponent />);

        // Initial state should be ltr
        expect((TestComponent as any).direction).toBe("ltr");

        // Change ref to point to element with rtl
        act(() => {
            (TestComponent as any).setElement(newElement);
        });

        // Assert
        expect((TestComponent as any).direction).toBe("rtl");

        // Cleanup
        document.body.removeChild(newElement);
    });
});
