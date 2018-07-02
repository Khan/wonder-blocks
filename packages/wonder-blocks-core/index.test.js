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
                "MediaLayout",
                "Text",
                "View",
                "NoSSR",
                "addStyle",
                "getClickableBehavior",
                "getElementIntersection",
                "VALID_MEDIA_SIZES",
                "MEDIA_DEFAULT_SPEC",
                "MEDIA_INTERNAL_SPEC",
                "MEDIA_MODAL_SPEC",
                "MediaLayoutWrapper",
                "UniqueIDProvider",
            ].sort(),
        );
    });
});
