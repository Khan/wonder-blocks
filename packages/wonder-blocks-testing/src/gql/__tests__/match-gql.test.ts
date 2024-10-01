import {it, expect, describe} from "@jest/globals";

import {GqlOperation} from "@khanacademy/wonder-blocks-data";
import {matchGql} from "../match-gql";

describe("matchGql", () => {
    it("should return a mock operation matcher with the provided operation", () => {
        // Arrange
        const operation: GqlOperation<any, any> = {
            type: "query",
            id: "getMyStuff",
        };

        // Act
        const result = matchGql(operation);

        // Assert
        expect(result).toStrictEqual(
            expect.objectContaining({
                operation,
            }),
        );
    });

    it("should expose the withVariables and withContext methods", () => {
        // Arrange
        const operation: GqlOperation<any, any> = {
            type: "query",
            id: "getMyStuff",
        };

        // Act
        const result = matchGql(operation);

        // Assert
        expect(result).toStrictEqual(
            expect.objectContaining({
                withVariables: expect.any(Function),
                withContext: expect.any(Function),
            }),
        );
    });

    it("should return a mock operation matcher with the provided variables when withVariables is called", () => {
        // Arrange
        const operation: GqlOperation<any, any> = {
            type: "query",
            id: "getMyStuff",
        };
        const variables = {
            id: "123",
        };

        // Act
        const result = matchGql(operation).withVariables(variables);

        // Assert
        expect(result).toStrictEqual(
            expect.objectContaining({
                operation,
                variables,
            }),
        );
    });

    it("should return a mock operation matcher with the provided context when withContext is called", () => {
        // Arrange
        const operation: GqlOperation<any, any> = {
            type: "query",
            id: "getMyStuff",
        };
        const context = {
            locale: "en",
        };

        // Act
        const result = matchGql(operation).withContext(context);

        // Assert
        expect(result).toStrictEqual(
            expect.objectContaining({
                operation,
                context,
            }),
        );
    });

    it("should return a mock operation matcher with the provided context and variables when both withVariables and withContext are called", () => {
        // Arrange
        const operation: GqlOperation<any, any> = {
            type: "query",
            id: "getMyStuff",
        };
        const variables = {
            id: "123",
        };
        const context = {
            locale: "en",
        };

        // Act
        const result = matchGql(operation)
            .withVariables(variables)
            .withContext(context);

        // Assert
        expect(result).toStrictEqual(
            expect.objectContaining({
                operation,
                variables,
                context,
            }),
        );
    });
});
