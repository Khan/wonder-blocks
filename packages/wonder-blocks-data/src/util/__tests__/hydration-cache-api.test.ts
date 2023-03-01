import {SsrCache} from "../ssr-cache";

import {
    initializeHydrationCache,
    purgeHydrationCache,
} from "../hydration-cache-api";

describe("#initializeHydrationCache", () => {
    it("should call SsrCache.Default.initialize", () => {
        // Arrange
        const sourceCache: Record<string, any> = {};
        const initSpy = jest.spyOn(SsrCache.Default, "initialize");

        // Act
        initializeHydrationCache(sourceCache);

        // Assert
        expect(initSpy).toHaveBeenCalledWith(sourceCache);
    });
});

describe("#purgeHydrationCache", () => {
    it("should call SsrCache.Default.purgeData", () => {
        // Arrange
        const predicate = jest.fn();
        const purgeDataSpy = jest.spyOn(SsrCache.Default, "purgeData");

        // Act
        purgeHydrationCache(predicate);

        // Assert
        expect(purgeDataSpy).toHaveBeenCalledWith(predicate);
    });
});
