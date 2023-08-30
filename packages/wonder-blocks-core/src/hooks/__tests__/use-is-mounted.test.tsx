import * as React from "react";
import {render, screen} from "@testing-library/react";
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
            // We cannot use renderHook on useIsMounted directly here and then
            // look at the result.all[0] to see the first render as the result
            // is a function that accesses the underlying ref, and that ref will
            // have changed to `true` even if it was `false` in the initial
            // render. So, we use a component.
            const Component = () => {
                const isMounted = useIsMounted();
                return isMounted() ? <>MOUNTED</> : <>UNMOUNTED</>;
            };

            // Act
            render(<Component />);
            const result = screen.getByText("UNMOUNTED");

            // Assert
            expect(result).toBeInTheDocument();
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

        it("should return false", () => {
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
    });
});
