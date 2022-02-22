// @flow
import {
    renderHook as clientRenderHook,
    act,
} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";

import {Server} from "@khanacademy/wonder-blocks-core";
import {Status} from "../../util/status.js";

import {RequestFulfillment} from "../../util/request-fulfillment.js";
import * as UseRequestInterception from "../use-request-interception.js";
import * as UseServerEffect from "../use-server-effect.js";
import * as UseSharedCache from "../use-shared-cache.js";

import {
    useHydratableEffect,
    // TODO(somewhatabstract, FEI-4174): Update eslint-plugin-import when they
    // have fixed:
    // https://github.com/import-js/eslint-plugin-import/issues/2073
    // eslint-disable-next-line import/named
    WhenClientSide,
} from "../use-hydratable-effect.js";

jest.mock("../use-request-interception.js");
jest.mock("../use-server-effect.js");
jest.mock("../use-shared-cache.js");

describe("#useHydratableEffect", () => {
    beforeEach(() => {
        jest.resetAllMocks();

        // When we have request aborting and things, this can be nicer, but
        // for now, let's just clear out inflight requests between tests
        // by being cheeky.
        RequestFulfillment.Default._requests = {};

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
                const setCache = (v) => (cache[id] = v);
                const currentValue =
                    cache[id] ??
                    (typeof defaultValue === "function"
                        ? defaultValue()
                        : defaultValue);
                cache[id] = currentValue;
                return [currentValue, setCache];
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
            serverRenderHook(() => useHydratableEffect("ID", fakeHandler));

            // Assert
            expect(useRequestInterceptSpy).toHaveBeenCalledWith(
                "ID",
                fakeHandler,
            );
        });

        it.each`
            clientBehavior                               | hydrate
            ${WhenClientSide.DoNotHydrate}               | ${false}
            ${WhenClientSide.AlwaysExecute}              | ${true}
            ${WhenClientSide.ExecuteWhenNoResult}        | ${true}
            ${WhenClientSide.ExecuteWhenNoSuccessResult} | ${true}
            ${undefined /*default*/}                     | ${true}
        `(
            "should call useServerEffect with the handler and hydrate=$hydrate for $clientBehavior",
            ({hydrate, clientBehavior}) => {
                // Arrange
                const useServerEffectSpy = jest
                    .spyOn(UseServerEffect, "useServerEffect")
                    .mockReturnValue(null);
                const fakeHandler = jest.fn();

                // Act
                serverRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler, {
                        clientBehavior,
                    }),
                );

                // Assert
                expect(useServerEffectSpy).toHaveBeenCalledWith(
                    "ID",
                    fakeHandler,
                    hydrate,
                );
            },
        );

        it("should pass an abort handler to useServerEffect when skip is true", async () => {
            // Arrange
            jest.spyOn(
                UseRequestInterception,
                "useRequestInterception",
            ).mockReturnValue(jest.fn());
            const fakeHandler = jest.fn();
            const useServerEffectSpy = jest
                .spyOn(UseServerEffect, "useServerEffect")
                .mockReturnValue(null);

            // Act
            serverRenderHook(() =>
                useHydratableEffect("ID", fakeHandler, {skip: true}),
            );
            const underTest = useServerEffectSpy.mock.calls[0][1]();

            // Assert
            await expect(underTest).rejects.toMatchInlineSnapshot(
                `[AbortError: skipped]`,
            );
        });

        it.each`
            scope        | expectedScope
            ${undefined} | ${"useHydratableEffect"}
            ${"foo"}     | ${"foo"}
        `(
            "should call useSharedCache with id, scope=$scope, and a function to set the default",
            ({scope, expectedScope}) => {
                const fakeHandler = jest.fn();
                jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                    Status.success({thisIs: "some data"}),
                );
                const useSharedCacheSpy = jest.spyOn(
                    UseSharedCache,
                    "useSharedCache",
                );

                // Act
                serverRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler, {scope}),
                );

                // Assert
                expect(useSharedCacheSpy).toHaveBeenCalledWith(
                    "ID",
                    expectedScope,
                    expect.any(Function),
                );
            },
        );

        it("should not request data", () => {
            // Arrange
            const fakeHandler = jest.fn().mockResolvedValue("data");

            // Act
            serverRenderHook(() => useHydratableEffect("ID", fakeHandler));

            // Assert
            expect(fakeHandler).not.toHaveBeenCalled();
        });

        describe("without server result", () => {
            it("should return a loading result", () => {
                // Arrange
                const fakeHandler = jest.fn();

                // Act
                const {
                    result: {current: result},
                } = serverRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler),
                );

                // Assert
                expect(result).toEqual(Status.loading());
            });
        });

        describe("with server result", () => {
            it("should return the result", () => {
                // Arrange
                const fakeHandler = jest.fn();
                const serverResult = Status.success("data");
                jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                    serverResult,
                );

                // Act
                const {
                    result: {current: result},
                } = serverRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler),
                );

                // Assert
                expect(result).toEqual(serverResult);
            });
        });
    });

    describe("when client-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it.each`
            clientBehavior                               | hydrate
            ${WhenClientSide.DoNotHydrate}               | ${false}
            ${WhenClientSide.AlwaysExecute}              | ${true}
            ${WhenClientSide.ExecuteWhenNoResult}        | ${true}
            ${WhenClientSide.ExecuteWhenNoSuccessResult} | ${true}
            ${undefined /*default*/}                     | ${true}
        `(
            "should call useServerEffect with the handler and hydrate=$hydrate for $clientBehavior",
            ({hydrate, clientBehavior}) => {
                // Arrange
                const useServerEffectSpy = jest
                    .spyOn(UseServerEffect, "useServerEffect")
                    .mockReturnValue(null);
                const fakeHandler = jest.fn();

                // Act
                clientRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler, {
                        clientBehavior,
                    }),
                );

                // Assert
                expect(useServerEffectSpy).toHaveBeenCalledWith(
                    "ID",
                    fakeHandler,
                    hydrate,
                );
            },
        );

        it("should fulfill request when there is no server value to hydrate", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            clientRenderHook(() => useHydratableEffect("ID", fakeHandler));

            // Assert
            expect(fakeHandler).toHaveBeenCalled();
        });

        it("should share inflight requests for the same requestId", () => {
            // Arrange
            const pending = new Promise((resolve, reject) => {
                /*pending*/
            });
            const fakeHandler = jest.fn().mockReturnValue(pending);

            // Act
            clientRenderHook(() => useHydratableEffect("ID", fakeHandler));
            clientRenderHook(() => useHydratableEffect("ID", fakeHandler));

            // Assert
            expect(fakeHandler).toHaveBeenCalledTimes(1);
        });

        it.each`
            serverResult
            ${null}
            ${Status.error(new Error("some error"))}
        `(
            "should fulfill request when server value is $serverResult and clientBehavior is ExecuteWhenNoSuccessResult",
            ({serverResult}) => {
                // Arrange
                const fakeHandler = jest.fn();
                jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                    serverResult,
                );

                // Act
                clientRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler, {
                        clientBehavior:
                            WhenClientSide.ExecuteWhenNoSuccessResult,
                    }),
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalled();
            },
        );

        it.each`
            serverResult
            ${null}
            ${Status.error(new Error("some error"))}
            ${Status.success("data")}
        `(
            "should fulfill request when server value is $serveResult and clientBehavior is AlwaysExecute",
            ({serverResult}) => {
                // Arrange
                const fakeHandler = jest.fn();
                jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                    serverResult,
                );

                // Act
                clientRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler, {
                        clientBehavior: WhenClientSide.AlwaysExecute,
                    }),
                );

                // Assert
                expect(fakeHandler).toHaveBeenCalled();
            },
        );

        it("should not fulfill request when server value is success and clientBehavior is ExecuteWhenNoSuccessResult", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                Status.success("data"),
            );

            // Act
            clientRenderHook(() =>
                useHydratableEffect("ID", fakeHandler, {
                    clientBehavior: WhenClientSide.ExecuteWhenNoSuccessResult,
                }),
            );

            // Assert
            expect(fakeHandler).not.toHaveBeenCalled();
        });

        it.each`
            serverResult
            ${Status.error(new Error("some error"))}
            ${Status.success("data")}
        `(
            "should not fulfill request when server value is $serverResult and clientBehavior is ExecuteWhenNoResult",
            ({serverResult}) => {
                const fakeHandler = jest.fn();
                jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                    serverResult,
                );

                // Act
                clientRenderHook(() =>
                    useHydratableEffect("ID", fakeHandler, {
                        clientBehavior: WhenClientSide.ExecuteWhenNoResult,
                    }),
                );

                // Assert
                expect(fakeHandler).not.toHaveBeenCalled();
            },
        );

        it("should fulfill request once only if requestId does not change", async () => {
            const fakeHandler = jest.fn().mockResolvedValue("data");
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, waitForNextUpdate} = clientRenderHook(() =>
                useHydratableEffect("ID", fakeHandler),
            );
            rerender();
            await waitForNextUpdate();

            // Assert
            expect(fakeHandler).toHaveBeenCalledTimes(1);
        });

        it("should fulfill request again if requestId changes", async () => {
            // Arrange
            const fakeHandler = jest.fn().mockResolvedValue("data");
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, waitForNextUpdate} = clientRenderHook(
                ({requestId}) => useHydratableEffect(requestId, fakeHandler),
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
                useHydratableEffect("ID", fakeHandler),
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
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, result} = clientRenderHook(
                ({requestId}) => useHydratableEffect(requestId, fakeHandler),
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
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, result} = clientRenderHook(
                ({requestId}) => useHydratableEffect(requestId, fakeHandler),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            rerender({requestId: "ID2"});
            await act((): Promise<mixed> =>
                Promise.all([response1, response2]),
            );

            // Assert
            expect(result.current).toStrictEqual(Status.success("DATA2"));
        });

        it("should not fulfill request when skip is true", () => {
            // Arrange
            const fakeHandler = jest.fn();
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            clientRenderHook(() =>
                useHydratableEffect("ID", fakeHandler, {skip: true}),
            );

            // Assert
            expect(fakeHandler).not.toHaveBeenCalled();
        });

        it("should ignore inflight request if skip changes", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const fakeHandler = jest.fn().mockReturnValueOnce(response1);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, result} = clientRenderHook(
                ({skip}) => useHydratableEffect("ID", fakeHandler, {skip}),
                {
                    initialProps: {skip: false},
                },
            );
            rerender({skip: true});
            await act((): Promise<mixed> => response1);

            // Assert
            expect(result.all).not.toContainEqual(Status.success("DATA1"));
        });

        it("should not ignore inflight request if handler changes", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = Promise.resolve("DATA2");
            const fakeHandler1 = jest.fn().mockReturnValueOnce(response1);
            const fakeHandler2 = jest.fn().mockReturnValueOnce(response2);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, result} = clientRenderHook(
                ({handler}) => useHydratableEffect("ID", handler),
                {
                    initialProps: {handler: fakeHandler1},
                },
            );
            rerender({handler: fakeHandler2});
            await act((): Promise<mixed> =>
                Promise.all([response1, response2]),
            );

            // Assert
            expect(result.current).toStrictEqual(Status.success("DATA1"));
        });

        it("should not ignore inflight request if options (other than skip) change", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const fakeHandler = jest.fn().mockReturnValueOnce(response1);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, result} = clientRenderHook(
                ({options}) => useHydratableEffect("ID", fakeHandler),
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
            expect(result.current).toStrictEqual(Status.success("DATA1"));
        });

        it("should return previous result when requestId changes and retainResultOnChange is true", async () => {
            // Arrange
            const response1 = Promise.resolve("DATA1");
            const response2 = Promise.resolve("DATA2");
            const fakeHandler = jest
                .fn()
                .mockReturnValueOnce(response1)
                .mockReturnValueOnce(response2);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {
                rerender,
                result: hookResult,
                waitForNextUpdate,
            } = clientRenderHook(
                ({requestId}) =>
                    useHydratableEffect(requestId, fakeHandler, {
                        retainResultOnChange: true,
                    }),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            await act((): Promise<mixed> => response1);
            rerender({requestId: "ID2"});
            const result = hookResult.current;
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
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {rerender, result} = clientRenderHook(
                ({requestId}) =>
                    useHydratableEffect(requestId, fakeHandler, {
                        retainResultOnChange: false,
                    }),
                {
                    initialProps: {requestId: "ID"},
                },
            );
            await act((): Promise<mixed> => response1);
            rerender({requestId: "ID2"});

            // Assert
            expect(result.current).toStrictEqual(Status.loading());
        });

        it("should trigger render when request is fulfilled and onResultChanged is undefined", async () => {
            // Arrange
            const response = Promise.resolve("DATA");
            const fakeHandler = jest.fn().mockReturnValue(response);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {result} = clientRenderHook(() =>
                useHydratableEffect("ID", fakeHandler),
            );
            await act((): Promise<mixed> => response);

            // Assert
            expect(result.current).toStrictEqual(Status.success("DATA"));
        });

        it("should not trigger render when request is fulfilled and onResultChanged is defined", async () => {
            // Arrange
            const response = Promise.resolve("DATA");
            const fakeHandler = jest.fn().mockReturnValue(response);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );

            // Act
            const {result} = clientRenderHook(() =>
                useHydratableEffect("ID", fakeHandler, {
                    onResultChanged: () => {},
                }),
            );
            await act((): Promise<mixed> => response);

            // Assert
            expect(result.current).toStrictEqual(Status.loading());
        });

        it("should call onResultChanged when request is fulfilled and onResultChanged is defined", async () => {
            // Arrange
            const response = Promise.resolve("DATA");
            const fakeHandler = jest.fn().mockReturnValue(response);
            jest.spyOn(UseServerEffect, "useServerEffect").mockReturnValue(
                null,
            );
            const onResultChanged = jest.fn();

            // Act
            clientRenderHook(() =>
                useHydratableEffect("ID", fakeHandler, {
                    onResultChanged,
                }),
            );
            await act((): Promise<mixed> => response);

            // Assert
            expect(onResultChanged).toHaveBeenCalledWith(
                Status.success("DATA"),
            );
        });
    });
});
