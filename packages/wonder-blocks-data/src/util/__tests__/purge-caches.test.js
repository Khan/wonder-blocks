// @flow
import {SharedCache} from "../../hooks/use-shared-cache.js";
import * as HydrationCacheApi from "../hydration-cache-api.js";

import {purgeCaches} from "../purge-caches.js";

describe("#purgeCaches", () => {
    it("should purge the shared cache", () => {
        // Arrange
        const spy = jest.spyOn(SharedCache, "purgeAll");

        // Act
        purgeCaches();

        // Assert
        expect(spy).toHaveBeenCalled();
    });

    it("should purge the hydration cache", () => {
        // Arrange
        const spy = jest.spyOn(HydrationCacheApi, "purgeHydrationCache");

        // Act
        purgeCaches();

        // Assert
        expect(spy).toHaveBeenCalled();
    });
});
