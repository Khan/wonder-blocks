// @flow

describe("@khanacademy/wonder-blocks-form", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "Checkbox",
                "CheckboxGroup",
                "Choice",
                "ChoiceField",
                "Radio",
                "RadioGroup",
            ].sort(),
        );
    });
});
