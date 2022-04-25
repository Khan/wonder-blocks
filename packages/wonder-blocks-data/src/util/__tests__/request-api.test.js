// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {RequestFulfillment} from "../request-fulfillment.js";
import {RequestTracker} from "../request-tracking.js";

import {
    abortInflightRequests,
    fetchTrackedRequests,
    hasTrackedRequestsToBeFetched,
} from "../request-api.js";

describe("#fetchTrackedRequests", () => {
    describe("when server-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should call RequestTracker.Default.fulfillTrackedRequests", () => {
            // Arrange
            const fulfillTrackedRequestsSpy = jest.spyOn(
                RequestTracker.Default,
                "fulfillTrackedRequests",
            );

            // Act
            fetchTrackedRequests();

            // Assert
            expect(fulfillTrackedRequestsSpy).toHaveBeenCalled();
        });

        it("should return the response cache", async () => {
            // Arrange
            const responseCache = {};
            jest.spyOn(
                RequestTracker.Default,
                "fulfillTrackedRequests",
            ).mockResolvedValue(responseCache);

            // Act
            const result = await fetchTrackedRequests();

            // Assert
            expect(result).toBe(responseCache);
        });
    });

    describe("when client-side", () => {
        const NODE_ENV = process.env.NODE_ENV;
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        afterEach(() => {
            if (NODE_ENV === undefined) {
                delete process.env.NODE_ENV;
            } else {
                process.env.NODE_ENV = NODE_ENV;
            }
        });

        describe("in production", () => {
            it("should reject with error", async () => {
                // Arrange
                process.env.NODE_ENV = "production";

                // Act
                const result = fetchTrackedRequests();

                // Assert
                await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
                    `"No CSR tracking"`,
                );
            });
        });

        describe("not in production", () => {
            it("should reject with error", async () => {
                // Arrange
                process.env.NODE_ENV = "test";

                // Act
                const result = fetchTrackedRequests();

                // Assert
                await expect(result).rejects.toThrowErrorMatchingInlineSnapshot(
                    `"Data requests are not tracked for fulfillment when when client-side"`,
                );
            });
        });
    });
});

describe("#hasTrackedRequestsToBeFetched", () => {
    describe("when server-side", () => {
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(true);
        });

        it("should call RequestTracker.Default.hasUnfulfilledRequests", () => {
            // Arrange
            const hasUnfulfilledRequestsSpy = jest.spyOn(
                RequestTracker.Default,
                "hasUnfulfilledRequests",
                "get",
            );

            // Act
            hasTrackedRequestsToBeFetched();

            // Assert
            expect(hasUnfulfilledRequestsSpy).toHaveBeenCalled();
        });

        it("should return the boolean value from RequestTracker.Default.hasUnfulfilledRequests", () => {
            // Arrange
            jest.spyOn(
                RequestTracker.Default,
                "hasUnfulfilledRequests",
                "get",
            ).mockReturnValue(true);

            // Act
            const result = hasTrackedRequestsToBeFetched();

            // Assert
            expect(result).toBeTrue();
        });
    });

    describe("when client-side", () => {
        const NODE_ENV = process.env.NODE_ENV;
        beforeEach(() => {
            jest.spyOn(Server, "isServerSide").mockReturnValue(false);
        });

        afterEach(() => {
            if (NODE_ENV === undefined) {
                delete process.env.NODE_ENV;
            } else {
                process.env.NODE_ENV = NODE_ENV;
            }
        });

        describe("in production", () => {
            it("should reject with error", () => {
                // Arrange
                process.env.NODE_ENV = "production";

                // Act
                const underTest = () => hasTrackedRequestsToBeFetched();

                // Assert
                expect(underTest).toThrowErrorMatchingInlineSnapshot(
                    `"No CSR tracking"`,
                );
            });
        });

        describe("not in production", () => {
            it("should reject with error", () => {
                // Arrange
                process.env.NODE_ENV = "test";

                // Act
                const underTest = () => hasTrackedRequestsToBeFetched();

                // Assert
                expect(underTest).toThrowErrorMatchingInlineSnapshot(
                    `"Data requests are not tracked for fulfillment when when client-side"`,
                );
            });
        });
    });
});

describe("#abortInflightRequests", () => {
    it("should call RequestFulfillment.Default.abortAll", () => {
        // Arrange
        const abortAllSpy = jest.spyOn(RequestFulfillment.Default, "abortAll");

        // Act
        abortInflightRequests();

        // Assert
        expect(abortAllSpy).toHaveBeenCalled();
    });
});
