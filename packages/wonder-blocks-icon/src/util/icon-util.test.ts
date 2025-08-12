import {viewportPixelsForSize} from "./icon-util";

describe("viewportPixelsForSize", () => {
    test("return the correct values", () => {
        expect(viewportPixelsForSize("small")).toBe(16);
        expect(viewportPixelsForSize("medium")).toBe(24);
        expect(viewportPixelsForSize("large")).toBe(48);
        expect(viewportPixelsForSize("xlarge")).toBe(96);
    });
});
