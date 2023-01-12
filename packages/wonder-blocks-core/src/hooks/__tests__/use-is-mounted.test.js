// @flow
import {renderHook} from "@testing-library/react-hooks";

import {useIsMounted} from "../use-is-mounted.js";

describe("useIsMounted", () => {
    it("should return false on first call", () => {
        const {result, rerender} = renderHook(useIsMounted);

        rerender();

        expect(result.current()).toBeTrue();
    });

    it("should return true on true on subsequent calls", () => {
        const {result, rerender} = renderHook(useIsMounted);

        rerender();

        expect(result.current()).toBeTrue();
    });

    it("should return false on unmount", () => {
        const {result, unmount} = renderHook(useIsMounted);

        unmount();

        expect(result.current()).toBeFalse();
    });
});
