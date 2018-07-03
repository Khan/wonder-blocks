// @flow
describe("@khanacademy/wonder-blocks-button", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result)).toEqual(["default"]);
    });
});
