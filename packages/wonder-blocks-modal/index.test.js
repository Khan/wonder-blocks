// @flow
describe("@khanacademy/wonder-blocks-modal", () => {
    test("package exports default", async () => {
        // Arrange
        const importedModule = import("./index.js");

        // Act
        const result = await importedModule;

        // Assert
        expect(Object.keys(result).sort()).toEqual(
            [
                "ModalDialog",
                "ModalFooter",
                "ModalHeader",
                "ModalPanel",
                "ModalLauncher",
                "OnePaneDialog",
                "maybeGetPortalMountedModalHostElement",
            ].sort(),
        );
    });
});
