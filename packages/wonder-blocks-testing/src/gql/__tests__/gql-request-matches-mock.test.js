// @flow
import {gqlRequestMatchesMock} from "../gql-request-matches-mock.js";

describe("#gqlRequestMatchesMock", () => {
    it("should return false if operation types don't match", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
        };
        const operation = {
            id: "foo",
            type: "mutation",
        };

        // Act
        const result = gqlRequestMatchesMock(mock, operation, null, {});

        // Assert
        expect(result).toBe(false);
    });

    it("should return false if operation ids don't match", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
        };

        // Act
        const result = gqlRequestMatchesMock(
            mock,
            {
                id: "bar",
                type: "query",
            },
            null,
            {},
        );

        // Assert
        expect(result).toBe(false);
    });

    it.each([{foo: "bar"}, {foo: "baz", anExtra: "property"}, null])(
        "should return false if variables don't match",
        (variables) => {
            // Arrange
            const mock = {
                operation: {
                    id: "foo",
                    type: "query",
                },
                variables: {
                    foo: "baz",
                },
            };
            const operation = {
                id: "foo",
                type: "query",
            };

            // Act
            const result = gqlRequestMatchesMock(
                mock,
                operation,
                variables,
                {},
            );

            // Assert
            expect(result).toBe(false);
        },
    );

    it.each([{a: "context"}, null])(
        "should return false if contexts don't match",
        (context) => {
            // Arrange
            const mock = {
                operation: {
                    id: "foo",
                    type: "query",
                },
                variables: {
                    foo: "bar",
                },
                context: {
                    mock: "context",
                },
            };
            const operation = {
                id: "foo",
                type: "query",
            };
            const variables = {
                foo: "bar",
            };

            // Act
            const result = gqlRequestMatchesMock(
                mock,
                operation,
                variables,
                context,
            );

            // Assert
            expect(result).toBe(false);
        },
    );

    it("should return true if operation matches and mock does not include context nor variables, regardless of comparison operation variables and context", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
        };

        // Act
        const result = gqlRequestMatchesMock(
            mock,
            {
                id: "foo",
                type: "query",
            },
            {a: "variable"},
            {my: "context"},
        );

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if operation and variables match and there is no mock context", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
            variables: {
                foo: "bar",
            },
        };

        // Act
        const result = gqlRequestMatchesMock(
            mock,
            {
                id: "foo",
                type: "query",
            },
            {
                foo: "bar",
            },
            {my: "context"},
        );

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if operation and context match and there are no mock variables", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
            context: {
                foo: "bar",
            },
        };

        // Act
        const result = gqlRequestMatchesMock(
            mock,
            {
                id: "foo",
                type: "query",
            },
            {a: "variable"},
            {
                foo: "bar",
            },
        );

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if everything matches", () => {
        // Arrange
        const mock = {
            operation: {
                id: "foo",
                type: "query",
            },
            variables: {
                foo: "bar",
            },
            context: {
                foo: "bar",
            },
        };
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
        const result = gqlRequestMatchesMock(
            mock,
            operation,
            {...variables},
            {...context},
        );

        // Assert
        expect(result).toBe(true);
    });
});
