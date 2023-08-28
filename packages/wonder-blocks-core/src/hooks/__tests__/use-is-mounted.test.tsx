import * as React from "react";
import {renderHook} from "@testing-library/react-hooks";
import {renderToString} from "react-dom/server";

import Server from "../../util/server";

import {useIsMounted} from "../use-is-mounted";

describe("useIsMounted", () => {
    it("should return a function", () => {
        // Arrange

        // Act
        const {result} = renderHook(useIsMounted);

        // Assert
        expect(result.current).toBeFunction();
    });

    describe("when client side, the returned function", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it("should return false on initial render", () => {
            // Arrange
            jest.spyOn(console, "error").mockImplementation(() => {
                // We need to capture the initial render only, without mounting
                // so we can't use Testing Library. Instead, we're going to
                // use `renderToString` from `react-dom/server`, but that is
                // going to log an error because we use `useLayoutEffect`.
                // So, we suppress that error for our testing purposes.
                /* no-op */
            });
            const Component = () => {
                const isMounted = useIsMounted();
                return isMounted() ? <>MOUNTED</> : <>UNMOUNTED</>;
            };

            // Act
            const result = renderToString(<Component />);

            // Assert
            expect(result).toBe("UNMOUNTED");
        });

        it("should return true after mounting", () => {
            // Arrange

            // Act
            const {result} = renderHook(useIsMounted);

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

    describe("when server side, the returned function", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should not throw", () => {
            // Arrange
            const Component = () => {
                const isMounted = useIsMounted();
                return isMounted() ? <>MOUNTED</> : <>UNMOUNTED</>;
            };

            // Act
            const underTest = () => renderToString(<Component />);

            // Assert
            expect(underTest).not.toThrowError();
        });

        it("should return false on initial render", () => {
            // Arrange
            const Component = () => {
                const isMounted = useIsMounted();
                return isMounted() ? <>MOUNTED</> : <>UNMOUNTED</>;
            };

            // Act
            const result = renderToString(<Component />);

            // Assert
            expect(result).toBe("UNMOUNTED");
        });

        it("should return false after initial render", () => {
            // Arrange
            const {result, rerender} = renderHook(useIsMounted);

            // Act
            rerender();

            // assert
            expect(result.current()).toBeFalse();
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
});
