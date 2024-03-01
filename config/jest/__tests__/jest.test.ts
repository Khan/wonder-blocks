describe("jest config", () => {
    it("should load jsdom 20.x", () => {
        // Arrange

        // Act
        const result = navigator.userAgent;

        // Assert
        // We can't use an inline snapshot for this since the tests run
        // on multiple different systems and system details are included
        // in the userAgent string.
        expect(result).toEqual(expect.stringMatching(/20\.\d+\.\d+/));
    });
});
