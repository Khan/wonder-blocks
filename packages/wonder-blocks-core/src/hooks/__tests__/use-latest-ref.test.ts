import {renderHook} from "@testing-library/react";
import {useLatestRef} from "../use-latest-ref";

describe("useLatestRef", () => {
    it("returns a ref to the value passed in", () => {
        const {
            result: {current: ref},
        } = renderHook(() => useLatestRef(123));
        expect(ref.current).toBe(123);
    });

    it("returns a ref to the most recent value passed in", () => {
        // Arrange: render the component with props {value: 123}
        const {result, rerender} = renderHook(
            ({value}) => useLatestRef(value),
            {initialProps: {value: 123}},
        );

        // Act
        rerender({value: 456});

        // Assert
        expect(result.current.current).toBe(456);
    });

    it("returns a stable ref object for the lifetime of the component", () => {
        // Arrange: render the component and remember the ref
        const {result, rerender} = renderHook(
            ({value}) => useLatestRef(value),
            {initialProps: {value: 123}},
        );
        const refFromFirstRender = result.current;

        // Act
        rerender({value: 456});

        // Assert
        expect(result.current).toBe(refFromFirstRender);
    });
});
