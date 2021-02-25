// @flow
describe("SsrIDFactory", () => {
    test("returns the same id, regardless of client or server render", async () => {
        // Arrange
        const id = "this-is-the-id";
        const {default: SsrIDFactory} = await import("../ssr-id-factory.js");

        // Act
        const result = SsrIDFactory.get(id);

        // Assert
        expect(result).toBe(id);
    });
});
