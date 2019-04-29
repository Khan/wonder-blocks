// @flow
describe("@khanacademy/wonder-blocks-breadcrumb", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            ["BreadcrumbItem", "default"].sort(),
        );
    });
});
