// @flow
describe("icons", () => {
    test("default contains icons we expect", async () => {
        // Arrange
        const importedModule = import("./icon-assets.js");

        // Act
        const result = (await importedModule).default;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
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
