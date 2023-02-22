describe("icons", () => {
    test("default contains icons we expect", async () => {
        // Arrange

        // Act
        // @ts-expect-error [FEI-5019] - TS2339 - Property '__esModule' does not exist on type 'typeof import("/Users/kevinbarabash/khan/wonder-blocks/packages/wonder-blocks-icon/src/util/icon-assets")'.
        const {__esModule: _, ...icons} = await import("./icon-assets");

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
