// @flow
import {getLocale} from "../get-locale.js";

describe("#getLocale", () => {
    beforeEach(() => {
        globalThis.__HEADERS__ = {};
    });

    afterEach(() => {
        // Cleanup globals
        delete globalThis.__HEADERS__;
    });

    it("should throw if __HEADERS__ global doesn't exist", () => {
        // Arrange
        delete globalThis.__HEADERS__;

        // Act
        const action = () => getLocale();

        // Assert
        expect(action).toThrowErrorMatchingInlineSnapshot(
            `"__HEADERS__ global not set"`,
        );
    });

    it("should return the X-KA-Locale header if set", () => {
        // Arrange
        globalThis.__HEADERS__["X-KA-Locale"] = "es";

        // Act
        const result = getLocale();

        // Assert
        expect(result).toEqual("es");
    });

    it("should return default to 'en' if the X-KA-Locale header is not set", () => {
        // Arrange
        globalThis.__HEADERS__["X-KA-Locale"] = null;

        // Act
        const result = getLocale();

        // Assert
        expect(result).toEqual("en");
    });
});
