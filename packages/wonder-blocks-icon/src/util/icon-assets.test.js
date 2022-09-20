// @flow
describe("icons", () => {
    test("default contains icons we expect", async () => {
        // Arrange
        const importedModule = await import("./icon-assets.js");

        // Act

        // Assert
        expect(
            Object.keys(importedModule)
                .sort()
                .filter((key) => key !== "__esModule"),
        ).toEqual(
            [
                "add",
                "caretDown",
                "caretLeft",
                "caretRight",
                "caretUp",
                "check",
                "contentArticle",
                "contentExercise",
                "contentVideo",
                "correct",
                "delete",
                "dismiss",
                "hint",
                "incorrect",
                "info",
                "search",
                "sortableArrowDown",
                "sortableArrowUp",
                "zoomIn",
                "zoomOut",
            ].sort(),
        );
    });
});
