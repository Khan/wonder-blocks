// @flow
import {renderHook} from "@testing-library/react-hooks";

import {useOnMountEffect} from "../use-on-mount-effect.js";

describe("#useOnMountEffect", () => {
    it("shoul call the callback once", () => {
        const callback = jest.fn();
        const {rerender} = renderHook(() => useOnMountEffect(callback));

        rerender();

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should call the cleanup function is one is returned by the callback", () => {
        const cleanup = jest.fn();
        const callback = jest.fn().mockReturnValue(cleanup);
        const {unmount} = renderHook(() => useOnMountEffect(callback));

        unmount();

        expect(cleanup).toHaveBeenCalled();
    });
});
