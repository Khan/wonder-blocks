// @flow
import {mergeGqlContext} from "../merge-gql-context.js";

describe("#mergeGqlContext", () => {
    it("should combine the default context with the given overrides", () => {
        // Arrange
        const baseContext = {
            foo: "bar",
        };

        // Act
        const result = mergeGqlContext<any>(baseContext, {
            fiz: "baz",
        });

        // Assert
        expect(result).toStrictEqual({
            foo: "bar",
            fiz: "baz",
        });
    });

    it("should overwrite values in the default context with the given overrides", () => {
        // Arrange
        const baseContext = {
            foo: "bar",
        };

        // Act
        const result = mergeGqlContext<any>(baseContext, {
            foo: "boo",
        });

        // Assert
        expect(result).toStrictEqual({
            foo: "boo",
        });
    });

    it("should not overwrite values in the default context with undefined values in the given overrides", () => {
        // Arrange
        const baseContext = {
            foo: "bar",
        };

        // Act
        const result = mergeGqlContext<any>(baseContext, {
            foo: undefined,
        });

        // Assert
        expect(result).toStrictEqual({
            foo: "bar",
        });
    });

    it("should delete values in the default context when the value is null in the given overrides", () => {
        // Arrange
        const baseContext = {
            foo: "bar",
            fiz: "baz",
        };

        // Act
        const result = mergeGqlContext<any>(baseContext, {
            fiz: null,
        });

        // Assert
        expect(result).toStrictEqual({
            foo: "bar",
        });
    });
});
