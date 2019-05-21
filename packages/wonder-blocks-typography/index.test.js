// @flow
describe("@khanacademy/wonder-blocks-typography", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "Body",
                "BodyMonospace",
                "BodySerif",
                "BodySerifBlock",
                "Caption",
                "Footnote",
                "HeadingLarge",
                "HeadingMedium",
                "HeadingSmall",
                "HeadingXSmall",
                "LabelLarge",
                "LabelMedium",
                "LabelSmall",
                "LabelXSmall",
                "Tagline",
                "Title",
                "styles",
            ].sort(),
        );
    });
});
