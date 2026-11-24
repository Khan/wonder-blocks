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
 *   `./css` is conditional: `import` resolves to the copy the ESM entry
 *   imports (`dist/es/index.css`) and `require` to the CommonJS one
 *   (`dist/index.css`), so a bundler that also imports `./css` resolves the
 *   same file as the JS entry and loads the CSS once.
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

// Guards against the detection above silently matching nothing.
describe("packages that emit CSS", () => {
    it("are found", () => {
        // Arrange
        const packages = cssPackages;

        // Act
        const count = packages.length;

        // Assert
        expect(count).toBeGreaterThan(0);
    });

    describe.each(cssPackages)("$name", ({pkgJson}) => {
        it("lists `**/*.css` in `sideEffects`", () => {
            // Arrange
            const pkg = pkgJson;

            // Act
            const sideEffects = pkg.sideEffects;

            // Assert
            expect(sideEffects).toEqual(expect.arrayContaining(["**/*.css"]));
        });

        it("exports the stylesheet as `./css`, matching each JS build", () => {
            // Arrange
            const pkg = pkgJson;

            // Act
            const cssExport = pkg.exports?.["./css"];

            // Assert
            expect(cssExport).toEqual({
                import: "./dist/es/index.css",
                require: "./dist/index.css",
                default: "./dist/index.css",
            });
        });

        it("lists the `types` condition first in `.`", () => {
            // Arrange
            const pkg = pkgJson;

            // Act
            const [firstCondition] = Object.keys(pkg.exports?.["."] ?? {});

            // Assert
            expect(firstCondition).toBe("types");
        });

        it("has `types`, `import` and `require` conditions in `.`", () => {
            // Arrange
            const pkg = pkgJson;

            // Act
            const conditions = Object.keys(pkg.exports?.["."] ?? {});

            // Assert
            expect(conditions).toEqual(
                expect.arrayContaining(["types", "import", "require"]),
            );
        });
    });
});
