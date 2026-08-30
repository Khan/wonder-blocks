import {getDirection, isRtl} from "../direction";

describe("getDirection", () => {
    afterEach(() => {
        document.documentElement.removeAttribute("dir");
        document.body.removeAttribute("dir");
    });

    it("should return default direction when element is null", () => {
        // Arrange
        const element = null;

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("ltr");
    });

    it("should detect rtl direction from element's dir attribute", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "rtl");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("rtl");
    });

    it("should detect ltr direction from element's dir attribute", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "ltr");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("ltr");
    });

    it("should detect direction from parent element when element has no dir attribute", () => {
        // Arrange
        const parentElement = document.createElement("div");
        parentElement.setAttribute("dir", "rtl");
        const element = document.createElement("div");
        parentElement.appendChild(element);
        document.body.appendChild(parentElement);

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("rtl");

        // Cleanup
        document.body.removeChild(parentElement);
    });

    it("should fall back to document element direction", () => {
        // Arrange
        document.documentElement.setAttribute("dir", "rtl");
        const element = document.createElement("div");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("rtl");
    });

    it("should fall back to document body direction when documentElement has no dir", () => {
        // Arrange
        document.body.setAttribute("dir", "rtl");
        const element = document.createElement("div");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("rtl");
    });

    it("should prioritize documentElement dir over body dir", () => {
        // Arrange
        document.documentElement.setAttribute("dir", "ltr");
        document.body.setAttribute("dir", "rtl");
        const element = document.createElement("div");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("ltr");
    });

    it("should fall back to default direction when no dir attribute is found", () => {
        // Arrange
        const element = document.createElement("div");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("ltr");
    });

    it("should treat non-rtl dir values on the element itself as ltr", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "auto");

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("ltr");
    });

    it("should honor an ancestor's unrecognized dir value instead of falling back to the document", () => {
        // Arrange
        document.documentElement.setAttribute("dir", "rtl");
        const element = document.createElement("div");
        element.setAttribute("dir", "auto");
        document.body.appendChild(element);

        // Act
        const direction = getDirection(element);

        // Assert
        expect(direction).toBe("ltr");

        // Cleanup
        document.body.removeChild(element);
    });
});

describe("isRtl", () => {
    afterEach(() => {
        document.documentElement.removeAttribute("dir");
    });

    it("should return true when the resolved direction is rtl", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "rtl");

        // Act
        const result = isRtl(element);

        // Assert
        expect(result).toBe(true);
    });

    it("should return false when the resolved direction is ltr", () => {
        // Arrange
        const element = document.createElement("div");
        element.setAttribute("dir", "ltr");

        // Act
        const result = isRtl(element);

        // Assert
        expect(result).toBe(false);
    });
});
