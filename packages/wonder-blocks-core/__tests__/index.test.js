// @flow
describe("@khanacademy/wonder-blocks-core", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("../index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "Text",
                "View",
                "WithSSRPlaceholder",
                "addStyle",
                "getElementIntersection",
                "IDProvider",
                "Server",
                "UniqueIDProvider",
            ].sort(),
        );
    });
});
