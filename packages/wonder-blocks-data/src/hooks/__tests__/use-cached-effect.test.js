// @flow
import * as React from "react";
import {
    renderHook as clientRenderHook,
    act,
} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";
import {render, act as reactAct} from "@testing-library/react";

import {Server} from "@khanacademy/wonder-blocks-core";
import {Status} from "../../util/status.js";

import {RequestFulfillment} from "../../util/request-fulfillment.js";
import * as UseRequestInterception from "../use-request-interception.js";
import * as UseSharedCache from "../use-shared-cache.js";

import {useCachedEffect} from "../use-cached-effect.js";

// TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
// have fixed:
// https://github.com/import-js/eslint-plugin-import/issues/2073
// eslint-disable-next-line import/named
import {FetchPolicy} from "../../util/types.js";

jest.mock("../use-request-interception.js");
jest.mock("../use-shared-cache.js");

describe("#useCachedEffect", () => {
    beforeEach(() => {
        jest.resetAllMocks();

        // Clear out inflight requests between tests.
        RequestFulfillment.Default.abortAll();

        // Simple implementation of request interception that just returns
        // the handler.
        jest.spyOn(
            UseRequestInterception,
            "useRequestInterception",
        ).mockImplementation((_, handler) => handler);

        // We need the cache to work a little so that we get our result.
        const cache = {};
        jest.spyOn(UseSharedCache, "useSharedCache").mockImplementation(
            (id, _, defaultValue) => {
                const setCache = React.useCallback(
                    (v) => (cache[id] = v),
                    [id],
                );
                return [cache[id] ?? defaultValue, setCache];
            },
        );
    });

    describe("when server-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should call useRequestInterception", () => {
            // Arrange
            const useRequestInterceptSpy = jest
                .spyOn(UseRequestInterception, "useRequestInterception")
                .mockReturnValue(jest.fn());
            const fakeHandler = jest.fn();

            // Act
            serverRenderHook(() => useCachedEffect("ID", fakeHandler));

            // Assert
            expect(useRequestInterceptSpy).toHaveBeenCalledWith(
                "ID",
                fakeHandler,
            );
        });

        it.each`
            scope        | expectedScope
            ${undefined} | ${"useCachedEffect"}
            ${"foo"}     | ${"foo"}
        `(
            "should call useSharedCache with id, scope=$scope, without a default",
            ({scope, cachedResult, expectedScope}) => {
                const fakeHandler = jest.fn();
                const useSharedCacheSpy = jest.spyOn(
                    UseSharedCache,
                    "useSharedCache",
                );

                // Act
                serverRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {scope}),
                );

                // Assert
                expect(useSharedCacheSpy).toHaveBeenCalledWith(
                    "ID",
                    expectedScope,
                );
            },
        );

        it.each(Array.from(FetchPolicy.members()))(
            "should not request data for FetchPolicy.%s",
            (fetchPolicy) => {
                // Arrange
                const fakeHandler = jest.fn().mockResolvedValue("data");

                // Act
                serverRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {fetchPolicy}),
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            },
        );

        describe.each(Array.from(FetchPolicy.members()))(
            "with FetchPolicy.%s without cached result",
            (fetchPolicy) => {
                it("should return a loading result", () => {
                    // Arrange
                    const fakeHandler = jest.fn();

                    // Act
                    const {
                        result: {
                            current: [result],
                        },
                    } = serverRenderHook(() =>
                        useCachedEffect("ID", fakeHandler, {fetchPolicy}),
                    );

                    // Assert
                    expect(result).toStrictEqual(Status.loading());
                });
            },
        );

        describe.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.NetworkOnly,
            ),
        )("with FetchPolicy.%s with cached result", (fetchPolicy) => {
            it("should return the result", () => {
                // Arrange
                const fakeHandler = jest.fn();
                const cachedResult = Status.success("data");
                jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                    cachedResult,
                    jest.fn(),
                ]);

                // Act
                const {
                    result: {
                        current: [result],
                    },
                } = serverRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {fetchPolicy}),
                );

                // Assert
                expect(result).toEqual(cachedResult);
            });
        });

        describe("with FetchPolicy.NetworkOnly with cached result", () => {
            it("should return a loading result", () => {
                // Arrange
                const fakeHandler = jest.fn();
                jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                    Status.success("data"),
                    jest.fn(),
                ]);

                // Act
                const {
                    result: {
                        current: [result],
                    },
                } = serverRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {
                        fetchPolicy: FetchPolicy.NetworkOnly,
                    }),
                );

                // Assert
                expect(result).toStrictEqual(Status.loading());
            });
        });
    });

    describe("when client-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it("should call useRequestInterception", () => {
            // Arrange
            const useRequestInterceptSpy = jest
                .spyOn(UseRequestInterception, "useRequestInterception")
                .mockReturnValue(jest.fn());
            const fakeHandler = jest.fn();

            // Act
            clientRenderHook(() => useCachedEffect("ID", fakeHandler));

            // Assert
            expect(useRequestInterceptSpy).toHaveBeenCalledWith(
                "ID",
                fakeHandler,
            );
        });

        it("should share inflight requests for the same requestId", () => {
            // Arrange
            const pending = new Promise((resolve, reject) => {
                /*pending*/
            });
            const fakeHandler = jest.fn().mockReturnValue(pending);

            // Act
            clientRenderHook(() => useCachedEffect("ID", fakeHandler));
            clientRenderHook(() => useCachedEffect("ID", fakeHandler));

            // Assert
            expect(fakeHandler).toHaveBeenCalledTimes(1);
        });

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should provide function that causes refetch with FetchPolicy.%s",
            async (fetchPolicy) => {
                // Arrange
                const response = Promise.resolve("DATA1");
                const fakeHandler = jest.fn().mockReturnValue(response);

                // Act
                const {
                    result: {
                        current: [, refetch],
                    },
                } = clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {fetchPolicy}),
                );
                fakeHandler.mockClear();
                await act((): Promise<mixed> => response);
                act(refetch);
                await act((): Promise<mixed> => response);

                // Assert
                expect(fakeHandler).toHaveBeenCalledTimes(1);
            },
        );

        it("should throw with FetchPolicy.CacheOnly", () => {
            // Arrange
            const fakeHandler = jest.fn();

            // Act
            const {
                result: {
                    current: [, refetch],
                },
            } = clientRenderHook(() =>
                useCachedEffect("ID", fakeHandler, {
                    fetchPolicy: FetchPolicy.CacheOnly,
                }),
            );
            const underTest = () => refetch();

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Cannot fetch with CacheOnly policy"`,
            );
        });

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should fulfill request when there is no cached value and FetchPolicy.%s",
            (fetchPolicy) => {
                // Arrange
                const fakeHandler = jest.fn();
                jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                    null,
                    jest.fn(),
                ]);

                // Act
                clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {fetchPolicy}),
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalled();
            },
        );

        it.each([FetchPolicy.CacheAndNetwork, FetchPolicy.NetworkOnly])(
            "should fulfill request when there is a cached value and FetchPolicy.%s",
            (fetchPolicy) => {
                // Arrange
                const fakeHandler = jest.fn();
                jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                    Status.success("data"),
                    jest.fn(),
                ]);

                // Act
                clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {
                        fetchPolicy,
                    }),
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalled();
            },
        );

        it.each`
            cachedResult
            ${Status.error(new Error("some error"))}
            ${Status.success("data")}
            ${Status.aborted()}
        `(
            "should not fulfill request when there is a cached response of $cachedResult and FetchPolicy.CacheBeforeNetwork",
            ({cachedResult}) => {
                const fakeHandler = jest.fn();
                jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                    cachedResult,
                    jest.fn(),
                ]);

                // Act
                clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {
                        fetchPolicy: FetchPolicy.CacheBeforeNetwork,
                    }),
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            },
        );

        it.each`
            cachedResult
            ${null}
            ${Status.error(new Error("some error"))}
            ${Status.success("data")}
            ${Status.aborted()}
        `(
            "should not fulfill request when there is a cached response of $cachedResult and FetchPolicy.CacheOnly",
            ({cachedResult}) => {
                const fakeHandler = jest.fn();
                jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                    cachedResult,
                    jest.fn(),
                ]);

                // Act
                clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {
                        fetchPolicy: FetchPolicy.CacheOnly,
                    }),
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            },
        );

        it("should fulfill request once-only if requestId does not change", async () => {
            // Arrange
            const fakeHandler = jest.fn().mockResolvedValue("data");

            // Act
            const {rerender, waitForNextUpdate} = clientRenderHook(() =>
                useCachedEffect("ID", fakeHandler),
            );
            rerender();
            await waitForNextUpdate();

            // Assert
            expect(fakeHandler).toHaveBeenCalledTimes(1);
        });

        it("should fulfill request again if requestId changes", async () => {
            // Arrange
            const fakeHandler = jest.fn().mockResolvedValue("data");

            // Act
            const {rerender, waitForNextUpdate} = clientRenderHook(
                ({requestId}) => useCachedEffect(requestId, fakeHandler),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            rerender({requestId: "ID2"});
            await waitForNextUpdate();

            // Assert
            expect(fakeHandler).toHaveBeenCalledTimes(2);
        });

        it("should update shared cache with result when request is fulfilled", async () => {
            // Arrange
            const setCacheFn = jest.fn();
            jest.spyOn(UseSharedCache, "useSharedCache").mockReturnValue([
                null,
                setCacheFn,
            ]);
            const fakeHandler = jest.fn().mockResolvedValue("DATA");

            // Act
            const {waitForNextUpdate} = clientRenderHook(() =>
                useCachedEffect("ID", fakeHandler),
            );
            await waitForNextUpdate();

            // Assert
            expect(setCacheFn).toHaveBeenCalledWith(Status.success("DATA"));
        });

        it("should ignore inflight request if requestId changes", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = Promise.resolve("DATA2");
            const fakeHandler = jest
                .fn()
                .mockReturnValueOnce(response1)
                .mockReturnValueOnce(response2);

            // Act
            const {rerender, result} = clientRenderHook(
                ({requestId}) => useCachedEffect(requestId, fakeHandler),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            rerender({requestId: "ID2"});
            await act((): Promise<mixed> =>
                Promise.all([response1, response2]),
            );

            // Assert
            expect(result.all).not.toContainEqual(Status.success("DATA1"));
        });

        it("should return result of fulfilled request for current requestId", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = Promise.resolve("DATA2");
            const fakeHandler = jest
                .fn()
                .mockReturnValueOnce(response1)
                .mockReturnValueOnce(response2);

            // Act
            const {rerender, result} = clientRenderHook(
                ({requestId}) => useCachedEffect(requestId, fakeHandler),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            rerender({requestId: "ID2"});
            await act((): Promise<mixed> =>
                Promise.all([response1, response2]),
            );

            // Assert
            expect(result.current[0]).toStrictEqual(Status.success("DATA2"));
        });

        it("should not fulfill request when skip is true", () => {
            // Arrange
            const fakeHandler = jest.fn();

            // Act
            clientRenderHook(() =>
                useCachedEffect("ID", fakeHandler, {skip: true}),
            );

            // Assert
            expect(fakeHandler).not.toHaveBeenCalled();
        });

        it("should ignore result of inflight request if skip changes", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const fakeHandler = jest.fn().mockReturnValueOnce(response1);

            // Act
            const {rerender, result} = clientRenderHook(
                ({skip}) => useCachedEffect("ID", fakeHandler, {skip}),
                {
                    initialProps: {skip: false},
                },
            );
            rerender({skip: true});
            await act((): Promise<mixed> => response1);

            // Assert
            expect(result.all).not.toContainEqual(Status.success("DATA1"));
        });

        it("should not ignore result of inflight request if handler changes", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = Promise.resolve("DATA2");
            const fakeHandler1 = jest.fn().mockReturnValueOnce(response1);
            const fakeHandler2 = jest.fn().mockReturnValueOnce(response2);

            // Act
            const {rerender, result} = clientRenderHook(
                ({handler}) => useCachedEffect("ID", handler),
                {
                    initialProps: {handler: fakeHandler1},
                },
            );
            rerender({handler: fakeHandler2});
            await act((): Promise<mixed> =>
                Promise.all([response1, response2]),
            );

            // Assert
            expect(result.current[0]).toStrictEqual(Status.success("DATA1"));
        });

        it("should not ignore inflight request if options (other than skip) change", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const fakeHandler = jest.fn().mockReturnValueOnce(response1);

            // Act
            const {rerender, result} = clientRenderHook(
                ({options}) => useCachedEffect("ID", fakeHandler),
                {
                    initialProps: {options: undefined},
                },
            );
            rerender({
                options: {
                    scope: "BLAH!",
                },
            });
            await act((): Promise<mixed> => response1);

            // Assert
            expect(result.current[0]).toStrictEqual(Status.success("DATA1"));
        });

        it("should return previous result when requestId changes and retainResultOnChange is true", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = Promise.resolve("DATA2");
            const fakeHandler = jest
                .fn()
                .mockReturnValueOnce(response1)
                .mockReturnValueOnce(response2);

            // Act
            const {
                rerender,
                result: hookResult,
                waitForNextUpdate,
            } = clientRenderHook(
                ({requestId}) =>
                    useCachedEffect(requestId, fakeHandler, {
                        retainResultOnChange: true,
                    }),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            await act((): Promise<mixed> => response1);
            rerender({requestId: "ID2"});
            const [result] = hookResult.current;
            await waitForNextUpdate();

            // Assert
            expect(result).toStrictEqual(Status.success("DATA1"));
        });

        it("should return loading status when requestId changes and retainResultOnChange is false", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = new Promise(() => {
                /*pending*/
            });
            const fakeHandler = jest
                .fn()
                .mockReturnValueOnce(response1)
                .mockReturnValueOnce(response2);

            // Act
            const {rerender, result} = clientRenderHook(
                ({requestId}) =>
                    useCachedEffect(requestId, fakeHandler, {
                        retainResultOnChange: false,
                    }),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            await act((): Promise<mixed> => response1);
            rerender({requestId: "ID2"});

            // Assert
            expect(result.current[0]).toStrictEqual(Status.loading());
        });

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should trigger render when request is fulfilled and onResultChanged is undefined for FetchPolicy.%s",
            async (fetchPolicy) => {
                // Arrange
                const response = Promise.resolve("DATA");
                const fakeHandler = jest.fn().mockReturnValue(response);
                let renderCount = 0;
                const Component = React.memo(() => {
                    useCachedEffect("ID", fakeHandler, {fetchPolicy});
                    renderCount++;
                    return <div>Hello :)</div>;
                });

                // Act
                render(<Component />);
                await reactAct((): Promise<mixed> => response);

                // Assert
                expect(renderCount).toBe(2);
            },
        );

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should trigger render once per inflight request being fulfilled and onResultChanged is undefined for FetchPolicy.%s",
            async (fetchPolicy) => {
                // Arrange
                const response = Promise.resolve("DATA");
                const fakeHandler = jest.fn().mockReturnValue(response);
                let renderCount = 0;
                const Component = React.memo(() => {
                    const [, refetch] = useCachedEffect("ID", fakeHandler, {
                        fetchPolicy,
                    });
                    React.useEffect(() => {
                        refetch();
                        refetch();
                        refetch();
                        refetch();
                    }, [refetch]);
                    renderCount++;
                    return <div>Hello :)</div>;
                });

                // Act
                render(<Component />);
                await reactAct((): Promise<mixed> => response);

                // Assert
                expect(renderCount).toBe(2);
            },
        );

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should not trigger render when request is fulfilled and onResultChanged is defined for FetchPolicy.%s",
            async (fetchPolicy) => {
                // Arrange
                const response = Promise.resolve("DATA");
                const fakeHandler = jest.fn().mockReturnValue(response);
                let renderCount = 0;
                const Component = React.memo(() => {
                    useCachedEffect("ID", fakeHandler, {
                        onResultChanged: () => {},
                        fetchPolicy,
                    });
                    renderCount++;
                    return <div>Hello :)</div>;
                });

                // Act
                render(<Component />);
                await reactAct((): Promise<mixed> => response);

                // Assert
                expect(renderCount).toBe(1);
            },
        );

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should call onResultChanged when request is fulfilled and onResultChanged is defined for FetchPolicy.%s",
            async (fetchPolicy) => {
                // Arrange
                const response = Promise.resolve("DATA");
                const fakeHandler = jest.fn().mockReturnValue(response);
                const onResultChanged = jest.fn();

                // Act
                clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {
                        onResultChanged,
                        fetchPolicy,
                    }),
                );
                await act((): Promise<mixed> => response);

                // Assert
                expect(onResultChanged).toHaveBeenCalledWith(
                    Status.success("DATA"),
                );
            },
        );

        it.each(
            Array.from(FetchPolicy.members()).filter(
                (e) => e !== FetchPolicy.CacheOnly,
            ),
        )(
            "should call onResultChanged once per inflight request being fulfilled and onResultChanged is defined for FetchPolicy.%s",
            async (fetchPolicy) => {
                // Arrange
                const response = Promise.resolve("DATA");
                const fakeHandler = jest.fn().mockReturnValue(response);
                const onResultChanged = jest.fn();

                // Act
                const {
                    result: {
                        current: [, refetch],
                    },
                } = clientRenderHook(() =>
                    useCachedEffect("ID", fakeHandler, {
                        onResultChanged,
                        fetchPolicy,
                    }),
                );
                act(refetch);
                act(refetch);
                act(refetch);
                act(refetch);
                await act((): Promise<mixed> => response);

                // Assert
                expect(onResultChanged).toHaveBeenCalledTimes(1);
            },
        );
    });
});
