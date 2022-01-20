// @flow
import {getGqlDataFromResponse} from "../get-gql-data-from-response.js";

describe("#getGqlDataFromReponse", () => {
    it("should throw if the response cannot be parsed", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() => Promise.resolve("BAD JSON")),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(`
                    "Failed to parse response
                    	caused by
                    		SyntaxError: Unexpected token B in JSON at position 0"
                `);
    });

    it("should include status code and body text in parse error metadata", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() => Promise.resolve("BAD JSON")),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toHaveProperty("metadata", {
            statusCode: 200,
            bodyText: "BAD JSON",
        });
    });

    it("should throw if the status code is not <300", async () => {
        // Arrange
        const response: any = {
            status: 400,
            text: jest.fn(() => Promise.resolve("{}")),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
            `"Response unsuccessful"`,
        );
    });

    it("should include status code and result in response error metadata", async () => {
        // Arrange
        const response: any = {
            status: 400,
            text: jest.fn(() =>
                Promise.resolve(JSON.stringify({data: "DATA"})),
            ),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toHaveProperty("metadata", {
            statusCode: 400,
            result: {
                data: "DATA",
            },
        });
    });

    it("should throw if the response is malformed", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() => Promise.resolve("{}")),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
            `"Server response missing"`,
        );
    });

    it("should include the status code and the result in the malformed response error", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() =>
                Promise.resolve(JSON.stringify({malformed: "response"})),
            ),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toHaveProperty("metadata", {
            statusCode: 200,
            result: {
                malformed: "response",
            },
        });
    });

    it("should throw if the response has GraphQL errors", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() =>
                Promise.resolve(
                    JSON.stringify({
                        data: {},
                        errors: [{message: "GraphQL error"}],
                    }),
                ),
            ),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
            `"GraphQL errors"`,
        );
    });

    it("should include the status code and result in the metadata", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() =>
                Promise.resolve(
                    JSON.stringify({
                        data: {},
                        errors: [{message: "GraphQL error"}],
                    }),
                ),
            ),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).rejects.toHaveProperty("metadata", {
            statusCode: 200,
            result: {
                data: {},
                errors: [{message: "GraphQL error"}],
            },
        });
    });

    it("should resolve to the response data", async () => {
        // Arrange
        const response: any = {
            status: 200,
            text: jest.fn(() =>
                Promise.resolve(
                    JSON.stringify({
                        data: {
                            test: "test",
                        },
                    }),
                ),
            ),
        };

        // Act
        const result = getGqlDataFromResponse(response);

        // Assert
        await expect(result).resolves.toEqual({
            test: "test",
        });
    });
});
