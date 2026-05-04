import {
    applyReadmePatch,
    applyRecommendedConfigPatch,
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

const RECOMMENDED_CONFIG_EMPTY_SRC = `export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {},
};
`;

const RECOMMENDED_CONFIG_WITH_CONTENT_SRC = `export default {
    plugins: ["@khanacademy/wonder-blocks"],
    rules: {
        // TODO(no-existing-rule): Decide if the rule is strict or recommended.
        // "@khanacademy/wonder-blocks/no-existing-rule": "error",
    },
};
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

describe("applyRecommendedConfigPatch", () => {
    it("should expand an empty rules object and add the rule entry and TODO comment", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyRecommendedConfigPatch(
            RECOMMENDED_CONFIG_EMPTY_SRC,
            ruleName,
        );

        // Assert
        expect(result).toContain("TODO(no-new-rule):");
        expect(result).toContain(
            `// "@khanacademy/wonder-blocks/no-new-rule": "error",`,
        );
    });

    it("should append the rule entry and TODO comment when rules already has content", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyRecommendedConfigPatch(
            RECOMMENDED_CONFIG_WITH_CONTENT_SRC,
            ruleName,
        );

        // Assert
        expect(result).toContain("TODO(no-new-rule):");
        expect(result).toContain(
            `// "@khanacademy/wonder-blocks/no-new-rule": "error",`,
        );
    });

    it("should throw if the rule already exists", () => {
        // Arrange
        const ruleName = "no-existing-rule";

        // Act
        const underTest = () =>
            applyRecommendedConfigPatch(
                RECOMMENDED_CONFIG_WITH_CONTENT_SRC,
                ruleName,
            );

        // Assert
        expect(underTest).toThrow(`"no-existing-rule" already appears`);
    });
});

describe("applyStrictConfigPatch", () => {
    it("should add the rule entry and TODO comment for the new rule", () => {
        // Arrange
        const ruleName = "no-new-rule";

        // Act
        const result = applyStrictConfigPatch(STRICT_CONFIG_SRC, ruleName);

        // Assert
        expect(result).toContain("TODO(no-new-rule):");
        expect(result).toContain(
            `// "@khanacademy/wonder-blocks/no-new-rule": "error",`,
        );
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
