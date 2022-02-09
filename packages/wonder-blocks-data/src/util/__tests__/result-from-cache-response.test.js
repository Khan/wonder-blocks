// @flow
import {resultFromCachedResponse} from "../result-from-cache-response.js";

describe("#resultFromCachedResponse", () => {
    it("should return loading status if cache entry is null", () => {
        // Arrange
        const cacheEntry = null;

        // Act
        const result = resultFromCachedResponse(cacheEntry);

        // Assert
        expect(result).toStrictEqual({
            status: "loading",
        });
    });

    it("should return success status if cache entry has data", () => {
        // Arrange
        const cacheEntry = {
            data: "DATA",
            error: undefined,
        };

        // Act
        const result = resultFromCachedResponse(cacheEntry);

        // Assert
        expect(result).toStrictEqual({
            status: "success",
            data: "DATA",
        });
    });

    it("should return aborted status if cache entry has no data and no error", () => {
        // Arrange
        const cacheEntry: any = {
            data: null,
            error: null,
        };

        // Act
        const result = resultFromCachedResponse(cacheEntry);

        // Assert
        expect(result).toStrictEqual({
            status: "aborted",
        });
    });

    it("should return error status if cache entry has error", () => {
        // Arrange
        const cacheEntry: any = {
            data: null,
            error: "ERROR",
        };

        // Act
        const result = resultFromCachedResponse(cacheEntry);

        // Assert
        expect(result).toStrictEqual({
            status: "error",
            error: "ERROR",
        });
    });
});
