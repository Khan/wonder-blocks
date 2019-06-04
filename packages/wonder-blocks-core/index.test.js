// @flow
describe("@khanacademy/wonder-blocks-core", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "ClickableBehavior",
                "Text",
                "View",
                "WithSSRPlaceholder",
                "addStyle",
                "getClickableBehavior",
                "getElementIntersection",
                "IDProvider",
                "UniqueIDProvider",
            ].sort(),
        );
    });
});
