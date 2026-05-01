import {
    applyReadmePatch,
    applyRulesIndexPatch,
    applyStrictConfigPatch,
} from "../patches";

// Minimal fixtures that match the regex patterns each patch function expects.

const RULES_INDEX_SRC = `import {TSESLint} from "@typescript-eslint/utils";

import noExistingRule from "./no-existing-rule";

const rules: Record<string, TSESLint.RuleModule<string, readonly unknown[]>> = {
    "no-existing-rule": noExistingRule,
};

export {rules};
`;

const STRICT_CONFIG_SRC = `import recommended from "./recommended";

export default {
    ...recommended,
    rules: {
        ...recommended.rules,
        "@khanacademy/wonder-blocks/no-existing-rule": "error",
    },
};
`;

const README_SRC = `## Rules

| Rule | Enabled in \`recommended\`| Enabled in \`strict\` |
|------|-------------------------|---------------------|
| [\`no-existing-rule\`](docs/no-existing-rule.md)| |✅|
`;

describe("applyRulesIndexPatch", () => {
    it("should add the import and map entry for the new rule", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyRulesIndexPatch(RULES_INDEX_SRC, ruleName);

        // Assert
        expect(result).toContain(`import noNewRule from "./no-new-rule";`);
        expect(result).toContain(`"no-new-rule": noNewRule,`);
    });

    it("should insert imports in alphabetical order", () => {
        // Arrange
        const ruleName = "no-alpha-rule";

        // Act
        const result = applyRulesIndexPatch(RULES_INDEX_SRC, ruleName);

        // Assert
        const alphaPos = result.indexOf("no-alpha-rule");
        const existingPos = result.indexOf("no-existing-rule");
        expect(alphaPos).toBeLessThan(existingPos);
    });

    it("should throw if the rule already exists", () => {
        // Arrange
        const ruleName = "no-existing-rule";

        // Act
        const underTest = () => applyRulesIndexPatch(RULES_INDEX_SRC, ruleName);

        // Assert
        expect(underTest).toThrow(`"no-existing-rule" already appears`);
    });
});

describe("applyStrictConfigPatch", () => {
    it("should add the new rule to the strict config", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyStrictConfigPatch(STRICT_CONFIG_SRC, ruleName);

        // Assert
        expect(result).toContain(
            `"@khanacademy/wonder-blocks/no-new-rule": "error"`,
        );
    });

    it("should preserve the ...recommended.rules spread before other rules", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyStrictConfigPatch(STRICT_CONFIG_SRC, ruleName);

        // Assert
        const spreadPos = result.indexOf("...recommended.rules");
        const newRulePos = result.indexOf("no-new-rule");
        expect(spreadPos).toBeLessThan(newRulePos);
    });

    it("should throw if the rule already exists", () => {
        // Arrange
        const ruleName = "no-existing-rule";

        // Act
        const underTest = () =>
            applyStrictConfigPatch(STRICT_CONFIG_SRC, ruleName);

        // Assert
        expect(underTest).toThrow(`"no-existing-rule" already appears`);
    });
});

describe("applyReadmePatch", () => {
    it("should add a row for the new rule to the rules table", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyReadmePatch(README_SRC, ruleName);

        // Assert
        expect(result).toContain(
            "| [`no-new-rule`](docs/no-new-rule.md)| TODO(no-new-rule) | TODO(no-new-rule) |",
        );
    });

    it("should insert rows in alphabetical order", () => {
        // Arrange
        const ruleName = "no-alpha-rule";

        // Act
        const result = applyReadmePatch(README_SRC, ruleName);

        // Assert
        const alphaPos = result.indexOf("no-alpha-rule");
        const existingPos = result.indexOf("no-existing-rule");
        expect(alphaPos).toBeLessThan(existingPos);
    });

    it("should throw if the rule already exists", () => {
        // Arrange
        const ruleName = "no-existing-rule";

        // Act
        const underTest = () => applyReadmePatch(README_SRC, ruleName);

        // Assert
        expect(underTest).toThrow(`"no-existing-rule" already appears`);
    });
});
