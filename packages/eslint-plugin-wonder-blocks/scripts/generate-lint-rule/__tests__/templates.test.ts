import {
    demoFileContents,
    docsFileContents,
    mdxFileContents,
    ruleFileContents,
    testFileContents,
} from "../templates";

describe("ruleFileContents", () => {
    it("should match the snapshot", () => {
        // Arrange
        const ruleName = "no-foo-bar";
        const messageId = "noFooBar";
        const description = "Disallow the use of foo bar.";

        // Act
        const result = ruleFileContents({ruleName, messageId, description});

        // Assert
        expect(result).toMatchSnapshot();
    });
});

describe("testFileContents", () => {
    it("should match the snapshot", () => {
        // Arrange
        const ruleName = "no-foo-bar";
        const messageId = "noFooBar";

        // Act
        const result = testFileContents({ruleName, messageId});

        // Assert
        expect(result).toMatchSnapshot();
    });
});

describe("docsFileContents", () => {
    it("should match the snapshot", () => {
        // Arrange
        const ruleName = "no-foo-bar";
        const description = "Disallow the use of foo bar.";

        // Act
        const result = docsFileContents({ruleName, description});

        // Assert
        expect(result).toMatchSnapshot();
    });
});

describe("demoFileContents", () => {
    it("should match the snapshot", () => {
        // Arrange
        const ruleName = "no-foo-bar";

        // Act
        const result = demoFileContents({ruleName});

        // Assert
        expect(result).toMatchSnapshot();
    });
});

describe("mdxFileContents", () => {
    it("should match the snapshot", () => {
        // Arrange
        const ruleName = "no-foo-bar";

        // Act
        const result = mdxFileContents({ruleName});

        // Assert
        expect(result).toMatchSnapshot();
    });
});
