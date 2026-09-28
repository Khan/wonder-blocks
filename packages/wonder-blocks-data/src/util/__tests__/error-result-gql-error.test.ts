import {ErrorResultGqlError} from "../error-result-gql-error";
import {GqlError} from "../gql-error";

describe("ErrorResultGqlError", () => {
    it("should be a GqlError", () => {
        // Arrange
        const payload = {errors: [{message: "GraphQL error"}]};

        // Act
        const error = new ErrorResultGqlError(200, payload);

        // Assert
        expect(error).toBeInstanceOf(GqlError);
    });

    it("should have the ErrorResult kind", () => {
        // Arrange
        const payload = {errors: [{message: "GraphQL error"}]};

        // Act
        const error = new ErrorResultGqlError(200, payload);

        // Assert
        expect(error.kind).toBe("ErrorResult");
    });

    it("should expose the status code", () => {
        // Arrange
        const payload = {errors: [{message: "GraphQL error"}]};

        // Act
        const error = new ErrorResultGqlError(200, payload);

        // Assert
        expect(error.statusCode).toBe(200);
    });

    it("should expose the result payload", () => {
        // Arrange
        const payload = {
            data: {thing: null, other: "value"},
            errors: [{message: "GraphQL error", path: ["thing"]}],
        };

        // Act
        const error = new ErrorResultGqlError(200, payload);

        // Assert
        expect(error.result).toBe(payload);
    });

    it("should attach the status code and result as metadata", () => {
        // Arrange
        const payload = {
            data: {thing: null},
            errors: [{message: "GraphQL error"}],
        };

        // Act
        const error = new ErrorResultGqlError(200, payload);

        // Assert
        expect(error.metadata).toEqual({statusCode: 200, result: payload});
    });
});
