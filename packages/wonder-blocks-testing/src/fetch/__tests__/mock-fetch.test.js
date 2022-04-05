// @flow
import {Request} from "node-fetch";
import {RespondWith} from "../../make-mock-response.js";
import {mockFetch} from "../mock-fetch.js";

describe("#mockFetch", () => {
    it.each`
        input                                    | init
        ${"http://example.com/foo"}              | ${undefined}
        ${new URL("http://example.com/foo")}     | ${{method: "GET"}}
        ${new Request("http://example.com/foo")} | ${{method: "POST"}}
    `(
        "should reject with a useful error when there are no matching mocks for %s",
        async ({input, init}) => {
            // Arrange
            const mockFn = mockFetch();

            // Act
            const result = mockFn(input, init);

            // Assert
            await expect(result).rejects.toThrowErrorMatchingSnapshot();
        },
    );

    describe("mockOperation", () => {
        it("should match a similar operation", async () => {
            // Arrange
            const mockFn = mockFetch();
            const operation = "http://example.com/foo";

            // Act
            mockFn.mockOperation(operation, RespondWith.text("TADA!"));
            const result = mockFn(operation, {method: "GET"});

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should not match a different operation", async () => {
            // Arrange
            const mockFn = mockFetch();
            const operation = "http://example.com/foo";

            // Act
            mockFn.mockOperation(operation, RespondWith.text("TADA!"));
            const result = mockFn("http://example.com/bar", {method: "GET"});

            // Assert
            await expect(result).rejects.toThrowError();
        });
    });

    describe("mockOperationOnce", () => {
        it("should match once", async () => {
            // Arrange
            const mockFn = mockFetch();
            const operation = "http://example.com/foo";

            // Act
            mockFn.mockOperationOnce(operation, RespondWith.text("TADA!"));
            const result = mockFn(operation, {method: "GET"});

            // Assert
            await expect(result).resolves.toBeDefined();
        });

        it("should only match once", async () => {
            // Arrange
            const mockFn = mockFetch();
            const operation = "http://example.com/foo";

            // Act
            mockFn.mockOperationOnce(operation, RespondWith.text("TADA!"));
            const result = Promise.all([
                mockFn(operation, {method: "GET"}),
                mockFn(operation, {method: "POST"}),
            ]);

            // Assert
            await expect(result).rejects.toThrowError();
        });
    });
});
