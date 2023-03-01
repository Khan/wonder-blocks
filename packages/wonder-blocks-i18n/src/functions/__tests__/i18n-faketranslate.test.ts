import * as Locale from "../locale";
import FakeTranslate, {Translators} from "../i18n-faketranslate";

import type {IProvideTranslation} from "../types";

describe("i18n-faketranslate", () => {
    describe("Translators", () => {
        it("has the entries we expect", () => {
            // Arrange
            const expectation = ["boxes", "accents"];

            // Act
            const result = Object.keys(Translators);

            // Assert
            expect(result).toEqual(expectation);
        });

        it("each entry maps to a translator", () => {
            // Arrange
            const entries: Array<[string, IProvideTranslation]> =
                Object.entries(Translators) as any;

            // Act
            const result = entries.every(
                ([key, translator]: [any, any]) =>
                    // $FlowIgnore[method-unbinding]
                    typeof translator.translate === "function",
            );

            // Assert
            expect(result).toBe(true);
        });
    });

    describe("FakeTranslate", () => {
        it("should return the input when there is no specified locale", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "en");
            const underTest = new FakeTranslate();

            // Act
            const result = underTest.translate("Test");

            // Assert
            expect(result).toEqual("Test");
        });

        describe("Use kaLocale as default", () => {
            it("should return the input when there is no matching language", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "gubbins",
                );
                const underTest = new FakeTranslate();

                // Act
                const result = underTest.translate("Test");

                // Assert
                expect(result).toEqual("Test");
            });

            it("should return the result of translation when there is a match", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );
                const underTest = new FakeTranslate();
                const expectation = Translators["boxes"].translate("Test");

                // Act
                const result = underTest.translate("Test");

                // Assert
                expect(result).toEqual(expectation);
            });

            it("should not translate HTML element tags and attributes", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );

                const underTest = new FakeTranslate();
                const expectation = '□□□□ <a href="#">□□□□</a>';

                // Act
                const result = underTest.translate("Test <a href='#'>Link</a>");

                // Assert
                expect(result).toEqual(expectation);
            });

            it("should not translate code tag contents", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );

                const underTest = new FakeTranslate();
                const expectation = "□□□□ <code>this is code</code>";

                // Act
                const result = underTest.translate(
                    "Test <code>this is code</code>",
                );

                // Assert
                expect(result).toEqual(expectation);
            });

            it("should not translate pre tag contents", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );

                const underTest = new FakeTranslate();
                const expectation = "□□□□ <pre>this is preformatted</pre>";

                // Act
                const result = underTest.translate(
                    "Test <pre>this is preformatted</pre>",
                );

                // Assert
                expect(result).toEqual(expectation);
            });

            it("should not translate variable substitutions", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );

                const underTest = new FakeTranslate();
                const expectation = "□□□□ %(var)s";

                // Act
                const result = underTest.translate("Test %(var)s");

                // Assert
                expect(result).toEqual(expectation);
            });

            it("should not translate URLs", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );

                const underTest = new FakeTranslate();
                const expectation =
                    "□□□□ http://example.com?lang=boxes&test=1 https://test.com";

                // Act
                const result = underTest.translate(
                    "Test http://example.com?lang=boxes&test=1 https://test.com",
                );

                // Assert
                expect(result).toEqual(expectation);
            });

            it("should not add HTML entities", () => {
                // Arrange
                jest.spyOn(Locale, "getLocale").mockImplementation(
                    () => "boxes",
                );

                const underTest = new FakeTranslate();
                const expectation = "□□□□ <>&";

                // Act
                const result = underTest.translate("Test <>&");

                // Assert
                expect(result).toEqual(expectation);
            });
        });

        it("should not call document.createElement() for real locales", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "es");
            const createElementSpy = jest.spyOn(document, "createElement");
            const underTest = new FakeTranslate();

            // Act
            // We use a Symbol to ensure that .translate() is a passthrough.
            underTest.translate("hello, world");

            // Assert
            expect(createElementSpy).not.toHaveBeenCalled();
        });

        it("should passthrough the arg for real locales", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "es");
            const underTest = new FakeTranslate();
            const arg = Symbol("Hello, world!");

            // Act
            // We use a Symbol to ensure that .translate() is a passthrough.
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type 'typeof arg' is not assignable to parameter of type 'string'.
            const result = underTest.translate(arg);

            // Assert
            expect(result).toBe(arg);
        });
    });
});
