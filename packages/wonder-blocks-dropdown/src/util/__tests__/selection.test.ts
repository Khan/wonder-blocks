import {updateMultipleSelection} from "../selection";

describe("updateMultipleSelection", () => {
    it("should create a new selection if there is no previous selection", () => {
        // Arrange
        const previousSelection = null;
        const value = "apple";

        // Act
        const result = updateMultipleSelection(previousSelection, value);

        // Assert
        expect(result).toEqual(["apple"]);
    });

    it("should create a new selection if the previous selection is empty", () => {
        // Arrange
        const value = "apple";

        // Act
        const result = updateMultipleSelection([], value);

        // Assert
        expect(result).toEqual(["apple"]);
    });

    it("should add the value to the selection", () => {
        // Arrange
        const previousSelection = ["pear", "grape"];
        const value = "apple";

        // Act
        const result = updateMultipleSelection(previousSelection, value);

        // Assert
        expect(result).toEqual(["pear", "grape", "apple"]);
    });

    it("should remove the value from the selection", () => {
        // Arrange
        const previousSelection = ["pear", "grape", "apple"];
        const value = "grape";

        // Act
        const result = updateMultipleSelection(previousSelection, value);

        // Assert
        expect(result).toEqual(["pear", "apple"]);
    });
});
