// @flow

describe("@khanacademy/wonder-blocks-dropdown", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            ["ActionMenu", "MultiSelect", "SingleSelect"].sort(),
        );
    });
});
