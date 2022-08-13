// @flow
import {SettleSignal} from "../settle-signal.js";
import {SettleController} from "../settle-controller.js";
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.text("SOME TEXT", 200, signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();
            const json = {
                foo: "bar",
            };

            // Act
            const mockResponse = RespondWith.json(json, signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();
            const data = {
                foo: "bar",
            };

            // Act
            const mockResponse = RespondWith.graphQLData(data, signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.unparseableBody(signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.abortedRequest(signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const error = new Error("BOOM!");
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.reject(error, signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.errorStatusCode(400, signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.nonGraphQLBody(signal);
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
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

        it("should include the signal if passed one", () => {
            // Arrange
            const errorMessages = ["foo", "bar"];
            const signal = new SettleSignal();

            // Act
            const mockResponse = RespondWith.graphQLErrors(
                errorMessages,
                signal,
            );
            // $FlowIgnore[incompatible-use]
            const result = mockResponse.signal;

            // Assert
            expect(result).toBe(signal);
        });
    });
});

describe("#makeMockResponse", () => {
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

        it("should resolve to response with json of GraphQL data result", async () => {
            // Arrange
            const data = {
                foo: "bar",
            };
            const mockResponse = RespondWith.graphQLData(data);

            // Act
            const response = await makeMockResponse(mockResponse);
            const result = response.json();

            // Assert
            await expect(result).resolves.toEqual({data});
        });

        it("should resolve is signal is already settled", async () => {
            // Arrange
            const signal = SettleSignal.settle();
            const mockResponse = RespondWith.graphQLData({}, signal);

            // Act
            const result = makeMockResponse(mockResponse);

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should resolve when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const mockResponse2 = RespondWith.graphQLData(
                {
                    response: "resolves",
                },
                signal2.signal,
            );

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();
            const response = await underTest;
            const result = await response.json();

            // Assert
            expect(result).toEqual({
                data: {
                    response: "resolves",
                },
            });
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

        it("should resolve to response that resolves to non-JSON text", async () => {
            // Arrange
            const mockResponse = RespondWith.unparseableBody();

            // Act
            const response = await makeMockResponse(mockResponse);
            const act = response.json();

            // Assert
            await expect(act).rejects.toThrowError();
        });

        it("should resolve when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const mockResponse2 = RespondWith.unparseableBody(signal2.signal);

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();
            const response = await underTest;
            const act = response.json();

            // Assert
            await expect(act).rejects.toThrowError();
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

        it("should reject when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const mockResponse2 = RespondWith.abortedRequest(signal2.signal);

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();

            // Assert
            await expect(underTest).rejects.toThrowError();
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

        it("should reject when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const error = new Error("BOOM!");
            const mockResponse2 = RespondWith.reject(error, signal2.signal);

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();

            // Assert
            await expect(underTest).rejects.toThrowError();
        });
    });

    describe("error status code response", () => {
        it("should resolve to have the given status code", async () => {
            // Arrange
            const mockResponse = RespondWith.errorStatusCode(400);

            // Act
            const result = await makeMockResponse(mockResponse);

            // Assert
            expect(result).toHaveProperty("status", 400);
        });

        it("should resolve to response that resolves to some parseable JSON", async () => {
            // Arrange
            const mockResponse = RespondWith.errorStatusCode(400);

            // Act
            const response = await makeMockResponse(mockResponse);
            const act = response.json();

            // Assert
            await expect(act).resolves.not.toThrowError();
        });

        it("should resolve when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const mockResponse2 = RespondWith.errorStatusCode(
                400,
                signal2.signal,
            );

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();

            // Assert
            await expect(underTest).resolves.toHaveProperty("status", 400);
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

        it("should resolve to response that resolves to JSON parseable text that is not a valid GraphQL response", async () => {
            // Arrange
            const mockResponse = RespondWith.nonGraphQLBody();

            // Act
            const response = await makeMockResponse(mockResponse);
            const result = await response.json();

            // Assert
            expect(result).not.toHaveProperty("data");
            expect(result).not.toHaveProperty("errors");
        });

        it("should resolve when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const mockResponse2 = RespondWith.nonGraphQLBody(signal2.signal);

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();
            const response = await underTest;
            const result = await response.json();

            // Assert
            expect(result).not.toHaveProperty("data");
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

        it("should resolve to response with json of GraphQL error result", async () => {
            // Arrange
            const errorMessages = ["foo", "bar"];
            const mockResponse = RespondWith.graphQLErrors(errorMessages);

            // Act
            const response = await makeMockResponse(mockResponse);
            const result = await response.json();

            // Assert
            expect(result).toHaveProperty("errors", [
                {message: "foo"},
                {message: "bar"},
            ]);
        });

        it("should resolve when signal is settled", async () => {
            // Arrange
            const signal1 = new SettleController();
            const mockResponse1 = RespondWith.graphQLData(
                {
                    response: "stays pending",
                },
                signal1.signal,
            );
            const signal2 = new SettleController();
            const errorMessages = ["foo", "bar"];
            const mockResponse2 = RespondWith.graphQLErrors(
                errorMessages,
                signal2.signal,
            );

            // Act
            const underTest = Promise.race([
                makeMockResponse(mockResponse1),
                makeMockResponse(mockResponse2),
            ]);
            signal2.settle();
            const response = await underTest;
            const result = await response.json();

            // Assert
            expect(result).toHaveProperty("errors");
        });
    });
});
