// @flow
import Server from "../server";

describe("./server", () => {
    it("#isServerSide should return false", () => {
        // Arrange

        // Act
        const result = Server.isServerSide();

        // Assert
        expect(result).toBeFalsy();
    });

    it("#setServerSide should set server-side mode to true", () => {
        // Arrange

        // Act
        Server.setServerSide();
        const result = Server.isServerSide();

        // Assert
        expect(result).toBeTruthy();
    });

    it("#setServerSide should leave server-side mode as true", () => {
        // Arrange
        Server.setServerSide();

        // Act
        Server.setServerSide();
        const result = Server.isServerSide();

        // Assert
        expect(result).toBeTruthy();
    });
});
