import {DataError, DataErrors} from "../data-error";
import {ErrorResultGqlError} from "../error-result-gql-error";
import {GqlError, GqlErrors} from "../gql-error";
import {isErrorResultGqlError} from "../is-error-result-gql-error";

describe("#isErrorResultGqlError", () => {
    it("should return true for an ErrorResultGqlError", () => {
        // Arrange
        const error = new ErrorResultGqlError(200, {
            errors: [{message: "GraphQL error"}],
        });

        // Act
        const result = isErrorResultGqlError(error);

        // Assert
        expect(result).toBe(true);
    });

    it("should return false for a GqlError of a different kind", () => {
        // Arrange
        const error = new GqlError("Bad response", GqlErrors.BadResponse, {
            metadata: {statusCode: 200, result: {}},
        });

        // Act
        const result = isErrorResultGqlError(error);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false for a DataError", () => {
        // Arrange
        const error = new DataError("Network", DataErrors.Network);

        // Act
        const result = isErrorResultGqlError(error);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false for a plain Error", () => {
        // Arrange
        const error = new Error("Boom!");

        // Act
        const result = isErrorResultGqlError(error);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false for a non-error value", () => {
        // Arrange
        const value = {statusCode: 200, result: {errors: []}};

        // Act
        const result = isErrorResultGqlError(value);

        // Assert
        expect(result).toBe(false);
    });
});
