#!/usr/bin/env -S node -r @swc-node/register
/* eslint-disable no-console -- scripts use console for CLI output */
/**
 * Scaffold a new lint rule for `@khanacademy/eslint-plugin-wonder-blocks`.
 *
 * Generates:
 *  - src/rules/<rule-name>.ts                    (placeholder rule)
 *  - src/rules/__tests__/<rule-name>.test.ts     (placeholder test)
 *  - docs/<rule-name>.md                         (markdown docs)
 *  - demo/src/<rule-name>-example.tsx            (demo example)
 *  - __docs__/tools/eslint-plugin-wonder-blocks/<rule-name>.mdx  (Storybook page)
 *
 * Updates:
 *  - src/rules/index.ts        (registers the new rule)
 *  - src/configs/strict.ts     (adds the rule to the strict config)
 *  - README.md                 (adds a row to the rules table)
 *
 * Usage (from the repo root):
 *   ./packages/eslint-plugin-wonder-blocks/scripts/scaffold-rule.ts <rule-name> [--description "..."]
 *
 * Example:
 *   ./packages/eslint-plugin-wonder-blocks/scripts/scaffold-rule.ts no-foo-bar \
 *       --description "Disallow the use of foo bar."
 */
import * as path from "path";

import {
    updateConfigs,
    updateReadme,
    updateRulesIndex,
} from "./scaffold/patches";
import {
    demoFileContents,
    docsFileContents,
    mdxFileContents,
    ruleFileContents,
    testFileContents,
} from "./scaffold/templates";
import {
    assertKebabCase,
    PLUGIN_DIR,
    REPO_ROOT,
    toCamelCase,
    writeFile,
} from "./scaffold/utils";

type ParsedArgs = {
    positional: Array<string>;
    flags: {description?: string; help?: boolean};
};

function parseArgs(argv: Array<string>): ParsedArgs {
    const positional: Array<string> = [];
    const flags: ParsedArgs["flags"] = {};
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === "--description" || arg === "-d") {
            flags.description = argv[++i];
        } else if (arg === "--help" || arg === "-h") {
            flags.help = true;
        } else if (arg.startsWith("--")) {
            throw new Error(`Unknown flag: ${arg}`);
        } else {
            positional.push(arg);
        }
    }
    return {positional, flags};
}

function printHelp(): void {
    console.log(
        `Usage: scaffold-rule.ts <rule-name> [--description "..."]

  <rule-name>            Kebab-case rule name (e.g. no-foo-bar)
  --description, -d      One-line description used in JSDoc, README, and docs
  --help, -h             Show this message`,
    );
}

function main(): void {
    const {positional, flags} = parseArgs(process.argv.slice(2));
    if (flags.help || positional.length === 0) {
        printHelp();
        process.exit(flags.help ? 0 : 1);
    }
    const [ruleName] = positional;
    assertKebabCase(ruleName);

    const messageId = toCamelCase(ruleName);
    const description =
        flags.description ??
        `TODO(${ruleName}): describe what \`${ruleName}\` enforces.`;

    console.log(`Scaffolding rule "${ruleName}"...\n`);

    // 1. Create new files.
    writeFile(
        path.join(PLUGIN_DIR, `src/rules/${ruleName}.ts`),
        ruleFileContents({ruleName, messageId, description}),
    );
    writeFile(
        path.join(PLUGIN_DIR, `src/rules/__tests__/${ruleName}.test.ts`),
        testFileContents({ruleName, messageId}),
    );
    writeFile(
        path.join(PLUGIN_DIR, `docs/${ruleName}.md`),
        docsFileContents({ruleName, description}),
    );
    writeFile(
        path.join(PLUGIN_DIR, `demo/src/${ruleName}-example.tsx`),
        demoFileContents({ruleName}),
    );
    writeFile(
        path.join(
            REPO_ROOT,
            `__docs__/tools/eslint-plugin-wonder-blocks/${ruleName}.mdx`,
        ),
        mdxFileContents({ruleName}),
    );

    // 2. Patch existing files.
    updateRulesIndex(ruleName);
    updateConfigs(ruleName);
    updateReadme(ruleName);

    console.log(`
Done! Next steps:
  1. Implement the rule logic in packages/eslint-plugin-wonder-blocks/src/rules/${ruleName}.ts
  2. Add valid + invalid cases to the matching __tests__ file.
  3. Flesh out the docs (docs/${ruleName}.md) and demo example.
  4. Create a changeset:  pnpm changeset
  5. Run:  pnpm lint && pnpm typecheck && pnpm test
`);
}

try {
    main();
} catch (err) {
    console.error(`\nError: ${(err as Error).message}`);
    process.exit(1);
}
