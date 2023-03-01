import {renderHook} from "@testing-library/react-hooks";

import {useIsMounted} from "../use-is-mounted";

describe("useIsMounted", () => {
    it("should return false on first call", () => {
        // Arrange

        // Act
        const {result} = renderHook(useIsMounted);

        // Assert
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'toBeTrue' does not exist on type 'JestMatchers<boolean>'.
        expect(result.current()).toBeTrue();
    });

    it("should return true on true on subsequent calls", () => {
        // Arrange
        const {result, rerender} = renderHook(useIsMounted);

        // Act
        rerender();

        // assert
        // @ts-expect-error [FEI-5019] - TS2339 - Property 'toBeTrue' does not exist on type 'JestMatchers<boolean>'.
        expect(result.current()).toBeTrue();
    });

    it("should return false on unmount", () => {
        // Arrange
        const {result, unmount} = renderHook(useIsMounted);

        // Act
        unmount();

        // Assert
        // @ts-expect-error [FEI-5019] - TS2551 - Property 'toBeFalse' does not exist on type 'JestMatchers<boolean>'. Did you mean 'toBeFalsy'?
        expect(result.current()).toBeFalse();
    });
});
