import {assertKebabCase, toCamelCase} from "../utils";

describe("toCamelCase", () => {
    it.each([
        ["no-foo-bar", "noFooBar"],
        ["no-custom-tab-role", "noCustomTabRole"],
        ["no-h1-tag", "noH1Tag"],
    ])("converts %s to %s", (input, expected) => {
        // Arrange — input provided by it.each

        // Act
        const result = toCamelCase(input);

        // Assert
        expect(result).toBe(expected);
    });
});


describe("assertKebabCase", () => {
    it.each(["no-foo-bar", "no-custom-tab-role", "require-wonder-blocks-use"])(
        "does not throw for valid name: %s",
        (name) => {
            // Arrange — name provided by it.each

            // Act
            const underTest = () => assertKebabCase(name);

            // Assert
            expect(underTest).not.toThrow();
        },
    );

    it.each([
        ["camelCase", "noFooBar"],
        ["single word", "foo"],
        ["uppercase letters", "NO-FOO-BAR"],
        ["leading hyphen", "-foo-bar"],
        ["trailing hyphen", "foo-bar-"],
    ])("throws for invalid name (%s)", (_label, name) => {
        // Arrange — name provided by it.each

        // Act
        const underTest = () => assertKebabCase(name);

        // Assert
        expect(underTest).toThrow();
    });
});
