import * as path from "path";

import {patchFile, PLUGIN_DIR, toCamelCase} from "./utils";

export function updateRulesIndex(ruleName: string): void {
    const camel = toCamelCase(ruleName);
    const indexPath = path.join(PLUGIN_DIR, "src/rules/index.ts");
    patchFile(indexPath, (src) => {
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
            throw new Error(
                "Could not locate rule imports in src/rules/index.ts",
            );
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
            throw new Error(
                "Could not locate the rules map in src/rules/index.ts",
            );
        }
        const entries = mapMatch[2]
            .split("\n")
            .filter((l) => l.trim().length > 0);
        entries.push(mapLine);
        entries.sort();
        updated = updated.replace(mapRegex, `$1${entries.join("\n")}$3`);
        return updated;
    });
}

export function updateStrictConfig(ruleName: string): void {
    const strictPath = path.join(PLUGIN_DIR, "src/configs/strict.ts");
    patchFile(strictPath, (src) => {
        const newRule = `        "@khanacademy/wonder-blocks/${ruleName}": "error",`;
        if (src.includes(newRule.trim())) {
            throw new Error(
                `Rule "${ruleName}" already appears in src/configs/strict.ts.`,
            );
        }
        const ruleBlockRegex = /(rules: \{\n)([\s\S]*?)(\n {4}\},)/;
        const match = src.match(ruleBlockRegex);
        if (!match) {
            throw new Error(
                "Could not locate the rules block in src/configs/strict.ts",
            );
        }
        const lines = match[2].split("\n").filter((l) => l.trim().length > 0);
        lines.push(newRule);
        // Keep the spread of recommended.rules first, then sort the rule lines.
        const spread = lines.find((l) => l.includes("...recommended.rules"));
        const ruleLines = lines
            .filter((l) => !l.includes("...recommended.rules"))
            .sort();
        const ordered = [spread, ...ruleLines].filter(Boolean).join("\n");
        return src.replace(ruleBlockRegex, `$1${ordered}$3`);
    });
}

export function updateReadme(ruleName: string): void {
    const readmePath = path.join(PLUGIN_DIR, "README.md");
    patchFile(readmePath, (src) => {
        if (src.includes(`docs/${ruleName}.md`)) {
            throw new Error(`Rule "${ruleName}" already appears in README.md.`);
        }
        const newRow = `| [\`${ruleName}\`](docs/${ruleName}.md)| |✅|`;
        const tableRegex =
            /(\| Rule \| Enabled in `recommended`\| Enabled in `strict` \|\n\|[^\n]*\|\n)([\s\S]*)$/;
        const match = src.match(tableRegex);
        if (!match) {
            throw new Error("Could not locate the rules table in README.md");
        }
        const rows = match[2]
            .split("\n")
            .filter((l) => l.trim().startsWith("|"));
        rows.push(newRow);
        rows.sort();
        const trailing = match[2].endsWith("\n") ? "\n" : "";
        return src.replace(tableRegex, `$1${rows.join("\n")}${trailing}`);
    });
}
