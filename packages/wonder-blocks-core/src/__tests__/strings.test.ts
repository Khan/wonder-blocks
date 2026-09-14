import {defaultStringsEn} from "../strings";

describe("defaultStringsEn", () => {
    describe("selectedItemsCount", () => {
        it.each([
            [0, "0 items"],
            [1, "1 item"],
            [2, "2 items"],
        ])("returns %s for %i selected items", (numItems, expected) => {
            // Arrange

            // Act
            const result = defaultStringsEn.selectedItemsCount({numItems});

            // Assert
            expect(result).toBe(expected);
        });
    });

    describe("srResultsAvailable", () => {
        it.each([
            [0, "0 results available."],
            [1, "1 result available."],
            [2, "2 results available."],
        ])("returns %s for %i results", (total, expected) => {
            // Arrange

            // Act
            const result = defaultStringsEn.srResultsAvailable({total});

            // Assert
            expect(result).toBe(expected);
        });
    });

    describe("srSelectedOptionsTotal", () => {
        it.each([
            [0, "0 selected options."],
            [1, "1 selected option."],
            [2, "2 selected options."],
        ])("returns %s for %i selected options", (total, expected) => {
            // Arrange

            // Act
            const result = defaultStringsEn.srSelectedOptionsTotal({total});

            // Assert
            expect(result).toBe(expected);
        });
    });

    describe("srCurrentItem", () => {
        it("includes the item's label and its position in the list", () => {
            // Arrange
            const args = {current: "Banana", index: 2, total: 3};

            // Act
            const result = defaultStringsEn.srCurrentItem(args);

            // Assert
            expect(result).toBe("Banana, 2 of 3.");
        });
    });

    describe("selectAll", () => {
        it("includes the number of options that would be selected", () => {
            // Arrange
            const args = {numOptions: 5};

            // Act
            const result = defaultStringsEn.selectAll(args);

            // Assert
            expect(result).toBe("Select all (5)");
        });
    });

    describe("iconAltRemoveSelected", () => {
        it("includes the label of the option to remove", () => {
            // Arrange
            const args = {label: "Banana"};

            // Act
            const result = defaultStringsEn.iconAltRemoveSelected(args);

            // Assert
            expect(result).toBe("Remove Banana");
        });
    });

    describe("srSelected", () => {
        it("includes the labels of the selected options", () => {
            // Arrange
            const args = {labels: "Apple, Banana"};

            // Act
            const result = defaultStringsEn.srSelected(args);

            // Assert
            expect(result).toBe("Apple, Banana selected");
        });
    });

    describe("srUnselected", () => {
        it("includes the labels of the deselected options", () => {
            // Arrange
            const args = {labels: "Apple, Banana"};

            // Act
            const result = defaultStringsEn.srUnselected(args);

            // Assert
            expect(result).toBe("Apple, Banana not selected");
        });
    });
});
