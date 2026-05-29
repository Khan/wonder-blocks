// Generate `*.module.css.d.ts` files next to every `*.module.css` source.
//
// Wired into the `gen:css-types` script and invoked by `prebuild` /
// `pretypecheck` so `tsc --noEmit` always sees fresh declarations and
// `styles.<missingClassName>` references fail the typecheck. Generated
// files are gitignored; fresh checkouts regenerate them via the
// pre-script hooks. The IDE side uses `typescript-plugin-css-modules`
// to read CSS files live, so authoring doesn't depend on regenerating
// these declarations on every save.
const fg = require("fast-glob");
const DtsCreator = require("typed-css-modules").default;

const creator = new DtsCreator({
    // Match Vite's CSS Modules `localsConvention` once 0.4 lands. For now
    // class names round-trip unchanged — the spike uses camelCase already.
    camelCase: false,
});

async function main() {
    const files = await fg(
        ["packages/**/*.module.css", "__docs__/**/*.module.css"],
        {
            ignore: ["**/node_modules/**", "**/dist/**"],
        },
    );

    if (files.length === 0) {
        // eslint-disable-next-line no-console
        console.log("ℹ️  No `*.module.css` files found; nothing to generate.");
        return;
    }

    for (const file of files) {
        const content = await creator.create(file);
        await content.writeFile();
    }

    // eslint-disable-next-line no-console
    console.log(
        `✅ Generated types for ${files.length} CSS Module file(s).`,
    );
}

main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error("❌ Failed to generate CSS Module types:", err);
    process.exit(1);
});
