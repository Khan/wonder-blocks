import {
    clearTranslations,
    getPluralTranslation,
    getSingularTranslation,
    loadTranslations,
} from "../i18n-store";
import {setLocale} from "../locale";

describe("getSingularTranslation", () => {
    const TEST_LOCALE = "en-pt";

    afterEach(() => {
        clearTranslations(TEST_LOCALE);
    });

    it("should return the translated string", () => {
        // Arrange
        loadTranslations(TEST_LOCALE, {
            test: "arrrr matey",
        });
        setLocale(TEST_LOCALE);

        // Act
        const result = getSingularTranslation("test");

        // Assert
        expect(result).toMatchInlineSnapshot(`"arrrr matey"`);
    });

    it("should return the original string if no translation found", () => {
        // Arrange
        loadTranslations(TEST_LOCALE, {
            test2: "arrrr matey",
        });
        setLocale(TEST_LOCALE);

        // Act
        const result = getSingularTranslation("test");

        // Assert
        expect(result).toMatchInlineSnapshot(`"test"`);
    });

    it("should return the translated string even if it's plural", () => {
        // Arrange
        loadTranslations(TEST_LOCALE, {
            test: ["arrrr matey", "arrrr mateys"],
        });
        setLocale(TEST_LOCALE);

        // Act
        const result = getSingularTranslation("test");

        // Assert
        expect(result).toMatchInlineSnapshot(`"arrrr matey"`);
    });

    it("should return a fake translation", () => {
        // Arrange
        setLocale("boxes");

        // Act
        const result = getSingularTranslation("test");

        // Assert
        expect(result).toMatchInlineSnapshot(`"□□□□"`);
    });
});

describe("getPluralTranslation", () => {
    const TEST_LOCALE = "en-pt";

    afterEach(() => {
        clearTranslations(TEST_LOCALE);
    });

    it("should return the translated plural singular string", () => {
        // Arrange
        loadTranslations(TEST_LOCALE, {
            test: "arrrr matey",
        });
        setLocale(TEST_LOCALE);

        // Act
        const result = getPluralTranslation(
            {
                lang: "en",
                messages: ["test singular", "test plural"],
            },
            1,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`"test singular"`);
    });

    it("should return the translated plural string", () => {
        // Arrange
        loadTranslations(TEST_LOCALE, {
            test: "arrrr matey",
        });
        setLocale(TEST_LOCALE);

        // Act
        const result = getPluralTranslation(
            {
                lang: "en",
                messages: ["test singular", "test plural"],
            },
            2,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`"test plural"`);
    });

    it("should return the original string if no translation found", () => {
        // Arrange
        loadTranslations(TEST_LOCALE, {
            test: "arrrr matey",
        });
        setLocale(TEST_LOCALE);

        // Act
        const result = getSingularTranslation("test2");

        // Assert
        expect(result).toMatchInlineSnapshot(`"test2"`);
    });

    it("should return a fake translation", () => {
        // Arrange
        setLocale("boxes");

        // Act
        const result = getPluralTranslation(
            {
                lang: "en",
                messages: ["test singular", "test plural"],
            },
            1,
        );

        // Assert
        expect(result).toMatchInlineSnapshot(`"□□□□ □□□□□□□□"`);
    });
});
