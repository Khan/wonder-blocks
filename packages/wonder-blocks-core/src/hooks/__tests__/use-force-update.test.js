// @flow
import * as React from "react";
import {render, act} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";

import {useForceUpdate} from "../use-force-update.js";

describe("#useForceUpdate", () => {
    it("should return a function", () => {
        // Arrange

        // Act
        const {
            result: {current: result},
        } = renderHook(() => useForceUpdate());

        // Assert
        expect(result).toBeInstanceOf(Function);
    });

    describe("returned function", () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        it("should cause component to render", () => {
            // Arrange
            const Component = (props): React.Node => {
                const countRef = React.useRef(0);
                const forceUpdate = useForceUpdate();
                React.useEffect(() => {
                    countRef.current++;

                    setTimeout(forceUpdate, 50);
                });
                return countRef.current;
            };

            // Act
            const wrapper = render(<Component />);
            act(() => {
                // Advance enough for the timeout to run 4 times.
                // Which means the component should have rendered 4 times,
                // with one more pending for the timeout that was setup in
                // the last render.
                jest.advanceTimersByTime(204);
            });
            const result = wrapper.container.textContent;

            // Assert
            expect(result).toBe("4");
        });
    });
});
