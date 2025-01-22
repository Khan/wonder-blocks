import * as React from "react";
import {renderHook, waitFor} from "@testing-library/react";

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

    it("should pass {current: true} as isMountedRef on initial render", () => {
        // Arrange
        const callback = jest.fn();

        // Act
        renderHook(() => useOnMountEffect(callback));

        // Assert
        expect(callback).toHaveBeenCalledWith({current: true});
    });

    it("should pass {current: false} as isMountedRef after being unmounted", () => {
        // Arrange
        const callback = jest.fn();

        // Act
        const {unmount} = renderHook(() => useOnMountEffect(callback));
        unmount();

        // Assert
        expect(callback).toHaveBeenCalledWith({current: false});
    });

    describe("async", () => {
        it("should pass {current: true} while mounted", async () => {
            // Arrange
            const wait = async (duration: number) => {
                return new Promise((resolve) => {
                    setTimeout(resolve, duration);
                });
            };
            let foo = false;
            const callback = (
                isMountedRef: React.MutableRefObject<boolean>,
            ) => {
                const action = async () => {
                    await wait(100);
                    if (isMountedRef.current) {
                        foo = true;
                    }
                };

                action();
            };

            // Act
            renderHook(() => useOnMountEffect(callback));

            // Assert
            await waitFor(() => {
                expect(foo).toEqual(true);
            });
        });

        it("should pass {current: false} after being unmounted", async () => {
            // Arrange
            const wait = async (duration: number) => {
                return new Promise((resolve) => {
                    setTimeout(resolve, duration);
                });
            };
            let foo = false;
            const callback = (
                isMountedRef: React.MutableRefObject<boolean>,
            ) => {
                const action = async () => {
                    await wait(100);
                    if (isMountedRef.current) {
                        foo = true;
                    }
                };

                action();
            };

            // Act
            const {unmount} = renderHook(() => useOnMountEffect(callback));
            unmount();

            // Assert
            await waitFor(() => {
                expect(foo).toEqual(false);
            });
        });
    });
});
