// @flow
describe("@khanacademy/wonder-blocks-color", () => {
    test("package exports default, SemanticColor, mix, and fade", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result)).toEqual([
            "mix",
            "fade",
            "default",
            "SemanticColor",
        ]);
    });
});
