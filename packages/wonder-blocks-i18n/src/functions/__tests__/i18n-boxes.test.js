// @flow
import Boxes, {BoxChar} from "../i18n-boxes.js";

describe("i18n-boxes.js: Boxes", () => {
    describe("#translate", () => {
        it("takes undefined, returns empty string", () => {
            // Arrange
            const underTest = new Boxes();

            // Act
            const result = underTest.translate((undefined: any));

            // Assert
            expect(result).toEqual("");
        });

        it("takes empty string, returns empty string", () => {
            // Arrange
            const underTest = new Boxes();

            // Act
            const result = underTest.translate("");

            // Assert
            expect(result).toEqual("");
        });

        it("takes an entity, returns box", () => {
            // Arrange
            const underTest = new Boxes();

            // Act
            const result = underTest.translate("&nbsp;");

            // Assert
            expect(result).toEqual(BoxChar);
        });

        it("takes single line string, returns boxes for alphanumerics", () => {
            // Arrange
            const underTest = new Boxes();

            // Act
            const result = underTest.translate("abcde 12#$%%% _(#*$(#%(");

            // Assert
            expect(result).toEqual("□□□□□ □□#$%%% □(#*$(#%(");
            expect(result && result[0]).toEqual(BoxChar);
        });

        it("takes multiline string, returns boxes for alphanumerics", () => {
            // Arrange
            const underTest = new Boxes();

            // Act
            const result = underTest.translate(
                "abcde 12#$%%% _(#*$(#%(\nthis is a test\nfor boxes.",
            );

            // Assert
            expect(result).toEqual(
                "□□□□□ □□#$%%% □(#*$(#%(\n□□□□ □□ □ □□□□\n□□□ □□□□□.",
            );
            expect(result && result[0]).toEqual(BoxChar);
        });
    });
});
