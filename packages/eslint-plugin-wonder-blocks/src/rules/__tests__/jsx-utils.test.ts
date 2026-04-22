import {parse} from "@typescript-eslint/typescript-estree";
import {TSESTree} from "@typescript-eslint/utils";

import {getAttributeStringValue} from "../jsx-utils";

/**
 * Parses a self-closing JSX element and returns its opening element node.
 */
function parseOpeningElement(code: string): TSESTree.JSXOpeningElement {
    const ast = parse(code, {jsx: true});
    const stmt = ast.body[0] as TSESTree.ExpressionStatement;
    const element = stmt.expression as TSESTree.JSXElement;
    return element.openingElement;
}

describe("getAttributeStringValue", () => {
    it("returns the string value of a string-literal attribute", () => {
        // Arrange
        const node = parseOpeningElement(`<C tag="span" />`);

        // Act
        const result = getAttributeStringValue(node, "tag");

        // Assert
        expect(result).toBe("span");
    });

    it("returns the string value of an expression-container string literal", () => {
        // Arrange
        const node = parseOpeningElement(`<C tag={"div"} />`);

        // Act
        const result = getAttributeStringValue(node, "tag");

        // Assert
        expect(result).toBe("div");
    });

    it("returns null when the attribute has a dynamic expression", () => {
        // Arrange
        const node = parseOpeningElement(`<C tag={isLabel ? "span" : "p"} />`);

        // Act
        const result = getAttributeStringValue(node, "tag");

        // Assert
        expect(result).toBeNull();
    });

    it("returns null when the attribute is absent", () => {
        // Arrange
        const node = parseOpeningElement(`<C />`);

        // Act
        const result = getAttributeStringValue(node, "tag");

        // Assert
        expect(result).toBeNull();
    });

    it("returns null for a boolean (value-less) attribute", () => {
        // Arrange
        const node = parseOpeningElement(`<C tag />`);

        // Act
        const result = getAttributeStringValue(node, "tag");

        // Assert
        expect(result).toBeNull();
    });

    it("returns null when a different attribute name is queried", () => {
        // Arrange
        const node = parseOpeningElement(`<C size="small" />`);

        // Act
        const result = getAttributeStringValue(node, "tag");

        // Assert
        expect(result).toBeNull();
    });
});
