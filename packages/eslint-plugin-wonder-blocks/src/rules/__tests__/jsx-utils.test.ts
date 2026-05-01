import {parse} from "@typescript-eslint/typescript-estree";
import {TSESTree} from "@typescript-eslint/utils";

import {getAttributeStringValue, rendersAsParagraph} from "../jsx-utils";

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

describe("rendersAsParagraph", () => {
    it("returns true when there is no tag prop", () => {
        // Arrange
        const node = parseOpeningElement(`<BodyText />`);

        // Act
        const result = rendersAsParagraph(node);

        // Assert
        expect(result).toBe(true);
    });

    it("returns true when tag is explicitly set to 'p'", () => {
        // Arrange
        const node = parseOpeningElement(`<BodyText tag="p" />`);

        // Act
        const result = rendersAsParagraph(node);

        // Assert
        expect(result).toBe(true);
    });

    it("returns false when tag is an inline tag", () => {
        // Arrange
        const node = parseOpeningElement(`<BodyText tag="span" />`);

        // Act
        const result = rendersAsParagraph(node);

        // Assert
        expect(result).toBe(false);
    });

    it("returns false when tag is a block-container tag", () => {
        // Arrange
        const node = parseOpeningElement(`<BodyText tag="div" />`);

        // Act
        const result = rendersAsParagraph(node);

        // Assert
        expect(result).toBe(false);
    });

    it("returns true when tag is a dynamic expression (unknown value treated as paragraph)", () => {
        // Arrange
        const node = parseOpeningElement(`<BodyText tag={getTag()} />`);

        // Act
        const result = rendersAsParagraph(node);

        // Assert
        expect(result).toBe(true);
    });
});
