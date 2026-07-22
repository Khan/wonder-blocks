#!/usr/bin/env -S node -r @swc-node/register
/* eslint-disable no-console -- scripts use console for CLI output */
/**
 * Scaffold a new lint rule for `@khanacademy/eslint-plugin-wonder-blocks`. It
 * will generate and update the necessary files related to adding a new lint
 * rule including tests, documentation, and example files.
 *
 * Usage (from the repo root):
 *   pnpm gen:lint-rule <rule-name> [--description "..."]
 *
 * Example:
 *   pnpm gen:lint-rule no-foo-bar --description "Disallow the use of foo bar."
 */
import * as path from "path";

import yargs from "yargs";
import {hideBin} from "yargs/helpers";

import {updateConfigs, updateReadme, updateRulesIndex} from "./patches";
import {
    demoFileContents,
    docsFileContents,
    mdxFileContents,
    ruleFileContents,
    testFileContents,
} from "./templates";
import {
    assertKebabCase,
    PLUGIN_DIR,
    REPO_ROOT,
    toCamelCase,
    writeFile,
} from "./utils";

function scaffoldRule(
    ruleName: string,
    ruleDescription: string | undefined,
): void {
    assertKebabCase(ruleName);

    const messageId = toCamelCase(ruleName);
    const description =
        ruleDescription ??
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

  TODO(${ruleName}) markers have been added throughout the generated and patched files to indicate where changes need to be made.
`);
}

try {
    yargs(hideBin(process.argv))
        .scriptName("gen:lint-rule")
        .command(
            "$0 <rule-name>",
            "Scaffold a new lint rule",
            (y) =>
                y
                    .positional("rule-name", {
                        describe: "Kebab-case rule name (e.g. no-foo-bar)",
                        type: "string",
                        demandOption: true,
                    })
                    .option("description", {
                        alias: "d",
                        type: "string",
                        describe:
                            "One-line description used in JSDoc, README, and docs",
                    }),
            (argv) => scaffoldRule(argv.ruleName, argv.description),
        )
        .strict()
        .help()
        .alias("help", "h")
        .parseSync();
} catch (err) {
    console.error(`\nError: ${(err as Error).message}`);
    process.exit(1);
}
