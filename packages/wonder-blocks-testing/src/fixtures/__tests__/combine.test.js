// @flow
import * as WonderStuffCoreModule from "@khanacademy/wonder-stuff-core";

import {combine} from "../combine.js";

jest.mock("@khanacademy/wonder-stuff-core");

describe("#combine", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it.each([undefined, null, 42, "test", true])(
        "should return a clone of val2 if val1 is %s",
        (val1) => {
            // Arrange
            jest.spyOn(WonderStuffCoreModule, "clone").mockImplementation(
                (v) => `CLONED: ${v}`,
            );
            const val2 = "VALUE2";

            // Act
            const result = combine(val1, val2);

            // Assert
            expect(result).toEqual(`CLONED: VALUE2`);
        },
    );

    it("should return a deduplicated array including values from val1 and val2, with val2 values first if both are arrays", () => {
        // Arrange
        jest.spyOn(WonderStuffCoreModule, "clone").mockImplementation((v) => v);
        const val1 = ["VALUE1", "VALUE2", "VALUE2"];
        const val2 = ["VALUE2", "VALUE3", "VALUE3"];

        // Act
        const result = combine(val1, val2);

        // Assert
        expect(result).toEqual(["VALUE1", "VALUE2", "VALUE3"]);
    });

    it("should return a clone of val2 if val2 is an array but val1 is not", () => {
        // Arrange
        jest.spyOn(WonderStuffCoreModule, "clone").mockImplementation(
            (v) => `CLONED: ${v}`,
        );
        const val1 = "VALUE1";
        const val2 = ["VALUE1", "VALUE2", "VALUE3"];

        // Act
        const result = combine(val1, val2);

        // Assert
        expect(result).toEqual("CLONED: VALUE1,VALUE2,VALUE3");
    });

    it("should return a clone of val2 if val2 is not an array but val1 is", () => {
        // Arrange
        jest.spyOn(WonderStuffCoreModule, "clone").mockImplementation(
            (v) => `CLONED: ${JSON.stringify(v)}`,
        );
        const val1 = ["VALUE1", "VALUE2", "VALUE3"];
        const val2 = {
            key1: "VALUE1",
        };

        // Act
        const result = combine(val1, val2);

        // Assert
        expect(result).toEqual('CLONED: {"key1":"VALUE1"}');
    });

    it("should return a combination of val1 and val2 (cloned) properties with val2 overriding val1 when both are non-array objects", () => {
        // Arrange
        jest.spyOn(WonderStuffCoreModule, "clone").mockImplementation((v) => v);
        const val1 = {
            a: "val1_VALUE1",
            b: "val1_VALUE2",
            c: "val1_VALUE3",
        };
        const val2 = {
            b: "val2_VALUE2",
            c: "val2_VALUE3",
            d: "val2_VALUE4",
        };

        // Act
        const result = combine(val1, val2);

        // Assert
        expect(result).toEqual({
            a: "val1_VALUE1",
            b: "val2_VALUE2",
            c: "val2_VALUE3",
            d: "val2_VALUE4",
        });
    });
});
