// @flow
import * as CombineTopLevelModule from "../combine-top-level.js";

import {combineOptions} from "../combine-options.js";

jest.mock("../combine-top-level.js");

describe("#combineOptions", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call combine once per property per object", () => {
        // Arrange
        const toBeCombined = [
            {a: "test1", b: "test1"},
            {b: "test2"},
            {a: "test3", c: "test3"},
        ];
        const combineSpy = jest.spyOn(CombineTopLevelModule, "combineTopLevel");

        // Act
        combineOptions(...toBeCombined);

        // Assert
        expect(combineSpy).toHaveBeenCalledTimes(5);
    });

    it("should ignore falsy args", () => {
        // Arrange
        const toBeCombined = [null, {a: "test"}, {b: "test"}, 0, undefined];
        const combineSpy = jest.spyOn(CombineTopLevelModule, "combineTopLevel");

        // Act
        combineOptions(...toBeCombined);

        // Assert
        expect(combineSpy).toHaveBeenCalledTimes(2);
    });

    it("should return the combined object", () => {
        // Arrange
        const toBeCombined = [
            {a: "test1", b: "test1"},
            {b: "test2"},
            {a: "test3", c: "test3"},
        ];
        jest.spyOn(CombineTopLevelModule, "combineTopLevel").mockImplementation(
            // Just for testing, we know the values are strings, so let's
            // combine them with concatenation so we see the order of
            // combination in the result.
            (v1, v2) => `${v1 === undefined ? "" : v1}${v2}`,
        );

        // Act
        const result = combineOptions(...toBeCombined);

        // Assert
        expect(result).toEqual({
            a: "test1test3",
            b: "test1test2",
            c: "test3",
        });
    });
});
