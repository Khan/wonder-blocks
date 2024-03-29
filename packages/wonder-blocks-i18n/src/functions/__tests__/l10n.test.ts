import * as Locale from "../locale";
import * as FakeTranslate from "../i18n-faketranslate";
import {localeToFixed, getDecimalSeparator} from "../l10n";

describe("l10n", () => {
    beforeEach(() => {
        // "en" is the default locale so that's going to be our default
        // mock for `getLocale()`.
        jest.spyOn(Locale, "getLocale").mockImplementation(() => "en");
        jest.clearAllMocks();
    });

    describe("# localeToFixed", () => {
        it("should not call our fake translation", () => {
            // Arrange
            // Let's stub out FakeTranslate so we can detect it getting called.
            const fakeTranslate = {
                translate: jest.fn().mockReturnValue(""),
            } as const;
            jest.spyOn(FakeTranslate, "default").mockImplementation(
                // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '() => { readonly translate: jest.Mock<any, any, any>; }' is not assignable to parameter of type '() => FakeTranslate'.
                () => fakeTranslate,
            );

            // Act
            localeToFixed(4, 5);

            // Assert
            expect(fakeTranslate.translate).not.toHaveBeenCalled();
        });

        describe("default locale (en)", () => {
            it("should round value up to the given decimal places", () => {
                // Arrange

                // Act
                const result = localeToFixed(4.337, 2);

                // Assert
                expect(result).toEqual("4.34");
            });

            it("should extend the value to the given decimal places", () => {
                // Arrange

                // Act
                const result = localeToFixed(4, 2);

                // Assert
                expect(result).toEqual("4.00");
            });

            it("should round the value down to the given decimal places", () => {
                // Arrange

                // Act
                const result = localeToFixed(0.0004, 2);

                // Assert
                expect(result).toEqual("0.00");
            });

            it("should round negative values and retain the sign", () => {
                // Arrange

                // Act
                const result = localeToFixed(-0.0004, 2);

                // Assert
                expect(result).toEqual("-0.00");
            });

            it("should round the value to a whole number when 0 decimal places", () => {
                // Arrange

                // Act
                const result = localeToFixed(0.0004, 0);

                // Assert
                expect(result).toEqual("0");
            });

            it("should round a negative to a whole number when 0 decimal places", () => {
                // Arrange

                // Act
                const result = localeToFixed(-0.0004, 0);

                // Assert
                expect(result).toEqual("0");
            });
        });
    });

    describe("# getDecimalSeparator", () => {
        it("should handle 'en'", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "en");
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '() => { format: () => string; }' is not assignable to parameter of type '(locales?: string | string[] | undefined, options?: NumberFormatOptions | undefined) => NumberFormat'.
            jest.spyOn(Intl, "NumberFormat").mockImplementation(() => {
                return {
                    format: () => "1.1",
                };
            });

            // Act
            const result = getDecimalSeparator();

            // Assert
            expect(result).toEqual(".");
        });

        it("should handle 'pl'", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "pl");
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '() => { format: () => string; }' is not assignable to parameter of type '(locales?: string | string[] | undefined, options?: NumberFormatOptions | undefined) => NumberFormat'.
            jest.spyOn(Intl, "NumberFormat").mockImplementation(() => {
                return {
                    format: () => "1,1",
                };
            });

            // Act
            const result = getDecimalSeparator();

            // Assert
            expect(result).toEqual(",");
        });

        it("should handle 'ar'", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "ar");
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '() => { format: () => string; }' is not assignable to parameter of type '(locales?: string | string[] | undefined, options?: NumberFormatOptions | undefined) => NumberFormat'.
            jest.spyOn(Intl, "NumberFormat").mockImplementation(() => {
                return {
                    format: () => "١٫١",
                };
            });

            // Act
            const result = getDecimalSeparator();

            // Assert
            expect(result).toEqual("٫");
        });

        it("should handle 'fa-af'", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "fa-af");
            // @ts-expect-error [FEI-5019] - TS2345 - Argument of type '() => { format: () => string; }' is not assignable to parameter of type '(locales?: string | string[] | undefined, options?: NumberFormatOptions | undefined) => NumberFormat'.
            jest.spyOn(Intl, "NumberFormat").mockImplementation(() => {
                return {
                    format: () => "۱٫۱",
                };
            });

            // Act
            const result = getDecimalSeparator();

            // Assert
            expect(result).toEqual("٫");
        });

        it("should handle 'ka'", () => {
            // Arrange
            jest.spyOn(Locale, "getLocale").mockImplementation(() => "ka");

            // Act
            const result = getDecimalSeparator();

            // Assert
            expect(result).toEqual(",");
        });
    });
});
