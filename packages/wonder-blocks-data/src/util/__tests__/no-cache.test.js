// @flow
import NoCache from "../no-cache.js";

import type {IRequestHandler} from "../types.js";

describe("NoCache", () => {
    describe("#store", () => {
        it("should not throw", () => {
            // Arrange
            const cache = new NoCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
                hydrate: true,
            };

            // Act
            const underTest = () =>
                cache.store<string, string>(fakeHandler, "options", {
                    data: "data",
                });

            // Assert
            expect(underTest).not.toThrow();
        });
    });

    describe("#retrieve", () => {
        it("should return null", () => {
            // Arrange
            const cache = new NoCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
                hydrate: true,
            };

            // Act
            const result = cache.retrieve(fakeHandler, "options");

            // Assert
            expect(result).toBeNull();
        });
    });

    describe("#remove", () => {
        it("should return false", () => {
            // Arrange
            const cache = new NoCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
                hydrate: true,
            };

            // Act
            const result = cache.remove(fakeHandler, "options");

            // Assert
            expect(result).toBeFalsy();
        });
    });

    describe("#removeAll", () => {
        it("should return 0 without predicate", () => {
            // Arrange
            const cache = new NoCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
                hydrate: true,
            };

            // Act
            const result = cache.removeAll(fakeHandler);

            // Assert
            expect(result).toBe(0);
        });

        it("should return 0 with predicate", () => {
            // Arrange
            const cache = new NoCache();
            const fakeHandler: IRequestHandler<string, string> = {
                getKey: () => "MY_KEY",
                type: "MY_HANDLER",
                shouldRefreshCache: () => false,
                fulfillRequest: jest.fn(),
                cache: null,
                hydrate: true,
            };

            // Act
            const result = cache.removeAll(fakeHandler, () => true);

            // Assert
            expect(result).toBe(0);
        });
    });
});
