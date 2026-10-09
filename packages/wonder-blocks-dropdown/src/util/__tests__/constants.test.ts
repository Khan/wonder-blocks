import {defaultStringsEn} from "@khanacademy/wonder-blocks-config";

import {getDefaultComboboxLabels, getDefaultLabels} from "../constants";

describe("getDefaultLabels", () => {
    it.each([
        [1, "1 item"],
        [2, "2 items"],
    ])(
        "should adapt someSelected(%s) to the someSelected string",
        (num, expected) => {
            // Arrange
            const labels = getDefaultLabels(defaultStringsEn);

            // Act
            const result = labels.someSelected(num);

            // Assert
            expect(result).toBe(expected);
        },
    );

    it("should adapt selectAllLabel(n) to the selectAll string", () => {
        // Arrange
        const labels = getDefaultLabels(defaultStringsEn);

        // Act
        const result = labels.selectAllLabel(3);

        // Assert
        expect(result).toBe("Select all (3)");
    });
});

describe("getDefaultComboboxLabels", () => {
    it("should adapt removeSelected(label) to the removeSelected string", () => {
        // Arrange
        const labels = getDefaultComboboxLabels(defaultStringsEn);

        // Act
        const result = labels.removeSelected("Option 1");

        // Assert
        expect(result).toBe("Remove Option 1");
    });

    it("should adapt unselected(labels) to the srUnselected string", () => {
        // Arrange
        const labels = getDefaultComboboxLabels(defaultStringsEn);

        // Act
        const result = labels.unselected("Option 1, Option 2");

        // Assert
        expect(result).toBe("Option 1, Option 2 not selected");
    });

    it("should pass a 1-based index to the srComboboxCurrentItem string", () => {
        // Arrange
        const labels = getDefaultComboboxLabels(defaultStringsEn);

        // Act
        const result = labels.liveRegionCurrentItem({
            current: "Option 1",
            index: 0,
            total: 2,
        });

        // Assert
        expect(result).toBe("Option 1, 1 of 2.");
    });

    it.each([
        [1, "1 selected option."],
        [2, "2 selected options."],
    ])(
        "should announce %s selected options with the correct grammar",
        (total, expected) => {
            // Arrange
            const labels = getDefaultComboboxLabels(defaultStringsEn);

            // Act
            const result = labels.liveRegionMultipleSelectionTotal(total);

            // Assert
            expect(result).toBe(expected);
        },
    );
});
