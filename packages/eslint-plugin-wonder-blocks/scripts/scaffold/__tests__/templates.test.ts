import {
    demoFileContents,
    docsFileContents,
    mdxFileContents,
    ruleFileContents,
    testFileContents,
} from "../templates";

const ARGS = {
    ruleName: "no-foo-bar",
    messageId: "noFooBar",
    description: "Disallow the use of foo bar.",
};

describe("ruleFileContents", () => {
    it("should substitute the rule name, messageId, and description", () => {
        // Arrange — ARGS defined above

        // Act
        const result = ruleFileContents(ARGS);

        // Assert
        expect(result).toContain(`name: "no-foo-bar"`);
        expect(result).toContain(`type MessageIds = "noFooBar"`);
        expect(result).toContain(`noFooBar:`);
        expect(result).toContain(`"Disallow the use of foo bar."`);
    });

    it("should tag TODOs with the rule name", () => {
        // Arrange — ARGS defined above

        // Act
        const result = ruleFileContents(ARGS);

        // Assert
        expect(result).toContain("TODO(no-foo-bar):");
    });
});

describe("testFileContents", () => {
    it("should substitute the rule name and messageId", () => {
        // Arrange
        const {ruleName, messageId} = ARGS;

        // Act
        const result = testFileContents({ruleName, messageId});

        // Assert
        expect(result).toContain(`ruleName = "no-foo-bar"`);
        expect(result).toContain(`messageId: "noFooBar"`);
    });

    it("should tag TODOs with the rule name", () => {
        // Arrange
        const {ruleName, messageId} = ARGS;

        // Act
        const result = testFileContents({ruleName, messageId});

        // Assert
        expect(result).toContain("TODO(no-foo-bar):");
    });
});

describe("docsFileContents", () => {
    it("should use the rule name as the heading and substitute the description", () => {
        // Arrange
        const {ruleName, description} = ARGS;

        // Act
        const result = docsFileContents({ruleName, description});

        // Assert
        expect(result).toContain("# no-foo-bar");
        expect(result).toContain("Disallow the use of foo bar.");
    });

    it("should tag TODOs with the rule name", () => {
        // Arrange
        const {ruleName, description} = ARGS;

        // Act
        const result = docsFileContents({ruleName, description});

        // Assert
        expect(result).toContain("TODO(no-foo-bar):");
    });

});

describe("demoFileContents", () => {
    it("should reference the rule name in the JSDoc header and TODO comments", () => {
        // Arrange
        const {ruleName} = ARGS;

        // Act
        const result = demoFileContents({ruleName});

        // Assert
        expect(result).toContain("@khanacademy/wonder-blocks/no-foo-bar");
        expect(result).toContain("TODO(no-foo-bar)");
    });
});

describe("mdxFileContents", () => {
    it("should import the rule's markdown file and set the Storybook title", () => {
        // Arrange
        const {ruleName} = ARGS;

        // Act
        const result = mdxFileContents({ruleName});

        // Assert
        expect(result).toContain("docs/no-foo-bar.md?raw");
        expect(result).toContain(
            'title="Tools / eslint-plugin-wonder-blocks / Rules / no-foo-bar"',
        );
    });
});
