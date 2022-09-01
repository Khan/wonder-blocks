// @flow
import {SettleController} from "../settle-controller.js";
import {RespondWith} from "../respond-with.js";

describe("RespondWith", () => {
    describe("#text.toPromise", () => {
        it("should respond with the given text", async () => {
            // Arrange

            // Act
            const response = await RespondWith.text("SOME TEXT").toPromise();
            const result = await response.text();

            // Assert
            expect(result).toBe("SOME TEXT");
        });

        it("should respond with the given status code", async () => {
            // Arrange

            // Act
            const result = await RespondWith.text("SOME TEXT", 204).toPromise();

            // Assert
            expect(result).toHaveProperty("status", 204);
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.text(
                "SIGNALLED",
                200,
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.text(
                "SIGNALLED",
                200,
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("SIGNALLED");
        });
    });

    describe("#json.toPromise", () => {
        it("should respond with the given json", async () => {
            // Arrange

            // Act
            const response = await RespondWith.json({
                some: "json",
            }).toPromise();
            const result = await response.json();

            // Assert
            expect(result).toStrictEqual({some: "json"});
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.json(
                {result: "SIGNALLED"},
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.json(
                {result: "SIGNALLED"},
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.json();

            // Assert
            expect(result).toStrictEqual({result: "SIGNALLED"});
        });
    });

    describe("#graphQLData", () => {
        it("should respond with the given GraphQL data", async () => {
            // Arrange

            // Act
            const response = await RespondWith.graphQLData({
                some: "json",
            }).toPromise();
            const result = await response.json();

            // Assert
            expect(result).toStrictEqual({data: {some: "json"}});
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.graphQLData(
                {result: "SIGNALLED"},
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.graphQLData(
                {result: "SIGNALLED"},
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.json();

            // Assert
            expect(result).toStrictEqual({data: {result: "SIGNALLED"}});
        });
    });

    describe("#unparseableBody", () => {
        it("should reject JSON as unparseable", async () => {
            // Arrange

            // Act
            const response = await RespondWith.unparseableBody().toPromise();
            const act = response.json();

            // Assert
            await expect(act).rejects.toThrowErrorMatchingInlineSnapshot(
                `"invalid json response body at  reason: Unexpected token I in JSON at position 0"`,
            );
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.unparseableBody(
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.unparseableBody(
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const act = firstResponse.json();

            // Assert
            await expect(act).rejects.toThrowError();
        });
    });

    describe("#abortedRequest", () => {
        it("should reject with AbortError", async () => {
            // Arrange

            // Act
            const act = RespondWith.abortedRequest().toPromise();

            // Assert
            await expect(act).rejects.toThrowErrorMatchingInlineSnapshot(
                `"Mock request aborted"`,
            );
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.abortedRequest(
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const act = Promise.race([settleableResponse, otherResponse]);

            // Assert
            await expect(act).resolves;
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.abortedRequest(
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const act = Promise.race([settleableResponse, otherResponse]);

            // Assert
            await expect(act).rejects.toThrowError();
        });
    });

    describe("#reject", () => {
        it("should reject with AbortError", async () => {
            // Arrange

            // Act
            const act = RespondWith.reject(new Error("BOOM!")).toPromise();

            // Assert
            await expect(act).rejects.toThrowErrorMatchingInlineSnapshot(
                `"BOOM!"`,
            );
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.reject(
                new Error("BOOM!"),
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const act = Promise.race([settleableResponse, otherResponse]);

            // Assert
            await expect(act).resolves;
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.reject(
                new Error("BOOM!"),
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const act = Promise.race([settleableResponse, otherResponse]);

            // Assert
            await expect(act).rejects.toThrowError();
        });
    });

    describe("#errorStatusCode", () => {
        it("should throw if the status code represents success", () => {
            // Arrange

            // Act
            const result = () => RespondWith.errorStatusCode(200);

            // Assert
            expect(result).toThrowErrorMatchingInlineSnapshot(
                `"200 is not a valid error status code"`,
            );
        });

        it("should respond with the given status code", async () => {
            // Arrange

            // Act
            const result = await RespondWith.errorStatusCode(400).toPromise();

            // Assert
            expect(result).toHaveProperty("status", 400);
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.errorStatusCode(
                500,
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.errorStatusCode(
                500,
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const result = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);

            // Assert
            expect(result).toHaveProperty("status", 500);
        });
    });

    describe("#nonGraphQLBody", () => {
        it("should respond with valid json", async () => {
            // Arrange

            // Act
            const response = await RespondWith.nonGraphQLBody().toPromise();
            const act = response.json();

            // Assert
            await expect(act).resolves.not.toThrow();
        });

        it("should respond with JSON that is not a valid GraphQL response", async () => {
            // Arrange

            // Act
            const response = await RespondWith.nonGraphQLBody().toPromise();
            const result = await response.json();

            // Assert
            expect(result).toMatchInlineSnapshot(`
                {
                  "that": "is not a valid graphql response",
                  "valid": "json",
                }
            `);
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.nonGraphQLBody(
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.nonGraphQLBody(
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.json();

            // Assert
            expect(result).toStrictEqual({
                valid: "json",
                that: "is not a valid graphql response",
            });
        });
    });

    describe("#graphQLErrors", () => {
        it("should respond with the given GraphQL errors", async () => {
            // Arrange

            // Act
            const response = await RespondWith.graphQLErrors([
                "BOOM!",
                "BANG!",
            ]).toPromise();
            const result = await response.json();

            // Assert
            expect(result).toStrictEqual({
                errors: [{message: "BOOM!"}, {message: "BANG!"}],
            });
        });

        it("should not settle if the signal is not raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.graphQLErrors(
                ["BOOM!", "BANG!"],
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.text();

            // Assert
            expect(result).toBe("NO SIGNAL");
        });

        it("should settle if the signal is raised", async () => {
            // Arrange
            const settleController = new SettleController();
            const settleableResponse = RespondWith.graphQLErrors(
                ["SIGNALLED"],
                settleController.signal,
            ).toPromise();
            const otherResponse = RespondWith.text("NO SIGNAL").toPromise();

            // Act
            settleController.settle();
            const firstResponse = await Promise.race([
                settleableResponse,
                otherResponse,
            ]);
            const result = await firstResponse.json();

            // Assert
            expect(result).toStrictEqual({
                errors: [{message: "SIGNALLED"}],
            });
        });
    });
});
