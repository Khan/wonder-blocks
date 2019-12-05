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
            const handler = new RequestHandler("MY_TYPE", () =>
                Promise.resolve("DATA"),
            );

            // Act
            const result = handler.type;

            // Assert
            expect(result).toBe("MY_TYPE");
        });
    });

    describe("#getKey", () => {
        it("should return a key for given options", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE", () =>
                Promise.resolve("DATA"),
            );

            // Act
            const result = handler.getKey({some: "options"});

            // Assert
            expect(result).toMatchInlineSnapshot(
                `"{\\"some\\":\\"options\\"}"`,
            );
        });

        it("should return a key for undefined options", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE", () =>
                Promise.resolve("DATA"),
            );

            // Act
            const result = handler.getKey(undefined);

            // Assert
            expect(result).toMatchInlineSnapshot(`"undefined"`);
        });

        it("should throw if JSON.stringify fails", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE", () =>
                Promise.resolve("DATA"),
            );
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

    describe("#cacheHitBehavior", () => {
        it("should return static when no value provide in constructor", () => {
            // Arrange
            const handler = new RequestHandler("MY_TYPE", () =>
                Promise.resolve("DATA"),
            );

            // Act
            const result = handler.cacheHitBehavior({});

            // Assert
            expect(result).toBe("static");
        });

        it.each("static", "refresh")("should return %s", (behavior) => {
            // Arrange
            const handler = new RequestHandler(
                "MY_TYPE",
                () => Promise.resolve("DATA"),
                behavior,
            );

            // Act
            const result = handler.cacheHitBehavior({});

            // Assert
            expect(result).toBe(behavior);
        });
    });

    describe("#fulfillRequest", () => {
        it("should call passed fulfillment method", async () => {
            // Arrange
            const fakeFulfillmentFn = jest.fn(() => Promise.resolve("DATA"));
            const handler = new RequestHandler("MY_TYPE", fakeFulfillmentFn);

            // Act
            await handler.fulfillRequest("options");

            // Assert
            expect(fakeFulfillmentFn).toHaveBeenCalledWith("options");
            expect(fakeFulfillmentFn).toHaveBeenCalledTimes(1);
        });

        it("should return inflight request for repeated static requests", () => {
            // Arrange
            const promise = new Promise((resolve, reject) => {});
            const handler = new RequestHandler("MY_TYPE", () => promise);
            const p1 = handler.fulfillRequest("options");

            // Act
            const p2 = handler.fulfillRequest("options");

            // Assert
            expect(p1).toBe(promise);
            expect(p2).toBe(promise);
        });

        it("should execute refresh requests in order", async () => {
            // Arrange
            const order = [];
            const fulfillmentFn = (timeout: number) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        order.push(timeout);
                        resolve(timeout);
                    }, timeout);
                });

            class MyRequestHandler extends RequestHandler<number, number> {
                /**
                 * We want all our promises to be the same request, so let's
                 * provide our own key function.
                 */
                getKey = () => "SAME_KEY";
            }
            const handler = new MyRequestHandler(
                "MY_TYPE",
                fulfillmentFn,
                "refresh",
            );

            // Act
            /**
             * These promises will resolve in the opposite order on their own,
             * based on their timeout values. However, they should be applied in
             * order when behavior is "refresh" occurs.
             */
            /* eslint-disable promise/catch-or-return */
            handler.fulfillRequest(200);
            handler.fulfillRequest(100);
            await handler.fulfillRequest(50);
            /* eslint-enable promise/catch-or-return */

            // Assert
            expect(order).toStrictEqual([200, 100, 50]);
        });

        it("should throw if unexpected cache behavior", () => {
            // Arrange
            const promise = new Promise((resolve, reject) => {});
            const handler = new RequestHandler(
                "MY_TYPE",
                () => promise,
                /**
                 * We're passing the wrong thing on purpose for the test
                 * $FlowIgnore
                 */
                "madethisup",
            );

            // Act
            const underTest = () => handler.fulfillRequest("options");

            // Assert
            expect(underTest).toThrowErrorMatchingInlineSnapshot(
                `"Unknown cache hit behavior: madethisup"`,
            );
        });
    });
});
