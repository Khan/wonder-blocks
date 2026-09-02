import {getHorizontalRuleStyles} from "../common";

// NOTE: `*.module.css` is mapped to `identity-obj-proxy` in the Jest config,
// so a CSS Module class resolves to its own name here rather than the hashed
// class name the bundler emits.
describe("getHorizontalRuleStyles", () => {
    it("should get 'inset' styles as an array", () => {
        // Arrange

        // Act
        const styles = getHorizontalRuleStyles("inset");

        // Assert
        // Verify that both classes are injected
        expect(styles).toEqual(["horizontalRule", "horizontalRuleInset"]);
    });

    it("should get 'full-width' styles as a single class", () => {
        // Arrange

        // Act
        const styles = getHorizontalRuleStyles("full-width");

        // Assert
        // Verify that only one class is injected
        expect(styles).toBe("horizontalRule");
    });

    it("should not inject styles with 'none'", () => {
        // Arrange

        // Act
        const styles = getHorizontalRuleStyles("none");

        // Assert
        // Verify that we don't inject any styles
        expect(styles).toMatchObject({});
    });
});
