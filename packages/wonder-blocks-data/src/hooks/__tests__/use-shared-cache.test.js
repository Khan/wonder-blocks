// @flow
import {renderHook as clientRenderHook} from "@testing-library/react-hooks";

import {useSharedCache, purgeSharedCache} from "../use-shared-cache.js";

describe("#useSharedCache", () => {
    beforeEach(() => {
        purgeSharedCache();
    });

    it.each`
        id
        ${null}
        ${""}
        ${5}
        ${() => "BOO"}
    `("should throw if the id is $id", ({id}) => {
        // Arrange

        // Act
        const {result} = clientRenderHook(() => useSharedCache(id, "scope"));

        // Assert
        expect(result.error).toMatchSnapshot();
    });

    it.each`
        scope
        ${null}
        ${""}
        ${5}
        ${() => "BOO"}
    `("should throw if the scope is $scope", ({scope}) => {
        // Arrange

        // Act
        const {result} = clientRenderHook(() => useSharedCache("id", scope));

        // Assert
        expect(result.error).toMatchSnapshot();
    });

    it("should return a tuple of two items", () => {
        // Arrange

        // Act
        const {
            result: {current: result},
        } = clientRenderHook(() => useSharedCache("id", "scope"));

        // Assert
        expect(result).toBeArrayOfSize(2);
    });

    describe("tuple[0] - currentValue", () => {
        it("should be null if nothing is cached", () => {
            // Arrange

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() => useSharedCache("id", "scope"));

            // Assert
            expect(result[0]).toBeNull();
        });

        it("should match initialValue when provided as a non-function", () => {
            // Arrange

            // Act
            const {
                result: {current: result},
            } = clientRenderHook(() =>
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
            } = clientRenderHook(() =>
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
            } = clientRenderHook(() => useSharedCache("id", "scope"));

            // Assert
            expect(result[1]).toBeFunction();
        });

        it("should be the same function if the id and scope remain the same", () => {
            // Arrange
            const wrapper = clientRenderHook(
                ({id, scope}) => useSharedCache(id, scope),
                {initialProps: {id: "id", scope: "scope"}},
            );

            // Act
            wrapper.rerender({
                id: "id",
                scope: "scope",
            });
            const result1 = wrapper.result.all[wrapper.result.all.length - 2];
            const result2 = wrapper.result.current;

            // Assert
            // $FlowIgnore[prop-missing]
            expect(result1[1]).toBe(result2[1]);
        });

        it("should be a new function if the id changes", () => {
            // Arrange
            const wrapper = clientRenderHook(
                ({id}) => useSharedCache(id, "scope"),
                {
                    initialProps: {id: "id"},
                },
            );

            // Act
            wrapper.rerender({id: "new-id"});
            const result1 = wrapper.result.all[wrapper.result.all.length - 2];
            const result2 = wrapper.result.current;

            // Assert
            // $FlowIgnore[prop-missing]
            expect(result1[1]).not.toBe(result2[1]);
        });

        it("should be a new function if the scope changes", () => {
            // Arrange
            const wrapper = clientRenderHook(
                ({scope}) => useSharedCache("id", scope),
                {
                    initialProps: {scope: "scope"},
                },
            );

            // Act
            wrapper.rerender({scope: "new-scope"});
            const result1 = wrapper.result.all[wrapper.result.all.length - 2];
            const result2 = wrapper.result.current;

            // Assert
            // $FlowIgnore[prop-missing]
            expect(result1[1]).not.toBe(result2[1]);
        });

        it("should set the value in the cache", () => {
            // Arrange
            const wrapper = clientRenderHook(() =>
                useSharedCache("id", "scope"),
            );
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
        `("should purge the value from the cache if $value", ({value}) => {
            // Arrange
            const wrapper = clientRenderHook(() =>
                useSharedCache("id", "scope"),
            );
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
        const hook1 = clientRenderHook(() => useSharedCache("id", "scope"));
        const hook2 = clientRenderHook(() => useSharedCache("id", "scope"));
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
    `("should not share cache if scope is different", ({id}) => {
        // Arrange
        const hook1 = clientRenderHook(() => useSharedCache("id1", "scope1"));
        const hook2 = clientRenderHook(() => useSharedCache(id, "scope2"));
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
    `("should not share cache if id is different", ({scope}) => {
        // Arrange
        const hook1 = clientRenderHook(() => useSharedCache("id1", "scope1"));
        const hook2 = clientRenderHook(() => useSharedCache("id2", scope));
        hook1.result.current[1]("VALUE_1");

        // Act
        hook2.rerender();
        const result = hook2.result.current[0];

        // Assert
        expect(result).toBeNull();
    });
});

describe("#purgeSharedCache", () => {
    beforeEach(() => {
        purgeSharedCache();
    });

    it("should clear the entire cache if no scope given", () => {
        // Arrange
        const hook1 = clientRenderHook(() => useSharedCache("id1", "scope1"));
        const hook2 = clientRenderHook(() => useSharedCache("id2", "scope2"));
        hook1.result.current[1]("VALUE_1");
        hook2.result.current[1]("VALUE_2");
        // Make sure both hook results include the updated value.
        hook1.rerender();
        hook2.rerender();

        // Act
        purgeSharedCache();
        // Make sure we refresh the hook results.
        hook1.rerender();
        hook2.rerender();

        // Assert
        expect(hook1.result.current[0]).toBeNull();
        expect(hook2.result.current[0]).toBeNull();
    });

    it("should clear the given scope only", () => {
        // Arrange
        const hook1 = clientRenderHook(() => useSharedCache("id1", "scope1"));
        const hook2 = clientRenderHook(() => useSharedCache("id2", "scope2"));
        hook1.result.current[1]("VALUE_1");
        hook2.result.current[1]("VALUE_2");
        // Make sure both hook results include the updated value.
        hook1.rerender();
        hook2.rerender();

        // Act
        purgeSharedCache("scope2");
        // Make sure we refresh the hook results.
        hook1.rerender();
        hook2.rerender();

        // Assert
        expect(hook1.result.current[0]).toBe("VALUE_1");
        expect(hook2.result.current[0]).toBeNull();
    });
});
