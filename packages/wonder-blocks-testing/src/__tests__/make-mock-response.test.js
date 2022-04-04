// @flow
import {RespondWith, makeMockResponse} from "../make-mock-response.js";

describe("RespondWith", () => {
    describe("#text", () => {
        it("should have type text", () => {
            // Arrange

            // Act
            const result = RespondWith.text("SOME TEXT");

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should provide the given text", () => {
            // Arrange

            // Act
            const mockResponse = RespondWith.text("SOME TEXT");
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.text;

            // Assert
            expect(result).toEqual("SOME TEXT");
        });
    });

    describe("#json", () => {
        it("should have type text", () => {
            // Arrange

            // Act
            const result = RespondWith.json({});

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should provide the given data in the text", () => {
            // Arrange
            const json = {
                foo: "bar",
            };

            // Act
            const mockResponse = RespondWith.json(json);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.text();

            // Assert
            expect(result).toEqual(JSON.stringify(json));
        });
    });

    describe("#graphQLData", () => {
        it("should have type text", () => {
            // Arrange

            // Act
            const result = RespondWith.graphQLData({});

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should provide the given data in the text", () => {
            // Arrange
            const data = {
                foo: "bar",
            };

            // Act
            const mockResponse = RespondWith.graphQLData(data);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.text();

            // Assert
            expect(result).toEqual(JSON.stringify({data}));
        });
    });

    describe("#unparseableBody", () => {
        it("should have type text", () => {
            // Arrange

            // Act
            const result = RespondWith.unparseableBody();

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should have text that is unparseable json", () => {
            // Arrange

            // Act
            const mockResponse = RespondWith.unparseableBody();
            // $FlowIgnore[incompatible-use]
            const underTest = () => JSON.parse(mockResponse.text);

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Unexpected token I in JSON at position 0"`,
            );
        });
    });

    describe("#abortedRequest", () => {
        it("should have type reject", () => {
            // Arrange

            // Act
            const result = RespondWith.abortedRequest();

            // Assert
            expect(result).toHaveProperty("type", "reject");
        });

        it("should provide AbortError", () => {
            // Arrange

            // Act
            const mockResponse = RespondWith.abortedRequest();
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.error();

            // Assert
            expect(result).toMatchInlineSnapshot(
                `[AbortError: Mock request aborted]`,
            );
        });
    });

    describe("#reject", () => {
        it("should have type reject", () => {
            // Arrange

            // Act
            const result = RespondWith.reject(new Error("BOOM!"));

            // Assert
            expect(result).toHaveProperty("type", "reject");
        });

        it("should have the given error", () => {
            // Arrange
            const error = new Error("BOOM!");

            // Act
            const mockResponse = RespondWith.reject(error);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.error;

            // Assert
            expect(result).toBe(error);
        });
    });

    describe("#errorStatusCode", () => {
        it("should have type text", () => {
            // Arrange

            // Act
            const result = RespondWith.errorStatusCode(400);

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should include the given status code", () => {
            // Arrange

            // Act
            const result = RespondWith.errorStatusCode(400);

            // Assert
            expect(result).toHaveProperty("statusCode", 400);
        });

        it("should throw if the status code represents success", () => {
            // Arrange

            // Act
            const result = () => RespondWith.errorStatusCode(200);

            // Assert
            expect(result).toThrowErrorMatchingInlineSnapshot(
                `"200 is not a valid error status code"`,
            );
        });
    });

    describe("#nonGraphQLBody", () => {
        it("should have type invalid", () => {
            // Arrange

            // Act
            const result = RespondWith.nonGraphQLBody();

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should have text that is valid json", () => {
            // Arrange

            // Act
            const mockResponse = RespondWith.nonGraphQLBody();
            // $FlowIgnore[incompatible-use]
            const underTest = () => JSON.parse(mockResponse.text());

            // Assert
            expect(underTest).not.toThrow();
        });

        it("should have text that is not a valid GraphQL response", () => {
            // Arrange

            // Act
            const mockResponse = RespondWith.nonGraphQLBody();
            // $FlowIgnore[incompatible-use]
            const result = JSON.parse(mockResponse.text());

            // Assert
            expect(result).toMatchInlineSnapshot(`
                Object {
                  "that": "is not a valid graphql response",
                  "valid": "json",
                }
            `);
        });
    });

    describe("#graphQLErrors", () => {
        it("should have type test", () => {
            // Arrange

            // Act
            const result = RespondWith.graphQLErrors([]);

            // Assert
            expect(result).toHaveProperty("type", "text");
        });

        it("should include the given error messages", () => {
            // Arrange
            const errorMessages = ["foo", "bar"];

            // Act
            const mockResponse = RespondWith.graphQLErrors(errorMessages);
            // $FlowIgnore[incompatible-use]
            const result = JSON.parse(mockResponse.text());

            // Assert
            expect(result).toMatchInlineSnapshot(`
                Object {
                  "errors": Array [
                    Object {
                      "message": "foo",
                    },
                    Object {
                      "message": "bar",
                    },
                  ],
                }
            `);
        });
    });
});

