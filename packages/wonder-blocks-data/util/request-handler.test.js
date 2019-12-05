// @flow
import RequestHandler from "./request-handler.js";

describe("./request-handler.js", () => {
    afterEach(() => {
        /**
         * This is needed or the JSON.stringify mocks need to be
         * mockImplementationOnce. This is because if the snapshots need
         * to update, they write the inline snapshot and that appears to invoke
         * prettier which in turn, calls JSON.stringify. And if that mock
         * throws, then boom. No snapshot update and a big old confusing test
         * failure.
         */
        jest.restoreAllMocks();
    });

    describe("#get type", () => {
        it("should return value passed in construction", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE");

            // Act
            const result = handler.type;

            // Assert
            expect(result).toBe("MY_TYPE");
        });
    });

    describe("#getKey", () => {
        it("should return a key for given options", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE");

            // Act
            const result = handler.getKey({some: "options"});

            // Assert
            expect(result).toMatchInlineSnapshot(
                `"{\\"some\\":\\"options\\"}"`,
            );
        });

        it("should return a key for undefined options", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE");

            // Act
            const result = handler.getKey(undefined);

            // Assert
            expect(result).toMatchInlineSnapshot(`"undefined"`);
        });

        it("should throw if JSON.stringify fails", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE");
            jest.spyOn(JSON, "stringify").mockImplementation(() => {
                throw new Error("OH NOES!");
            });

            // Act
            const underTest = () => handler.getKey({});

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Failed to auto-generate key: Error: OH NOES!"`,
            );
        });
    });

    describe("#invalidateCache", () => {
        it("should return false", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE");

            // Act
            const result = handler.invalidateCache({});

            // Assert
            expect(result).toBeFalsy();
        });
    });

    describe("#fulfillRequest", () => {
        it("should throw", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE");

            // Act
            const underTest = () => handler.fulfillRequest("options");

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Not implemented"`,
            );
        });
    });
});
