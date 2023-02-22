// @flow
import {renderHook} from "@testing-library/react-hooks";

import {useIsMounted} from "../use-is-mounted";

describe("useIsMounted", () => {
    it("should return false on first call", () => {
        // Arrange

        // Act
        const {result} = renderHook(useIsMounted);

        // Assert
        expect(result.current()).toBeTrue();
    });

    it("should return true on true on subsequent calls", () => {
        // Arrange
        const {result, rerender} = renderHook(useIsMounted);

        // Act
        rerender();

        // assert
        expect(result.current()).toBeTrue();
    });

    it("should return false on unmount", () => {
        // Arrange
        const {result, unmount} = renderHook(useIsMounted);

        // Act
        unmount();

        // Assert
        expect(result.current()).toBeFalse();
    });
});
