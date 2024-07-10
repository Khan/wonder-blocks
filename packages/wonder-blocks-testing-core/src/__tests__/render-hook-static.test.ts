import {useLocation} from "react-router-dom";

import {hookHarness} from "../harness/hook-harness";
import {renderHookStatic} from "../render-hook-static";

describe("renderHookStatic", () => {
    it("should return the result of rendering the hook", () => {
        // Arrange
        const useTestHook = () => "Hello, World!";

        // Act
        const result = renderHookStatic(useTestHook);

        // Assert
        expect(result).toStrictEqual({result: {current: "Hello, World!"}});
    });

    it("should render the hook with the given initialProps", () => {
        // Arrange
        const useTestHook = (initialProps?: string) =>
            initialProps ?? "BAD RESULT";

        // Act
        const result = renderHookStatic(useTestHook, {
            initialProps: "Hello, World!",
        });

        // Assert
        expect(result).toStrictEqual({result: {current: "Hello, World!"}});
    });

    it("should return the result of rendering the hook inside the wrapper", () => {
        // Arrange
        const Wrapper = hookHarness({
            router: "/test/route",
        });
        const useTestHook = () => {
            const location = useLocation();
            return location.pathname;
        };

        // Act
        const result = renderHookStatic(useTestHook, {wrapper: Wrapper});

        // Assert
        expect(result).toStrictEqual({result: {current: "/test/route"}});
    });
});
