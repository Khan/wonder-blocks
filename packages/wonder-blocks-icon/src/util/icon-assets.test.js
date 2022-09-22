// @flow
describe("icons", () => {
    test("default contains icons we expect", async () => {
        // Arrange

        // Act
        // $FlowIgnore[prop-missing]: Flow doesn't know about __esModule
        const {__esModule: _, ...icons} = await import("./icon-assets.js");

        // Assert
        expect(Object.keys(icons).sort()).toEqual(
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
