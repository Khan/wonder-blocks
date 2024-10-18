import {renderHook} from "@testing-library/react";

import {useOnMountEffect} from "../use-on-mount-effect";

describe("#useOnMountEffect", () => {
    it("should call the callback once", () => {
        // Arrange
        const callback = jest.fn();

        // Act
        const {rerender} = renderHook(() => useOnMountEffect(callback));
        rerender();

        // Assert
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should call the cleanup function if one is returned by the callback", () => {
        // Arrange
        const cleanup = jest.fn();
        const callback = jest.fn().mockReturnValue(cleanup);

        // Act
        const {unmount} = renderHook(() => useOnMountEffect(callback));
        unmount();

        // Assert
        expect(cleanup).toHaveBeenCalled();
    });
});
