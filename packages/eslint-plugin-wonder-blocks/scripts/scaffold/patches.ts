import * as path from "path";

import {patchFile, PLUGIN_DIR, toCamelCase} from "./utils";

export function applyRulesIndexPatch(src: string, ruleName: string): string {
    const camel = toCamelCase(ruleName);

    if (src.includes(`"${ruleName}"`)) {
        throw new Error(
            `Rule "${ruleName}" already appears in src/rules/index.ts.`,
        );
    }

    // Insert the import alphabetically among existing rule imports.
    const importLine = `import ${camel} from "./${ruleName}";`;
    const importBlockRegex = /(import .+ from "\.\/[a-z0-9-]+";\n)+/m;
    const importBlockMatch = src.match(importBlockRegex);
    if (!importBlockMatch) {
        throw new Error("Could not locate rule imports in src/rules/index.ts");
    }
    const imports = importBlockMatch[0].split("\n").filter(Boolean);
    imports.push(importLine);
    imports.sort();
    const newImportBlock = imports.join("\n") + "\n";
    let updated = src.replace(importBlockMatch[0], newImportBlock);

    // Insert the rules-map entry alphabetically.
    const mapLine = `    "${ruleName}": ${camel},`;
    const mapRegex =
        /(const rules: Record<string, TSESLint\.RuleModule<string, readonly unknown\[\]>> = \{\n)([\s\S]*?)(\n\};)/;
    const mapMatch = updated.match(mapRegex);
    if (!mapMatch) {
        throw new Error("Could not locate the rules map in src/rules/index.ts");
    }
    const entries = mapMatch[2].split("\n").filter((l) => l.trim().length > 0);
    entries.push(mapLine);
    entries.sort();
    updated = updated.replace(mapRegex, `$1${entries.join("\n")}$3`);
    return updated;
}

export function applyRecommendedConfigPatch(
    src: string,
    ruleName: string,
): string {
    if (src.includes(`"@khanacademy/wonder-blocks/${ruleName}"`)) {
        throw new Error(
            `Rule "${ruleName}" already appears in src/configs/recommended.ts.`,
        );
    }
    const todoComment = `        // TODO(${ruleName}): Decide if the rule is strict or recommended.`;
    const ruleLine = `        // "@khanacademy/wonder-blocks/${ruleName}": "error",`;

    // recommended.ts starts with an empty rules object — expand it.
    const emptyRulesRegex = /(\s+rules: )\{\}/;
    if (emptyRulesRegex.test(src)) {
        return src.replace(
            emptyRulesRegex,
            `$1{\n${todoComment}\n${ruleLine}\n    }`,
        );
    }

    // rules object already has content — insert before the closing brace.
    const blockRegex = /(rules: \{\n)([\s\S]*?)(\n {4}\})/;
    const match = src.match(blockRegex);
    if (!match) {
        throw new Error(
            "Could not locate the rules block in src/configs/recommended.ts",
        );
    }
    return src.replace(
        blockRegex,
        `$1${match[2]}\n${todoComment}\n${ruleLine}$3`,
    );
}

export function applyStrictConfigPatch(src: string, ruleName: string): string {
    if (src.includes(`"@khanacademy/wonder-blocks/${ruleName}"`)) {
        throw new Error(
            `Rule "${ruleName}" already appears in src/configs/strict.ts.`,
        );
    }
    const todoComment = `        // TODO(${ruleName}): Decide if the rule is strict or recommended.`;
    const ruleLine = `        // "@khanacademy/wonder-blocks/${ruleName}": "error",`;
    const ruleBlockRegex = /(rules: \{\n)([\s\S]*?)(\n {4}\},)/;
    const match = src.match(ruleBlockRegex);
    if (!match) {
        throw new Error(
            "Could not locate the rules block in src/configs/strict.ts",
        );
    }
    return src.replace(
        ruleBlockRegex,
        `$1${match[2]}\n${todoComment}\n${ruleLine}$3`,
    );
}

export function applyReadmePatch(src: string, ruleName: string): string {
    if (src.includes(`docs/${ruleName}.md`)) {
        throw new Error(`Rule "${ruleName}" already appears in README.md.`);
    }
    const newRow = `| [\`${ruleName}\`](docs/${ruleName}.md)| TODO(${ruleName}) | TODO(${ruleName}) |`;
    const tableRegex =
        /(\| Rule \| Enabled in `recommended`\| Enabled in `strict` \|\n\|[^\n]*\|\n)((?:\|[^\n]*\|\n)*)/;
    const match = src.match(tableRegex);
    if (!match) {
        throw new Error("Could not locate the rules table in README.md");
    }
    const rows = match[2].split("\n").filter((l) => l.trim().startsWith("|"));
    rows.push(newRow);
    rows.sort();
    return src.replace(tableRegex, `$1${rows.join("\n")}\n`);
}

export function updateRulesIndex(ruleName: string): void {
    patchFile(path.join(PLUGIN_DIR, "src/rules/index.ts"), (src) =>
        applyRulesIndexPatch(src, ruleName),
    );
}

export function updateConfigs(ruleName: string): void {
    patchFile(path.join(PLUGIN_DIR, "src/configs/recommended.ts"), (src) =>
        applyRecommendedConfigPatch(src, ruleName),
    );
    patchFile(path.join(PLUGIN_DIR, "src/configs/strict.ts"), (src) =>
        applyStrictConfigPatch(src, ruleName),
    );
}

export function updateReadme(ruleName: string): void {
    patchFile(path.join(PLUGIN_DIR, "README.md"), (src) =>
        applyReadmePatch(src, ruleName),
    );
}
