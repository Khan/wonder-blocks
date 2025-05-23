import * as React from "react";
import {render, act, renderHook, waitFor} from "@testing-library/react";

import {useForceUpdate} from "../use-force-update";

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

        it("should cause component to render when invoked multiple times before a render", async () => {
            // Arrange
            const Component = (): React.ReactElement => {
                const countRef = React.useRef(0);
                const forceUpdate = useForceUpdate();
                React.useEffect(() => {
                    countRef.current++;

                    setTimeout(() => {
                        // We call an even number of times.
                        // This is to catch a bug that could occur where we
                        // just toggle a value on and off, and the end state
                        // matches the start state, thus causing React to
                        // believe nothing has changed, and therefore not
                        // re-render.
                        forceUpdate();
                        forceUpdate();
                        forceUpdate();
                        forceUpdate();
                    }, 50);
                });
                // @ts-expect-error [FEI-5019] - TS2322 - Type 'number' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
                return countRef.current;
            };

            // Act
            const wrapper = render(<Component />);
            await act(() => {
                // Advance enough for the timeout to run 4 times.
                // Which means the component should have rendered 4 times,
                // with one more pending for the timeout that was setup in
                // the last render.
                jest.advanceTimersByTime(204);
            });

            // Assert
            await waitFor(() => {
                expect(wrapper.container.textContent).toBe("4");
            });
        });

        it("should cause component to render each time it is invoked after a render", async () => {
            // Arrange
            const Component = (): React.ReactElement => {
                const countRef = React.useRef(0);
                const forceUpdate = useForceUpdate();
                React.useEffect(() => {
                    countRef.current++;

                    setTimeout(forceUpdate, 50);
                });
                // @ts-expect-error [FEI-5019] - TS2322 - Type 'number' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'.
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

            // Assert
            await waitFor(() => {
                expect(wrapper.container.textContent).toBe("4");
            });
        });

        it("should cause a consuming hook to update without a render", async () => {
            // Arrange
            jest.useRealTimers();
            const useTestHook = (): [number, () => void] => {
                const countRef = React.useRef(0);
                const forceUpdate = useForceUpdate();
                const updateMe = React.useCallback(() => {
                    setTimeout(() => {
                        countRef.current++;
                        forceUpdate();
                    }, 50);
                }, [forceUpdate]);
                return [countRef.current, updateMe];
            };

            // Act
            const {result} = renderHook(() => useTestHook());
            const [, updateMe] = result.current;
            await act(() => updateMe());
            await act(() => updateMe());

            // Assert
            await waitFor(() => {
                expect(result.current[0]).toBe(2);
            });
        });
    });
});