describe("#makeGqlErrorResponse", () => {
    it("should throw for unknown response type", () => {
        // Arrange

        // Act
        const result = () =>
            makeMockResponse(({type: "NOT A VALID TYPE"}: any));

        // Assert
        expect(result).toThrowErrorMatchingInlineSnapshot(
            `"Unknown response type: NOT A VALID TYPE"`,
        );
    });

    describe("data response", () => {
        it("should resolve to have a successful status code", async () => {
            // Arrange
            const mockResponse = RespondWith.graphQLData({});

            // Act
            const result = await makeMockResponse(mockResponse);

            // Assert
            expect(result.status).toBe(200);
        });

        it("should resolve to response with text() function that resolves to GraphQL data result", async () => {
            // Arrange
            const data = {
                foo: "bar",
            };
            const mockResponse = RespondWith.graphQLData(data);

            // Act
            const response = await makeMockResponse(mockResponse);
            const result = await response.text();

            // Assert
            expect(result).toEqual(JSON.stringify({data}));
        });
    });

    describe("unparseable body response", () => {
        it("should resolve to have a successful status code", async () => {
            // Arrange
            const mockResponse = RespondWith.unparseableBody();

            // Act
            const result = await makeMockResponse(mockResponse);

            // Assert
            expect(result.status).toBe(200);
        });

        it("should resolve to response with text() function that resolves to non-JSON text", async () => {
            // Arrange
            const mockResponse = RespondWith.unparseableBody();

            // Act
            const response = await makeMockResponse(mockResponse);
            const text = await response.text();
            const act = () => JSON.parse(text);

            // Assert
            expect(act).toThrowError();
        });
    });

    describe("aborted request response", () => {
        it("should reject with error", async () => {
            // Arrange
            const mockResponse = RespondWith.abortedRequest();

            // Act
            const act = () => makeMockResponse(mockResponse);

            // Assert
            await expect(act).rejects.toBeInstanceOf(Error);
        });

        it("should reject with an AbortError", async () => {
            // Arrange
            const mockResponse = RespondWith.abortedRequest();

            // Act
            const act = makeMockResponse(mockResponse);

            // Assert
            await expect(act).rejects.toHaveProperty("name", "AbortError");
        });
    });

    describe("rejection", () => {
        it("should reject with error", async () => {
            // Arrange
            const error = new Error("BOOM!");
            const mockResponse = RespondWith.reject(error);

            // Act
            const act = () => makeMockResponse(mockResponse);

            // Assert
            await expect(act).rejects.toBe(error);
        });
    });

    describe("error status code response", () => {
        it("should resolve to have the given status code", async () => {
            // Arrange
            const mockResponse = RespondWith.errorStatusCode(400);

            // Act
            const result = await makeMockResponse(mockResponse);

            // Assert
            expect(result.status).toBe(400);
        });

        it("should resolve to response with text() function that resolves to some parseable JSON", async () => {
            // Arrange
            const mockResponse = RespondWith.errorStatusCode(400);

            // Act
            const response = await makeMockResponse(mockResponse);
            const text = await response.text();
            const act = () => JSON.parse(text);

            // Assert
            expect(act).not.toThrowError();
        });
    });

    describe("non-graphql body response", () => {
        it("should resolve to have a successful status code", async () => {
            // Arrange
            const mockResponse = RespondWith.nonGraphQLBody();

            // Act
            const result = await makeMockResponse(mockResponse);

            // Assert
            expect(result.status).toBe(200);
        });

        it("should resolve to response with text() function that resolves to JSON parseable text that is not a valid GraphQL response", async () => {
            // Arrange
            const mockResponse = RespondWith.nonGraphQLBody();

            // Act
            const response = await makeMockResponse(mockResponse);
            const text = await response.text();
            const result = JSON.parse(text);

            // Assert
            expect(result).not.toHaveProperty("data");
            expect(result).not.toHaveProperty("errors");
        });
    });

    describe("graphql error response", () => {
        it("should resolve to have a successful status code", async () => {
            // Arrange
            const mockResponse = RespondWith.graphQLErrors([]);

            // Act
            const result = await makeMockResponse(mockResponse);

            // Assert
            expect(result.status).toBe(200);
        });

        it("should resolve to response with text() function that resolves to GraphQL error result", async () => {
            // Arrange
            const errorMessages = ["foo", "bar"];
            const mockResponse = RespondWith.graphQLErrors(errorMessages);

            // Act
            const response = await makeMockResponse(mockResponse);
            const text = await response.text();
            const result = JSON.parse(text);

            // Assert
            expect(result).toHaveProperty("errors", [
                {message: "foo"},
                {message: "bar"},
            ]);
        });
    });
});
