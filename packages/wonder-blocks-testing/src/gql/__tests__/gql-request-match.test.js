// @flow
import {gqlRequestMatch} from "../gql-request-match.js";

describe("#gqlRequestMatch", () => {
    it("should return false if operation types don't match", () => {
        // Arrange
        const operation1 = {
            id: "foo",
            type: "query",
        };
        const operation2 = {
            id: "foo",
            type: "mutation",
        };

        // Act
        const result = gqlRequestMatch(
            operation1,
            null,
            null,
            operation2,
            null,
            {},
        );

        // Assert
        expect(result).toBe(false);
    });

    it("should return false if operation ids don't match", () => {
        // Arrange
        const operation1 = {
            id: "foo",
            type: "query",
        };
        const operation2 = {
            id: "bar",
            type: "query",
        };

        // Act
        const result = gqlRequestMatch(
            operation1,
            null,
            null,
            operation2,
            null,
            {},
        );

        // Assert
        expect(result).toBe(false);
    });

    it("should return false if variables don't match", () => {
        // Arrange
        const operation = {
            id: "foo",
            type: "query",
        };
        const variables1 = {
            foo: "bar",
        };
        const variables2 = {
            foo: "baz",
        };

        // Act
        const result = gqlRequestMatch(
            operation,
            variables1,
            null,
            operation,
            variables2,
            {},
        );

        // Assert
        expect(result).toBe(false);
    });

    it("should return false if contexts don't match", () => {
        // Arrange
        const operation = {
            id: "foo",
            type: "query",
        };
        const variables = {
            foo: "bar",
        };
        const context1 = {
            foo: "bar",
        };
        const context2 = {
            foo: "baz",
        };

        // Act
        const result = gqlRequestMatch(
            operation,
            variables,
            context1,
            operation,
            variables,
            context2,
        );

        // Assert
        expect(result).toBe(false);
    });

    it("should return true if operation matches and variables and context are null on initial operation, regardless of comparison operation variables and context", () => {
        // Arrange
        const operation = {
            id: "foo",
            type: "query",
        };

        // Act
        const result = gqlRequestMatch(
            operation,
            null,
            null,
            operation,
            {a: "variable"},
            {my: "context"},
        );

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if operation and variables match and context is null", () => {
        // Arrange
        const operation = {
            id: "foo",
            type: "query",
        };
        const variables = {
            foo: "bar",
        };

        // Act
        const result = gqlRequestMatch(
            operation,
            variables,
            null,
            operation,
            variables,
            {my: "context"},
        );

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if operation and context match and variables is null", () => {
        // Arrange
        const operation = {
            id: "foo",
            type: "query",
        };
        const context = {
            foo: "bar",
        };

        // Act
        const result = gqlRequestMatch(
            operation,
            null,
            context,
            operation,
            {a: "variable"},
            context,
        );

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if everything matches", () => {
        // Arrange
        const operation = {
            id: "foo",
            type: "query",
        };
        const variables = {
            foo: "bar",
        };
        const context = {
            foo: "bar",
        };

        // Act
        const result = gqlRequestMatch(
            operation,
            variables,
            context,
            operation,
            variables,
            context,
        );

        // Assert
        expect(result).toBe(true);
    });
});
