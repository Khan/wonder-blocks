// eslint-disable-next-line import/no-unassigned-import
import "jest-extended";
import {renderHook} from "@testing-library/react";

import {useSharedCache, SharedCache} from "../use-shared-cache";

describe("#useSharedCache", () => {
    beforeEach(() => {
        SharedCache.purgeAll();
    });

    it.each`
        id
        ${null}
        ${""}
        ${5}
        ${() => "BOO"}
    `("should throw if the id is $id", ({id}: any) => {
        // Arrange

        // Act
        const underTest = () => renderHook(() => useSharedCache(id, "scope"));

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    it.each`
        scope
        ${null}
        ${""}
        ${5}
        ${() => "BOO"}
    `("should throw if the scope is $scope", ({scope}: any) => {
        // Arrange

        // Act
        const underTest = () => renderHook(() => useSharedCache("id", scope));

        // Assert
        expect(underTest).toThrowErrorMatchingSnapshot();
    });

    it("should return a tuple of two items", () => {
        // Arrange

        // Act
        const {
            result: {current: result},
        } = renderHook(() => useSharedCache("id", "scope"));

        // Assert
        expect(result).toBeArrayOfSize(2);
    });

    describe("tuple[0] - currentValue", () => {
        it("should be null if nothing is cached", () => {
            // Arrange

            // Act
            const {
                result: {current: result},
            } = renderHook(() => useSharedCache("id", "scope"));

            // Assert
            expect(result[0]).toBeNull();
        });

        it("should match initialValue when provided as a non-function", () => {
            // Arrange

            // Act
            const {
                result: {current: result},
            } = renderHook(() =>
                useSharedCache("id", "scope", "INITIAL VALUE"),
            );

            // Assert
            expect(result[0]).toBe("INITIAL VALUE");
        });

        it("should match the return of initialValue when provided as non-function", () => {
            // Arrange

            // Act
            const {
                result: {current: result},
            } = renderHook(() =>
                useSharedCache("id", "scope", () => "INITIAL VALUE"),
            );

            // Assert
            expect(result[0]).toBe("INITIAL VALUE");
        });
    });

    describe("tuple[1] - setValue", () => {
        it("should be a function", () => {
            // Arrange

            // Act
            const {
                result: {current: result},
            } = renderHook(() => useSharedCache("id", "scope"));

            // Assert
            expect(result[1]).toBeFunction();
        });

        it("should be the same function if the id and scope remain the same", () => {
            // Arrange
            const wrapper = renderHook(
                ({id, scope}: any) => useSharedCache(id, scope),
                {initialProps: {id: "id", scope: "scope"}},
            );

            // Act
            wrapper.rerender({
                id: "id",
                scope: "scope",
            });
            const value1 = wrapper.result.all[wrapper.result.all.length - 2];
            const value2 = wrapper.result.current;
            const result1 = Array.isArray(value1) ? value1[1] : "BAD1";
            const result2 = Array.isArray(value2) ? value2[1] : "BAD2";

            // Assert
            expect(result1).toBe(result2);
        });

        it("should be a new function if the id changes", () => {
            // Arrange
            const wrapper = renderHook(
                ({id}: any) => useSharedCache(id, "scope"),
                {
                    initialProps: {id: "id"},
                },
            );

            // Act
            wrapper.rerender({id: "new-id"});
            const value1 = wrapper.result.all[wrapper.result.all.length - 2];
            const value2 = wrapper.result.current;
            const result1 = Array.isArray(value1) ? value1[1] : "BAD1";
            const result2 = Array.isArray(value2) ? value2[1] : "BAD2";

            // Assert
            expect(result1).not.toBe(result2);
        });

        it("should be a new function if the scope changes", () => {
            // Arrange
            const wrapper = renderHook(
                ({scope}: any) => useSharedCache("id", scope),
                {
                    initialProps: {scope: "scope"},
                },
            );

            // Act
            wrapper.rerender({scope: "new-scope"});
            const value1 = wrapper.result.all[wrapper.result.all.length - 2];
            const value2 = wrapper.result.current;
            const result1 = Array.isArray(value1) ? value1[1] : "BAD1";
            const result2 = Array.isArray(value2) ? value2[1] : "BAD2";

            // Assert
            expect(result1).not.toBe(result2);
        });

        it("should set the value in the cache", () => {
            // Arrange
            const wrapper = renderHook(() => useSharedCache("id", "scope"));
            const setValue = wrapper.result.current[1];

            // Act
            setValue("CACHED_VALUE");
            // Rerender so the hook retrieves this new value.
            wrapper.rerender();
            const result = wrapper.result.current[0];

            // Assert
            expect(result).toBe("CACHED_VALUE");
        });

        it.each`
            value
            ${undefined}
            ${null}
        `("should purge the value from the cache if $value", ({value}: any) => {
            // Arrange
            const wrapper = renderHook(() => useSharedCache("id", "scope"));
            const setValue = wrapper.result.current[1];
            setValue("CACHED_VALUE");

            // Act
            // Rerender so the result has the cached value.
            wrapper.rerender();
            setValue(value);
            // Rerender so the hook retrieves this new value.
            wrapper.rerender();
            const result = wrapper.result.current[0];

            // Assert
            expect(result).toBeNull();
        });
    });

    it("should share cache across all uses", () => {
        // Arrange
        const hook1 = renderHook(() => useSharedCache("id", "scope"));
        const hook2 = renderHook(() => useSharedCache("id", "scope"));
        hook1.result.current[1]("VALUE_1");

        // Act
        hook2.rerender();
        const result = hook2.result.current[0];

        // Assert
        expect(result).toBe("VALUE_1");
    });

    it.each`
        id
        ${"id1"}
        ${"id2"}
    `("should not share cache if scope is different", ({id}: any) => {
        // Arrange
        const hook1 = renderHook(() => useSharedCache("id1", "scope1"));
        const hook2 = renderHook(() => useSharedCache(id, "scope2"));
        hook1.result.current[1]("VALUE_1");

        // Act
        hook2.rerender();
        const result = hook2.result.current[0];

        // Assert
        expect(result).toBeNull();
    });

    it.each`
        scope
        ${"scope1"}
        ${"scope2"}
    `("should not share cache if id is different", ({scope}: any) => {
        // Arrange
        const hook1 = renderHook(() => useSharedCache("id1", "scope1"));
        const hook2 = renderHook(() => useSharedCache("id2", scope));
        hook1.result.current[1]("VALUE_1");

        // Act
        hook2.rerender();
        const result = hook2.result.current[0];

        // Assert
        expect(result).toBeNull();
    });
});
