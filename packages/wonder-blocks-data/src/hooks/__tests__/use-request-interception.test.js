// @flow
import * as React from "react";
import {renderHook} from "@testing-library/react-hooks";
import InterceptRequests from "../../components/intercept-requests.js";
import {useRequestInterception} from "../use-request-interception.js";

describe("#useRequestInterception", () => {
    it("should return a function", () => {
        // Arrange

        // Act
        const {
            result: {current: result},
        } = renderHook(() => useRequestInterception("ID", jest.fn()));

        // Assert
        expect(result).toBeInstanceOf(Function);
    });

    it("should return the same function if the arguments and context don't change", () => {
        // Arrange
        const handler = jest.fn();

        // Act
        const wrapper = renderHook(() => useRequestInterception("ID", handler));
        const result1 = wrapper.result.current;
        wrapper.rerender();
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).toBe(result2);
    });

    it("should return a new function if the requestId changes", () => {
        // Arrange
        const handler = jest.fn();

        // Act
        const wrapper = renderHook(
            ({requestId}) => useRequestInterception(requestId, handler),
            {initialProps: {requestId: "ID"}},
        );
        const result1 = wrapper.result.current;
        wrapper.rerender({requestId: "ID2"});
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).not.toBe(result2);
    });

    it("should return a new function if the handler changes", () => {
        // Arrange

        // Act
        const wrapper = renderHook(
            ({handler}) => useRequestInterception("ID", handler),
            {initialProps: {handler: jest.fn()}},
        );
        const result1 = wrapper.result.current;
        wrapper.rerender({handler: jest.fn()});
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).not.toBe(result2);
    });

    it("should return a new function if the context changes", () => {
        // Arrange
        const handler = jest.fn();
        const interceptor1 = jest.fn();
        const interceptor2 = jest.fn();
        const Wrapper = ({children, interceptor}: any) => (
            <InterceptRequests interceptor={interceptor}>
                {children}
            </InterceptRequests>
        );

        // Act
        const wrapper = renderHook(
            () => useRequestInterception("ID", handler),
            {wrapper: Wrapper, initialProps: {interceptor: interceptor1}},
        );
        const result1 = wrapper.result.current;
        wrapper.rerender({wrapper: Wrapper, interceptor: interceptor2});
        const result2 = wrapper.result.current;

        // Assert
        expect(result1).not.toBe(result2);
    });

    describe("returned function", () => {
        it("should invoke the original handler when there are no interceptors", () => {
            // Arrange
            const handler = jest.fn();
            const requestId = "ID";
            const {
                result: {current: interceptedHandler},
            } = renderHook(() => useRequestInterception(requestId, handler));

            // Act
            interceptedHandler();

            // Assert
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it("should invoke interceptors nearest to furthest", () => {
            // Arrange
            const handler = jest.fn();
            const interceptorFurthest = jest.fn(() => null);
            const interceptorNearest = jest.fn(() => null);
            const Wrapper = ({children}: any) => (
                <InterceptRequests interceptor={interceptorFurthest}>
                    <InterceptRequests interceptor={interceptorNearest}>
                        {children}
                    </InterceptRequests>
                </InterceptRequests>
            );
            const {
                result: {current: interceptedHandler},
            } = renderHook(() => useRequestInterception("ID", handler), {
                wrapper: Wrapper,
            });

            // Act
            interceptedHandler();

            // Assert
            expect(interceptorNearest).toHaveBeenCalledBefore(
                interceptorFurthest,
            );
        });

        it("should invoke the handler last", () => {
            // Arrange
            const handler = jest.fn();
            const interceptorFurthest = jest.fn(() => null);
            const interceptorNearest = jest.fn(() => null);
            const Wrapper = ({children}: any) => (
                <InterceptRequests interceptor={interceptorFurthest}>
                    <InterceptRequests interceptor={interceptorNearest}>
                        {children}
                    </InterceptRequests>
                </InterceptRequests>
            );
            const {
                result: {current: interceptedHandler},
            } = renderHook(() => useRequestInterception("ID", handler), {
                wrapper: Wrapper,
            });

            // Act
            interceptedHandler();

            // Assert
            expect(interceptorFurthest).toHaveBeenCalledBefore(handler);
        });

        it("should invoke the original handler when there all interceptors return null", () => {
            // Arrange
            const handler = jest.fn();
            const interceptor1 = jest.fn(() => null);
            const interceptor2 = jest.fn(() => null);
            const Wrapper = ({children}: any) => (
                <InterceptRequests interceptor={interceptor1}>
                    <InterceptRequests interceptor={interceptor2}>
                        {children}
                    </InterceptRequests>
                </InterceptRequests>
            );
            const {
                result: {current: interceptedHandler},
            } = renderHook(() => useRequestInterception("ID", handler), {
                wrapper: Wrapper,
            });

            // Act
            interceptedHandler();

            // Assert
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it("should return the result of the nearest interceptor that returns a non-null result", async () => {
            // Arrange
            const handler = jest
                .fn()
                .mockRejectedValue(
                    new Error("This handler should have been intercepted"),
                );
            const interceptorFurthest = jest
                .fn()
                .mockRejectedValue(
                    new Error("This interceptor should not get called"),
                );
            const interceptorNearest = jest
                .fn()
                .mockResolvedValue("INTERCEPTED_DATA");
            const Wrapper = ({children}: any) => (
                <InterceptRequests interceptor={interceptorFurthest}>
                    <InterceptRequests interceptor={interceptorNearest}>
                        {children}
                    </InterceptRequests>
                </InterceptRequests>
            );
            const {
                result: {current: interceptedHandler},
            } = renderHook(() => useRequestInterception("ID", handler), {
                wrapper: Wrapper,
            });

            // Act
            const result = await interceptedHandler();

            // Assert
            expect(result).toBe("INTERCEPTED_DATA");
        });

        it("should not invoke interceptors or handlers beyond a non-null interception", () => {
            // Arrange
            const handler = jest
                .fn()
                .mockRejectedValue(
                    new Error("This handler should have been intercepted"),
                );
            const interceptorFurthest = jest
                .fn()
                .mockRejectedValue(
                    new Error("This interceptor should not get called"),
                );
            const interceptorNearest = jest
                .fn()
                .mockResolvedValue("INTERCEPTED_DATA");
            const Wrapper = ({children}: any) => (
                <InterceptRequests interceptor={interceptorFurthest}>
                    <InterceptRequests interceptor={interceptorNearest}>
                        {children}
                    </InterceptRequests>
                </InterceptRequests>
            );
            const {
                result: {current: interceptedHandler},
            } = renderHook(() => useRequestInterception("ID", handler), {
                wrapper: Wrapper,
            });

            // Act
            interceptedHandler();

            // Assert
            expect(handler).not.toHaveBeenCalled();
            expect(interceptorFurthest).not.toHaveBeenCalled();
        });
    });
});
