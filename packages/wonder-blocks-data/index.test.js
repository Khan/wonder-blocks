// @flow
describe("@khanacademy/wonder-blocks-data", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(["RequestHandler"].sort());
    });
});
