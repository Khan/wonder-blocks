// @flow
import {
    renderHook as clientRenderHook,
    act,
} from "@testing-library/react-hooks";
import {renderHook as serverRenderHook} from "@testing-library/react-hooks/server";

import {Server} from "@khanacademy/wonder-blocks-core";

import * as React from "react";
import TrackData from "../../components/track-data.js";
import InterceptData from "../../components/intercept-data.js";
import {RequestFulfillment} from "../../util/request-fulfillment.js";
import {ResponseCache} from "../../util/response-cache.js";
import {RequestTracker} from "../../util/request-tracking.js";

import {useData} from "../use-data.js";

import type {IRequestHandler} from "../../util/types.js";

describe("#useData", () => {
    beforeEach(() => {
        const responseCache = new ResponseCache();
        jest.spyOn(ResponseCache, "Default", "get").mockReturnValue(
            responseCache,
        );
        jest.spyOn(RequestFulfillment, "Default", "get").mockReturnValue(
            new RequestFulfillment(responseCache),
        );
        jest.spyOn(RequestTracker, "Default", "get").mockReturnValue(
            new RequestTracker(responseCache),
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("when server-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should return loading if no cached result", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn(),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const {
                result: {current: result},
            } = serverRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(result).toEqual({
                status: "loading",
            });
        });

        it("should not directly request fulfillment", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn(),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const fulfillRequestSpy = jest.spyOn(
                RequestFulfillment.Default,
                "fulfill",
            );

            // Act
            serverRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(fulfillRequestSpy).not.toHaveBeenCalled();
        });

        it("should track the request", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn(),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const trackDataRequestSpy = jest.spyOn(
                RequestTracker.Default,
                "trackDataRequest",
            );

            // Act
            serverRenderHook(() => useData(fakeHandler, "options"), {
                wrapper: TrackData,
            });

            // Assert
            expect(trackDataRequestSpy).toHaveBeenCalledWith(
                fakeHandler,
                "options",
            );
        });

        it("should return success state if cached result has data", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn(),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValueOnce({
                data: "DATA",
                error: null,
            });

            // Act
            const {
                result: {current: result},
            } = serverRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(result).toEqual({
                status: "success",
                data: "DATA",
            });
        });

        it("should return error state if cached result has error", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn(),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValueOnce({
                data: null,
                error: "ERROR",
            });

            // Act
            const {
                result: {current: result},
            } = serverRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(result).toEqual({
                status: "error",
                error: "ERROR",
            });
        });
    });

    describe("when client-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        it("should initially return loading state when no cached result", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*prevent act() warning*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(result).toEqual({
                status: "loading",
            });
        });

        it("should initially return success state when cached result has data", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*prevent act() warning*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValueOnce({
                data: "DATA",
                error: null,
            });

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(result).toEqual({
                status: "success",
                data: "DATA",
            });
        });

        it("should initially return error state when cached result has error", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*prevent act() warning*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            jest.spyOn(ResponseCache.Default, "getEntry").mockReturnValueOnce({
                data: null,
                error: "ERROR",
            });

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(result).toEqual({
                status: "error",
                error: "ERROR",
            });
        });

        it("should not track the request", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*prevent act() warning*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const trackDataRequestSpy = jest.spyOn(
                RequestTracker.Default,
                "trackDataRequest",
            );

            // Act
            clientRenderHook(() => useData(fakeHandler, "options"), {
                wrapper: TrackData,
            });

            // Assert
            expect(trackDataRequestSpy).not.toHaveBeenCalled();
        });

        it("should request fulfillment", () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*prevent act() warning*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const fulfillRequestSpy = jest.spyOn(
                RequestFulfillment.Default,
                "fulfill",
            );

            // Act
            clientRenderHook(() => useData(fakeHandler, "options"));

            // Assert
            expect(fulfillRequestSpy).toHaveBeenCalledWith(
                fakeHandler,
                "options",
            );
        });

        it("should return success state if fulfillment resolves with data", async () => {
            // Arrange
            const request = Promise.resolve("DATA");
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(request),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(() =>
                useData(fakeHandler, "options"),
            );
            await act(() => request);
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "success",
                data: "DATA",
            });
        });

        it("should return error state if fulfillment resolves with error", async () => {
            // Arrange
            const request = Promise.reject(new Error("ERROR"));
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(request),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(() =>
                useData(fakeHandler, "options"),
            );
            await act(async () => {
                try {
                    await request;
                } catch (e) {
                    /* we know, we know */
                }
            });
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "error",
                error: "ERROR",
            });
        });

        it("should return error state if fulfillment rejects", async () => {
            // Arrange
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*prevent act() warning*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const request = Promise.reject(new Error("ERROR"));
            jest.spyOn(
                RequestFulfillment.Default,
                "fulfill",
            ).mockReturnValueOnce(request);

            // Act
            const render = clientRenderHook(() =>
                useData(fakeHandler, "options"),
            );
            await act(async () => {
                try {
                    await request;
                } catch (e) {
                    /* we know, we know */
                }
            });
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "error",
                error: "ERROR",
            });
        });

        it("should ignore resolution of pending request fulfillment when handler changes", async () => {
            // Arrange
            const oldRequest = Promise.resolve("OLD DATA");
            const oldHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(oldRequest),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const newHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*let's have the new request remain pending*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_NEW_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(
                ({handler}) => useData(handler, "options"),
                {
                    initialProps: {handler: oldHandler},
                },
            );
            render.rerender({handler: newHandler});
            await act(() => oldRequest);
            const result = render.result.all;

            // Assert
            expect(result).not.toIncludeAnyMembers([
                {
                    status: "success",
                    data: "OLD DATA",
                },
            ]);
        });

        it("should ignore resolution of pending request fulfillment when key from options changes", async () => {
            // Arrange
            const oldRequest = Promise.reject("OLD ERROR");
            const oldHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest
                    .fn()
                    .mockReturnValueOnce(oldRequest)
                    .mockReturnValue(
                        new Promise(() => {
                            /*let's have the new request remain pending*/
                        }),
                    ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(
                ({options}) => useData(oldHandler, options),
                {
                    initialProps: {options: "OLD OPTIONS"},
                },
            );
            render.rerender({options: "NEW OPTIONS"});
            await act(() => oldRequest.catch(() => {}));
            const result = render.result.all;

            // Assert
            expect(result).not.toIncludeAnyMembers([
                {
                    status: "error",
                    error: "OLD ERROR",
                },
            ]);
        });

        it("should ignore rejection of pending request fulfillment when handler changes", async () => {
            // Arrange
            const oldRequest = Promise.reject("OLD ERROR");
            const oldHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*this doesn't get called for this test case*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const newHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*let's have the new request remain pending*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_NEW_HANDLER",
                hydrate: true,
            };
            jest.spyOn(RequestFulfillment.Default, "fulfill")
                .mockReturnValueOnce(oldRequest)
                .mockReturnValue(
                    new Promise(() => {
                        /*leave the second request pending*/
                    }),
                );

            // Act
            const render = clientRenderHook(
                ({handler}) => useData(handler, "options"),
                {
                    initialProps: {handler: oldHandler},
                },
            );
            render.rerender({handler: newHandler});
            await act(() => oldRequest.catch(() => {}));
            const result = render.result.all; //?

            // Assert
            expect(result).not.toIncludeAnyMembers([
                {
                    status: "error",
                    error: "OLD ERROR",
                },
            ]);
        });

        it("should ignore rejection of pending request fulfillment when key from options changes", async () => {
            // Arrange
            const oldRequest = Promise.resolve("OLD DATA");
            const oldHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*this won't ever get called in this version*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            jest.spyOn(RequestFulfillment.Default, "fulfill")
                .mockReturnValueOnce(oldRequest)
                .mockReturnValue(
                    new Promise(() => {
                        /*leave the second request pending*/
                    }),
                );

            // Act
            const render = clientRenderHook(
                ({options}) => useData(oldHandler, options),
                {
                    initialProps: {options: "OLD OPTIONS"},
                },
            );
            render.rerender({options: "NEW OPTIONS"});
            await act(() => oldRequest);
            const result = render.result.all;

            // Assert
            expect(result).not.toIncludeAnyMembers([
                {
                    status: "success",
                    data: "OLD DATA",
                },
            ]);
        });

        it("should return to loading status when handler changes", async () => {
            // Arrange
            const oldRequest = Promise.resolve("OLD DATA");
            const oldHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(oldRequest),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const newHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(
                    new Promise(() => {
                        /*let's have the new request remain pending*/
                    }),
                ),
                getKey: (o) => o,
                type: "MY_NEW_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(
                ({handler}) => useData(handler, "options"),
                {
                    initialProps: {handler: oldHandler},
                },
            );
            await act(() => oldRequest);
            render.rerender({handler: newHandler});
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "loading",
            });
        });

        it("should return to loading status when key from options changes", async () => {
            // Arrange
            const oldRequest = Promise.resolve("OLD DATA");
            const oldHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest
                    .fn()
                    .mockReturnValueOnce(oldRequest)
                    .mockReturnValue(
                        new Promise(() => {
                            /*let's have the new request remain pending*/
                        }),
                    ),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(
                ({options}) => useData(oldHandler, options),
                {
                    initialProps: {options: "OLD OPTIONS"},
                },
            );
            await act(() => oldRequest);
            render.rerender({options: "NEW OPTIONS"});
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "loading",
            });
        });

        it("should not return to loading state if options change but represent the same key", async () => {
            // Arrange
            const oldRequest = Promise.resolve("DATA");
            const oldHandler: IRequestHandler<
                {|key: string, someThing: string|},
                string,
            > = {
                fulfillRequest: jest
                    .fn()
                    .mockReturnValueOnce(oldRequest)
                    .mockReturnValue(
                        new Promise(() => {
                            /*let's have the new request remain pending*/
                        }),
                    ),
                getKey: (o) => o.key,
                type: "MY_HANDLER",
                hydrate: true,
            };

            // Act
            const render = clientRenderHook(
                ({options}) => useData(oldHandler, options),
                {
                    initialProps: {
                        options: {key: "SAME KEY", someThing: "else"},
                    },
                },
            );
            await act(() => oldRequest);
            render.rerender({options: {key: "SAME KEY", someThing: "new"}});
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "success",
                data: "DATA",
            });
        });
    });

    describe("with interceptor", () => {
        it("should return the result of the interceptor request resolution", async () => {
            // Arrange
            const intercepted = Promise.resolve("INTERCEPTED");
            const notIntercepted = Promise.resolve("NOT INTERCEPTED");
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(notIntercepted),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const wrapper = ({children}) => (
                <InterceptData
                    fulfillRequest={() => intercepted}
                    handler={fakeHandler}
                >
                    {children}
                </InterceptData>
            );

            // Act
            const render = clientRenderHook(
                () => useData(fakeHandler, "options"),
                {
                    wrapper,
                },
            );
            await act(() => Promise.all([notIntercepted, intercepted]));
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "success",
                data: "INTERCEPTED",
            });
        });

        it("should return the result of the interceptor request rejection", async () => {
            // Arrange
            const intercepted = Promise.reject("INTERCEPTED");
            const notIntercepted = Promise.resolve("NOT INTERCEPTED");
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(notIntercepted),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const wrapper = ({children}) => (
                <InterceptData
                    fulfillRequest={() => intercepted}
                    handler={fakeHandler}
                >
                    {children}
                </InterceptData>
            );

            // Act
            const render = clientRenderHook(
                () => useData(fakeHandler, "options"),
                {
                    wrapper,
                },
            );
            await notIntercepted;
            await act(async () => {
                try {
                    await intercepted;
                } catch (e) {
                    /* ignore, it's ok */
                }
            });
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "error",
                error: "INTERCEPTED",
            });
        });

        it("should return the result of the handler if the interceptor returns null", async () => {
            // Arrange
            const notIntercepted = Promise.resolve("NOT INTERCEPTED");
            const fakeHandler: IRequestHandler<string, string> = {
                fulfillRequest: jest.fn().mockReturnValue(notIntercepted),
                getKey: (o) => o,
                type: "MY_HANDLER",
                hydrate: true,
            };
            const wrapper = ({children}) => (
                <InterceptData
                    fulfillRequest={() => null}
                    handler={fakeHandler}
                >
                    {children}
                </InterceptData>
            );

            // Act
            const render = clientRenderHook(
                () => useData(fakeHandler, "options"),
                {
                    wrapper,
                },
            );
            await act(() => notIntercepted);
            const result = render.result.current;

            // Assert
            expect(result).toEqual({
                status: "success",
                data: "NOT INTERCEPTED",
            });
        });
    });
});
