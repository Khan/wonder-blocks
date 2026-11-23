import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Every package that has a `*.module.css` file under `src/` emits
 * `dist/index.css`, and its JS entry imports that file as a side effect
 * (`import "./index.css"`, see `hasCssModules` in
 * `build-settings/rollup.config.mjs`). For that to work for consumers, the
 * package's `package.json` must:
 *
 * - list `**\/*.css` in `sideEffects`, so a bundler never tree-shakes the CSS
 *   import away (e.g. if someone later sets `"sideEffects": false`), and
 * - expose the stylesheet as `./css` in its `exports` map, so consumers can
 *   import it directly (an `exports` map blocks every path it doesn't list).
 *
 * The `.` entry lists the `types` condition first, because TypeScript resolves
 * conditions in order.
 */
const packagesDir = path.resolve(__dirname, "..", "..", "packages");

const hasCssModules = (pkgDir: string): boolean => {
    const srcDir = path.join(pkgDir, "src");
    if (!fs.existsSync(srcDir)) {
        return false;
    }
    return fs
        .readdirSync(srcDir, {recursive: true})
        .some(
            (entry) =>
                typeof entry === "string" && entry.endsWith(".module.css"),
        );
};

const cssPackages = fs
    .readdirSync(packagesDir)
    .map((name) => path.join(packagesDir, name))
    .filter(
        (pkgDir) =>
            fs.existsSync(path.join(pkgDir, "package.json")) &&
            hasCssModules(pkgDir),
    )
    .map((pkgDir) => ({
        name: path.basename(pkgDir),
        pkgJson: JSON.parse(
            fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"),
        ),
    }));

describe("packages that emit CSS", () => {
    it("are found", () => {
        // Arrange, Act, Assert
        // Guards against the detection above silently matching nothing.
        expect(cssPackages.length).toBeGreaterThan(0);
    });

    describe.each(cssPackages)("$name", ({pkgJson}) => {
        it("lists `**/*.css` in `sideEffects`", () => {
            // Arrange, Act
            const sideEffects = pkgJson.sideEffects;

            // Assert
            expect(sideEffects).toEqual(expect.arrayContaining(["**/*.css"]));
        });

        it("exports the stylesheet as `./css`", () => {
            // Arrange, Act
            const cssExport = pkgJson.exports?.["./css"];

            // Assert
            expect(cssExport).toBe("./dist/index.css");
        });

        it("exports `.` with the `types` condition first", () => {
            // Arrange, Act
            const conditions = Object.keys(pkgJson.exports?.["."] ?? {});

            // Assert
            expect(conditions[0]).toBe("types");
            expect(conditions).toEqual(
                expect.arrayContaining(["types", "import", "require"]),
            );
        });
    });
});
