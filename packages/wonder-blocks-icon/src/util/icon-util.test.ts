import {viewportPixelsForSize, viewportRemsForSize} from "./icon-util";

describe("viewportPixelsForSize", () => {
    test("return the correct values", () => {
        expect(viewportPixelsForSize("small")).toBe(16);
        expect(viewportPixelsForSize("medium")).toBe(24);
        expect(viewportPixelsForSize("large")).toBe(48);
        expect(viewportPixelsForSize("xlarge")).toBe(96);
    });
});

describe("viewportRemsForSize", () => {
    test("return the correct values", () => {
        expect(viewportRemsForSize("small")).toBe("var(--wb-sizing-size_160)");
        expect(viewportRemsForSize("medium")).toBe("var(--wb-sizing-size_240)");
        expect(viewportRemsForSize("large")).toBe("var(--wb-sizing-size_480)");
        expect(viewportRemsForSize("xlarge")).toBe("var(--wb-sizing-size_960)");
    });
});
