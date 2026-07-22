import * as fs from "node:fs";
import * as path from "node:path";

import * as ts from "typescript";

/**
 * `packages/tsconfig-shared.json` is extended (via `extends`) by every
 * package's declaration build (`tsconfig-build.json`), and it pins an explicit
 * `compilerOptions.types` array.
 *
 * This pin is required because TypeScript 6.0 changed the default `types` value
 * to `[]`, so the composite `build:types` step no longer auto-includes the
 * `@types/*` global type packages (`@types/node`, `@types/jest`, ...).
 *
 * `pnpm typecheck` (the root `tsconfig.json`) does NOT extend
 * `tsconfig-shared.json` and still auto-resolves every `@types/*` package, so a
 * missing entry in the pinned list passes `typecheck` but breaks `build:types`
 * (and therefore publishing) with a "Cannot find name ..." error. This test
 * keeps the pinned list in sync with the repo's declared `@types/*`
 * dependencies so that divergence cannot silently regress.
 */
const repoRoot = path.resolve(__dirname, "..", "..");

/**
 * Read `compilerOptions.types` from a tsconfig file, tolerating JSONC (comments
 * and trailing commas) the way the TypeScript compiler does.
 */
const readPinnedTypes = (tsconfigPath: string): Array<string> => {
    const text = fs.readFileSync(tsconfigPath, "utf8");
    const {config, error} = ts.parseConfigFileTextToJson(tsconfigPath, text);
    if (error) {
        throw new Error(
            `Failed to parse ${tsconfigPath}: ` +
                ts.flattenDiagnosticMessageText(error.messageText, "\n"),
        );
    }
    return config?.compilerOptions?.types ?? [];
};

/**
 * The `@types/*` packages declared in the root `package.json`, with the
 * `@types/` prefix stripped (e.g. `@types/node` -> `node`).
 */
const getTypesPackageNames = (): Array<string> => {
    const pkg = JSON.parse(
        fs.readFileSync(path.join(repoRoot, "package.json"), "utf8"),
    );
    const allDeps = {
        ...(pkg.dependencies ?? {}),
        ...(pkg.devDependencies ?? {}),
    };
    return Object.keys(allDeps)
        .filter((name) => name.startsWith("@types/"))
        .map((name) => name.slice("@types/".length));
};

describe("packages/tsconfig-shared.json `types`", () => {
    it("lists exactly the repo's `@types/*` dependencies", () => {
        // Arrange
        const expected = getTypesPackageNames().sort();

        // Act
        const actual = readPinnedTypes(
            path.join(repoRoot, "packages", "tsconfig-shared.json"),
        ).sort();

        // Assert
        // If this fails, add the missing `@types/*` package(s) to the `types`
        // array in packages/tsconfig-shared.json (or remove stale entries).
        // Otherwise `build:types` will fail even though `pnpm typecheck` passes.
        expect(actual).toEqual(expected);
    });
});
