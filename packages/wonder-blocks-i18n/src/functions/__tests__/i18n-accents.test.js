// @flow
import Accents from "../i18n-accents.js";

describe("i18n-accents.js: Accents", () => {
    describe("#constructor", () => {
        it("should throw on a zero scaling factor", () => {
            // Arrange
            // Act
            const underTest = () => new Accents(0);

            // Assert
            expect(underTest).toThrow();
        });

        it("should throw on a negative scaling factor", () => {
            // Arrange
            // Act
            const underTest = () => new Accents(-1);

            // Assert
            expect(underTest).toThrow();
        });
    });

    describe("#translate", () => {
        it("should return an empty string if passed undefined", () => {
            // Arrange
            const underTest = new Accents();

            // Act
            const result = underTest.translate((undefined: any));

            // Assert
            expect(result).toEqual("");
        });

        it("should return an empty string if passed an empty string", () => {
            // Arrange
            const underTest = new Accents();

            // Act
            const result = underTest.translate("");

            // Assert
            expect(result).toEqual("");
        });

        it("should return predictable accented version of the input", () => {
            // Arrange
            const underTest = new Accents();
            const toTranslate =
                "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ 0123456789 !@#$%^&*()_+";
            const expectation =
                "áÁƀɃćĆďĎéÉḟḞĝĜĥĤíÎĵĴķĶĺĹḿḾńŃóÓṕṔʠɊŕŔśŚťŤúÚṽṼẃẂẍẌýÝźŹ 0123456789 !@#$%^&*()_+";

            // Act
            const result = underTest.translate(toTranslate);

            // Assert
            expect(result).toEqual(expectation);
        });

        it("should vary substitution on character repetitions", () => {
            // Arrange
            const underTest = new Accents();
            const toTranslate = "hhEEllOO WWooLLrrDD!";
            const expectation = "ĥȟÉÈĺľÓÒ ẂẀóòĹĽŕřĎĐ!";

            // Act
            const result = underTest.translate(toTranslate);

            // Assert
            expect(result).toEqual(expectation);
        });

        it("should translate the same string the same way on repeated calls", () => {
            // Arrange
            const underTest = new Accents();
            const toTranslate = "hhEEllOO WWooLLrrDD!";

            // Act
            const result1 = underTest.translate(toTranslate);
            const result2 = underTest.translate(toTranslate);

            // Assert
            expect(result2).toEqual(result1);
        });

        it("should repeat substitutions when they have been used once", () => {
            // Arrange
            const underTest = new Accents();
            const toTranslate = "x x x";
            const expectation = "ẍ ẋ ẍ";

            // Act
            const result = underTest.translate(toTranslate);

            // Assert
            expect(result).toEqual(expectation);
        });

        it("should scale the translation based on the provided scaling factor", () => {
            // Arrange
            const underTest = new Accents(3);
            const toTranslate = "hhEEllOO WWooLLrrDD!";
            const expectation =
                "ĥĥĥȟȟȟÉÉÉÈÈÈĺĺĺľľľÓÓÓÒÒÒ ẂẂẂẀẀẀóóóòòòĹĹĹĽĽĽŕŕŕřřřĎĎĎĐĐĐ!";

            // Act
            const result = underTest.translate(toTranslate);

            // Assert
            expect(result).toEqual(expectation);
        });
    });
});
