// @flow
import {renderHook} from "@testing-library/react-hooks/server";

import {useRenderState} from "../use-render-state.js";

describe("useRenderState", () => {
    it("should return the default value", () => {
        // Arrange

        // Act
        const {result} = renderHook(() => useRenderState());

        // Assert
        expect(result.current).toEqual("root");
    });
});
