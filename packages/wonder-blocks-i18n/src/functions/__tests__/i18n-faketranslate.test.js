// @flow
import * as GetLocale from "../get-locale.js";
import FakeTranslate, {Translators} from "../i18n-faketranslate.js";

import type {IProvideTranslation} from "../types.js";

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
                (Object.entries(Translators): any);

            // Act
            const result = entries.every(
                ([key, translator]) =>
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
            jest.spyOn(GetLocale, "getLocale").mockImplementation(() => "en");
            const underTest = new FakeTranslate();

            // Act
            const result = underTest.translate("Test");

            // Assert
            expect(result).toEqual("Test");
        });

        describe("Use kaLocale as default", () => {
            it("should return the input when there is no matching language", () => {
                // Arrange
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
                jest.spyOn(GetLocale, "getLocale").mockImplementation(
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
    });
});
