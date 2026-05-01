
export type TemplateArgs = {
    ruleName: string;
    messageId: string;
    description: string;
};

export function ruleFileContents({
    ruleName,
    messageId,
    description,
}: TemplateArgs): string {
    return `import {ESLintUtils} from "@typescript-eslint/utils";

import type {WonderBlocksPluginDocs} from "../types";

const createRule = ESLintUtils.RuleCreator<WonderBlocksPluginDocs>(
    (name) =>
        \`https://github.com/Khan/wonder-blocks/blob/main/packages/eslint-plugin-wonder-blocks/docs/\${name}.md\`,
);

type Options = [];
type MessageIds = "${messageId}";

export default createRule<Options, MessageIds>({
    name: "${ruleName}",
    meta: {
        docs: {
            description: ${JSON.stringify(description)},
            recommended: false,
        },
        messages: {
            ${messageId}:
                "TODO(${ruleName}): replace with the lint error message shown to developers.",
        },
        schema: [],
        type: "suggestion",
    },
    create(context) {
        // TODO(${ruleName}): implement the rule logic. The visitor below is a
        // placeholder that never reports — replace it with checks tailored to
        // ${ruleName}.
        return {
            JSXAttribute(_node) {
                // example shape:
                // context.report({node: _node, messageId: "${messageId}"});
            },
        };
    },
    defaultOptions: [],
});
`;
}

export function testFileContents({
    ruleName,
    messageId,
}: Pick<TemplateArgs, "ruleName" | "messageId">): string {
    return `import {RuleTester} from "@typescript-eslint/rule-tester";

import {rules} from "..";

const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 6,
            sourceType: "module",
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
});

const ruleName = "${ruleName}";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    // TODO(${ruleName}): add valid examples that should NOT trigger ${ruleName}.
    valid: [{code: "<div />"}],
    // TODO(${ruleName}): add invalid examples that SHOULD trigger ${ruleName}.
    invalid: [
        // {
        //     code: '<div data-trigger="me" />',
        //     errors: [{messageId: "${messageId}"}],
        // },
    ],
});
`;
}

export function docsFileContents({
    ruleName,
    description,
}: Pick<TemplateArgs, "ruleName" | "description">): string {
    return `# ${ruleName}

${description}

## Rule Details

TODO(${ruleName}): describe what this rule checks for and why.

Examples of **incorrect** code:

\`\`\`tsx
// TODO(${ruleName}): add an example that triggers ${ruleName}.
<div />
\`\`\`

Examples of **correct** code:

\`\`\`tsx
// TODO(${ruleName}): add an example that does not trigger ${ruleName}.
<div />
\`\`\`

`;
}

export function demoFileContents({
    ruleName,
}: Pick<TemplateArgs, "ruleName">): string {
    return `/**
 * This file demonstrates the wonder-blocks ESLint rule:
 * \`@khanacademy/wonder-blocks/${ruleName}\`
 * Run \`pnpm lint\` in this directory to see the errors.
 */

import * as React from "react";

// ✅ Valid: TODO(${ruleName}) — show code that does NOT trigger ${ruleName}.
export function ValidExample() {
    return <div />;
}

// ❌ Invalid: TODO(${ruleName}) — show code that SHOULD trigger ${ruleName}.
export function InvalidExample() {
    return <div />;
}
`;
}

export function mdxFileContents({
    ruleName,
}: Pick<TemplateArgs, "ruleName">): string {
    return `import {Meta, Markdown} from "@storybook/addon-docs/blocks";
import lintRuleDocs from "../../../packages/eslint-plugin-wonder-blocks/docs/${ruleName}.md?raw";

<Meta
    title="Tools / eslint-plugin-wonder-blocks / Rules / ${ruleName}"
/>

<Markdown>{lintRuleDocs}</Markdown>
`;
}
