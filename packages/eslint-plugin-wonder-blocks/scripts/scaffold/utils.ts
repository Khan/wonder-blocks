import * as fs from "fs";
import * as path from "path";

export const PLUGIN_DIR = path.resolve(__dirname, "..", "..");
export const REPO_ROOT = path.resolve(PLUGIN_DIR, "..", "..");

export function toCamelCase(kebab: string): string {
    return kebab.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

export function toTitleCase(kebab: string): string {
    return kebab
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export function assertKebabCase(name: string): void {
    if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(name)) {
        throw new Error(
            `Rule name must be kebab-case with at least two words (got: "${name}").`,
        );
    }
}

export function writeFile(filePath: string, contents: string): void {
    if (fs.existsSync(filePath)) {
        throw new Error(`Refusing to overwrite existing file: ${filePath}`);
    }
    fs.mkdirSync(path.dirname(filePath), {recursive: true});
    fs.writeFileSync(filePath, contents);
    console.log(`  created  ${path.relative(REPO_ROOT, filePath)}`);
}

export function patchFile(
    filePath: string,
    transform: (src: string) => string,
): void {
    const original = fs.readFileSync(filePath, "utf8");
    const updated = transform(original);
    if (updated === original) {
        throw new Error(
            `No changes were made to ${filePath} — pattern may have shifted.`,
        );
    }
    fs.writeFileSync(filePath, updated);
    console.log(`  updated  ${path.relative(REPO_ROOT, filePath)}`);
}
